import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import { useState } from 'react';
import {useNavigate} from "react-router-dom";
import axios from "axios"
function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const res=await axios.post("https://urlshortner-back-h2lv.onrender.com/register",{userName:name,userEmail:email,Password:password});
        if(res.status===201){
            alert(res.data.message)
            navigate("/login")
        }
        else if(res.status===400){
            alert(res.data.message);
        }
    }catch(err){
        alert(err.message);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center min-vh-100">
      <Card className="p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">Register</h2>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button variant="success" type="submit" className="w-100">
            Register
          </Button>
        </Form>
      </Card>
    </Container>
  );
}

export default Register;
