import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
      
      if (response.status === 200) {
        alert("SignUp Successful!");
        navigate("/otpverification");
        const { Email } = response.data;
        localStorage.setItem("Email", Email);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("SignUp Failed! Please try again.");
    }
  };

  return (
    <Container style={{ maxWidth: "500px", marginTop: "50px" }}>
      <h1 className="text-center mb-4">Sign Up</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            name="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPhNol">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Phone Number"
            name="PhNo"
            value={formData.phno}
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
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mb-2">
          Sign Up
        </Button>
        <Button as={Link} to="/" variant="danger" className="w-100">Cancel</Button>

        <p className="text-center mt-3">
          If Already Registered,{" "}
          <Link to="/signin" style={{ color: "blue", textDecoration: "underline" }}>
            Login
          </Link>
        </p>
      </Form>
    </Container>
  );
};

export default SignUp;
