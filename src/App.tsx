import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {
  Route, 
  Switch, BrowserRouter
} from 'react-router-dom';

import ProtectedRoute from './components/route/ProtectedRoute';
import AuthService from './services/auth-service';
import LoginPage from './pages/LoginPage';
import CoursesPage from './pages/CoursesPage';
import CoursePage from './pages/CoursePage';


class App extends Component {
  authService;
  constructor(props){
    super(props);
    this.authService = new AuthService();
  }

  async fakeAuth(){
    // await this.authService.fakeTARegister('test', 'test@test.com', 'test');
    return this.authService.fakeTAAuth('test', 'test');
  }

  componentDidMount(){
    let that = this;
    this.fakeAuth().then((res) => {
      console.log('fakeAuth res', res)
      that.authService.whoami().then((res) => {
        console.log("whoami", res);
        console.log('logined', that.authService.logedIn);
      });
    })

  }

  render() {
    const App = () => (
      <div>
        <Route exact path='/' 
          component={() => 
          <LoginPage auth={this.authService}/>
        }/>
        <Route exact path='/courses/' 
          component={() => 
          <CoursesPage auth={this.authService}/>
        }/>
          <ProtectedRoute path='/courses/:courseId' 
            component={() => 
            <CoursePage auth={this.authService} /> 
          }/>
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
