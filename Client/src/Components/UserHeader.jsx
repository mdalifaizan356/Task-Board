import React, { useState, useEffect, useContext } from "react";
// import { UserContext } from "../ContextProvider/UserContextProvider";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../Redux/Slices/UserSlice";
import { Navbar, Nav, Container, Row, Col, Offcanvas, Dropdown, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import calculateFreeDaysLeft from "/src/Utilities/calculateFreeDaysLeft.js";


const UserHeader = () => {
  const [show, setShow] = useState(false); 
  const navigate = useNavigate();
  // const { user } = useContext(UserContext); // Accessing user data from context
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.user);

  const createdDate = useSelector((state) => state.user.createdDate);
  if (!createdDate) return null; // No user logged in
  const freeDaysLeft = calculateFreeDaysLeft(createdDate);
  
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    dispatch(clearUser());
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
        <Container fluid>
          
          <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />
            <Navbar.Offcanvas
              id="offcanvasNavbar"
              aria-labelledby="offcanvasNavbarLabel"
              placement="start"
              show={show}
              onHide={handleClose}
            >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="mx-auto">
            <Nav className="justify-content-end flex-grow-1 pe-3" >
              <Dropdown as={Nav.Item}>
                <Dropdown.Toggle as={Nav.Link} variant="link" id="dropdown-custom-components">Account</Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/editprofile">Edit Profile</Dropdown.Item>
                    <Dropdown.Item as={Link} to="/changepass">Change Password</Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
              </Dropdown>

              <Dropdown as={Nav.Item}>
                <Dropdown.Toggle as={Nav.Link} variant="link" id="dropdown-custom-components">Task Board</Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item as={Link} to="/showboard">Your Board</Dropdown.Item>
                  </Dropdown.Menu>
              </Dropdown>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
        <Button>
        {freeDaysLeft > 0 ? (
           `${freeDaysLeft} days left`
      ) : (
          "Your free trial has ended."
      )}
        </Button>
        {/* <Navbar.Brand as={Link} to="/">Task<span style={{ color: "red" }}>Board</span></Navbar.Brand> */}
        <h4 style={{color:"red"}}>Welcome {name}</h4>
      </Container>
    </Navbar>
    </>
  );
};
export default UserHeader;
