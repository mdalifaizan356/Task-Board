import React, { useState, useContext } from "react";
import { Form, Button, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";
import { toast, Bounce } from 'react-toastify';
import axiosInstance from "../../lib/axios";
import { UserContext } from "../../ContextProvider/UserContextProvider";

const SignIn = () => {
  const navigate = useNavigate();
  const { fetchUser } = useContext(UserContext); 
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
      const response = await axiosInstance.post("/newuser/loginUser", formData);
      if (response.status === 200) {
        const { token, user } = response.data;
        localStorage.setItem("token", token);
        await fetchUser();
        toast.success(`Login Successful! Welcome ${user.Name}`, { transition: Bounce });
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error during Login:", error);
      toast.error("Login Failed! Please check your credentials.", { transition: Bounce });
    }
  };

  return (
    <Container style={{ maxWidth: "500px", marginTop: "150px", height: "100vh" }}>
      <h1 className="text-center mb-2">Log In</h1>
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
        <p className="text-center mt-3">
          <Link to="/signin" style={{ color: "blue", textDecoration: "underline" }}>
            Forget Password?
          </Link>
        </p>
      </Form>
    </Container>
  );
};

export default SignIn;
