import React, { useState, useEffect } from 'react';
import {
  Redirect,
  Route
} from 'react-router-dom';

const ProtectedRoute = ({component: Component, ...props}) => {
  let [isAuth, setIsAuth] = useState();
  
  useEffect(() => {
      props.auth.whoami().then((res) => {
        this.setState(props.auth.logedIn);
      });
  });
  
  return (
    <Route {...props} render={(props) => (
      isAuth === true 
        ? <Component {...props} />
        : <Redirect to='/' />
    )} />
  );
}


export default ProtectedRoute;