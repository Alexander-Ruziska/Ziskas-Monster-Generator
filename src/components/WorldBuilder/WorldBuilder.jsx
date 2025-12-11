import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, Tabs, Tab } from 'react-bootstrap';
import './WorldBuilder.css';

function WorldBuilder() {
  const [biome, setBiome] = useState('temperate');
  const [climate, setClimate] = useState('moderate');
  const [civilizationLevel, setCivilizationLevel] = useState('medieval');
  const [magicLevel, setMagicLevel] = useState('standard');
  const [activeTab, setActiveTab] = useState('environment');

  const generateEnvironment = () => {
    console.log('Generating environment...', { biome, climate, civilizationLevel, magicLevel });
  };

  const generateRegion = () => {
    console.log('Generating region...');
  };

  return (
    <Container className="world-builder" style={{ marginTop: '100px' }}>
      <Row>
        <Col>
          <h2 style={{ fontSize: '36px', marginBottom: '20px' }}>World Building Tools</h2>
          <p style={{ fontSize: '18px', marginBottom: '30px' }}>
            Create immersive environments, regions, and entire worlds for your campaigns!
          </p>
        </Col>
      </Row>

      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-4">
        <Tab eventKey="environment" title="Environment">
          <Row>
            <Col md={6}>
              <Card className="generator-card">
                <Card.Header>
                  <h4>Environmental Generator</h4>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Primary Biome</Form.Label>
                      <Form.Select value={biome} onChange={(e) => setBiome(e.target.value)}>
                        <option value="temperate">Temperate Forest</option>
                        <option value="tropical">Tropical Rainforest</option>
                        <option value="desert">Desert</option>
                        <option value="arctic">Arctic Tundra</option>
                        <option value="mountains">Mountain Range</option>
                        <option value="swamp">Swampland</option>
                        <option value="grassland">Grassland Plains</option>
                        <option value="coastal">Coastal Region</option>
                        <option value="underground">Underground Caverns</option>
                        <option value="volcanic">Volcanic Region</option>
                        <option value="floating">Floating Islands</option>
                        <option value="planar">Planar Realm</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Climate</Form.Label>
                      <Form.Select value={climate} onChange={(e) => setClimate(e.target.value)}>
                        <option value="moderate">Moderate</option>
                        <option value="harsh">Harsh & Extreme</option>
                        <option value="magical">Magically Influenced</option>
                        <option value="seasonal">Strong Seasonal Changes</option>
                        <option value="unstable">Unstable Weather</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Magic Level</Form.Label>
                      <Form.Select value={magicLevel} onChange={(e) => setMagicLevel(e.target.value)}>
                        <option value="none">No Magic</option>
                        <option value="low">Low Magic</option>
                        <option value="standard">Standard D&D</option>
                        <option value="high">High Magic</option>
                        <option value="wild">Wild Magic Zones</option>
                        <option value="dead">Dead Magic Zones</option>
                      </Form.Select>
                    </Form.Group>

                    <Button variant="primary" size="lg" onClick={generateEnvironment} className="w-100">
                      Generate Environment
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="preview-card">
                <Card.Header>
                  <h4>Environment Features <Badge bg="secondary">Coming Soon</Badge></h4>
                </Card.Header>
                <Card.Body>
                  <div className="feature-list">
                    <h5>Environmental Elements:</h5>
                    <ul>
                      <li><strong>Terrain Features:</strong> Rivers, cliffs, caves, ruins</li>
                      <li><strong>Weather Patterns:</strong> Storms, seasons, magical weather</li>
                      <li><strong>Natural Hazards:</strong> Quicksand, avalanches, volcanic activity</li>
                      <li><strong>Flora & Fauna:</strong> Plants and animals native to the region</li>
                      <li><strong>Magical Phenomena:</strong> Ley lines, portals, time distortions</li>
                      <li><strong>Resources:</strong> Mines, forests, water sources</li>
                      <li><strong>Points of Interest:</strong> Landmarks, monuments, mysteries</li>
                      <li><strong>Travel Conditions:</strong> Roads, dangers, travel times</li>
                    </ul>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="regions" title="Regions & Maps">
          <Row>
            <Col md={6}>
              <Card className="generator-card">
                <Card.Header>
                  <h4>Region Generator</h4>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Region Size</Form.Label>
                      <Form.Select>
                        <option value="local">Local Area (10-50 miles)</option>
                        <option value="province">Province (100-500 miles)</option>
                        <option value="kingdom">Kingdom (500-1000 miles)</option>
                        <option value="continent">Continent (1000+ miles)</option>
                        <option value="world">Entire World</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Civilization Level</Form.Label>
                      <Form.Select value={civilizationLevel} onChange={(e) => setCivilizationLevel(e.target.value)}>
                        <option value="primitive">Primitive (Stone Age)</option>
                        <option value="ancient">Ancient (Bronze/Iron Age)</option>
                        <option value="medieval">Medieval Fantasy</option>
                        <option value="renaissance">Renaissance</option>
                        <option value="industrial">Industrial Revolution</option>
                        <option value="modern">Modern Era</option>
                        <option value="futuristic">Futuristic/Magitech</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Population Density</Form.Label>
                      <Form.Select>
                        <option value="wilderness">Mostly Wilderness</option>
                        <option value="frontier">Frontier Settlements</option>
                        <option value="rural">Rural Communities</option>
                        <option value="civilized">Civilized Lands</option>
                        <option value="urban">Heavily Urbanized</option>
                      </Form.Select>
                    </Form.Group>

                    <Button variant="success" size="lg" onClick={generateRegion} className="w-100">
                      Generate Region Map
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              <Card className="preview-card">
                <Card.Header>
                  <h4>Regional Features <Badge bg="info">Advanced</Badge></h4>
                </Card.Header>
                <Card.Body>
                  <div className="feature-list">
                    <h5>Map Elements:</h5>
                    <ul>
                      <li><strong>Political Boundaries:</strong> Kingdoms, territories, disputed lands</li>
                      <li><strong>Major Cities:</strong> Capitals, trade hubs, fortress cities</li>
                      <li><strong>Trade Routes:</strong> Roads, rivers, shipping lanes</li>
                      <li><strong>Strategic Locations:</strong> Passes, bridges, fortifications</li>
                      <li><strong>Dungeons & Ruins:</strong> Ancient sites and adventure locations</li>
                      <li><strong>Natural Wonders:</strong> Unique geographical features</li>
                      <li><strong>Borders & Frontiers:</strong> Contested areas and wild lands</li>
                      <li><strong>Cultural Regions:</strong> Different peoples and customs</li>
                    </ul>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="lore" title="Lore & History">
          <Row>
            <Col md={12}>
              <Card className="generator-card">
                <Card.Header>
                  <h4>Lore & Flavor Generator <Badge bg="warning">Narrative Tools</Badge></h4>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col md={4}>
                      <h5>Historical Events</h5>
                      <ul className="historical-events">
                        <li>Ancient Wars & Conflicts</li>
                        <li>Rise & Fall of Empires</li>
                        <li>Magical Catastrophes</li>
                        <li>Planar Incursions</li>
                        <li>Religious Reformations</li>
                        <li>Great Discoveries</li>
                        <li>Natural Disasters</li>
                        <li>Heroic Legends</li>
                      </ul>
                    </Col>
                    <Col md={4}>
                      <h5>Cultural Elements</h5>
                      <ul className="cultural-elements">
                        <li>Creation Myths</li>
                        <li>Religious Pantheons</li>
                        <li>Cultural Traditions</li>
                        <li>Languages & Scripts</li>
                        <li>Art & Architecture</li>
                        <li>Festivals & Holidays</li>
                        <li>Social Hierarchies</li>
                        <li>Taboos & Customs</li>
                      </ul>
                    </Col>
                    <Col md={4}>
                      <h5>Adventure Hooks</h5>
                      <ul className="adventure-hooks">
                        <li>Ancient Prophecies</li>
                        <li>Lost Artifacts</li>
                        <li>Monster Legends</li>
                        <li>Dungeon Rumors</li>
                        <li>Political Intrigue</li>
                        <li>Trade Disputes</li>
                        <li>Missing Persons</li>
                        <li>Mysterious Phenomena</li>
                      </ul>
                    </Col>
                  </Row>

                  <hr className="my-4" />

                  <Row>
                    <Col md={12}>
                      <h5>Auto-Generated Content Examples:</h5>
                      <div className="lore-examples">
                        <Card className="mb-3">
                          <Card.Body>
                            <Card.Title>Dungeon Inscription Generator</Card.Title>
                            <Card.Text>
                              <em>"Here lies the tomb of Valdris the Bold, who fell defending the realm from the shadow plague. May his sacrifice light the way for future heroes."</em>
                            </Card.Text>
                          </Card.Body>
                        </Card>
                        <Card className="mb-3">
                          <Card.Body>
                            <Card.Title>Monster Legend Generator</Card.Title>
                            <Card.Text>
                              <em>"The locals whisper of a great wyrm that sleeps beneath the Whispering Hills, its dreams causing the strange lights that dance in the fog each night..."</em>
                            </Card.Text>
                          </Card.Body>
                        </Card>
                        <Card className="mb-3">
                          <Card.Body>
                            <Card.Title>Adventure Hook Generator</Card.Title>
                            <Card.Text>
                              <em>"A merchant caravan has gone missing on the Old King's Road. The last survivor speaks of 'dancing shadows' and 'singing stones' before collapsing from exhaustion."</em>
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </div>
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

export default WorldBuilder;