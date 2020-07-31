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

  const loadItem = () => {
    if(props.link) {
      return(
        <Link to={props.link} className='navitem'>
          {props.icon && <span className="icon">
            {props.icon}
          </span>}
          {props.text && <span className="navitem-text">
            {props.text}
          </span>}
        </Link>
      )
    } else {
      return(
        <div className={`navitem ${props.active}`} onClick={() => {onClick()}}>
          {props.icon && <span className="icon">
            {props.icon}
          </span>}
          {props.text && <span className="navitem-text">
            {props.text}
          </span>}
        </div>
      )
    }
  }

  return(
    <li className="navitem-container">
      {loadItem()}
      {props.active && props.children}
    </li>
  )
}

export default Navitem;