import React from 'react';
import './style.css';

const Navbar = (props) => {
  return(
    <div className="nav-parent">
      <nav className="navbar">
        <ul className="navbar-items">
          {props.children}
        </ul>
      </nav>
    </div>
  )
}

export default Navbar;