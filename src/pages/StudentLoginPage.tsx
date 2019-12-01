import React, { useState } from 'react';
import { 
  Form, Button, 
  Container, Row 
} from 'react-bootstrap';
import {
  useHistory
} from 'react-router-dom';

import Header from '../components/header/Header';
import AuthService from '../services/auth-service';
interface LoginProps {
  auth? : AuthService;
}

function StudentLoginPage(props: LoginProps) {  
  const [name, setName] = useState('');
  const [msg, setMsg] = useState('');
  const history = useHistory();

  function validateForm() {
    return (name.length > 0);
  }

  async function handleSubmit(event: Event) {
    event.preventDefault();
    await props.auth.handleStudentLogin(name)
          .then((res) => {
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
            <p style={{color:'red'}}>{msg}</p>
          </Form>
        </Row>
      </Container>
    </div>
  );
}

export default StudentLoginPage;