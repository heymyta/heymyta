
import React, { Component, useEffect } from 'react';
import {
  useHistory
} from 'react-router-dom';
import Header from '../components/header/Header';
import Courses from '../components/courses/Courses';

import AuthService from '../services/auth-service';
import httpService from '../services/http-service';

interface MyProps {
  auth: AuthService,
  match;
}
  
interface MyState {
}

function CoursePage(props: MyProps, state: MyState){
  let history = useHistory();
  
  let joinQueueAsTeacher = () => {
    httpService.post(`/queue/teacher/${props.match.params.courseId}/join`, {})
      .then((res) => {
        if(res.code == 403){
          history.push('/');
          console.log('res', res);
        }
      });
  }
  joinQueueAsTeacher();

  useEffect(() => {
  });
  

  return (
    <div>
      <Header auth={props.auth}/>
      <Courses courseId={props.match.params.courseId}/>
    </div>
  )
}

export default CoursePage;