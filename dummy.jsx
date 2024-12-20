import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../ContextProvider/UserContextProvider";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserHeader from '../../Components/UserHeader';

const ShowAllBoards = () => {
  const [boardData, setBoardData] = useState(null);
  const { user } = useContext(UserContext);
  const userId = user ? user._id : null;

  const fetchBoardData = async () => {
    try {
      if (!userId) return;
      const response = await axios.get(`http://localhost:6080/newboard/showAllBoard/${userId}`);
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

  useEffect(() => {
    fetchBoardData();
  }, [userId]);

  return (
    <>
      <UserHeader />
      <div className="container mt-4 border border-danger d-flex">
        {boardData === null ? ( 
          <h2>Loading...</h2>
        ) : boardData.length === 0 ? (
          <h2>No Boards Available</h2>
        ) : (
          boardData.map(board => (
            <div key={board._id} className="border border-dark m-2">
              <h1>{board.boardName}</h1>
              <p>Board ID: {board.boardId}</p>
              <h2>Lists:</h2>
              {board.lists.map(list => (
                <div key={list.listId}>
                  <h3>{list.listName}</h3>
                  <ul>
                    {list.tasks.map(task => (
                      <li key={task.taskId}>{task.taskName}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ShowAllBoards;









duedata
color




// Create User 
exports.createUser = async (req, res) => {
  try {
      const { Email, Password, ...restData } = req.body;
      // Check Email already exist or not. 
      const existUser = await userModel.findOne({ Email });
      if (existUser) {
          return res.status(404).json({ message: "User Already Exist" });
      }
      const randotp = await genertaeOtp();
      if (randotp) {
          console.log(randotp);
          sendMail(`${Email}`, "OTP for CRUD", `${randotp}`);
      }        
      return res.status(200).json({ Email, randotp, message: "Go to varificationl" });
  }
  catch (err) {
      console.log("Error", err);
      return res.status(404).json({ message: "Internal Error", err });
  }
};

// OTP Varification
exports.otpVarification = async (req, res) => {
  console.log(req.body);
  return
  // const {Email, OTP} = req.body;
  // const databaseEmail = await userModel.findOne({Email })
  // console.log(databaseEmail);
  // if (databaseEmail) {
  //     const match = databaseEmail.OTP == OTP;
  //     if(match){
  //         await userModel.findOneAndUpdate({ Email },{ $unset: { OTP : "" } });
  //         return res.status(200).json({ Email, message: "OTP match" });
  //     } 
  // }
  // else{
  //     return res.status(404).json({ message: "OTP not match" });
  // }

}





const SignUp = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    PhNo:"",
    Password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:6080/newuser/createUser/", formData);
      console.log(response);
      
      if (response.status === 200) {
        alert("Provide OTP for Email varification");
        // const { Email } = response.data;
        // localStorage.setItem("Email", Email);
        navigate('/otpverification', { state: { response: response.data } });
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Email Already Register");
    }
  };






  const OTPVerification = () => {
    const [otp, setOtp] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const user = location.state?.response.data;
    // const {}
  
  
    const handleChange = (e) => {
      setOtp(e.target.value);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
    //   const userEmail = localStorage.getItem("Email");
    //   if (!userEmail) {
    //     alert("No Email found in LocalStorage. Please try signing up again.");
    //     return;
    //   }
  
      const formData = {
        Email: response.data.Email,
        OTP: otp,
  
      };
  
      try {
        const response = await axios.post("http://localhost:6080/newuser/otpVarification",formData);
  
        if (response.status === 200) {
          alert("OTP Successful!");
          navigate("/signin");
          
        }
      } catch (error) {
        alert(error.response?.data?.message || "OTP Failed! Please try again.");
        navigate("/");
      }
    };






















    const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
    boardId:{
        type: Number,
        required: true,
    },
    boardName:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true },
    lists: [
        {
            listId: { type: Number, required: true },
            listName: { type: String, required: true },
            tasks: [
                {
                    taskId:{
                        type: Number,
                        required: true
                    },
                    taskName:{
                         type: String,
                         required: true 
                    }
                }
          ]
        }
    ]
});

module.exports = mongoose.model("board", boardSchema);








// import React, { useState, useEffect, useContext } from "react";
// // import { UserContext } from "../../ContextProvider/UserContextProvider";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import { Button } from "react-bootstrap";
// import 'bootstrap/dist/css/bootstrap.min.css';
// import UserHeader from '../../Components/UserHeader';

// const ShowBoard = () => {
//   const [boardData, setBoardData] = useState(null);
//   // const { user } = useContext(UserContext);
//   // const userId = user ? user._id : null;

//   const navigate = useNavigate();
//   const location = useLocation();

//   const { boardId, name } = location.state

//   const fetchBoardData = async () => { 
//     try {
//       if (!userId) return;
//       const response = await axios.get(`http://localhost:6080/newlist/showList/${boardId}`);
//       if (response.data.boards) {
//         setBoardData(response.data.boards);
//       } else {
//         setBoardData([]);
//       }
//     } catch (error) {
//       console.error("Error fetching board data:", error);
//       setBoardData([]);
//     }
//   };

//   useEffect(() => {
//     fetchBoardData();
//   }, [boardId]);



//   return (
//     <>
//       <UserHeader />
//       <div className="mt-2">
//         <Button>
//           <h1>+</h1>
//           <p>Create New List</p>
//         </Button>
//       </div>
//       <div className="container mt-4 border border-danger d-flex" style={{ flexWrap: "wrap" }}>
//         {boardData === null ? (
//           <h2>Loading...</h2>
//         ) : boardData.length === 0 ? (
//           <h2>No List Available</h2>
//         ) : (
//           boardData.map((board) => (
//             <div
//               key={board._id}
//               className="border border-dark m-2 text-dark"
//               style={{ cursor: "pointer", padding: "10px" }}
//             >
//               <h1>{board.boardName}</h1>
//               <p>Board ID: {board.boardId}</p>
//             </div>
//           ))
//         )}
//       </div>
//     </>
//   );
// };

// export default ShowBoard;

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Form, Modal, Card, Row, Col, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const ManageBoard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { boardData, userId } = location.state;
//   console.log(boardData);
  
  const [lists, setLists] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newList, setNewList] = useState("");
  
  const [tasks, setTasks] = useState({}); // To track tasks within each list

  // Fetch lists for the board
  const fetchLists = async () => {
    try {
      const response = await axios.get(
        `http://localhost:6080/lists/getLists/${boardData.boardId}`
      );
      setLists(response.data.lists || []);
    } catch (error) {
      console.error("Error fetching lists:", error);
      setLists([]);
    }
  };

  // Create new list
  const handleCreateList = async () => {
    if (!newList.trim()) {
      alert("Please enter a list name.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:6080/lists/createList/${boardData.boardId}`,
        { listName: newList }
      );
      if (response.status === 200) {
        alert("List created successfully!");
        setNewList("");
        setShowModal(false);
        await fetchLists();
      }
    } catch (error) {
      console.error("Error creating list:", error);
      alert("Failed to create list. Please try again.");
    }
  };

  // Handle task creation
  const handleCreateTask = async (listId, taskName) => {
    if (!taskName.trim()) return;

    try {
      const response = await axios.post(
        `http://localhost:6080/tasks/createTask/${listId}`,
        { taskName }
      );
      if (response.status === 200) {
        alert("Task added successfully!");
        await fetchLists(); // Re-fetch updated lists and tasks
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  useEffect(() => {
    if (boardData && boardData.boardId) fetchLists();
  }, [boardData]);

  return (
    <div
      style={{
        backgroundColor: boardData?.boardColor || "#FFFFFF",
        minHeight: "100vh",
      }}
    >
      <Container className="py-4">
        <h1 className="text-center mb-4">{boardData.boardName}</h1>
        <div className="d-flex justify-content-between align-items-center">
          <h2>Lists</h2>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Create List
          </Button>
        </div>

        <Row className="mt-4 g-4">
          {lists.map((list) => (
            <Col key={list._id} sm={6} md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>{list.listName}</Card.Title>
                  <ul>
                    {tasks[list._id]?.map((task) => (
                      <li key={task._id}>{task.taskName}</li>
                    ))}
                  </ul>
                  <Button
                    variant="success"
                    onClick={() => {
                      const taskName = prompt("Enter task name:");
                      if (taskName) handleCreateTask(list._id, taskName);
                    }}
                  >
                    Add Task
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Create List Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Create New List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>List Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter list name"
              value={newList}
              onChange={(e) => setNewList(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleCreateList}>
            Create List
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ManageBoard;
