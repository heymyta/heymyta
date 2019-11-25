
import React, { Component } from 'react';
import Header from '../components/header/Header';
import Login from '../components/login/Login';
import Footer from '../components/footer';
import AuthService from '../services/auth-service';

interface MyProps {
  auth: AuthService
}
  
interface MyState {
  courses: Array<any>,
}

class LoginPage extends Component<MyProps, MyState>{
  constructor(props){
    super(props);
  }
  componentDidMount(){
  }
  render() {
    return (
      <div>
        <Header home={true} />
        <Login isStudent={false} />
        <Footer />
      </div>
    );
  }
}

export default LoginPage;