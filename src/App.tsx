import React, { 
  useEffect, useState
} from 'react';

//global css
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import {
  Route, 
  Switch, BrowserRouter
} from 'react-router-dom';

import ProtectedRoute from './components/route/ProtectedRoute';
import AuthService from './services/auth-service';
import LandingPage from './pages/LandingPage';
import CoursesPage from './pages/CoursesPage';
import CoursePage from './pages/CoursePage';
import TALoginPage from './pages/TALoginPage';
import StudentLoginPage from './pages/StudentLoginPage';
import TaRegistrationPage from './pages/TaRegistrationPage';

interface Props{
  auth : AuthService;
}
const App = (props) => {


  const AllRoute = () => (
    <div>
      <Route exact path='/' 
        component={() => 
        <LandingPage auth={props.auth}/>
      }/>

      <Route exact path='/teacher/login' 
        component={() => 
        <TALoginPage auth={props.auth}/>
      }/>

      <Route path='/teacher/register/fall2019ta'
        component={() =>
          <TaRegistrationPage auth={props.auth}/>
      }/>

      <Route exact path='/student/login' 
        component={() => 
        <StudentLoginPage auth={props.auth}/>
      }/>

      <Route exact path='/courses/' 
        auth={props.auth}
        component={() => 
        <CoursesPage auth={props.auth}/>
      }/>
        <ProtectedRoute path='/courses/:courseId' 
          auth={props.auth}
          component={(props) => 
          <CoursePage auth={props.auth} {...props}/> 
        }/>
    </div>
  );
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <AllRoute/>
        </Switch>
      </BrowserRouter>
    </div>  
  );
}

export default App;
