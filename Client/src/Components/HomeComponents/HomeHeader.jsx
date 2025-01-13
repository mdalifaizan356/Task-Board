import React from "react";
import { Navbar, Container, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomeHeader = () => {
  return (
<Container fluid className='p-0 position-fixed top-0' style={{zIndex:"9999"}}>
      <Row>
        <Col>
          <Navbar bg="dark" variant="dark" expand="lg" className="p-2 d-flex justify-content-between">
          <Navbar.Brand as={Link} to="/">TaskBoard</Navbar.Brand>
          <Button as={Link} to="/signin" variant="primary">Log In</Button>
          </Navbar> 
        </Col>
      </Row>
    </Container>
  );
};

export default HomeHeader;
