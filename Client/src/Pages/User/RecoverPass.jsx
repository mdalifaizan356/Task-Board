import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [formData, setFormData] = useState({ Email: "", Password: "", OTP: "" });
  const [otpSent, setOtpSent] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false); // For enabling/disabling the button
  const navigate = useNavigate();

  // Form validation function
  useEffect(() => {
    const validateForm = () => {
      const { Email, Password, OTP } = formData;

      const isValid = 
        Email.trim() !== "" &&
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
      console.log(formData.Email);
      const response = await axios.patch("http://localhost:6080/newuser/recoverOTPVarification", { Email: formData.Email });

      if (response.status === 200) {
        alert("OTP Sent!");
        setOtpSent(true); // Show OTP input field
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Email Not Ragistered");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put("http://localhost:6080/newuser/createUser/", formData);

      if (response.status === 200) {
        alert("Password Change Successful!");
        navigate("/signin");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Changes Failed! Please try again.");
    }
  };

  return (
    <Container style={{ maxWidth: "500px", marginTop: "50px" }}>
      <h1 className="text-center mb-4">Recover Password</h1>
      <Form onSubmit={handleSubmit}>
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
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>New Password</Form.Label>
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
  );
};

export default SignUp;
