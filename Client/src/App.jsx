import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
// import Header from '../src/Components/Header';
import Home from "./Pages/HomePages/Home"
import SignUp from './Pages/HomePages/SignUp';
import SignIn from './Pages/HomePages/SignIn';
import OTPVarification from './Pages/DashPages/OTPVarification';
import UserDashboard from './Pages/DashPages/UserDashboard';
import ForgetPass from './Pages/DashPages/ForgetPass';
import ChangePass from "./Pages/DashPages/ChangePass";
import EditProfile from './Pages/DashPages/EditProfile';
import PNF from './Pages/HomePages/PNF';
import TaskBoard from './Pages/DashPages/TaskBoard';
import ShowBoard from "./Pages/DashPages/ShowBoard"
import ManageBoard from './Pages/DashPages/ManageBoard';
// import UserHeader from './Components/UserHeader';
import RecoverPass from './Pages/DashPages/RecoverPass';
import HomeLayout from './Layout/HomeLayout/HomeLayout';


function App() { 
  return (
    <BrowserRouter>
              <Routes>
               <Route path="/" element={<HomeLayout />}/>
               <Route path="/signup" element={<SignUp />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/recoverpass" element={<RecoverPass />} />
                <Route path="/userdashboard" element={<UserDashboard />}>
                  <Route path="forgetpass" element={<ForgetPass />} />
                  <Route path="taskboard" element={<TaskBoard />} />
                  <Route path="editprofile" element={<EditProfile />} /> 
                  <Route path="changepass" element={<ChangePass />} />
                  <Route path="showboard" element={<ShowBoard />} />
                  <Route path="manageboard/:id" element={<ManageBoard />} />
                </Route>
                <Route path="*" element={<PNF />} />
              </Routes> 
    </BrowserRouter>
  );
}

export default App;
