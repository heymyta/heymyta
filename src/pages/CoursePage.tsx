
import React, { Component } from 'react';
import Header from '../components/header/Header';
import Login from '../components/login/Login';

class CoursePage extends Component{
    
    render() {
      const { courseId } = this.props.match.params; // course id
      return (
          <div>
              <Header />
              <div>Course ID: {courseId}</div>

          </div>
      );
    }
}

export default CoursePage;