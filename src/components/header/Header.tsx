import React from 'react';
import { Container, Navbar } from 'react-bootstrap';

function Header() {
  return (
    <Container>
      <Navbar expand="xl" variant="dark" bg="dark">
        
        <Navbar.Brand href={""}>HeyMyTa</Navbar.Brand>
      </Navbar>
    </Container>
  );
}

export default Header;