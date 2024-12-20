import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Navbar, Nav, Offcanvas} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import UserHeader from "../../Components/UserHeader";

const ManageBoard = () => {
  const location = useLocation();
  const { boardData, userId } = location.state;
  console.log(boardData);
  const bgcolor = boardData.boardColor;
  console.log(bgcolor);

  const [showModel, setShowModal] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const handleOffcanvasClose = () => setShowOffcanvas(false);
  const handleOffcanvasShow = () => setShowOffcanvas(true);

  return (
    <>
      <UserHeader />
        <Navbar variant="dark" expand={false} sticky="top" className="py-1" style={{ height: "40px", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "end", backgroundColor: bgcolor}} >
            <h5>{boardData.boardName}</h5>
            <Button onClick={() => setShowModal(true)} style={{ fontSize: "14px", padding: "5px 15px", marginLeft: "10px", backgroundColor: bgcolor, border:"none" }}>Create List</Button>

            <Button className="navbar-toggler" onClick={handleOffcanvasShow} aria-label="Toggle navigation" style={{ background: "transparent", border: "none", fontSize: "20px",  color: "white", marginRight: "10px", display: "flex", alignItems: "center", }}>&#x2022;&#x2022;&#x2022;</Button>

            <Navbar.Offcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="end" show={showOffcanvas} onHide={handleOffcanvasClose} style={{marginTop:"95px", backgroundColor:bgcolor}} >
            
            <Offcanvas.Header closeButton>
                <Offcanvas.Title id="offcanvasNavbarLabel">Board Menu</Offcanvas.Title>
              </Offcanvas.Header>

            <Offcanvas.Body>
                <Nav className="flex-column text-center">
                    <Nav.Link as={Link} to="/" className="text-dark">About This Board</Nav.Link>
                    <Nav.Link as={Link} to="/manageboard" className="text-dark">Settings</Nav.Link>
                </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Navbar>
      <Container className="my-4">
        
      </Container>
    </>
  );
};

export default ManageBoard;
