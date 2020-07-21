import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Navitem = (props) => {
  //possibly turn into context
  const [open, setOpen] = useState(false);

  return(
    <li className="navitem-container">
      <Link to={props.link} className="navitem" onClick={() => {setOpen(!open)}}>
        {props.icon && <span className="icon">
          {props.icon}
        </span>}
        {props.text && <span className="navitem-text">
          {props.text}
        </span>}
      </Link>
      {open && props.children}
    </li>
  )
}

export default Navitem;