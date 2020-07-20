import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Navitem = (props) => {
  //possibly turn into context
  const [open, setOpen] = useState(false);

  return(
    <li className="navitem">
      <Link to={props.link} className="icon" onClick={() => {setOpen(!open)}}>
        {props.icon}
      </Link>
      {open && props.children}
    </li>
  )
}

export default Navitem;