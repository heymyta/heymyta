
import React, { Component } from 'react';
import Header from '../components/header/Header';
import Login from '../components/login/Login';
import { UserType, authService}

class LoginPage extends Component{
  componentDidMount(){
    this.getCourses();
  }
  render() {
    return (
      <div>
        <Header home={true} />
        <Login isStudent={false} />
      </div>
    );
  }
}

export default LoginPage;