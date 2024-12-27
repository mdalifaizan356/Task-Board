import React from "react";
import { Navbar, Container, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
  return (
      <Row>
        <Col>
        <Navbar bg="dark" variant="dark" expand="lg" className="p-2">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">TaskBoard</Navbar.Brand>

        <Button as={Link} to="/signup" variant="primary">Signup </Button>
      </Container>
    </Navbar>
        </Col>
      </Row>
  );
};

export default Header;
