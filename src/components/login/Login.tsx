import React, { Component } from 'react';
import { Form } from 'react-bootstrap';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }
  
  render() {
    return (
      <div>
        <Form></Form>
      </div>
    );
  }
}

export default Login;