import React, { useState, useEffect} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button, Container, Col, Navbar, Nav, Offcanvas, Modal, Form } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "bootstrap/dist/css/bootstrap.min.css";
import axiosInstance from "../../lib/axios";
import { FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast, Slide, Zoom, Flip, Bounce,  } from 'react-toastify';



const ManageBoard = () => {
  const [lists, setLists] = useState([]);
  const [newListInput, setNewListInput] = useState(false);
  const [newListName, setNewListName] = useState(""); 

  const [listMenuVisibility, setListMenuVisibility] = useState({});
  const [taskMenuVisibility, setTaskMenuVisibility] = useState({});
  const [taskInputs, setTaskInputs] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const { boardData, userId } = location.state; 
  const bgcolor = boardData.boardColor; 
  const boardId = (boardData._id);

  const [showOffcanvas, setShowOffcanvas] = useState(false);
    const handleOffcanvasClose = () => setShowOffcanvas(false);
    const handleOffcanvasShow = () => setShowOffcanvas(true);

    const toggleListMenuVisibility = (listId) => {
      setListMenuVisibility((prev) => ({
        ...prev,
        [listId]: !prev[listId],
      }));
    };

    const toggleTaskMenuVisibility = (taskId) => {
      setTaskMenuVisibility((prev) => ({
        ...prev,
        [taskId]: !prev[taskId],
      }));
    };

  //Fetch List With TAsk
  const fetchListData = async () => { 
    try {
      if (!boardId) return;
      const response = await axiosInstance.get(`/newlist/showList/${boardId}`);
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
    if (newListName.trim() === ""){
      alert("Please provide Name and Color for the board.");
      return;
    } 
    const listData = {
      listName: newListName,
      listColor: bgcolor,
    }
    try {
      const response = await axiosInstance.post(`/newList/createList/${boardId}`,
        listData
    );
      if (response.status === 200) {
        setNewListInput(false);
        setNewListName("");
        toast.success(`List Create ${listData.listName} Successfully `, {transition: Bounce});
        await fetchListData();
      }
    } catch (error) {
      console.error("Error creating board:", error);
      toast.error(`List ${listName} Create Successfully `, {transition: Bounce});
    }
  };


//Delete List 
const deleteList = async(deleteListId )=>{
  try{
    const response = await axiosInstance.delete(`/newList/deleteList`, {
      data:{
        deleteListId
      }
    });
    if (response.status === 200) {
      await fetchListData();
    }
  }
  catch(error){
    toast.error("Failed to move the task.", {transition: Bounce});
    fetchListData(); 
  }
}

// Add new task
const handleAddTask = async(e, listId, taskName) => {
e.preventDefault();
  if (taskName.trim() === "") return;
  const taskData ={
    listId,
    taskName
  }
  try {
    const response = await axiosInstance.post(`/newTask/createTask`,
      taskData
  );
    if (response.status === 201) {
      setTaskInputs({});
      toast.success(`Task  ${taskData.taskName} Create Successfully on at this time`, {transition: Bounce});
      await fetchListData();
    }
  } catch (error) {
    console.error("Error creating board:", error);
    toast.error("Failed to create board. Please try again.", {transition: Bounce});
  }
  
};

  useEffect(() => {
    if (boardId) {
      fetchListData();
    }
  }, [boardId]);


  const handleOnDragEnd = async (result) => {
    const { source, destination } = result;

    // If dropped outside a list or same position, do nothing
    if (!destination || (source.droppableId === destination.droppableId && source.index === destination.index)) {
      return;
    }
  
    // Find the source and destination lists
    const sourceListIndex = lists.findIndex((list) => list._id === source.droppableId);
    const destinationListIndex = lists.findIndex((list) => list._id === destination.droppableId);
  
    if (sourceListIndex === -1 || destinationListIndex === -1) return;
  
    const sourceList = lists[sourceListIndex];
    const destinationList = lists[destinationListIndex];
  
    // Clone the tasks
    const sourceTasks = Array.from(sourceList.taskId);
    const destinationTasks = Array.from(destinationList.taskId);
  
    // Move the task between lists
    const [movedTask] = sourceTasks.splice(source.index, 1);
  
    if (sourceListIndex === destinationListIndex) {
      // Same list
      sourceTasks.splice(destination.index, 0, movedTask);
      lists[sourceListIndex] = {
        ...sourceList,
        taskId: sourceTasks,
      };
    } else {
      // Different lists
      destinationTasks.splice(destination.index, 0, movedTask);
      lists[sourceListIndex] = {
        ...sourceList,
        taskId: sourceTasks,
      };
      lists[destinationListIndex] = {
        ...destinationList,
        taskId: destinationTasks,
      };
    }
  
    setLists([...lists]);
  
    try {
      const response = await axiosInstance.post(`/newTask/moveTask`, {
        taskId: movedTask._id,
        sourceListId: source.droppableId,
        destinationListId: destination.droppableId,
        destinationIndex: destination.index,
      });
      if (response.status === 200) {
        await fetchListData();
      }
    } catch (error) {
      toast.error("Failed to move the task.", {transition: Bounce});
      fetchListData(); 
    }
  };

  const deleteTask = async(deleteTaskId, listIdDeleteTask )=>{
    try{
      const response = await axiosInstance.delete(`/newTask/deleteTask`, {
        data:{
          deleteTaskId,
          listIdDeleteTask
        }
      });
      if (response.status === 200) {
        await fetchListData();
      }
    }
    catch(error){
      console.error("Error moving task:", error);
      alert("Failed to move the task.");
      fetchListData(); 
    }
  }

  const completeTask = async(completeTaskId, listIdCompleteTask, taskCompleteStatus )=>{
    try{
      const response = await axiosInstance.patch(`/newTask/completeTask`, {
          completeTaskId,
          listIdCompleteTask, 
          taskCompleteStatus
      });
      
      if (response.status === 200) {
        // console.log(response.data.isComplete);
      toast.success(`Good Job`, {transition: Bounce});

        await fetchListData()
      }
    }
    catch(error){
      console.error("Error moving task:", error);
      alert("Failed to move the task.");
      fetchListData(); 
    }
  }
  
  return (
  <>
    <Navbar fluid variant="dark" expand={false} className="p-0" style={{ height: "40px", fontSize: "14px", display: "flex", alignItems: "center", justifyContent: "end", backgroundColor: bgcolor, }} >
      <h5>{boardData.boardName}</h5>
      <Button className="navbar-toggler" onClick={handleOffcanvasShow} aria-label="Toggle navigation" style={{ background: "transparent", border: "none", fontSize: "20px", color: "white", marginRight: "10px", display: "flex", alignItems: "center" }}>&#x2022;&#x2022;&#x2022; </Button>
      <Navbar.Offcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="top" show={showOffcanvas} onHide={handleOffcanvasClose} style={{ marginTop: "20vh", marginBottom: "20vh", backgroundColor: bgcolor, width:"50%", fontSize: "15px" }} >
        <Offcanvas.Header closeButton>
          {/* <Offcanvas.Title id="offcanvasNavbarLabel">Board Menu</Offcanvas.Title> */}
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

    <DragDropContext onDragEnd={handleOnDragEnd}>
    <Container fluid className="mt-0">
      <div style={{ display: "flex", padding: "10px", gap: "10px", overflowX: "auto", scrollbarWidth: "none" }}>
        {lists.map((list) => (
          <Droppable droppableId={list._id} key={list}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} style={{ minWidth: "300px", maxWidth: "200px", borderRadius: "8px", backgroundColor: bgcolor, boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)", padding: "10px", position: "relative", height: "fit-content",}}>
                <div className="d-flex justify-content-between align-items-center">
                <h5>{list.listName}</h5>
                <Button variant="" className="p-0 m-0" onClick={() => toggleListMenuVisibility(list._id)}>&#x2022;&#x2022;&#x2022;</Button>
                {listMenuVisibility[list._id] && (
                  <div style={{position: "absolute", top: "10px", right: "35px", background: "#fff", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)", borderRadius: "4px", zIndex: 20, width: "150px", textAlign:"center"}} >
                    <ul style={{ listStyle: "none", margin: "0", padding: "10px" }}>
                    <li style={{ marginBottom: "10px" }}>
                    <Button variant="" className="p-0 m-0"><MdDelete  style={{color:"red", fontSize:"30px"}} onClick={() => deleteList(list._id)}/>Delete List</Button>
                    </li>
                  </ul>
                </div>
                )}
                </div>
                {list.taskId.map((task, index) => (
                  <Draggable key={task._id} draggableId={task._id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          padding: "5px",
                          margin: "5px 0",
                          background:  task.isComplete ? 'orange' : 'white',
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
                          display:"flex",
                          justifyContent:"space-between"
                        }}
                      >
                      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                        <p className="p-0 m-0" style={{textDecoration: task.isComplete ? "line-through" : "none",}} >{task.taskName}</p>
                      </div>
                      <div style={{display:"flex", justifyContent:"flex-end", alignItems:"start"}}>
                      <Button variant="" className="p-0 m-0"><FaCheck  style={{color:"green"}} onClick={() => completeTask(task._id, task.listId, task.isComplete)}/></Button>
                      {/* <Button variant="" className="p-0 m-0"><FaPen style={{color:"blue"}} /></Button> */}
                      <Button variant="" className="p-0 m-0"><MdDelete  style={{color:"red"}} onClick={() => deleteTask(task._id, task.listId)}/></Button>
                      <Button variant="" className="p-0 m-0" onClick={() => toggleTaskMenuVisibility(task._id)}>&#x2022;&#x2022;&#x2022;</Button>
                        {taskMenuVisibility[task._id] && (
                          <div style={{position: "absolute", top: "50px", right: "39px", background: "white", boxShadow: "0px 4px 6px rgba(0,0,0,0.1)", borderRadius: "4px", zIndex: 10, width: "80%", textAlign:"center"}} >
                          <p>{task.taskName}</p>
                            <ul style={{ listStyle: "none", margin: "0", padding: "10px" }}>
                              <li style={{ marginBottom: "10px" }}>
                                <Button variant="" className="p-0 m-0" onClick={() => deleteList(list._id)}>Add Due Date</Button>
                              </li>
                              <li style={{ marginBottom: "10px" }}>
                                <Button variant="" className="p-0 m-0" onClick={() => deleteList(list._id)}>Add Deadline</Button>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                <form
                onSubmit={(e) => {
                e.preventDefault();
                handleAddTask(e, list._id, taskInputs[list._id]);
                }}>
                <Form.Control
                  type="text"
                  value={taskInputs[list._id] || ""}
                  onChange={(e) =>
                    setTaskInputs({ ...taskInputs, [list._id]: e.target.value })
                  }
                  placeholder="Add a task..."
                  size="sm"
                  style={{ fontSize: "14px" }}
                />
              </form>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
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
    </DragDropContext>
    </>
  );
};

export default ManageBoard;

