import React, { useState } from "react";
import { Navbar, Nav, Container, Offcanvas } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand={false} sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/">Task<span style={{color:"red"}}>Board</span></Navbar.Brand>
            <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />
            <Navbar.Offcanvas
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
              placement="end"
              show={show}
              onHide={handleClose}
            >
            <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="justify-content-end flex-grow-1 pe-3" onClick={handleClose}>
            <Nav.Link as={Link} to="#">Manage Task</Nav.Link>
            <Nav.Link as={Link} to="#">Edit Profile</Nav.Link>
            <Nav.Link as={Link} to="#">Change Password</Nav.Link>
            <Nav.Link as={Link} to="#">Logout</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
      </Navbar>
    </>
  );
};

export default UserDashboard;

