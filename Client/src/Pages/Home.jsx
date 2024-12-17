import React from 'react';
import HomeHeader from '../Components/HomeHeader';
import UserDashboard from './User/UserDashboard';

const Home = () => {
  return (
    <HomeHeader style={{ position: 'fixed', top: 0, left: 0, width: '50%', zIndex: 1000 }} />
  )
}

export default Home;