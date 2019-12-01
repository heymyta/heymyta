import React, { useEffect, useState } from 'react';
import { 
  Container, Navbar, Button, Nav
} from 'react-bootstrap';
import {
  Link, useLocation,
  useHistory,
} from "react-router-dom";
import AuthService from '../../services/auth-service';

interface HeaderProps {
  home?: boolean;
  auth : AuthService;
}

function Header(props: HeaderProps) {
  let location = useLocation();
  let history = useHistory();
  const [state, setState] = useState({
    userType: props.auth.userType == 'ta' ? 'Teacher: ' : 'Student:',
    username: props.auth.userInfo['username']
  });
  let onLogout = () => {
    props.auth.handleLogout()
    .then((res) => {
      history.push('/');
      return res;
    });
  };

  useEffect(() => {
    setState({
      userType: props.auth.userType == 'ta' ? 'Teacher: ' : 'Student:',
      username: props.auth.userInfo['username']
    })
  }, [props.auth.logedIn, props.auth.userType]);
  let UserAction = () => (props.auth && props.auth.logedIn) ? (
    <Nav>
      <span className="navbar-text">
        {state.userType + ' ' + state.username}
      </span>
      <Button variant="btn-primary" onClick={onLogout}>
        Log out
      </Button>
    </Nav>
    ):(
    <Nav>
      <Link className="btn btn-primary mt-3 btn-home" to="/teacher/login" role="button">TA/Professor Login</Link>
      <Link className="btn btn-primary mt-3 btn-home"  to="/student/login">Student login</Link>
    </Nav>
    );
  return (
    <Navbar className="bg-light justify-content-between">
      <Container fluid>
        <Navbar.Brand href="/">HeyMyTa</Navbar.Brand>
        <UserAction />
      </Container>
    </Navbar>
  );
}

export default Header;