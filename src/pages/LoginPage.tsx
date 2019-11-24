
import React, { Component } from 'react';
import Header from '../components/header/Header';
import Login from '../components/login/Login';

<<<<<<< HEAD
class LoginPage extends Component{
=======
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
>>>>>>> dat_branch
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