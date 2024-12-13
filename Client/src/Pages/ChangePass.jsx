import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserDashboard from "./UserDashboard";

const ChangePass = () => {
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
    

    try {
      // Send formData to the server (POST request)
      const response = await axios.post("http://localhost:6080/newuser/recoverPassword", formData);
      
      if (response.status === 200) {
        alert("OTP sent on your Email for authentication");
        // Redirect to OTP Verification page
        navigate("/otpverification");
      }
    } catch (error) {
      console.error("Error during Change Pass:", error);
      alert("Recovry Failed! Please try again.");
    }
  };

  return (
  <>
    <UserDashboard/>
    <Container style={{ maxWidth: "500px", marginTop: "50px" }}>
      <h1 className="text-center mb-4">Recover Password </h1>
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3 mt-5" controlId="formOldPass">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Old Password"
            name="OldPassword"
            value={formData.Email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formNewPassword">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter New Password"
            name="NewPassword"
            value={formData.Password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100 mb-2">Update Password</Button>
        <Button as={Link} to="/userdashboard" variant="danger" className="w-100">Cancel</Button>
      </Form>
    </Container>
    </>
  );
};

export default ChangePass;