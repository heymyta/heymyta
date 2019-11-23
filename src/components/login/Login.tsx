import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

interface LoginProps {
  
}

interface LoginState {
  
}

class Login extends Component<LoginProps, LoginState> {
  constructor(props: LoginProps) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }
  
  render() {
    return (
      <div>
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
      </div>
    );
  }
}

export default Login;