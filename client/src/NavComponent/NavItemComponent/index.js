import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

const Navitem = (props) => {
  //possibly turn into context
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  const onClick = () => {
    setOpen(!open);
    if(active) {
      setActive('');
    } else {
      setActive('active');
    }
  }

  return(
    <li className="navitem-container">
      <Link to={props.link} className={`navitem ${active}`} onClick={() => {onClick()}}>
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