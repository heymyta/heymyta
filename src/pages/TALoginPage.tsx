import React, { useState } from 'react';
import {
  useHistory
} from 'react-router-dom';
import { Form, Button, Container, Row } from 'react-bootstrap';
import Header from '../components/header/Header';
import AuthService from '../services/auth-service';

interface LoginProps {
  auth : AuthService;
}

function TALoginPage(props: LoginProps) {  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  let history = useHistory();
  function validateForm() {
    return (username.length > 0 && password.length > 0);
  }

  async function handleSubmit(event: Event) {
    event.preventDefault();
    await props.auth.handleTaLogin(username, password)
          .then((res) => {
            console.log('res ta login', res);
            if(res.code == 0){
              history.push('/courses');
            }else{
              setMsg(res.msg);
            }
          });
  }

  return (
    <div>
      <Header auth={props.auth} />
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Form onSubmit={handleSubmit}>
            <Form.Label>Login</Form.Label>
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
            <Button variant="primary" disabled={!validateForm()} type="submit">
              Login
            </Button>
            <p style={{color:'red'}}>{msg}</p>
          </Form>
        </Row>
      </Container>
    </div>
  );
}

export default TALoginPage;