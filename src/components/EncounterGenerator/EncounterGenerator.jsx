import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge } from 'react-bootstrap';
import './EncounterGenerator.css';

function EncounterGenerator() {
  const [partySize, setPartySize] = useState(4);
  const [partyLevel, setPartyLevel] = useState(3);
  const [encounterType, setEncounterType] = useState('combat');
  const [theme, setTheme] = useState('any');
  const [difficulty, setDifficulty] = useState('medium');

  const generateEncounter = () => {
    // Placeholder for encounter generation logic
    console.log('Generating encounter...', { partySize, partyLevel, encounterType, theme, difficulty });
  };

  return (
    <Container className="encounter-generator" style={{ marginTop: '100px' }}>
      <Row>
        <Col>
          <h2 style={{ fontSize: '36px', marginBottom: '20px' }}>Encounter & Quest Generator</h2>
          <p style={{ fontSize: '18px', marginBottom: '30px' }}>
            Create dynamic encounters and quests that tie your monsters and dungeons together!
          </p>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Card className="generator-card">
            <Card.Header>
              <h4>Encounter Settings</h4>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
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
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Encounter Type</Form.Label>
                  <Form.Select value={encounterType} onChange={(e) => setEncounterType(e.target.value)}>
                    <option value="combat">Combat Encounter</option>
                    <option value="social">Social Encounter</option>
                    <option value="exploration">Exploration Challenge</option>
                    <option value="puzzle">Puzzle/Riddle</option>
                    <option value="trap">Trap/Hazard</option>
                    <option value="mixed">Mixed Encounter</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Theme</Form.Label>
                  <Form.Select value={theme} onChange={(e) => setTheme(e.target.value)}>
                    <option value="any">Any Theme</option>
                    <option value="undead">Undead</option>
                    <option value="wilderness">Wilderness</option>
                    <option value="infernal">Infernal/Fiend</option>
                    <option value="fey">Fey/Nature</option>
                    <option value="aberration">Aberration/Cosmic Horror</option>
                    <option value="urban">Urban/Civilized</option>
                    <option value="elemental">Elemental</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Difficulty</Form.Label>
                  <Form.Select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                    <option value="deadly">Deadly</option>
                  </Form.Select>
                </Form.Group>

                <Button variant="primary" size="lg" onClick={generateEncounter} className="w-100">
                  Generate Encounter
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="preview-card">
            <Card.Header>
              <h4>Generated Encounter <Badge bg="secondary">Coming Soon</Badge></h4>
            </Card.Header>
            <Card.Body>
              <div className="feature-list">
                <h5>Features in Development:</h5>
                <ul>
                  <li><strong>Random Encounters:</strong> Combat, social, and exploration challenges</li>
                  <li><strong>Quest Generation:</strong> Rescue missions, treasure hunts, mysteries</li>
                  <li><strong>Narrative Hooks:</strong> Tie monsters and dungeons into stories</li>
                  <li><strong>Environmental Challenges:</strong> Weather, hazards, terrain</li>
                  <li><strong>CR Balance:</strong> Automatic encounter balancing for party</li>
                  <li><strong>Encounter Chains:</strong> Link encounters into mini-adventures</li>
                  <li><strong>Victory Conditions:</strong> Multiple ways to resolve encounters</li>
                  <li><strong>Loot Integration:</strong> Appropriate rewards for each encounter</li>
                </ul>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default EncounterGenerator;