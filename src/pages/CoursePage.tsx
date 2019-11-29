
import React, { Component } from 'react';
import Header from '../components/header/Header';
import Courses from '../components/courses/Courses';

import AuthService from '../services/auth-service';
interface MyProps {
  auth: AuthService,
  match;
}
  
interface MyState {
}

class CoursePage extends Component<MyProps, MyState>{
   
  render() {
    console.log('props', this.props);
    return (
      <div>
        <Header auth={this.props.auth}/>
        <Courses courseId={this.props.match.params.courseId}/>
      </div>
    );
  }
}

export default CoursePage;