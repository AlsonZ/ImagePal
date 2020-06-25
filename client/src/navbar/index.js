import React from 'react';
import {Link} from 'react-router-dom';
import './style.css';

const Nav = () => {

  return (
    <nav>
      <ul>
        <Link to='/' className="links"><li>ImagePal</li></Link>
        <Link to='/Leaderboard' className="links"><li>LeaderBoard</li></Link>
        <Link to='/Login' className="links"><li>Sign In</li></Link>
        <Link to='/Register' className="links"><li>Sing Up</li></Link>
      </ul>
    </nav>
  );
}

export default Nav;