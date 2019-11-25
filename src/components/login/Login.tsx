import React, { useState } from 'react';
import { Form, Button, Container, Row } from 'react-bootstrap';

const LOGIN_ENDPOINT = `${process.env.SERVER_API_ENDPOINT}/api/teacher/login`

interface LoginProps {
  isStudent: boolean,
}

function Login(props: LoginProps) {  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  function validateForm() {
    return (email.length > 0 && password.length > 0) || (props.isStudent && email.length > 0);
  }

  function handleSubmit(event: Event) {
    event.preventDefault();
    fetch(LOGIN_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({'username': email, 'password': password})
    })
    .then((result) => result)
  }

  return (
    <div>
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Form onSubmit={handleSubmit}>
            <Form.Label>Login</Form.Label>
            <Form.Group controlId="formLoginUsername">
              <Form.Control 
                autoFocus
                type="email" 
                placeholder="Email"
                value={email}
                onChange={email => setEmail(email.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formLoginPassword">
              <Form.Control 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={password => setPassword(password.target.value)}
              />
            </Form.Group>
            <Button variant="primary" disabled={!validateForm()} type="submit">
              Login
            </Button>
            <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback>
          </Form>
        </Row>
      </Container>
    </div>
  );
}

export default Login;