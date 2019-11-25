import React, { useState, useEffect } from 'react';
import {
  Redirect,
  Route
} from 'react-router-dom';
import Redirecting from './Redirecting';

/**
 * ProtectedRoute can be access by any user(TA/student) that is logedIn
 */
const ProtectedRoute = ({component: Component, ...props}) => {
  let [isAuth, setIsAuth] = useState();
  let [redirect, setRedirect] = useState(false);
  console.log('props.auth', props.auth);
  
  useEffect(() => {
      props.auth.whoami().then((res) => {
        setIsAuth(props.auth.logedIn);
        if(isAuth === false){
          setRedirect(true);
        }
      });
  });
  
  //if redirect -> redirect. else . 
  //if auth -> render() else redirecting
  return (
    <Route {...props} render={(props) => (
      (
      redirect === true
        ? <Redirect to='/' />
        :(isAuth === true 
          ? <Component {...props} />
          : <Redirecting />)
      )
    )} />
  );
}


export default ProtectedRoute;