import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ForgetPass = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {
    //   // Send formData to the server (POST request)
    //   const response = await axios.post("http://localhost:5000/api/signup", formData);
      
    //   if (response.status === 200) {
    //     alert("SignUp Successful!");
    //     // Redirect to OTP Verification page
        navigate("/otpverification");
    //   }
    // } catch (error) {
    //   console.error("Error during signup:", error);
    //   alert("SignUp Failed! Please try again.");
    // }
  };

  return (
    <Container style={{ maxWidth: "500px", marginTop: "50px" }}>
      <h1 className="text-center mb-4">Recover Password </h1>
      <Form onSubmit={handleSubmit}>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your new password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Enter OTP</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter OTP"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mb-2">Update Password</Button>
        <Button as={Link} to="/signin" variant="danger" className="w-100">Cancel</Button>
      </Form>
    </Container>
  );
};

export default ForgetPass;
