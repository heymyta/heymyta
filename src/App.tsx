import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {
  Route, 
  Switch, BrowserRouter,
  useHistory
} from 'react-router-dom';

import ProtectedRoute from './components/route/ProtectedRoute';
import AuthService from './services/auth-service';
import LandingPage from './pages/LandingPage';
import CoursesPage from './pages/CoursesPage';
import CoursePage from './pages/CoursePage';
import TALoginPage from './pages/TALoginPage';
import StudentLoginPage from './pages/StudentLoginPage';
import TaRegistrationPage from './pages/TaRegistrationPage';


class App extends Component {
  authService;
  constructor(props){
    super(props);
    this.authService = new AuthService();
  }

  async fakeAuth(){
    // await this.authService.fakeTARegister('test', 'test@test.com', 'test');
    // let auth =  await this.authService.fakeTAAuth('test', 'test');
    // return auth;
  }

  componentDidMount(){
    let that = this;
    console.log('fakeauth');
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
          <LandingPage auth={this.authService}/>
        }/>

        <Route exact path='/teacher/login' 
          component={() => 
          <TALoginPage />
        }/>

        <Route path='/teacher/register/fall2019ta'
          component={() =>
            <TaRegistrationPage />
        }/>

        <Route exact path='/student/login' 
          component={() => 
          <StudentLoginPage />
        }/>

        <Route exact path='/courses/' 
          component={() => 
          <CoursesPage auth={this.authService}/>
        }/>
          <ProtectedRoute path='/courses/:courseId' 
            auth={this.authService}
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
