import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import UserHeader from "../../Components/DashComponents/DashHeader";

const EditProfile = () => {

  return (
    <>
      <UserHeader/>
      <Container>
      <Row>
        <Col className="mt-5 d-flex justify-content-center">
          <Form className="mt-5 w-25 p-3">
            <h4 className="text-center">Edit Profile</h4>
            <Form.Group className="mb-3 text-center">
              <div
                className="photo-upload rounded-circle mx-auto mb-3 border border-primary overflow-hidden position-relative"
                style={{
                  width: "100px",
                  height: "100px",
                  cursor: "pointer",
                }}
              >
                <img
                  src="https://via.placeholder.com/100"
                  alt="profile"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <input
                  type="file"
                  className="position-absolute w-100 h-100 opacity-0"
                  style={{ top: 0, left: 0, cursor: "pointer" }}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      console.log("File selected:", file.name);
                    }
                  }}
                />
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPhone">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" placeholder="Enter phone number" />
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
    </>

  );
};

export default EditProfile;
