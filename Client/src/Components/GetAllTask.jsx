import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Row, Col, Offcanvas } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const GetAllTask = () => {
  return (
    <Container fluid className="border border-danger">
      <Row>
        <Col>
          <h1>Get All Products</h1>
        </Col>
      </Row>
    </Container>
  )
}

export default GetAllTask