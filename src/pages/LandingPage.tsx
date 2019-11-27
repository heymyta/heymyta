
import React, { 
  useEffect
} from 'react';
import {
  useHistory,
} from 'react-router-dom';

import Header from '../components/header/Header';
import Footer from '../components/footer';
import AuthService from '../services/auth-service';
import { 
  Form, Button, 
  Container, Row 
} from 'react-bootstrap';


interface LandingPageProps {
  auth: AuthService
}

const LandingPage = (props:LandingPageProps) => {
  let history = useHistory();

  
  useEffect(() => {
    //redirect if already login
    if(props.auth.logedIn){
      history.push('/courses');
    }
  }, [history]);

  return (
    <div>
      <Header auth={props.auth} home={true} />
      <Container className="mt-5">
        <Row className="justify-content-md-center">
          <Button variant="secondary" disabled>
            TA/Professor get started
          </Button>
        </Row>
        <Row className="justify-content-md-center mt-3">
          <Button variant="success" onClick={() => {}} >Student get started</Button>
        </Row>
      </Container>

      <Footer />
    </div>
  );
};
export default LandingPage;