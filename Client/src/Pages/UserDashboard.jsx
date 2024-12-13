import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Offcanvas } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';


const UserDashboard = () => {
  const [show, setShow] = useState(false); 
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    localStorage.removeItem("Token");
    navigate("/signin");
  };

  useEffect(() => {
    const token = localStorage.getItem("Token");

    if (token) {
      try {
        const decoded = jwtDecode(token); // Decode token
        const currentTime = Date.now(); // Current time in milliseconds

        if (decoded.exp * 1000 < currentTime) { // Check expiry
          // Token is expired
          localStorage.removeItem("Token");
          navigate("/signin");
        }
      } catch (error) {
        console.error("Invalid Token", error);
        localStorage.removeItem("token");
        navigate("/signin");
      }
    } else {
      // No token found
      navigate("/signin");
    }
  }, [navigate]);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand={false} sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Task<span style={{ color: "red" }}>Board</span>
          </Navbar.Brand>
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
                <Nav.Link as={Link} to="/taskboard">Manage Task</Nav.Link>
                <Nav.Link as={Link} to="/editprofile">Edit Profile</Nav.Link>
                <Nav.Link as={Link} to="/changepass">Change Password</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};

export default UserDashboard;
