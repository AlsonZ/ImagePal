import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Navitem = (props) => {

  const onClick = () => {
    if(props.active) {
      props.setActive('');
    } else if (props.setActive) {
      props.setActive('active');
    }
  }

  return(
    <li className="navitem-container">
      <Link to={props.link} className={`navitem ${props.active}`} onClick={() => {onClick()}}>
        {props.icon && <span className="icon">
          {props.icon}
        </span>}
        {props.text && <span className="navitem-text">
          {props.text}
        </span>}
      </Link>
      {props.active && props.children}
    </li>
  )
}

export default Navitem;