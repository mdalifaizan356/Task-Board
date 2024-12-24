import React, { useState, useEffect} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Navbar, Nav, Offcanvas, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import UserHeader from "../../Components/UserHeader";
import axios from "axios";

const ManageBoard = () => {
  const [lists, setLists] = useState([]); // All lists data
  const [newListInput, setNewListInput] = useState(false); // Toggle new list input box
  const [newListName, setNewListName] = useState(""); // For new list name
  const [taskInputs, setTaskInputs] = useState({}); // Track each list's task input
  const location = useLocation();
  const navigate = useNavigate();
  const { boardData, userId } = location.state; 
  const bgcolor = boardData.boardColor;
  const boardId = (boardData._id);

  const [showOffcanvas, setShowOffcanvas] = useState(false);
    const handleOffcanvasClose = () => setShowOffcanvas(false);
    const handleOffcanvasShow = () => setShowOffcanvas(true);
  
  const fetchListData = async () => { 
    try {
      if (!boardId) return;
      const response = await axios.get(`http://localhost:6080/newlist/showList/${boardId}`);
      console.log(response.data.list);
      if (response.data.list) {
        setLists(response.data.list);
      } else {
        setLists([]);
      }
      
    } catch (error) {
      console.error("Error fetching board data:", error);
      setLists([]);
    }
  };

  // Add new list
  const handleAddList = () => {
    if (newListName.trim() === "") return;
    const newList = {
      id: lists.length + 1,
      name: newListName, 
      tasks: [],
    };
    setLists([...lists, newList]);
    setNewListInput(false);
    setNewListName(""); // Clear input
  };

  // Add new task to a list
  const handleAddTask = (listId, taskName) => {
    if (taskName.trim() === "") return;
    setLists(
      lists.map((list) =>
        list.id === listId ? { ...list, tasks: [...list.tasks, taskName] } : list
      )
    );
    setTaskInputs({ ...taskInputs, [listId]: "" }); // Clear input box
  };

    useEffect(() => {
      if (boardId) {
        fetchListData();
      }
    }, [boardId]);

  return (
  <>
    <UserHeader/>
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

    <Container fluid className="mt-3">
      <div style={{ display: "flex", padding: "10px", gap: "10px", overflowX: "auto", scrollbarWidth: "none" }}>
        {lists.map((list) => (
          <div key={list.listId} style={{ minWidth: "200px", maxWidth: "200px", borderRadius: "8px", backgroundColor: bgcolor, boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)", padding: "10px", position: "relative", height: "fit-content",}}>
            <div style={{ fontWeight: "bold", marginBottom: "10px", textAlign: "center" }}>{list.listName}</div>
            <div style={{ marginBottom: "10px" }}>
              {list.tasks && list.tasks.map((task, index) => (
                <div key={index} style={{ background: "#fff", borderRadius: "5px", padding: "5px", marginBottom: "5px", boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2)", }} >
                  {task}
                </div>
                ))}
            </div>
              <Form.Control type="text" value={taskInputs[list.id] || ""} onChange={(e) => setTaskInputs({ ...taskInputs, [list.id]: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddTask(list.id, taskInputs[list.id]);
                  }}
                placeholder="Add a task..." size="sm" style={{ fontSize: "14px" }}/>
          </div>
          ))}
          <div style={{ minWidth: "200px", maxWidth: "200px", backgroundColor: bgcolor, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "8px", cursor: "pointer", height: "fit-content", padding:"5px" }}onClick={() => setNewListInput(true)} >
            {newListInput ? (
              <Form.Control type="text" value={newListName} onChange={(e) => setNewListName(e.target.value)} onKeyDown={(e) => {
                if (e.key === "Enter") handleAddList();
                }}
                placeholder="Enter List Name" size="sm" style={{ fontSize: "14px", width: "90%", height: "fit-content", }} />
                ) : ( <h5>+ Add List</h5>
                )}
          </div>
      </div>
    </Container>
    </>
  );
};

export default ManageBoard;
