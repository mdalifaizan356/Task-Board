import React, { useState, useEffect} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Col, Navbar, Nav, Offcanvas, Modal, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const ManageBoard = () => {
  const [lists, setLists] = useState([]);
  const [newListInput, setNewListInput] = useState(false);
  const [newListName, setNewListName] = useState(""); 
  
  const [taskInputs, setTaskInputs] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const { boardData, userId } = location.state; 
  const bgcolor = boardData.boardColor; 
  const boardId = (boardData._id);

  const [showOffcanvas, setShowOffcanvas] = useState(false);
    const handleOffcanvasClose = () => setShowOffcanvas(false);
    const handleOffcanvasShow = () => setShowOffcanvas(true);

  //Fetch List With TAsk
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
  const handleAddList = async(e) => {
    e.preventDefault();
    console.log(newListName);
    // e.preventDefault();
    if (newListName.trim() === ""){
      alert("Please provide Name and Color for the board.");
      return;
    } 
    const listData = {
      listName: newListName,
      listColor: bgcolor,
    }
    try {
      const response = await axios.post(`http://localhost:6080/newList/createList/${boardId}`,
        listData
    );
      if (response.status === 200) {
        alert("List Created Successfully!");
        setNewListInput(false);
        setNewListName("");
        await fetchListData();
      }
    } catch (error) {
      console.error("Error creating board:", error);
      alert("Failed to create board. Please try again.");
    }
  };


  // // Add new task
  // const handleAddTask = (e, listId, newTaskName) => {
  //   // console.log(listId);
  //   // console.log(newTaskName);
  //   // console.log(taskInputs);

  //   // if (taskName.trim() === "") return;
  //   // setLists(
  //   //   lists.map((list) =>
  //   //     list.id === listId ? { ...list, tasks: [...list.tasks, taskName] } : list
  //   //   )
  //   // );
  //   // setTaskInputs({ ...taskInputs, [listId]: "" });
  // };


// Add new task
const handleAddTask = async(e, listId, taskName) => {
e.preventDefault();
  if (taskName.trim() === "") return;
  const taskData ={
    listId,
    taskName
  }
  try {
    const response = await axios.post(`http://localhost:6080/newTask/createTask`,
      taskData
  );
    if (response.status === 201) {
      alert("task Created Successfully!");
      setTaskInputs({});
      await fetchListData();
    }
  } catch (error) {
    console.error("Error creating board:", error);
    alert("Failed to create board. Please try again.");
  }
  
};



  useEffect(() => {
    if (boardId) {
      fetchListData();
    }
  }, [boardId]);

  return (
  <>
    <Navbar variant="dark" expand={false} className="py-1" style={{ height: "40px", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "end", backgroundColor: bgcolor, }} >
      <h5>{boardData.boardName}</h5>
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
          <div key={list._id} style={{ minWidth: "300px", maxWidth: "200px", borderRadius: "8px", backgroundColor: bgcolor, boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)", padding: "10px", position: "relative", height: "fit-content",}}>
            <div style={{ fontWeight: "bold", marginBottom: "10px", textAlign: "center" }}>{list.listName}</div>
            <div style={{ fontWeight: "bold", marginBottom: "10px", textAlign: "center" }}>{list._id}</div>
            <div style={{ marginBottom: "10px" }}>
              {list.taskId && list.taskId.map((task, index) => (
                <div key={task.taskId} style={{ background: "#fff", borderRadius: "5px", padding: "5px", marginBottom: "5px", boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.2)", }} >
                  {task.taskName}
                </div>
                ))}
            </div>
              <Form.Control type="text" value={taskInputs[list._id] || ""} onChange={(e) => setTaskInputs({ ...taskInputs, [list._id]: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddTask(e, list._id, taskInputs[list._id]);
                  }}
                placeholder="Add a task..." size="sm" style={{ fontSize: "14px" }}/>
          </div>
          ))}
          <div style={{ minWidth: "200px", maxWidth: "200px", backgroundColor: bgcolor, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "8px", cursor: "pointer", height: "fit-content", padding:"5px" }}onClick={() => setNewListInput(true)} >
            {newListInput ? (
              <Form.Control type="text" value={newListName} onChange={(e) => setNewListName(e.target.value)} onKeyDown={(e) => {
                if (e.key === "Enter") handleAddList(e);
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



