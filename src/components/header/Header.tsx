import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

function Header() {
  return (
    <Container>
      <Navbar expand="xl" variant="light" bg="bg-red">
        <Navbar.Brand href="#">Navbar</Navbar.Brand>
      </Navbar>
    </Container>
  );
}

export default Header;