import React, { useState } from 'react';
import { Form, Button, Container, Row } from 'react-bootstrap';
import AuthService from '../services/auth-service';
import {
  useHistory
} from 'react-router-dom';
const LOGIN_ENDPOINT = `/teacher/login`

interface LoginProps {
  auth : AuthService;
}

function TaRegistrationPage(props: LoginProps) {  
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [msg, setMsg] = useState('');
  const history = useHistory();
  
  function validateForm() {
    return name.length > 0 && (password === confirmedPassword) && username.length > 0 && password.length > 0;
  }

  function handleSubmit(event: Event) {
    event.preventDefault();
    props.auth.handleTaRegister({
      name: name,
      username: username, 
      password: password
    }).then(async (res) => {
      console.log('res', res);
      if (res.code == 0){
        setMsg('great');
        await props.auth.handleLogout();
        await props.auth.handleTaLogin(username, password);
        history.push('/courses');
        return res;
      } else{
        setMsg(res.msg);
        return res;
      }
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
            <p style={{color:'red'}}>{msg}</p>
            <Form.Control.Feedback type="valid">You did it!</Form.Control.Feedback>
          </Form>
        </Row>
      </Container>
    </div>
  );
}

export default TaRegistrationPage;