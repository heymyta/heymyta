import React, { useState, useEffect } from 'react';
import {
  Redirect,
  Route
} from 'react-router-dom';

const ProtectedRoute = ({component: Component, ...props}) => {
  let [isAuth, setIsAuth] = useState();
  
  console.log('props.auth', props.auth);
  
  useEffect(() => {
      props.auth.whoami().then((res) => {
        console.log('after whoami', res);
        setIsAuth(props.auth.logedIn);
        console.log('isAuth', isAuth);
      });
  });
  
  return (
    <Route {...props} render={(props) => (
      isAuth == true 
        ? <Component {...props} />
        : <Redirect to='/' />
    )} />
  );
}


export default ProtectedRoute;