import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
// import Header from '../src/Components/Header';
import Home from "./Pages/Home"
import SignUp from './Pages/User/SignUp';
import SignIn from './Pages/User/SignIn';
import OTPVarification from './Pages/User/OTPVarification';
import UserDashboard from './Pages/User/UserDashboard';
import ForgetPass from './Pages/User/ForgetPass';
import ChangePass from "./Pages/User/ChangePass"
import EditProfile from './Pages/User/EditProfile';
import PNF from './Pages/PNF';
import TaskBoard from './Pages/Board/TaskBoard';
import ShowAllBoards from "./Pages/Board/ShowAllBoards"


function App() { 
  return (
    <BrowserRouter>
      <Container fluid>
        <Row>
          <Col className="p-2">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/otpverification" element={<OTPVarification />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/userdashboard" element={<UserDashboard />} />
                <Route path="/forgetpass" element={<ForgetPass />} />
                <Route path="/taskboard" element={<TaskBoard />} />
                <Route path="/editprofile" element={<EditProfile />} />
                <Route path="/changepass" element={<ChangePass />} />
                <Route path="/showallboards" element={<ShowAllBoards />} />
                <Route path="*" element={<PNF />} />
              </Routes> 
          </Col>
        </Row>
      </Container>
    </BrowserRouter>
  );
}

export default App;
