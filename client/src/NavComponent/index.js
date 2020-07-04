import React, { useEffect, useContext, useState } from 'react';
import {Link} from 'react-router-dom';
import {UserContext} from '../Contexts/UserContext';
import './style.css';

const Nav = () => {

  const [user, setUser] = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLoggedIn = async () => {
    const res = await fetch('/API/users/checkLoggedIn');
    if(res.status === 200) {
      const resData = await res.json();
      setUser(resData);
    } else {
      // not logged in or error
    }
  }
  useEffect(() => {
    checkLoggedIn();
  },[])

  useEffect(() => {
    // console.log(`testing use userID change ${userID.email}`);
    // change Sign in and Sign up to profile link
    if(user.email !== "") {
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