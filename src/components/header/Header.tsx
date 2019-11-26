import React from 'react';
import { 
  Container, Navbar, Button, Nav
} from 'react-bootstrap';
import {
  Link
} from "react-router-dom";
import RegisterForm from './RegisterForm';

interface HeaderProps {
  home?: boolean;
}

function Header(props: HeaderProps) {
  return (
    <Navbar className="bg-light justify-content-between">
      <Container>
        <Navbar.Brand href="/">HeyMyTa</Navbar.Brand>
        <Nav>
          <Link className="btn btn-primary mr-3" to="/teacher/login" role="button">TA/Professor Login</Link>
          <Link className="btn btn-primary"  to="/student/login">Student login</Link>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;