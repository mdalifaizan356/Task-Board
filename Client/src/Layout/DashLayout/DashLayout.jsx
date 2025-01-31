import React from "react";
// import { UserContext } from "../../ContextProvider/UserContextProvider";
import { Navbar, Nav, Container, Row, Col, Offcanvas, Dropdown} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode';
import DashHeader from "../../Components/DashComponents/DashHeader";


const DashLayout = () => { 
  return (
    <>
    <DashHeader />
    <Row>
      <Col>
        <main>
          <Outlet /> {/* Page content is here */}
        </main>
      </Col>
    </Row>
    </>
  );
};
export default DashLayout;
