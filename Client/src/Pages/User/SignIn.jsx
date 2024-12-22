import React, { useState, useContext } from 'react';
import { UserContext } from '../../ContextProvider/UserContextProvider';
import { Form, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";


const SignIn = () => {
  const { login } = useContext(UserContext); 
  const [formData, setFormData] = useState({
    Email: "",
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
      const response = await axios.post("http://localhost:6080/newuser/loginUser", formData);
      if (response.status === 200) {
        alert("Login Successfully!");
        
        const { token } = response.data;
        const user = response.data.databaseEmail;
  
        localStorage.setItem("Token", token); 
        localStorage.setItem("User", JSON.stringify(user)); 
  
      
        navigate("/userdashboard");
      }
    } catch (error) {
      console.error("Error during Login:", error);
      alert("Login Failed! Please try again.");
    }
  };
  
  return (
    <Container style={{ maxWidth: "500px", marginTop: "50px" }}>
      <h1 className="text-center mb-4">Sign In</h1>
      <Form onSubmit={handleSubmit}>

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

        <Button variant="primary" type="submit" className="w-100 mb-2">Login</Button>
        <Button as={Link} to="/" variant="danger" className="w-100">Cancel</Button>
        <p className="text-center mt-3">
            If Don't Have Account,{' '}
            <Link to="/signup" style={{ color: 'blue', textDecoration: 'underline' }}>Register</Link>
        </p>
        <p className="text-center mt-3">
            <Link to="/recoverpass" style={{ color: 'blue', textDecoration: 'underline' }}>Forget Password?</Link>
        </p>
      </Form>
    </Container>
  );
};

export default SignIn;
