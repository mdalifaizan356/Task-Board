import React, { useState, useEffect, useContext  } from "react";
// import { UserContext } from "../../ContextProvider/UserContextProvider";
import { Navbar, Nav, Container, Row, Col, Offcanvas, Dropdown} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate, BrowserRouter, Route, Routes } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import UserHeader from "../../Components/UserHeader";
import ShowBoard from "../Board/ShowBoard";


const UserDashboard = () => {

  const [modalShow, setModalShow] = React.useState(false);
  // const { user } = useContext(UserContext);

  return (
    <>
    <UserHeader/>
      {/* <Container fluid>
        <Row>
          <Col className="p-2">
          <ShowBoard/>
          </Col>
        </Row>
      </Container> */}
    </>
  );
};

export default UserDashboard;
