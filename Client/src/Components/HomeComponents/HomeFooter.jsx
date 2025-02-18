import React from 'react';
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Row, Col, Offcanvas, Dropdown, Button, Card } from "react-bootstrap";
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
            {/* <Container fluid className='mt-5' style={{background:"#182c4e", color:"white"}}> */}

      <Card style={{background:"#182c4e", color:"white"}}>
        <Card.Body>
          <Card.Text>
          <p style={{fontSize:"15px"}}>Copyright © 2025 DevPasha</p>
          </Card.Text>
        </Card.Body>
      </Card>
            {/* </Container> */}
    </>
  )
}

export default HomeFooter