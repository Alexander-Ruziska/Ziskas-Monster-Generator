import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import './DungeonGenerator.css';

function DungeonGenerator() {
  const [dungeonData, setDungeonData] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState('stone-dungeon');
  const [selectedSize, setSelectedSize] = useState('medium');
  const [isGenerating, setIsGenerating] = useState(false);

  // Basic dungeon themes
  const themes = {
    'stone-dungeon': 'Stone Dungeon',
    'ancient-temple': 'Ancient Temple',
    'cavern': 'Natural Cavern',
    'crypt': 'Ancient Crypt'
  };

  // Dungeon sizes
  const sizes = {
    'small': 'Small (3-5 rooms)',
    'medium': 'Medium (6-10 rooms)', 
    'large': 'Large (11-15 rooms)'
  };

  // Generate a simple dungeon layout
  const generateDungeon = () => {
    setIsGenerating(true);
    
    // Simulate generation delay
    setTimeout(() => {
      const roomCount = selectedSize === 'small' ? 4 : selectedSize === 'medium' ? 8 : 12;
      
      const newDungeon = {
        theme: selectedTheme,
        size: selectedSize,
        rooms: Array.from({ length: roomCount }, (_, index) => ({
          id: index,
          name: `Room ${index + 1}`,
          description: generateRoomDescription(selectedTheme),
          connections: generateConnections(index, roomCount)
        }))
      };
      
      setDungeonData(newDungeon);
      setIsGenerating(false);
    }, 1500);
  };

  // Generate random room description based on theme
  const generateRoomDescription = (theme) => {
    const descriptions = {
      'stone-dungeon': [
        'A damp stone chamber with moss-covered walls',
        'A torch-lit corridor with iron-barred cells',
        'A circular room with a raised dais in the center',
        'A narrow passage with crumbling stonework'
      ],
      'ancient-temple': [
        'A sacred chamber with faded murals on the walls',
        'A pillared hall with broken statuary',
        'An altar room with mystical symbols carved in stone',
        'A meditation chamber with lotus-shaped alcoves'
      ],
      'cavern': [
        'A natural cave with stalactites hanging overhead',
        'A rocky chamber with an underground stream',
        'A cavern with crystalline formations on the walls',
        'A tunnel carved by ancient waters'
      ],
      'crypt': [
        'A burial chamber lined with stone sarcophagi',
        'A ossuary with bones arranged in decorative patterns',
        'A tomb with dust-covered burial niches',
        'A memorial hall with weathered epitaphs'
      ]
    };
    
    const themeDescriptions = descriptions[theme] || descriptions['stone-dungeon'];
    return themeDescriptions[Math.floor(Math.random() * themeDescriptions.length)];
  };

  // Generate connections between rooms
  const generateConnections = (roomIndex, totalRooms) => {
    const connections = [];
    
    // Simple linear connection for now
    if (roomIndex > 0) connections.push(roomIndex - 1);
    if (roomIndex < totalRooms - 1) connections.push(roomIndex + 1);
    
    // Add some random connections for interesting layouts
    if (Math.random() > 0.7 && totalRooms > 3) {
      const randomRoom = Math.floor(Math.random() * totalRooms);
      if (randomRoom !== roomIndex && !connections.includes(randomRoom)) {
        connections.push(randomRoom);
      }
    }
    
    return connections;
  };

  // Reset dungeon
  const resetDungeon = () => {
    setDungeonData(null);
  };

  return (
    <Container fluid className={`dungeon-generator ${dungeonData ? `theme-${dungeonData.theme}` : ''}`}>
      <Row className="mb-4">
        <Col>
          <h2 className="text-center">Dungeon Generator</h2>
          <p className="text-center text-muted">Generate random dungeons for your D&D adventures</p>
        </Col>
      </Row>

      <Row>
        <Col lg={4}>
          <Card className="mb-4">
            <Card.Header>
              <h4>Dungeon Settings</h4>
            </Card.Header>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Theme</Form.Label>
                  <Form.Select 
                    value={selectedTheme} 
                    onChange={(e) => setSelectedTheme(e.target.value)}
                  >
                    {Object.entries(themes).map(([key, name]) => (
                      <option key={key} value={key}>{name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Size</Form.Label>
                  <Form.Select 
                    value={selectedSize} 
                    onChange={(e) => setSelectedSize(e.target.value)}
                  >
                    {Object.entries(sizes).map(([key, name]) => (
                      <option key={key} value={key}>{name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button 
                    variant="primary" 
                    onClick={generateDungeon}
                    disabled={isGenerating}
                  >
                    {isGenerating ? 'Generating...' : 'Generate New Dungeon'}
                  </Button>
                  
                  {dungeonData && (
                    <Button 
                      variant="outline-secondary" 
                      onClick={resetDungeon}
                    >
                      Clear Dungeon
                    </Button>
                  )}
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          {dungeonData ? (
            <Card>
              <Card.Header>
                <h4>{themes[dungeonData.theme]} - {sizes[dungeonData.size]}</h4>
              </Card.Header>
              <Card.Body>
                <Row>
                  {dungeonData.rooms.map((room) => (
                    <Col md={6} lg={4} key={room.id} className="mb-3">
                      <Card className="h-100 room-card">
                        <Card.Header className="d-flex justify-content-between align-items-center">
                          <strong>{room.name}</strong>
                          <small className="text-muted">ID: {room.id}</small>
                        </Card.Header>
                        <Card.Body>
                          <p className="card-text">{room.description}</p>
                          {room.connections.length > 0 && (
                            <div>
                              <small className="text-muted">
                                <strong>Connects to:</strong> {room.connections.map(conn => `Room ${conn + 1}`).join(', ')}
                              </small>
                            </div>
                          )}
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>
          ) : (
            <Card>
              <Card.Body className="text-center py-5">
                <h5 className="text-muted">No dungeon generated yet</h5>
                <p className="text-muted">Select your settings and click "Generate New Dungeon" to begin</p>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default DungeonGenerator;