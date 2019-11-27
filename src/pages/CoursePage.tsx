
import React, { Component } from 'react';
import Header from '../components/header/Header';
import Courses from '../components/courses/Courses';

import AuthService from '../services/auth-service';
interface MyProps {
  auth: AuthService,
}
  
interface MyState {
}

class CoursePage extends Component<MyProps, MyState>{
   
  render() {
    return (
      <div>
        <Header auth={this.props.auth}/>
        <Courses />
      </div>
    );
  }
}

export default CoursePage;