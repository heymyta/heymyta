import React from 'react';
import { 
  Container, Navbar, Button, OverlayTrigger
} from 'react-bootstrap';
import RegisterForm from './RegisterForm';

interface HeaderProps {
  home?: boolean;
}

function Header(props: HeaderProps) {
  return (
    <Navbar className="bg-light justify-content-between">
      <Container>
        <Navbar.Brand href="/">HeyMyTa</Navbar.Brand>
      </Container>
      { props.home &&  (
        <OverlayTrigger trigger="click" placement="left" overlay={RegisterForm}>
          <Button>Register</Button>
        </OverlayTrigger>
      )}
    </Navbar>
  );
}

export default Header;