import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, Tabs, Tab, ProgressBar } from 'react-bootstrap';
import './AdventureGenerator.css';

function AdventureGenerator() {
  const [adventureType, setAdventureType] = useState('dungeon-crawl');
  const [adventureLength, setAdventureLength] = useState('one-shot');
  const [partyLevel, setPartyLevel] = useState(3);
  const [partySize, setPartySize] = useState(4);
  const [theme, setTheme] = useState('classic-fantasy');
  const [includeRoleplay, setIncludeRoleplay] = useState(true);
  const [activeTab, setActiveTab] = useState('generator');
  const [generationStep, setGenerationStep] = useState(0);

  const generateFullAdventure = () => {
    console.log('Generating full adventure...', { 
      adventureType, 
      adventureLength, 
      partyLevel, 
      partySize, 
      theme, 
      includeRoleplay 
    });
    
    // Simulate generation steps
    setGenerationStep(1);
    setTimeout(() => setGenerationStep(2), 1000);
    setTimeout(() => setGenerationStep(3), 2000);
    setTimeout(() => setGenerationStep(4), 3000);
    setTimeout(() => setGenerationStep(5), 4000);
    setTimeout(() => setGenerationStep(0), 5000);
  };

  const getStepText = (step) => {
    switch(step) {
      case 1: return "Generating dungeon layout...";
      case 2: return "Creating monsters and encounters...";
      case 3: return "Placing treasure and magic items...";
      case 4: return "Writing narrative and lore...";
      case 5: return "Finalizing adventure structure...";
      default: return "Ready to generate!";
    }
  };

  return (
    <Container className="adventure-generator" style={{ marginTop: '100px' }}>
      <Row>
        <Col>
          <h2 style={{ fontSize: '36px', marginBottom: '20px' }}>🏰 Full Adventure Generator</h2>
          <p style={{ fontSize: '18px', marginBottom: '30px' }}>
            Create complete adventures that integrate monsters, dungeons, treasure, NPCs, and lore into cohesive campaigns!
          </p>
        </Col>
      </Row>

      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-4">
        <Tab eventKey="generator" title="Adventure Builder">
          <Row>
            <Col md={6}>
              <Card className="generator-card">
                <Card.Header>
                  <h4>⚔️ Adventure Parameters</h4>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Adventure Type</Form.Label>
                      <Form.Select value={adventureType} onChange={(e) => setAdventureType(e.target.value)}>
                        <option value="dungeon-crawl">Classic Dungeon Crawl</option>
                        <option value="mystery">Mystery & Investigation</option>
                        <option value="exploration">Wilderness Exploration</option>
                        <option value="social">Social Intrigue</option>
                        <option value="siege">Siege & Defense</option>
                        <option value="heist">Heist & Infiltration</option>
                        <option value="rescue">Rescue Mission</option>
                        <option value="tournament">Tournament & Competition</option>
                        <option value="planar">Planar Adventure</option>
                        <option value="sandbox">Open Sandbox</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Adventure Length</Form.Label>
                      <Form.Select value={adventureLength} onChange={(e) => setAdventureLength(e.target.value)}>
                        <option value="short">Short (1-2 hours)</option>
                        <option value="one-shot">One-Shot (3-5 hours)</option>
                        <option value="mini-campaign">Mini Campaign (3-5 sessions)</option>
                        <option value="campaign">Full Campaign (10+ sessions)</option>
                      </Form.Select>
                    </Form.Group>

                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Party Level</Form.Label>
                          <Form.Range
                            min={1}
                            max={20}
                            value={partyLevel}
                            onChange={(e) => setPartyLevel(e.target.value)}
                          />
                          <Form.Text>Level {partyLevel}</Form.Text>
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label>Party Size</Form.Label>
                          <Form.Range
                            min={1}
                            max={8}
                            value={partySize}
                            onChange={(e) => setPartySize(e.target.value)}
                          />
                          <Form.Text>{partySize} players</Form.Text>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label>Theme & Setting</Form.Label>
                      <Form.Select value={theme} onChange={(e) => setTheme(e.target.value)}>
                        <option value="classic-fantasy">Classic High Fantasy</option>
                        <option value="dark-fantasy">Dark Fantasy</option>
                        <option value="horror">Gothic Horror</option>
                        <option value="pirate">Pirate Adventure</option>
                        <option value="steampunk">Steampunk/Magitech</option>
                        <option value="oriental">Oriental Adventures</option>
                        <option value="norse">Norse/Viking</option>
                        <option value="desert">Arabian Nights</option>
                        <option value="urban">Urban Fantasy</option>
                        <option value="post-apocalyptic">Post-Apocalyptic</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Check 
                      type="checkbox" 
                      label="Include Roleplay & Social Encounters" 
                      checked={includeRoleplay}
                      onChange={(e) => setIncludeRoleplay(e.target.checked)}
                      className="mb-3"
                    />

                    {generationStep > 0 && (
                      <div className="mb-3">
                        <ProgressBar 
                          now={(generationStep / 5) * 100} 
                          label={`${Math.round((generationStep / 5) * 100)}%`}
                          className="mb-2"
                        />
                        <small className="text-muted">{getStepText(generationStep)}</small>
                      </div>
                    )}

                    <Button 
                      variant="primary" 
                      size="lg" 
                      onClick={generateFullAdventure} 
                      className="w-100"
                      disabled={generationStep > 0}
                    >
                      {generationStep > 0 ? 'Generating...' : '🎲 Generate Complete Adventure'}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="preview-card">
                <Card.Header>
                  <h4>🎭 Adventure Components <Badge bg="secondary">Coming Soon</Badge></h4>
                </Card.Header>
                <Card.Body>
                  <div className="component-list">
                    <h5>What Gets Generated:</h5>
                    
                    <div className="component-item">
                      <h6>🗺️ Maps & Locations</h6>
                      <ul>
                        <li>Dungeon layouts with room descriptions</li>
                        <li>Wilderness areas and travel routes</li>
                        <li>Towns, villages, and settlements</li>
                      </ul>
                    </div>

                    <div className="component-item">
                      <h6>👹 Monsters & Encounters</h6>
                      <ul>
                        <li>Balanced encounters for your party</li>
                        <li>Boss fights with unique mechanics</li>
                        <li>Environmental challenges and traps</li>
                      </ul>
                    </div>

                    <div className="component-item">
                      <h6>💎 Treasure & Rewards</h6>
                      <ul>
                        <li>Appropriate loot for encounter difficulty</li>
                        <li>Magic items with backstories</li>
                        <li>Plot-relevant artifacts and clues</li>
                      </ul>
                    </div>

                    <div className="component-item">
                      <h6>🎭 NPCs & Story</h6>
                      <ul>
                        <li>Quest givers and important characters</li>
                        <li>Interconnected storylines and plots</li>
                        <li>Dialogue prompts and roleplay scenes</li>
                      </ul>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="structure" title="Adventure Structure">
          <Row>
            <Col md={12}>
              <Card className="generator-card">
                <Card.Header>
                  <h4>📖 Adventure Flow & Pacing</h4>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={3}>
                      <Card className="structure-card">
                        <Card.Header className="text-center">
                          <h5>🚪 Opening Hook</h5>
                        </Card.Header>
                        <Card.Body>
                          <ul>
                            <li>Inciting incident</li>
                            <li>Quest introduction</li>
                            <li>Patron/employer</li>
                            <li>Initial motivation</li>
                            <li>Urgent deadline</li>
                          </ul>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={3}>
                      <Card className="structure-card">
                        <Card.Header className="text-center">
                          <h5>🗺️ Exploration</h5>
                        </Card.Header>
                        <Card.Body>
                          <ul>
                            <li>Information gathering</li>
                            <li>Travel & navigation</li>
                            <li>Random encounters</li>
                            <li>Environmental puzzles</li>
                            <li>Side quests</li>
                          </ul>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={3}>
                      <Card className="structure-card">
                        <Card.Header className="text-center">
                          <h5>⚔️ Confrontation</h5>
                        </Card.Header>
                        <Card.Body>
                          <ul>
                            <li>Major challenges</li>
                            <li>Boss encounters</li>
                            <li>Moral dilemmas</li>
                            <li>Skill challenges</li>
                            <li>Plot revelations</li>
                          </ul>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col md={3}>
                      <Card className="structure-card">
                        <Card.Header className="text-center">
                          <h5>🏆 Resolution</h5>
                        </Card.Header>
                        <Card.Body>
                          <ul>
                            <li>Quest completion</li>
                            <li>Reward distribution</li>
                            <li>Consequences</li>
                            <li>Future hooks</li>
                            <li>Character growth</li>
                          </ul>
                        </Card.Body>
                      </Card>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="export" title="Export & Integration">
          <Row>
            <Col md={12}>
              <Card className="generator-card">
                <Card.Header>
                  <h4>📤 Export & Platform Integration <Badge bg="info">Future Feature</Badge></h4>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={4}>
                      <h5>📱 Digital Platforms</h5>
                      <ul className="export-list">
                        <li><strong>Roll20:</strong> Maps, tokens, character sheets</li>
                        <li><strong>Foundry VTT:</strong> Complete adventure modules</li>
                        <li><strong>D&D Beyond:</strong> Monster stat blocks and encounters</li>
                        <li><strong>Fantasy Grounds:</strong> Full campaign integration</li>
                        <li><strong>Owlbear Rodeo:</strong> Simple map sharing</li>
                      </ul>
                    </Col>
                    <Col md={4}>
                      <h5>📄 Print-Ready Formats</h5>
                      <ul className="export-list">
                        <li><strong>PDF Adventure:</strong> Complete module with art</li>
                        <li><strong>Player Handouts:</strong> Maps, clues, and images</li>
                        <li><strong>DM Screen:</strong> Quick reference sheets</li>
                        <li><strong>Stat Cards:</strong> Monster and NPC cards</li>
                        <li><strong>Battle Maps:</strong> Grid-ready tactical maps</li>
                      </ul>
                    </Col>
                    <Col md={4}>
                      <h5>💾 Data Management</h5>
                      <ul className="export-list">
                        <li><strong>Campaign Seeds:</strong> Save and expand adventures</li>
                        <li><strong>Monster Compendium:</strong> Personal bestiary</li>
                        <li><strong>Location Library:</strong> Reusable dungeon rooms</li>
                        <li><strong>NPC Directory:</strong> Character relationship webs</li>
                        <li><strong>Loot Database:</strong> Treasure and magic items</li>
                      </ul>
                    </Col>
                  </Row>

                  <hr className="my-4" />

                  <div className="text-center">
                    <h5>🎯 Complete Adventure Workflow</h5>
                    <p className="lead">
                      Generate → Customize → Export → Play
                    </p>
                    <p>
                      Create entire campaigns at the push of a button, then fine-tune and export to your preferred platform for seamless gameplay!
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>
      </Tabs>
    </Container>
  );
}

export default AdventureGenerator;