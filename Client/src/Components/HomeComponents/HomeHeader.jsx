import React from "react";
import { Navbar, Container, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg==" crossorigin="anonymous" referrerpolicy="no-referrer" />

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
