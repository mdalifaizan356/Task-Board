import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="p-3">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">TaskBoard</Navbar.Brand>

        <Button as={Link} to="/signup" variant="primary">Signup </Button>
      </Container>
    </Navbar>
  );
};

export default Header;
