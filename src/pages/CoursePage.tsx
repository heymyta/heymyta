
import React, { Component, useEffect } from 'react';
import {
  useHistory
} from 'react-router-dom';
import Header from '../components/header/Header';
import Courses from '../components/courses/Courses';

import AuthService from '../services/auth-service';
import httpService from '../services/http-service';
import {toast} from 'react-toastify';

interface MyProps {
  auth: AuthService,
  match?: any;
}
  
interface MyState {
}

function CoursePage(props: MyProps, state: MyState){
  let history = useHistory();
  
  let joinQueueAsTeacher = () => {
    httpService.post(`/queue/teacher/${props.match.params.courseId}/join`, {})
      .then((res) => {
        if(res.code == 403){
          toast.error(res.msg);
          history.push('/');
          console.log('res', res);
        }
      });
  }
  if(props.auth.logedIn && props.auth.userType == 'ta') joinQueueAsTeacher();

  useEffect(() => {
  });
  

  return (
    <div>
      <Header auth={props.auth}/>
      <Courses auth={props.auth} courseId={props.match.params.courseId}/>
    </div>
  )
}

export default CoursePage;