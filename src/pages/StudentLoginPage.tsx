import React, { useState } from 'react';
import { Form, Button, Container, Row } from 'react-bootstrap';
import httpService from '../services/http-service';

const LOGIN_ENDPOINT = `/student/login`

interface LoginProps {
}

function StudentLoginPage(props: LoginProps) {  
  const [name, setName] = useState('');


  function validateForm() {
    return (name.length > 0);
  }

  function handleSubmit(event: Event) {
    event.preventDefault();
    httpService.post(LOGIN_ENDPOINT, {
        name: name,
    }, (res) => {
        LoginProps.history.push('/');
    });
  }

  return (
    <div>
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Form onSubmit={handleSubmit}>
            <Form.Label>Login</Form.Label>
            <Form.Group controlId="formLoginname">
              <Form.Control 
                autoFocus
                type="name" 
                placeholder="name"
                value={name}
                onChange={name => setName(name.target.value)}
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

export default StudentLoginPage;