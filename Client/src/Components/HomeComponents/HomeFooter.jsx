import React from 'react';
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Row, Col, Offcanvas, Dropdown, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import heroimg from "../../../public/heroimg.jpeg"
import HomeHeader from '../../Components/HomeComponents/HomeHeader';

const HomeFooter = () => {
    const  inputStyle={
        outline: "none", 
        boxShadow: "none",
    }
  
    const  mainContainerStyle={
      marginTop:"56px",
      background:"linear-gradient(0deg, rgba(185,26,195,0.8519782913165266) 55%, rgba(91,4,237,0.8323704481792717) 87%)",
  }
  
  const buttonStyle={
    width:"10%"
  }
  return (
    <>
  
            <Container fluid className='mt-5' style={{background:"#182c4e", color:"white", height:"50vh"}}>
              <Row>
                <Col>
                <Link>About Us</Link>
                </Col>
                <Col>
                  <h6>TaskBoard</h6>
                </Col>
                <Col>
                  <h6>TaskBoard</h6>
                </Col>
                <hr />
              </Row>
        
              <Row>
                <Col className='d-flex justify-content-center '>
                  <p style={{fontSize:"15px"}}>Copyright © 2025 DevPasha</p>
                </Col>
              </Row>
            </Container>
    </>
  )
}

export default HomeFooter