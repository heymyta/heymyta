
import React, { Component } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer';
import AuthService from '../services/auth-service';
import { 
  Form, Button, 
  Container, Row 
} from 'react-bootstrap';


interface MyProps {
  auth: AuthService
}
  
interface MyState {
  courses: Array<any>,
}

class LoginPage extends Component<MyProps, MyState>{
  constructor(props){
    super(props);
  }
  componentDidMount(){
  }
  render() {
    return (
      <div>
        <Header home={true} />

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
  }
}

export default LoginPage;