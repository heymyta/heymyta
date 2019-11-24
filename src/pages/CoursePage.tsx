
import React, { Component } from 'react';
import Header from '../components/header/Header';
import Courses from '../components/courses/Courses';

class CoursePage extends Component{
   
  render() {
    return (
      <div>
        <Header />
        <Courses />
      </div>
    );
  }
}

export default CoursePage;