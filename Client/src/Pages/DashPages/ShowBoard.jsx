import React, { useState, useEffect, useContext } from "react";
// import { UserContext } from "../../ContextProvider/UserContextProvider";
import axios from "axios";
import { useSelector } from "react-redux";
import { Button, Form, Modal, Card, Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const ShowBoard = () => {
  const [showModal, setShowModal] = useState(false);
  const [newBoard, setNewBoard] = useState({ name: "", color: "#E84711" });
  const [boardData, setBoardData] = useState([]);

  const user = useSelector(state=>state.user)
  // const { user } = useContext(UserContext);
  const userId = user ? user.id : null;
  // console.log(userId);

  const navigate = useNavigate();

  // Fetch boards from database
  const fetchBoardData = async () => { 
    try {
      if (!userId) return;
      const response = await axios.get(
        `http://${window.location.hostname}:6080/newboard/showBoard/${userId}`
      );
      if (response.data.boards) {
        setBoardData(response.data.boards);
      } else {
        setBoardData([]);
      }
    } catch (error) {
      console.error("Error fetching board data:", error);
      setBoardData([]);
    }
  };

  // Add new board to database
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newBoard.name.trim() === "" || newBoard.color.trim() === "") {
      alert("Please provide Name and Color for the board.");
      return;
    }
    const newBoardData = {
      boardName: newBoard.name,
      boardColor: newBoard.color,
    };

    try {
      const response = await axios.post(`http://${window.location.hostname}:6080/newboard/createBoard/${userId}`,
      newBoardData
    );
      if (response.status === 200) {
        alert("Board Created Successfully!");
        setNewBoard({ name: "", color: "#E84711" });
        setShowModal(false);
        await fetchBoardData();
      }
    } catch (error) {
      console.error("Error creating board:", error);
      alert("Failed to create board. Please try again.");
    }
  };

  useEffect(() => {
    if (userId) {
      fetchBoardData();
    }
  }, [userId]); 

  const viewHandler = (board) => {
    navigate(`/dashboard/manageboard/${board._id}`, { state: { boardData: board } });
  };

  const handleInputChange = (field, value) => {
    setNewBoard((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <Container fluid> 
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="text-danger">Boards</h1>
          <Button onClick={() => setShowModal(true)} variant="primary">
            Create Board
          </Button>
        </div>
      </Container>
      <Container className="mt-4">
        {boardData.length === 0 ? (
          <h2 className="text-center text-muted">No Boards Available</h2>
        ) : (
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {boardData.map((board, index) => (
              <Col key={board._id}>
                <Card
                  className="shadow-sm"
                  style={{
                    backgroundColor: board.boardColor || "#FFFFFF",
                    cursor: "pointer",
                  }}
                  onClick={() => viewHandler(board)}
                >
                  <Card.Body>
                    <Card.Title className="text-dark">{board.boardName}</Card.Title>
                    <Card.Text className="text-muted">Board ID: {board._id}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create New Board</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Board Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name for the board"
                value={newBoard.name || ""}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Board Color</Form.Label>
              <Form.Control
                type="color"
                value={newBoard.color || "#000000"}
                onChange={(e) => handleInputChange("color", e.target.value)}
              />
            </Form.Group>
            <Button variant="success" type="submit" className="w-100">
              Create Board
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShowBoard;
