import React, { useState } from 'react';
import { Form, Button, Container, Row } from 'react-bootstrap';
import httpService from '../services/http-service';

const LOGIN_ENDPOINT = `/teacher/login`

interface LoginProps {
}

function TaRegistrationPage(props: LoginProps) {  
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');

  function validateForm() {
    return (username.length > 0 && password.length > 0);
  }

  function handleSubmit(event: Event) {
    event.preventDefault();
    httpService.post(LOGIN_ENDPOINT, {
        name: name,
        username: username, 
        password: password,
        invite_code: 'fall2019ta'
    }, (res) => {
        console.log('res', res);
    });
  }

  return (
    <div>
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Form onSubmit={handleSubmit}>

            <Form.Label>Register</Form.Label>
            <Form.Group controlId="formLoginName">
              <Form.Control 
                autoFocus
                type="text" 
                placeholder="Name"
                value={name}
                onChange={name => setName(name.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formLoginUsername">
              <Form.Control 
                autoFocus
                type="username" 
                placeholder="username"
                value={username}
                onChange={username => setUsername(username.target.value)}
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
            <Form.Group controlId="formLoginConfirmedPassword">
              <Form.Control 
                type="password" 
                placeholder="Cornfirm password" 
                value={confirmedPassword}
                onChange={confirmedPassword => setConfirmedPassword(confirmedPassword.target.value)}
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

export default TaRegistrationPage;