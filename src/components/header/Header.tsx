import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

function Header() {
  return (
    <Container>
      <Navbar expand="lg" variant="light" bg="dark">
        <Navbar.Brand href="#">Navbar</Navbar.Brand>
      </Navbar>
    </Container>
  );
}

export default Header;