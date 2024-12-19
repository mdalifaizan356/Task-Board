import React, { useState } from "react";
import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "bootstrap/dist/css/bootstrap.min.css";
import UserDashboard from "../User/UserDashboard";
import { useLocation } from 'react-router-dom';
import axios from "axios";


const ManageBoard = () => {
  const location = useLocation();
  const boardData = location.state?.boardData;
  console.log(boardData);
  const [board, setBoard] = useState(boardData)
  console.log(board);

  const [lists, setLists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newList, setNewList] = useState({ id: "", title: "" });



const handleAddList = () => {
  if (newList.id.trim() === "" || newList.title.trim() === "") {
    alert("Please provide both ID and Title for the list.");
    return;
  }

    const isDuplicateId = lists.some((list) => list.id === newList.id);
    if (isDuplicateId) {
      alert("List ID must be unique.");
      return;
    }

    const list = {
      id: newList.id,
      title: newList.title,
      tasks: [],
      // taskInput: "",
    };

    setLists([...lists, list]);
    setNewList({ id: "", title: "" });
    setShowModal(false);
  };

  const handleDeleteList = (listId) => {
    const updatedLists = lists.filter((list) => list.id !== listId);
    setLists(updatedLists);
  };

  const handleAddTask = (listId) => {
    const updatedLists = lists.map((list) => {
      if (list.id === listId) {
        if (list.taskInput.trim() === "") {
          alert("Task content cannot be empty.");
          return list;
        }

        return {
          ...list,
          tasks: [...list.tasks, { id: `task-${Date.now()}`, content: list.taskInput }],
          taskInput: "", 
        };
      }
      return list;
    });
    setLists(updatedLists);
  };

  const handleDeleteTask = (listId, taskId) => {
    const updatedLists = lists.map((list) => {
      if (list.id === listId) {
        const updatedTasks = list.tasks.filter((task) => task.id !== taskId);
        return { ...list, tasks: updatedTasks };
      }
      return list;
    });
    setLists(updatedLists);
  };

  const handleTaskInputChange = (listId, value) => {
    const updatedLists = lists.map((list) => {
      if (list.id === listId) {
        return { ...list, taskInput: value };
      }
      return list;
    });
    setLists(updatedLists);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
  
    if (!destination) return;
  
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;
  
    if (source.droppableId === destination.droppableId) {
      const listId = source.droppableId;
      const list = lists.find((list) => list.id === listId);
      const reorderedTasks = Array.from(list.tasks);
      const [movedTask] = reorderedTasks.splice(source.index, 1);
      reorderedTasks.splice(destination.index, 0, movedTask);
  
      const updatedLists = lists.map((list) =>
        list.id === listId ? { ...list, tasks: reorderedTasks } : list
      );
      setLists(updatedLists);
    } 
    else {
      const sourceList = lists.find((list) => list.id === source.droppableId);
      const destinationList = lists.find((list) => list.id === destination.droppableId);
  
      const [movedTask] = sourceList.tasks.splice(source.index, 1);
  
      destinationList.tasks.splice(destination.index, 0, movedTask);
  
      const updatedLists = lists.map((list) => {
        if (list.id === source.droppableId) {
          return { ...list, tasks: sourceList.tasks };
        }
        if (list.id === destination.droppableId) {
          return { ...list, tasks: destinationList.tasks };
        }
        return list;
      });
  
      setLists(updatedLists);
    }
  };
  

  const handleSaveList = async (listId) => {
    try {
      const token = localStorage.getItem("Token");
      const listToSave = lists.find((list) => list.id === listId);
  
      if (!listToSave) {
        alert("List not found!");
        return;
      }
  
      // Save List
      await axios.post("http://localhost:6080/newlist/createList",
        {
          _id: listToSave.id,
          title: listToSave.title,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      // Save Tasks
      for (const task of listToSave.tasks) {
        await axios.post(
          "http://localhost:6080/newlist/createTask",
          {
            _id: task.id,
            listId: listToSave.id,
            content: task.content,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
  
      alert(`List "${listToSave.title}" and its tasks saved successfully!`);
    } catch (error) {
      console.error("Error saving the list and tasks:", error);
    }
  };
  
// Update List
const handleUpdateList = async (listId) => {
  try {
    const token = localStorage.getItem("Token");
    const listToSave = lists.find((list) => list.id === listId);

    if (!listToSave) {
      alert("List not found!");
      return;
    }

    // Update the List
    await axios.put(`http://localhost:6080/newlist/updateList/${listId}`,
      {
        title: listToSave.title,
        tasks: listToSave.tasks,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    alert(`List "${listToSave.title}" updated successfully!`);
  } catch (error) {
    console.error("Error updating the list and tasks:", error);
  }
};

  
  return (
    <>
    <UserDashboard/>
      <Container fluid className="p-3 border border-primary">
        <Row className="my-3">
          <Col>
            <Button onClick={() => setShowModal(true)}>Create List</Button>
          </Col>
        </Row>

        <DragDropContext onDragEnd={onDragEnd}>
          <Row>
            {lists.map((list) => (
              <Col key={list.id} md={4}>
                <Container className="border border-primary">
                  <h5>{list.title}</h5>
                  <div className=" border border-dark w-100">
                  <Form.Control
                    type="text"
                    placeholder="Add a task"
                    value={list.taskInput}
                    onChange={(e) => handleTaskInputChange(list.id, e.target.value)}
                  />
                  <Button
                    className="mt-2"
                    variant="primary"
                    onClick={() => handleAddTask(list.id)}
                  >
                    Add Task
                  </Button>
                  <Button
                    className="mt-2 ms-2"
                    variant="danger"
                    onClick={() => handleDeleteList(list.id)}
                  >
                    Delete List
                  </Button>
                  </div>
                  <Droppable droppableId={list.id}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                          backgroundColor: "#f8f9fa",
                          marginTop: "10px", 
                        }}
                      >
                        {list.tasks.map((task, index) => (
                          <Draggable key={task.id} draggableId={task.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="p-2 my-2 border bg-white d-flex align-items-center justify-content-between"
                              >
                                <span>{task.content}</span>
                                <Button
                                  variant="danger"
                                  size="sm"
                                  onClick={() => handleDeleteTask(list.id, task.id)}
                                >
                                  Delete
                                </Button>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </Container>
              </Col>
            ))}
          </Row>
        </DragDropContext>
      </Container>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create New List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>List ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter unique ID for the list"
                value={newList.id}
                onChange={(e) => setNewList({ ...newList, id: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>List Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title for the list"
                value={newList.title}
                onChange={(e) => setNewList({ ...newList, title: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddList}>
            Create List
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ManageBoard;