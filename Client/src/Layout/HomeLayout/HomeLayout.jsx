import React from 'react'
import { Outlet} from "react-router-dom";
import HomeHeader from './../../Components/HomeComponents/HomeHeader';
import HomeFooter from '../../Components/HomeComponents/HomeFooter';

const HomeLayout = () => {
  return (
    <>
    <HomeHeader/>
    <main>
      <Outlet/>
    </main> 
    <HomeFooter/>
    </>
  )
}

export default HomeLayout