import React from 'react';
import { NavLink } from 'react-router';
const Home = () => {
  
  return (
    
    <div>
      <div className='head'>
      <h1>How Much To Make A Website</h1>
      </div>
      <div className="btn">

      <NavLink to='/pages'> Next</NavLink>
      </div>
    </div>
  );
};

export default Home;
