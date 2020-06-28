import React, { useEffect, useContext, useState } from 'react';
import {Link} from 'react-router-dom';
import {UserContext} from '../Contexts/UserContext';
import './style.css';

const Nav = () => {

  const [userID] = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // console.log(`testing use userID change ${userID.email}`);
    //change Sign in and Sign up to profile link
    if(userID.email !== "") {
      setIsLoggedIn(true);
    }
  },[userID.email])

  return (
    <nav>
      <ul>
        <Link to='/' className="links"><li>ImagePal</li></Link>
        <Link to='/Leaderboard' className="links"><li>LeaderBoard</li></Link>
        {/* add SVG of profile pic image thing here*/}
        {isLoggedIn && <Link to='/Profile' className="links"><li>{userID.username}</li></Link>}
        {!isLoggedIn && <Link to='/Login' className="links"><li>Sign In</li></Link>}
        {!isLoggedIn && <Link to='/Register' className="links"><li>Sign Up</li></Link>}
      </ul>
    </nav>
  );
}

export default Nav;