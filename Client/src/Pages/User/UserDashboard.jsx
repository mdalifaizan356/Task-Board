import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Row, Col, Offcanvas, Dropdown} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate, BrowserRouter, Route, Routes } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import UserHeader from "../../Components/UserHeader";


const UserDashboard = () => {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
    <UserHeader/>
      <Container fluid>
        <Row>
          <Col className="p-2">
          
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserDashboard;
