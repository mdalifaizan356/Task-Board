import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const OTPVerification = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userEmail = localStorage.getItem("Email");
    if (!userEmail) {
      alert("No Email found in LocalStorage. Please try signing up again.");
      return;
    }

    const formData = {
      Email: userEmail,
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
    }
  };

  return (
    <Container style={{ maxWidth: "500px", marginTop: "100px" }}>
      <h1 className="text-center mb-4">OTP Verification</h1>
      <p className="text-center mb-4">Enter the OTP sent to your email.</p>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formOtp">
          <Form.Control
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Submit
        </Button>
        <p className="text-center mt-3">
          If Already Registered,{" "}
          <Link
            to="/signin"
            style={{ color: "blue", textDecoration: "underline" }}
          >Login</Link></p>
      </Form>
    </Container>
  );
};

export default OTPVerification;
