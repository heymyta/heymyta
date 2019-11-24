
import React, { Component } from 'react';
import Header from '../components/header/Header';
import Login from '../components/login/Login';
import AuthService  from '../services/auth-service';

class LoginPage extends Component{
  componentDidMount(){
    // let authService = new AuthService();
    // authService.me().then((res) => {
    //   console.log('whoami', res);
    // });
    // console.log('whoami', whoami); 
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