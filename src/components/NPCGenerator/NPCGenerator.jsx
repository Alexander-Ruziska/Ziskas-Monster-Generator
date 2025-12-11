import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, Tabs, Tab } from 'react-bootstrap';
import './NPCGenerator.css';

function NPCGenerator() {
  const [npcType, setNpcType] = useState('random');
  const [personality, setPersonality] = useState('random');
  const [occupation, setOccupation] = useState('random');
  const [relationship, setRelationship] = useState('neutral');
  const [activeTab, setActiveTab] = useState('npcs');

  const generateNPC = () => {
    console.log('Generating NPC...', { npcType, personality, occupation, relationship });
  };

  const generateFaction = () => {
    console.log('Generating faction...');
  };

  return (
    <Container className="npc-generator" style={{ marginTop: '100px' }}>
      <Row>
        <Col>
          <h2 style={{ fontSize: '36px', marginBottom: '20px' }}>NPCs & Faction Generator</h2>
          <p style={{ fontSize: '18px', marginBottom: '30px' }}>
            Create memorable characters, organizations, and social dynamics for your world!
          </p>
        </Col>
      </Row>

      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-4">
        <Tab eventKey="npcs" title="NPCs">
          <Row>
            <Col md={6}>
              <Card className="generator-card">
                <Card.Header>
                  <h4>NPC Generator</h4>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>NPC Type</Form.Label>
                      <Form.Select value={npcType} onChange={(e) => setNpcType(e.target.value)}>
                        <option value="random">Random</option>
                        <option value="villager">Villager</option>
                        <option value="merchant">Merchant</option>
                        <option value="noble">Noble</option>
                        <option value="guard">Guard/Soldier</option>
                        <option value="adventurer">Adventurer</option>
                        <option value="criminal">Criminal</option>
                        <option value="scholar">Scholar/Sage</option>
                        <option value="artisan">Artisan/Craftsperson</option>
                        <option value="religious">Religious Figure</option>
                        <option value="entertainer">Entertainer</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Personality</Form.Label>
                      <Form.Select value={personality} onChange={(e) => setPersonality(e.target.value)}>
                        <option value="random">Random</option>
                        <option value="friendly">Friendly & Helpful</option>
                        <option value="suspicious">Suspicious & Paranoid</option>
                        <option value="greedy">Greedy & Opportunistic</option>
                        <option value="scholarly">Scholarly & Curious</option>
                        <option value="aggressive">Aggressive & Hot-tempered</option>
                        <option value="mysterious">Mysterious & Secretive</option>
                        <option value="cheerful">Cheerful & Optimistic</option>
                        <option value="melancholy">Melancholy & Brooding</option>
                        <option value="eccentric">Eccentric & Quirky</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Relationship to Party</Form.Label>
                      <Form.Select value={relationship} onChange={(e) => setRelationship(e.target.value)}>
                        <option value="neutral">Neutral</option>
                        <option value="friendly">Friendly Ally</option>
                        <option value="hostile">Hostile Enemy</option>
                        <option value="suspicious">Suspicious but Helpful</option>
                        <option value="romantic">Potential Romance</option>
                        <option value="rival">Friendly Rival</option>
                        <option value="mentor">Mentor Figure</option>
                        <option value="quest">Quest Giver</option>
                      </Form.Select>
                    </Form.Group>

                    <Button variant="primary" size="lg" onClick={generateNPC} className="w-100">
                      Generate NPC
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="preview-card">
                <Card.Header>
                  <h4>NPC Preview <Badge bg="secondary">Coming Soon</Badge></h4>
                </Card.Header>
                <Card.Body>
                  <div className="feature-list">
                    <h5>NPC Features:</h5>
                    <ul>
                      <li><strong>Full Personalities:</strong> Traits, ideals, bonds, and flaws</li>
                      <li><strong>Background Stories:</strong> Rich personal histories</li>
                      <li><strong>Motivations:</strong> What drives them and their goals</li>
                      <li><strong>Relationships:</strong> Connections to other NPCs</li>
                      <li><strong>Secrets:</strong> Hidden information and plot hooks</li>
                      <li><strong>Voice & Mannerisms:</strong> Unique speech patterns</li>
                      <li><strong>Appearance:</strong> Distinctive physical features</li>
                      <li><strong>Stats & Abilities:</strong> Mechanical game statistics</li>
                    </ul>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="factions" title="Factions & Organizations">
          <Row>
            <Col md={6}>
              <Card className="generator-card">
                <Card.Header>
                  <h4>Faction Generator</h4>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Organization Type</Form.Label>
                      <Form.Select>
                        <option value="guild">Merchant Guild</option>
                        <option value="thieves">Thieves' Guild</option>
                        <option value="religious">Religious Order</option>
                        <option value="military">Military Organization</option>
                        <option value="scholarly">Scholarly Society</option>
                        <option value="noble">Noble House</option>
                        <option value="cult">Secret Cult</option>
                        <option value="adventuring">Adventuring Company</option>
                        <option value="criminal">Criminal Syndicate</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Power Level</Form.Label>
                      <Form.Select>
                        <option value="local">Local Influence</option>
                        <option value="regional">Regional Power</option>
                        <option value="national">National Organization</option>
                        <option value="international">International Reach</option>
                        <option value="planar">Planar Influence</option>
                      </Form.Select>
                    </Form.Group>

                    <Button variant="success" size="lg" onClick={generateFaction} className="w-100">
                      Generate Faction
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="preview-card">
                <Card.Header>
                  <h4>Faction Features <Badge bg="info">Advanced</Badge></h4>
                </Card.Header>
                <Card.Body>
                  <div className="feature-list">
                    <h5>Organization Elements:</h5>
                    <ul>
                      <li><strong>Hierarchy:</strong> Leadership structure and ranks</li>
                      <li><strong>Goals:</strong> Short and long-term objectives</li>
                      <li><strong>Resources:</strong> Wealth, influence, and assets</li>
                      <li><strong>Rivals:</strong> Competing organizations</li>
                      <li><strong>Allies:</strong> Friendly factions and treaties</li>
                      <li><strong>Secrets:</strong> Hidden agendas and conspiracies</li>
                      <li><strong>Operations:</strong> How they make money/power</li>
                      <li><strong>Recruitment:</strong> How they find new members</li>
                    </ul>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="relationships" title="Relationship Web">
          <Row>
            <Col md={12}>
              <Card className="generator-card">
                <Card.Header>
                  <h4>Social Network Generator <Badge bg="warning">Complex Feature</Badge></h4>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={4}>
                      <h5>Relationship Types</h5>
                      <ul className="relationship-types">
                        <li>Family Bonds</li>
                        <li>Professional Partners</li>
                        <li>Romantic Interests</li>
                        <li>Old Rivalries</li>
                        <li>Mentor/Student</li>
                        <li>Creditor/Debtor</li>
                        <li>Secret Alliances</li>
                        <li>Blood Feuds</li>
                      </ul>
                    </Col>
                    <Col md={4}>
                      <h5>Social Dynamics</h5>
                      <ul className="social-dynamics">
                        <li>Love Triangles</li>
                        <li>Business Conspiracies</li>
                        <li>Political Intrigue</li>
                        <li>Religious Conflicts</li>
                        <li>Class Struggles</li>
                        <li>Generational Disputes</li>
                        <li>Cultural Tensions</li>
                        <li>Resource Competition</li>
                      </ul>
                    </Col>
                    <Col md={4}>
                      <h5>Plot Hooks</h5>
                      <ul className="plot-hooks">
                        <li>Missing Persons</li>
                        <li>Inheritance Disputes</li>
                        <li>Marriage Arrangements</li>
                        <li>Business Sabotage</li>
                        <li>Political Assassinations</li>
                        <li>Religious Heresies</li>
                        <li>Trade Route Conflicts</li>
                        <li>Ancient Grudges</li>
                      </ul>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>
      </Tabs>
    </Container>
  );
}

export default NPCGenerator;