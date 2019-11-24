import React, { useState, useEffect } from 'react';
import {
  Redirect,
  Route
} from 'react-router-dom';
import Redirecting from './Redirecting';

const ProtectedRoute = ({component: Component, ...props}) => {
  let [isAuth, setIsAuth] = useState();
  
  console.log('props.auth', props.auth);
  
  useEffect(() => {
      props.auth.whoami().then((res) => {
        console.log('after whoami', res);
        console.log('set', props.auth.logedIn);
        setIsAuth(props.auth.logedIn);
        console.log('isAuth', isAuth);
      });
  });
  console.log('before render isAuth', isAuth);
  return (
    <Route {...props} render={(props) => (
      isAuth == true 
        ? <Component {...props} />
        : <Redirecting />
    )} />
  );
}


export default ProtectedRoute;