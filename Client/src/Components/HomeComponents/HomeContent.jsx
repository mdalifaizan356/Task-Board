import React from 'react';
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Row, Col, Offcanvas, Dropdown, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import heroimg from "../../../public/heroimg.jpeg"
import HomeHeader from '../../Components/HomeComponents/HomeHeader';

const HomeContent = () => {
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
        <Container fluid  style={mainContainerStyle}>
              <Row>
                <Col className='d-flex flex-column justify-content-center align-items-center pb-5 mb-5' style={{color:"white"}}>
                    <h1>TaskBord makes it easier for<br/> teams to manage<br/> projects and tasks.</h1>
                    <div className='d-flex  justify-content-center align-items-center mt-5' >
                    {/* <input type='text' placeholder='Email' className='m-2 p-2 border-1 rounded'  style={inputStyle}/> */}
                    <Button as={Link} to="/signup" variant="primary" className='m-1 p-2  rounded w-100'>Sign up -it's free! </Button>
                    </div>
                </Col>
        
                <Col className='d-flex  justify-content-center align-items-center'>
                  <img src={heroimg} style={{width:"100%"}}/>
                </Col>
              </Row>
            </Container>
            
            <Container>
              <Row>
                <Col>
                  <div className='d-flex justify-content-center mt-5'>
                  <h2>Explore Taskboard’s features that help your team succeed</h2>
                  </div>
                  <div className='d-flex justify-content-center mt-1'>
                    <Button variant="primary" className='m-1 p-2  rounded-pill' style={buttonStyle}>Cards</Button>
                    <Button variant="primary" className='m-1 p-2  rounded-pill ' style={buttonStyle}>Views</Button>
                    <Button variant="primary" className='m-1 p-2  rounded-pill' style={buttonStyle}>Automation</Button>
                  </div>
                </Col>
              </Row>
            </Container>
        
            <Container className='mt-5'>
              <Row>
                <Col className='d-flex flex-column justify-content-center'>
                  <h2> Manage tasks with ease.</h2>
                  <div>
                  <ul>
                    <li>
                    <h4>Members:</h4>
                    <p>Keep everyone accountable and never have to ask “who’s doing that” by adding members to cards for their projects and tasks. </p>
                    </li>
                    <li>
                    <h4>Members:</h4>
                    <p>Keep everyone accountable and never have to ask “who’s doing that” by adding members to cards for their projects and tasks. </p>
                    </li>
                    <li>
                    <h4>Members:</h4>
                    <p>Keep everyone accountable and never have to ask “who’s doing that” by adding members to cards for their projects and tasks. </p>
                    </li>
                    <li>
                    <h4>Members:</h4>
                    <p>Keep everyone accountable and never have to ask “who’s doing that” by adding members to cards for their projects and tasks. </p>
                    </li>
                  </ul>
                  </div>
                </Col>
                <Col className='d-flex justify-content-center'>
                <img src={heroimg} style={{width:"100%"}}/>
                </Col>
              </Row>
            </Container>
    </>
  )
}

export default HomeContent