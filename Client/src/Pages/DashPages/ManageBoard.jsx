import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button, Container, Navbar, Nav, Offcanvas, Form } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const ManageBoard = () => {
  const [lists, setLists] = useState([]);
  const [newListInput, setNewListInput] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [taskInputs, setTaskInputs] = useState({});
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  const location = useLocation();
  const { boardData } = location.state;
  const bgcolor = boardData.boardColor;
  const boardId = boardData._id;

  const fetchListData = async () => {
    try {
      if (!boardId) return;
      const response = await axios.get(`http://localhost:6080/newlist/showList/${boardId}`);
      setLists(response.data.list || []);
    } catch (error) {
      console.error("Error fetching lists:", error);
    }
  };

  const handleAddList = async (e) => {
    e.preventDefault();
    if (!newListName.trim()) return alert("Please provide a name for the list.");
    const listData = { listName: newListName, listColor: bgcolor };
    try {
      await axios.post(`http://localhost:6080/newList/createList/${boardId}`, listData);
      setNewListName("");
      setNewListInput(false);
      fetchListData();
    } catch (error) {
      console.error("Error creating list:", error);
    }
  };

  const handleAddTask = async (e, listId, taskName) => {
    e.preventDefault();
    if (!taskName.trim()) return;
    const taskData = { listId, taskName };
    try {
      await axios.post(`http://localhost:6080/newTask/createTask`, taskData);
      setTaskInputs({ ...taskInputs, [listId]: "" });
      fetchListData();
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return; // Task was dropped outside a droppable area.

    const { source, destination } = result;

    // If dropped in the same list and the same position, do nothing.
    if (source.droppableId === destination.droppableId && source.index === destination.index) {
      return;
    }

    // Find the source and destination lists.
    const sourceList = lists.find((list) => list._id === source.droppableId);
    const destinationList = lists.find((list) => list._id === destination.droppableId);

    if (sourceList && destinationList) {
      const sourceTasks = Array.from(sourceList.taskId || []);
      const destinationTasks = Array.from(destinationList.taskId || []);
      const [movedTask] = sourceTasks.splice(source.index, 1);

      destinationTasks.splice(destination.index, 0, movedTask);

      // Update the local state.
      const updatedLists = lists.map((list) => {
        if (list._id === source.droppableId) return { ...list, taskId: sourceTasks };
        if (list._id === destination.droppableId) return { ...list, taskId: destinationTasks };
        return list;
      });
      setLists(updatedLists);

      // Send updates to the server.
      try {
        await axios.post(`http://localhost:6080/newTask/moveTask`, {
          taskId: movedTask.taskId,
          sourceListId: source.droppableId,
          destinationListId: destination.droppableId,
        });
        alert("Task moved successfully!");
      } catch (error) {
        console.error("Error moving task:", error);
        alert("Failed to move task.");
      }
    }
  };

  useEffect(() => {
    fetchListData();
  }, [boardId]);

  return (
    <>
      <Navbar variant="dark" expand={false} className="py-1" style={{ backgroundColor: bgcolor }}>
        <h5>{boardData.boardName}</h5>
        <Button className="navbar-toggler" onClick={() => setShowOffcanvas(true)}>&#x2022;&#x2022;&#x2022;</Button>
        <Navbar.Offcanvas show={showOffcanvas} onHide={() => setShowOffcanvas(false)}>
          <Offcanvas.Body>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/">About This Board</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Navbar>
      <Container fluid className="mt-3">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div style={{ display: "flex", gap: "10px", overflowX: "auto" }}>
            {lists.map((list) => (
              <Droppable droppableId={list._id} key={list._id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{ minWidth: "200px", backgroundColor: bgcolor, padding: "10px", borderRadius: "8px" }}
                  >
                    <h6>{list.listName}</h6>
                    {list.taskId?.map((task, index) => (
                      <Draggable draggableId={task.taskId} index={index} key={task.taskId}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{
                              ...provided.draggableProps.style,
                              backgroundColor: "#fff",
                              padding: "5px",
                              marginBottom: "5px",
                              borderRadius: "5px",
                              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)",
                            }}
                          >
                            {task.taskName}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    <Form.Control
                      type="text"
                      value={taskInputs[list._id] || ""}
                      onChange={(e) => setTaskInputs({ ...taskInputs, [list._id]: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") handleAddTask(e, list._id, taskInputs[list._id]);
                      }}
                      placeholder="Add a task..."
                      size="sm"
                    />
                  </div>
                )}
              </Droppable>
            ))}
            <div onClick={() => setNewListInput(true)} style={{ cursor: "pointer", minWidth: "200px", backgroundColor: bgcolor }}>
              {newListInput ? (
                <Form.Control
                  type="text"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAddList(e);
                  }}
                  placeholder="Enter List Name"
                  size="sm"
                />
              ) : (
                "+ Add List"
              )}
            </div>
          </div>
        </DragDropContext>
      </Container>
    </>
  );
};

export default ManageBoard;
