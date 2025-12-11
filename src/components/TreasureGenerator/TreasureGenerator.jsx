import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Badge, Tabs, Tab, Spinner, Alert, ProgressBar } from 'react-bootstrap';
import axios from 'axios';
import './TreasureGenerator.css';

function TreasureGenerator() {
  const [treasureType, setTreasureType] = useState('balanced');
  const [partyLevel, setPartyLevel] = useState(5);
  const [lootAmount, setLootAmount] = useState('normal');
  const [includeArtifacts, setIncludeArtifacts] = useState(true);
  const [activeTab, setActiveTab] = useState('treasure');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTreasure, setGeneratedTreasure] = useState(null);
  const [generatedMagicItem, setGeneratedMagicItem] = useState(null);
  const [error, setError] = useState('');

  // Progress tracking states
  const [treasureProgress, setTreasureProgress] = useState(0);
  const [treasureLoadingText, setTreasureLoadingText] = useState('');
  const [magicItemProgress, setMagicItemProgress] = useState(0);
  const [magicItemLoadingText, setMagicItemLoadingText] = useState('');

  // Magic item generation states
  const [itemType, setItemType] = useState('weapon');
  const [itemRarity, setItemRarity] = useState('uncommon');
  const [itemTheme, setItemTheme] = useState('elemental');
  const [isGeneratingMagicItem, setIsGeneratingMagicItem] = useState(false);

  const generateTreasure = async () => {
    setIsGenerating(true);
    setError('');
    setTreasureProgress(0);
    setTreasureLoadingText('Initializing treasure generation...');
    
    try {
      // Simulate progress steps
      setTreasureProgress(10);
      setTreasureLoadingText('Calculating treasure values...');
      
      await new Promise(resolve => setTimeout(resolve, 500));
      setTreasureProgress(25);
      setTreasureLoadingText('Generating loot distribution...');
      
      await new Promise(resolve => setTimeout(resolve, 500));
      setTreasureProgress(45);
      setTreasureLoadingText('Creating AI artwork prompt...');
      
      await new Promise(resolve => setTimeout(resolve, 300));
      setTreasureProgress(60);
      setTreasureLoadingText('Generating AI artwork with DALL-E...');
      
      const response = await axios.post('/api/treasure/generate', {
        treasureType,
        partyLevel: parseInt(partyLevel),
        lootAmount,
        includeArtifacts
      });
      
      setTreasureProgress(85);
      setTreasureLoadingText('Uploading image to Cloudinary...');
      
      await new Promise(resolve => setTimeout(resolve, 500));
      setTreasureProgress(100);
      setTreasureLoadingText('Treasure generation complete!');
      
      await new Promise(resolve => setTimeout(resolve, 300));
      setGeneratedTreasure(response.data);
    } catch (error) {
      console.error('Error generating treasure:', error);
      setError('Failed to generate treasure. Please try again.');
    } finally {
      setIsGenerating(false);
      setTreasureProgress(0);
      setTreasureLoadingText('');
    }
  };

  const generateMagicItem = async () => {
    setIsGeneratingMagicItem(true);
    setError('');
    setMagicItemProgress(0);
    setMagicItemLoadingText('Initializing magic item creation...');
    
    try {
      // Simulate progress steps
      setMagicItemProgress(15);
      setMagicItemLoadingText('Designing magic item properties...');
      
      await new Promise(resolve => setTimeout(resolve, 400));
      setMagicItemProgress(30);
      setMagicItemLoadingText('Generating item lore and description...');
      
      await new Promise(resolve => setTimeout(resolve, 400));
      setMagicItemProgress(50);
      setMagicItemLoadingText('Creating AI artwork prompt...');
      
      await new Promise(resolve => setTimeout(resolve, 300));
      setMagicItemProgress(70);
      setMagicItemLoadingText('Generating AI artwork with DALL-E...');
      
      const response = await axios.post('/api/treasure/magic-item', {
        itemType,
        rarity: itemRarity,
        theme: itemTheme
      });
      
      setMagicItemProgress(90);
      setMagicItemLoadingText('Uploading image to Cloudinary...');
      
      await new Promise(resolve => setTimeout(resolve, 400));
      setMagicItemProgress(100);
      setMagicItemLoadingText('Magic item creation complete!');
      
      await new Promise(resolve => setTimeout(resolve, 300));
      setGeneratedMagicItem(response.data);
    } catch (error) {
      console.error('Error generating magic item:', error);
      setError('Failed to generate magic item. Please try again.');
    } finally {
      setIsGeneratingMagicItem(false);
      setMagicItemProgress(0);
      setMagicItemLoadingText('');
    }
  };

  const resetTreasure = () => {
    setGeneratedTreasure(null);
    setError('');
    setTreasureProgress(0);
    setTreasureLoadingText('');
  };

  const resetMagicItem = () => {
    setGeneratedMagicItem(null);
    setError('');
    setMagicItemProgress(0);
    setMagicItemLoadingText('');
  };

  return (
    <Container className="treasure-generator" style={{ marginTop: '100px' }}>
      <Row>
        <Col>
          <h2 style={{ fontSize: '36px', marginBottom: '20px' }}>Treasure, Loot & Magic Items</h2>
          <p style={{ fontSize: '18px', marginBottom: '30px' }}>
            Generate balanced loot tables, magical artifacts, and unique treasures for your adventures!
          </p>
          {error && <Alert variant="danger">{error}</Alert>}
        </Col>
      </Row>

      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-4">
        <Tab eventKey="treasure" title="Treasure Hoard">
          <Row>
            <Col md={6}>
              <Card className="generator-card">
                <Card.Header>
                  <h4>Treasure Settings</h4>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Party Level</Form.Label>
                      <Form.Range
                        min={1}
                        max={20}
                        value={partyLevel}
                        onChange={(e) => setPartyLevel(e.target.value)}
                      />
                      <Form.Text>Level {partyLevel} (CR {Math.floor(partyLevel/2 + 1)})</Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Treasure Type</Form.Label>
                      <Form.Select value={treasureType} onChange={(e) => setTreasureType(e.target.value)}>
                        <option value="balanced">Balanced Mix</option>
                        <option value="coins">Mostly Coins</option>
                        <option value="magic">Magic Items Focus</option>
                        <option value="artifacts">Rare Artifacts</option>
                        <option value="consumables">Potions & Scrolls</option>
                        <option value="trinkets">Weird Trinkets</option>
                        <option value="cursed">Cursed Items</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Loot Amount</Form.Label>
                      <Form.Select value={lootAmount} onChange={(e) => setLootAmount(e.target.value)}>
                        <option value="poor">Poor (25% normal)</option>
                        <option value="sparse">Sparse (50% normal)</option>
                        <option value="normal">Normal</option>
                        <option value="rich">Rich (150% normal)</option>
                        <option value="royal">Royal Hoard (300% normal)</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Check 
                      type="checkbox" 
                      label="Include Unique Artifacts with Lore" 
                      checked={includeArtifacts}
                      onChange={(e) => setIncludeArtifacts(e.target.checked)}
                      className="mb-3"
                    />

                    <Button 
                      variant="primary" 
                      size="lg" 
                      onClick={generateTreasure} 
                      className="w-100"
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <Spinner animation="border" size="sm" className="me-2" />
                          Generating Treasure...
                        </>
                      ) : (
                        'Generate Treasure Hoard'
                      )}
                    </Button>
                    
                    {isGenerating && (
                      <div className="mt-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <small className="text-muted">{treasureLoadingText}</small>
                          <small className="text-muted">{treasureProgress}%</small>
                        </div>
                        <ProgressBar 
                          now={treasureProgress} 
                          variant="primary"
                          animated
                          striped
                        />
                      </div>
                    )}
                    
                    {generatedTreasure && (
                      <Button 
                        variant="outline-secondary" 
                        size="lg" 
                        onClick={resetTreasure} 
                        className="w-100 mt-2"
                      >
                        Clear Treasure
                      </Button>
                    )}
                  </Form>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6}>
              {generatedTreasure ? (
                <Card className="treasure-result-card">
                  <Card.Header>
                    <h4>Generated Treasure Hoard</h4>
                    <Badge bg="success">Level {generatedTreasure.treasure.partyLevel}</Badge>
                  </Card.Header>
                  <Card.Body>
                    {generatedTreasure.imageUrl && (
                      <div className="treasure-image-container mb-3">
                        <img 
                          src={generatedTreasure.imageUrl} 
                          alt="Generated Treasure Hoard" 
                          className="img-fluid rounded treasure-image"
                        />
                      </div>
                    )}
                    
                    <div className="treasure-details">
                      <h5>Treasure Type: {generatedTreasure.treasure.type}</h5>
                      <p><strong>Total Value:</strong> {generatedTreasure.treasure.totalValue} gp</p>
                      
                      {generatedTreasure.treasure.coins && (
                        <div className="coins-section mb-3">
                          <h6>Coins:</h6>
                          <p>
                            {generatedTreasure.treasure.coins.pp > 0 && `${generatedTreasure.treasure.coins.pp} pp, `}
                            {generatedTreasure.treasure.coins.gp > 0 && `${generatedTreasure.treasure.coins.gp} gp, `}
                            {generatedTreasure.treasure.coins.sp > 0 && `${generatedTreasure.treasure.coins.sp} sp, `}
                            {generatedTreasure.treasure.coins.cp > 0 && `${generatedTreasure.treasure.coins.cp} cp`}
                          </p>
                        </div>
                      )}
                      
                      {generatedTreasure.treasure.items && generatedTreasure.treasure.items.length > 0 && (
                        <div className="items-section">
                          <h6>Items:</h6>
                          {generatedTreasure.treasure.items.map((item, index) => (
                            <div key={index} className="treasure-item mb-2">
                              <strong>{item.name}</strong> ({item.type})
                              {item.rarity && <Badge bg="info" className="ms-2">{item.rarity}</Badge>}
                              <p className="mb-1">{item.description}</p>
                              <small className="text-muted">Value: {item.value} gp</small>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              ) : (
                <Card className="preview-card">
                  <Card.Header>
                    <h4>Treasure Preview <Badge bg="secondary">Ready to Generate</Badge></h4>
                  </Card.Header>
                  <Card.Body>
                    <div className="feature-list">
                      <h5>Treasure Features:</h5>
                      <ul>
                        <li><strong>CR-Balanced Loot:</strong> Appropriate rewards for encounter difficulty</li>
                        <li><strong>Magic Item Generator:</strong> Custom enchantments and properties</li>
                        <li><strong>Cursed Items:</strong> Risk/reward magical items</li>
                        <li><strong>Artifact Lore:</strong> Rich backstories for unique items</li>
                        <li><strong>Consumables:</strong> Potions, scrolls, and temporary items</li>
                        <li><strong>Coin Calculator:</strong> Realistic wealth distribution</li>
                        <li><strong>Art Objects:</strong> Valuable non-magical treasures</li>
                        <li><strong>AI Artwork:</strong> Beautiful treasure illustrations</li>
                      </ul>
                    </div>
                  </Card.Body>
                </Card>
              )}
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="magic-items" title="Magic Items">
          <Row>
            <Col md={6}>
              <Card className="generator-card">
                <Card.Header>
                  <h4>Magic Item Workshop</h4>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group className="mb-3">
                      <Form.Label>Item Type</Form.Label>
                      <Form.Select value={itemType} onChange={(e) => setItemType(e.target.value)}>
                        <option value="weapon">Weapon</option>
                        <option value="armor">Armor</option>
                        <option value="wondrous">Wondrous Item</option>
                        <option value="ring">Ring</option>
                        <option value="wand">Wand/Staff</option>
                        <option value="potion">Potion</option>
                        <option value="scroll">Scroll</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Rarity</Form.Label>
                      <Form.Select value={itemRarity} onChange={(e) => setItemRarity(e.target.value)}>
                        <option value="common">Common</option>
                        <option value="uncommon">Uncommon</option>
                        <option value="rare">Rare</option>
                        <option value="very-rare">Very Rare</option>
                        <option value="legendary">Legendary</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label>Magic Theme</Form.Label>
                      <Form.Select value={itemTheme} onChange={(e) => setItemTheme(e.target.value)}>
                        <option value="elemental">Elemental Powers</option>
                        <option value="divine">Divine Blessings</option>
                        <option value="arcane">Arcane Mysteries</option>
                        <option value="nature">Nature's Gifts</option>
                        <option value="shadow">Shadow Magic</option>
                        <option value="time">Time Manipulation</option>
                      </Form.Select>
                    </Form.Group>

                    <Button 
                      variant="primary" 
                      size="lg" 
                      onClick={generateMagicItem} 
                      className="w-100"
                      disabled={isGeneratingMagicItem}
                    >
                      {isGeneratingMagicItem ? (
                        <>
                          <Spinner animation="border" size="sm" className="me-2" />
                          Generating Magic Item...
                        </>
                      ) : (
                        'Generate Magic Item'
                      )}
                    </Button>
                    
                    {isGeneratingMagicItem && (
                      <div className="mt-3">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <small className="text-muted">{magicItemLoadingText}</small>
                          <small className="text-muted">{magicItemProgress}%</small>
                        </div>
                        <ProgressBar 
                          now={magicItemProgress} 
                          variant="success"
                          animated
                          striped
                        />
                      </div>
                    )}
                    
                    {generatedMagicItem && (
                      <Button 
                        variant="outline-secondary" 
                        size="lg" 
                        onClick={resetMagicItem} 
                        className="w-100 mt-2"
                      >
                        Clear Item
                      </Button>
                    )}
                  </Form>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6}>
              {generatedMagicItem ? (
                <Card className="magic-item-result-card">
                  <Card.Header>
                    <h4>{generatedMagicItem.magicItem.name}</h4>
                    <div>
                      <Badge bg="info">{generatedMagicItem.magicItem.rarity}</Badge>
                      <Badge bg="secondary" className="ms-2">{generatedMagicItem.magicItem.type}</Badge>
                      {generatedMagicItem.magicItem.attunement && <Badge bg="warning" className="ms-2">Requires Attunement</Badge>}
                    </div>
                  </Card.Header>
                  <Card.Body>
                    {generatedMagicItem.imageUrl && (
                      <div className="magic-item-image-container mb-3">
                        <img 
                          src={generatedMagicItem.imageUrl} 
                          alt={generatedMagicItem.magicItem.name} 
                          className="img-fluid rounded magic-item-image"
                        />
                      </div>
                    )}
                    
                    <div className="magic-item-details">
                      <p><strong>Description:</strong> {generatedMagicItem.magicItem.description}</p>
                      <p><strong>Value:</strong> {generatedMagicItem.magicItem.value} gp</p>
                      
                      {generatedMagicItem.magicItem.properties && (
                        <div className="properties-section mb-3">
                          <h6>Properties:</h6>
                          <ul>
                            {generatedMagicItem.magicItem.properties.map((property, index) => (
                              <li key={index}>{property}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {generatedMagicItem.magicItem.lore && (
                        <div className="lore-section">
                          <h6>Lore:</h6>
                          <p className="font-italic">{generatedMagicItem.magicItem.lore}</p>
                        </div>
                      )}
                    </div>
                  </Card.Body>
                </Card>
              ) : (
                <Card className="generator-card">
                  <Card.Header>
                    <h4>Magic Item Preview</h4>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      <Col md={12}>
                        <h5>Item Types Available:</h5>
                        <ul className="item-types">
                          <li>Weapons & Armor</li>
                          <li>Wondrous Items</li>
                          <li>Rings & Amulets</li>
                          <li>Staffs & Wands</li>
                          <li>Potions & Oils</li>
                          <li>Scrolls & Tomes</li>
                        </ul>
                        
                        <h5>Features:</h5>
                        <ul>
                          <li>AI-generated artwork for each item</li>
                          <li>Rich lore and backstories</li>
                          <li>Balanced mechanics for D&D 5e</li>
                          <li>Multiple magic themes</li>
                          <li>Rarity-appropriate abilities</li>
                        </ul>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              )}
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="trinkets" title="Trinkets & Oddities">
          <Row>
            <Col md={12}>
              <Card className="generator-card">
                <Card.Header>
                  <h4>Weird Trinkets & Curiosities <Badge bg="info">Fun Extras</Badge></h4>
                </Card.Header>
                <Card.Body>
                  <p>Generate interesting, non-magical items that add flavor to your world:</p>
                  <Row>
                    <Col md={6}>
                      <ul>
                        <li>Ancient coins from lost civilizations</li>
                        <li>Mysterious keys with no obvious locks</li>
                        <li>Vials of glowing, harmless liquid</li>
                        <li>Carved bone dice that always roll sevens</li>
                        <li>Music boxes that play haunting melodies</li>
                        <li>Mirrors that show things slightly differently</li>
                      </ul>
                    </Col>
                    <Col md={6}>
                      <ul>
                        <li>Maps to places that may not exist</li>
                        <li>Letters written in unknown languages</li>
                        <li>Jewelry that changes color with weather</li>
                        <li>Stone tablets with partial prophecies</li>
                        <li>Clockwork toys that move on their own</li>
                        <li>Seeds that grow into unusual plants</li>
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

export default TreasureGenerator;