import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Card, Button, InputGroup } from "react-bootstrap";
import "./Landing.css"; 

function Landing() {
  const navigate = useNavigate();

  return (
    <form className="input-form" >
      <h1 style={{ marginTop: '120px' }}>Welcome to FableSpire</h1>
      <Card>
                  <Card.Img style={{ maxWidth: '300px', height: 'auto' }} variant="top" src="/Images/b1713295-2de8-450b-bfbf-12d53ec11d23.webp"/>
                  </Card>
      <button className="btn btn-dark mt-3" onClick={() => navigate('/generate-monster')}>Create a New Monster</button>
      {/* <button className="btn btn-dark mt-3" onClick={() => navigate('/create-campaign')}>Create a Campaign</button> */}
      <Card>
                  <Card.Img style={{ maxWidth: '300px', height: 'auto' }} variant="top" src="/Images/f40f7f8c-acc0-48d7-84d2-85db448634bd.webp"/>
                  </Card>
      <button className="btn btn-dark mt-3" onClick={() => navigate('/library')}>Go to Your Library</button>
    </form>
  );
}

export default Landing;
