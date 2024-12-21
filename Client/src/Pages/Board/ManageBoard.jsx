import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Navbar, Nav, Offcanvas, Modal, Form } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import UserHeader from "../../Components/UserHeader";

const ManageBoard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { boardData, userId } = location.state; 
  const bgcolor = boardData.boardColor;

  const [showModal, setShowModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [newList, setNewList] = useState({ id: "", name: ""});
  // const [boardData, setBoardData] = useState([]);
     
     
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const handleOffcanvasClose = () => setShowOffcanvas(false);
  const handleOffcanvasShow = () => setShowOffcanvas(true);

  const handleSubmit = ()=>{

  } 
  
  return (
  <>
  <UserHeader />
  <Navbar variant="dark" expand={false} sticky="top" className="py-1" style={{ height: "40px", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "end", backgroundColor: bgcolor, }} >
    <h5>{boardData.boardName}</h5>
    <Button onClick={() => setShowModal(true)} style={{ fontSize: "14px", padding: "5px 15px", marginLeft: "10px", backgroundColor: bgcolor, border: "none", }} > Create List </Button>
    <Button className="navbar-toggler" onClick={handleOffcanvasShow} aria-label="Toggle navigation" style={{ background: "transparent", border: "none", fontSize: "20px", color: "white", marginRight: "10px", display: "flex", alignItems: "center" }}>&#x2022;&#x2022;&#x2022; </Button>
    <Navbar.Offcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="end" show={showOffcanvas} onHide={handleOffcanvasClose} style={{ marginTop: "95px", backgroundColor: bgcolor, width:"20%" }} >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title id="offcanvasNavbarLabel">Board Menu</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav className="flex-column text-center">
          <Nav.Link as={Link} to="/" style={{ border: "none", background: "none", padding: "0", color:"white" }}>About This Board</Nav.Link>
          <Nav.Link as="button" style={{ border: "none", background: "none", padding: "0", color:"white" }}>Delete Board </Nav.Link>
          <Nav.Link as="button" style={{ border: "none", background: "none", padding: "0", color:"white" }}>Edit Board </Nav.Link>
        </Nav>
      </Offcanvas.Body>
    </Navbar.Offcanvas>
  </Navbar>

  <Container className="my-4">
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header closeButton>
        <Modal.Title>Create New List</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>List Id</Form.Label>
            <Form.Control type="text" placeholder="Enter unique ID for the board" value={newList.id || ""} onChange={(e) => handleInputChange("id", e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>List Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name for the board" value={newList.name || ""} onChange={(e) => handleInputChange("name", e.target.value)} />
          </Form.Group>
          <Button variant="success" type="submit" className="w-100">Create List</Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
      </Modal.Footer>
    </Modal>
  </Container>


  <Container
  fluid
  className="d-flex"
  style={{
    overflowX: "auto",
    whiteSpace: "nowrap", // Ensure buttons are on a single row
    scrollbarWidth: "none", // Hide scrollbar (Firefox only)
  }}
>
  {Array.from({ length: 20 }).map((_, index) => (
    <Button
      key={index}
      onClick={() => setShowModal(true)}
      style={{
        fontSize: "14px",
        padding: "5px 15px",
        margin: "10px",
        backgroundColor: bgcolor,
        border: "none",
        flexShrink: 0, // Prevent button shrinking
      }}
    >
      Create List {index + 1}
    </Button>
  ))}
</Container>

</>
  );
};

export default ManageBoard;
