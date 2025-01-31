import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";

import HomeLayout from './Layout/HomeLayout/HomeLayout';
import SignUp from './Pages/HomePages/SignUp';
import SignIn from './Pages/HomePages/SignIn';
// import RecoverPass from './Pages/HomePages/RecoverPass';
import ForgetPass from './Pages/HomePages/ForgetPass';
import HomeContent from './Components/HomeComponents/HomeContent';
import PNF from './Pages/HomePages/PNF';

import DashLayout from './Layout/DashLayout/DashLayout';
import EditProfile from './Pages/DashPages/EditProfile';
import ChangePass from './Pages/DashPages/ChangePass';
import ShowBoard from "./Pages/DashPages/ShowBoard"
import ManageBoard from './Pages/DashPages/ManageBoard';


function App() { 
    const { name } = useSelector((state) => state.user);
  return (
    <BrowserRouter>
              <Routes>
               <Route path="/" element={<HomeLayout />}>
               <Route index element={<HomeContent />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/forgetpass" element={<ForgetPass />} />
                  {/* <Route path="/recoverpass" element={<RecoverPass />} /> */}
                </Route>

                <Route path="/dashboard" element={name?<DashLayout />:<SignIn/>}>
                  {/* <Route index element={<ShowBoard />} /> */}
                  <Route path="editprofile" element={<EditProfile />} /> 
                  <Route path="changepass" element={<ChangePass />} />
                  <Route path="showboard" element={<ShowBoard />} />
                  <Route path="manageboard/:id" element={<ManageBoard/>} />
                </Route>
                <Route path="*" element={<PNF />} />
              </Routes> 
    </BrowserRouter>
  );
}

export default App;