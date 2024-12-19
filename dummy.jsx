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
