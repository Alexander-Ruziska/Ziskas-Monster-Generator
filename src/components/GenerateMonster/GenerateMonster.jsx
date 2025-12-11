import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoadingPage from '../LoadingPage/LoadingPage';
import "./GenerateMonster.css"; 
function GenerateMonster() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    challengeRating: '',
    acRequirements: '',
    environment: '',
    resistances: '',
    creatureType: ''
  });
  const [loading, setLoading] = useState(false);
  const [generationStep, setGenerationStep] = useState(0);
  const [stepMessage, setStepMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const monsterData = {
      name: form.name,
      challenge_rating: form.challengeRating,
      armor_class: form.acRequirements,
      environment: form.environment,
      resistances: form.resistances,
      type: form.creatureType
    };

    setLoading(true);
    setGenerationStep(0);
    
    try {
      // Step 1: Start generation
      setGenerationStep(1);
      setStepMessage("📝 Consulting ancient tomes and bestiaries...");
      await new Promise(resolve => setTimeout(resolve, 800));

      // Step 2: Generate monster stats with OpenAI
      setGenerationStep(2);
      setStepMessage("🧬 Weaving creature essence and magical properties...");
      const { data: newMonster } = await axios.post('/api/monster/generate-stats', monsterData);
      
      // Step 3: Generate image
      setGenerationStep(3);
      setStepMessage("🎨 Manifesting physical form and appearance...");
      await axios.post('/api/monster/generate-image', { monsterId: newMonster.id });
      
      // Step 4: Finalize
      setGenerationStep(4);
      setStepMessage("✨ Final arcane binding and creature awakening...");
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Navigate to the newly created monster's view using its id
      navigate(`/monster/${newMonster.id}`);
    } catch (error) {
      console.error("Error creating monster:", error);
    } finally {
      setLoading(false);
      setGenerationStep(0);
      setStepMessage('');
    }
  };

  if (loading) {
    return <LoadingPage currentStep={generationStep} stepMessage={stepMessage} totalSteps={4} />;
  }

  return (
    <div>
      <form style={{ gap: '20px' }} className="input-form" onSubmit={handleSubmit}>
      <h1>Generate a Monster!</h1>
      <h2 className="col-sm-4" >Fill in any desired fields and click "Generate Monster" to create a brand new monster.  If you're feeling lucky, leave all the fields blank and see what happens!</h2>
      <div className="col-sm-3">
        <label style={{ color: 'white' }} htmlFor="monster-name"><strong>Monster Name:</strong></label>
        <input className="form-control" name="name" placeholder="Monster Name" onChange={handleChange} value={form.name}/>
        <label style={{ color: 'white' }} htmlFor="challenge-rating"><strong>Challenge Rating:</strong></label>
        <input className="form-control" name="challengeRating" placeholder="Challenge Rating" onChange={handleChange} value={form.challengeRating}/>
        <label style={{ color: 'white' }} htmlFor="armor-class"><strong>Armor Class:</strong></label>
        <input className="form-control" name="acRequirements" placeholder="Armor Class" onChange={handleChange} value={form.acRequirements}/>
        <label style={{ color: 'white' }} htmlFor="environment"><strong>Environment:</strong></label>
        <input className="form-control" name="environment" placeholder="Environment" onChange={handleChange} value={form.environment}/>
        <label style={{ color: 'white' }} htmlFor="resistances"><strong>Resistances:</strong></label>
        <input className="form-control" name="resistances" placeholder="Resistances" onChange={handleChange} value={form.resistances}/>
        <label style={{ color: 'white' }} htmlFor="creature-type"><strong>Creature Type:</strong></label>
        <input className="form-control" name="creatureType" placeholder="Creature Type" onChange={handleChange} value={form.creatureType}/>
        </div>
        <button className="btn btn-dark mt-1" type="submit">Generate Monster</button>
        <button className="btn btn-dark mt-1" type="button" onClick={() => navigate('/library')}>
          Go to Library
        </button>
      </form>
    </div>
  );
}


export default GenerateMonster;
