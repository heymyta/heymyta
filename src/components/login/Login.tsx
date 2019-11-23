import React, { useState, Component } from 'react';
import { Form, Button, Container, Row } from 'react-bootstrap';


function Login() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };  
  
  return (
    <div>
      <Container>
        <Row className="justify-content-md-center">
          <Form>
            <Form.Label>Login</Form.Label>
            <Form.Group>
              <Form.Control type="email" placeholder="Email"></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Row>
      </Container>
    </div>
  );
  
}

export default Login;