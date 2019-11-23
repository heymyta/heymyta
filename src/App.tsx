import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/header/Header';
import Login from './components/login/Login';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Login />
      </div>  
    );
  }
}

export default App;
