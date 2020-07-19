import React, { useEffect, useContext, useState } from 'react';
import {Link} from 'react-router-dom';
import {UserContext} from '../Contexts/UserContext';
import './style.css';

const Nav = () => {

  const [user] = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if(user.email && user.username) {
      setIsLoggedIn(true);
    }
  },[user])

  return (
    <nav>
      <ul>
        <Link to='/' className="links"><li>ImagePal</li></Link>
        <Link to='/Leaderboard' className="links"><li>LeaderBoard</li></Link>
        {/* add SVG of profile pic image thing here*/}
        {isLoggedIn && <Link to='/Profile' className="links"><li>{user.username}</li></Link>}
        {!isLoggedIn && <Link to='/Login' className="links"><li>Sign In</li></Link>}
        {!isLoggedIn && <Link to='/Register' className="links"><li>Sign Up</li></Link>}
      </ul>
    </nav>
  );
}

export default Nav;