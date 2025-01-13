import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../Redux/Slices/UserSlice";
import { show, hide } from "../../Redux/Slices/PopUpSlice";
import { Form, Button, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import TaskCompletedPopup from "../../Components/CommonComponents/PopUp";
import HomeHeader from "../../Components/HomeComponents/HomeHeader";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
    const { name } = useSelector((state) => state.user);
  const popupState = useSelector((state) => state.popup);


  const [formData, setFormData] = useState({
    Email: "",
    Password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:6080/newuser/loginUser", formData);
      if (response.status === 200) {
        const { token, databaseEmail } = response.data;

        dispatch(setUser({
          email: databaseEmail.Email,
          name: databaseEmail.Name,
          phone: databaseEmail.PhNo,
          role: databaseEmail.Role,
          createdDate: databaseEmail.createdAt,
          _id: databaseEmail._id,
        }));

        localStorage.setItem("Token", token);

        dispatch(show("Login Successful! Welcome to the dashboard."));
      }
    } catch (error) {
      console.error("Error during Login:", error);
      dispatch(show("Login Failed! Please check your credentials."));
    }
  };

  const handleClosePopup = () => {
    dispatch(hide());
    if(!name){
      navigate("/")
    }
    else{
      navigate("/dashboard")
    }
  };

  return (
    <>
    <HomeHeader/>
    <Container style={{ maxWidth: "500px", marginTop: "10%" }}>
      <h1 className="text-center mb-4">Sign In</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="w-100 mb-2">Login</Button>
        <Button as={Link} to="/" variant="danger" className="w-100">Cancel</Button>
      </Form>
      {popupState.showPopup && (
        <TaskCompletedPopup
          show={popupState.showPopup}
          message={popupState.message}
          onClose={handleClosePopup}
        />
      )}
    </Container>
    </>
  );
};

export default SignIn;
