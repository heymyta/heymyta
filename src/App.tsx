import React, { Component } from 'react';
import './App.css';
import './bootstrap/dist/css/bootstrap.min.css';
import {
  Route, Link,
  Switch, BrowserRouter
} from 'react-router-dom';

import LoginPage from './pages/LoginPage';


class App extends Component {
  render() {
    const App = () => (
      <div>
        <Route exact path='/' component={LoginPage}/>
        
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
