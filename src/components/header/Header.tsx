import React from 'react';
import { Container, Navbar } from 'reactstrap';

function Header() {
  return (
      <Navbar variant="dark" bg="dark">
        <Container>
          <Navbar.Brand href="#">HeyMyTa</Navbar.Brand>
        </Container>
      </Navbar>
  );
}

export default Header;