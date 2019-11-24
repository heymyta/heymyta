import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {
  Route, Link,
  Switch, BrowserRouter
} from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import CoursesPage from './pages/CoursesPage';


class App extends Component {
  render() {
    const App = () => (
      <div>
        <Route exact path='/' component={LoginPage}/>
        
        <Route exact path='/courses/' component={CoursesPage}/>
      </div>
    );
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <App/>
          </Switch>
        </BrowserRouter>

      </div>  
    );
  }
}

export default App;
