import React, { useState, useEffect } from "react";
import { Form, Button, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from './../../lib/axios';
import { toast, Slide, Zoom, Flip, Bounce,  } from 'react-toastify';


const SignUp = () => {
  const [formData, setFormData] = useState({ Name: "", Email: "", PhNo: "", Password: "", OTP: "" });
  const [otpSent, setOtpSent] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  // Form validation function
  useEffect(() => {
    const validateForm = () => {
      const { Name, Email, PhNo, Password, OTP } = formData;
      const isValid = 
        Name.trim() !== "" &&
        Email.trim() !== "" &&
        PhNo.trim() !== "" &&
        Password.trim() !== "" &&
        (otpSent || OTP.trim() !== "");
      setIsFormValid(isValid);
    };

    validateForm();
  }, [formData, otpSent]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleOtpRequest = async () => {
    if (!formData.Email) {
      toast.warning("Please enter a valid Email.", {transition:Bounce});
      return;
    }

    try { 
      const response = await axiosInstance.post(`/newuser/sendotp`, { Email: formData.Email });
      if (response.status === 200) {
        toast.success("OTP Sent!", {transition:Bounce});
        setOtpSent(true);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.patch(`/newuser/createUser/`, formData);

      if (response.status === 200) {
        toast.success("SignUp Successful!", {transition:Bounce});
        navigate("/signin");
        const { Email } = response.data;
        localStorage.setItem("Email", Email);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toast.error("SignUp Failed! Please try again.", {transition:Bounce});
      setFormData({ Name: "", Email: "", PhNo: "", Password: "", OTP: "" });
    }
  };

  return (
    <>
    <Container style={{ maxWidth: "500px", marginTop: "150px", height:"100vh" }}>
      <h1 className="text-center mb-2">Sign Up</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name" name="Name" value={formData.Name} onChange={handleChange} required/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <div className="d-flex">
            <Form.Control type="email" placeholder="Enter your Email" name="Email" value={formData.Email} onChange={handleChange} required />
            <Button variant="outline-primary" onClick={handleOtpRequest} className="ms-2" disabled={otpSent}>
              Verify
            </Button>
          </div>
        </Form.Group>

        {otpSent && (
          <Form.Group className="mb-3" controlId="formOtp">
            <Form.Label>Enter OTP</Form.Label>
            <Form.Control type="text" placeholder="Enter OTP" name="OTP" value={formData.OTP} onChange={handleChange} required />
          </Form.Group>
        )}

        <Form.Group className="mb-3" controlId="formPhNo">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control type="text" placeholder="Enter your Phone Number" name="PhNo" value={formData.PhNo} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter your password" name="Password" value={formData.Password} onChange={handleChange} required />
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
