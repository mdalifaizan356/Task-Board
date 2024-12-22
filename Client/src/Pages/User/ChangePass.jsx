import React, { useState, useContext } from "react";
import { UserContext } from "../../ContextProvider/UserContextProvider";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import UserDashboard from "./UserDashboard";
import UserHeader from "../../Components/UserHeader";

const ChangePass = () => {
  const { user } = useContext(UserContext);
  const Email = user ? user.Email : null;
  const [formData, setFormData] = useState({
    oldpass: "",
    newpass: "",
    Email:user.Email
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch("http://localhost:6080/newuser/changePassword", formData);
      if (response.status === 200) {
        alert("Password Change Successfully");
        navigate("/userdashboard");
      }
    } catch (error) {
      console.error("Error during Change Pass:", error);
      alert("Recovry Failed! Please try again.");
    }
  };

  return (
  <>
<UserHeader/>
      <Container>
      <Row className="mt-5 d-flex justify-content-center">
        <Col className="mt-5 d-flex justify-content-center" >
          <Form className="mt-5 w-25 border border-danger p-3" onSubmit={handleSubmit}>
            <h4 className="text-center">Change Password</h4>

        <Form.Group className="mb-3" controlId="formOldPass">
          <Form.Label>Old Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Old Password"
            name="oldpass"
            value={formData.oldpass}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formNewPass">
          <Form.Label>New Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter New Password"
            name="newpass"
            value={formData.newpass}
            onChange={handleChange}
            required
          />
        </Form.Group>
            <Button variant="primary" type="submit" className="w-100 mb-2">Change Password</Button>
        <Button as={Link} to="/userdashboard" variant="danger" className="w-100">Cancel</Button>
          </Form>
        </Col>
      </Row>
    </Container>
    </>
  );
};

export default ChangePass;
