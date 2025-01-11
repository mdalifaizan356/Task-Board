import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import HomeHeader from "../../Components/HomeComponents/HomeHeader";



const SignUp = () => {
  const [formData, setFormData] = useState({ Name: "", Email: "", PhNo: "", Password: "", OTP: "" });
  const [otpSent, setOtpSent] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false); // For enabling/disabling the button
  const navigate = useNavigate();

  // Form validation function
  useEffect(() => {
    const validateForm = () => {
      const { Name, Email, PhNo, Password, OTP } = formData;
      // Ensure required fields are not empty and OTP is required only if sent
      const isValid = 
        Name.trim() !== "" &&
        Email.trim() !== "" &&
        PhNo.trim() !== "" &&
        Password.trim() !== "" &&
        (otpSent || OTP.trim() !== "");
      setIsFormValid(isValid);
    };

    validateForm();
  }, [formData, otpSent]); // Runs whenever form data or otpSent changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOtpRequest = async () => {
    if (!formData.Email) {
      alert("Please enter a valid Email.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:6080/newuser/otpVarification", { Email: formData.Email });

      if (response.status === 200) {
        alert("OTP Sent!");
        setOtpSent(true); // Show OTP input field
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put("http://localhost:6080/newuser/createUser/", formData);

      if (response.status === 200) {
        alert("SignUp Successful!");
        navigate("/signin");
        const { Email } = response.data;
        localStorage.setItem("Email", Email);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("SignUp Failed! Please try again.");
    }
  };

  return (
    <>
    <HomeHeader/>
    <Container style={{ maxWidth: "500px", marginTop: "56px", }}>
      <h1 className="text-center mb-4">Sign Up</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <div className="d-flex">
            <Form.Control
              type="email"
              placeholder="Enter your Email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              required
            />
            <Button variant="outline-primary" onClick={handleOtpRequest} className="ms-2">
              Verify
            </Button>
          </div>
        </Form.Group>

        {otpSent && (
          <Form.Group className="mb-3" controlId="formOtp">
            <Form.Label>Enter OTP</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter OTP"
              name="OTP"
              value={formData.OTP}
              onChange={handleChange}
              required
            />
          </Form.Group>
        )}

        <Form.Group className="mb-3" controlId="formPhNo">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your Phone Number"
            name="PhNo"
            value={formData.PhNo}
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

        <Button variant="primary" type="submit" className="w-100 mb-2" disabled={!isFormValid}>
          Sign Up
        </Button>
        <Button as={Link} to="/" variant="danger" className="w-100">
          Cancel
        </Button>

        <p className="text-center mt-3">
          If Already Registered,{" "}
          <Link to="/signin" style={{ color: "blue", textDecoration: "underline" }}>
            Login
          </Link>
        </p>
      </Form>
    </Container>
    </>
  );
};

export default SignUp;
