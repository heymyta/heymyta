import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';

import AuthService from './services/auth-service';

let authService = new AuthService();


const renderApp = preloadedState => {
  ReactDOM.render(
    <App auth={authService}/>,
    document.getElementById("root")
  );
};

//configure auth before render app :))
(async () => renderApp(await authService.whoami()))();
