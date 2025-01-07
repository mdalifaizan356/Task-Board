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
import ShowBoard from "./Pages/Board/ShowBoard"
import ManageBoard from './Pages/Board/ManageBoard';
// import UserHeader from './Components/UserHeader';
import RecoverPass from './Pages/User/RecoverPass';


function App() { 
  return (
    <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} /> 
                <Route path="/otpverification" element={<OTPVarification />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/recoverpass" element={<RecoverPass />} />
                <Route path="/userdashboard" element={<UserDashboard />} />
                <Route path="/forgetpass" element={<ForgetPass />} />
                <Route path="/taskboard" element={<TaskBoard />} />
                <Route path="/editprofile" element={<EditProfile />} />
                <Route path="/changepass" element={<ChangePass />} />
                <Route path="/showboard" element={<ShowBoard />} />
                <Route path="/manageboard/:id" element={<ManageBoard />} />
                <Route path="*" element={<PNF />} />
              </Routes> 
    </BrowserRouter>
  );
}

export default App;
