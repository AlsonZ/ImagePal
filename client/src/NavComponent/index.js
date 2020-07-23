import React, { useEffect, useContext, useState } from 'react';
import {Link} from 'react-router-dom';
import {ReactComponent as UserIcon} from '../icons/user.svg'
import {ReactComponent as CaretIcon} from '../icons/caret.svg'
import {ReactComponent as HomeIcon} from '../icons/home.svg'
import {UserContext} from '../Contexts/UserContext';
import NavBar from './NavBarComponent' 
import NavItem from './NavItemComponent' 
import DropDownMenu from './DropDownMenuComponent'
import './style.css';

const Nav = () => {

  const [user] = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    if(user.email && user.username) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  },[user]);

  return (
    <NavBar>
      <Link className="title-parent" to="/">
        <span className="icon"><HomeIcon/></span>
        <span className="title">ImagePal</span>
      </Link>
      {!isLoggedIn && <NavItem link="/login" text="Sign In"/>}
      {!isLoggedIn && <NavItem link="/register" text="Sign Up"/>}
      {isLoggedIn && <NavItem icon={<CaretIcon/>} active={active} setActive={setActive}>
        <DropDownMenu active={active} setActive={setActive}/>
      </NavItem>}
    </NavBar>
  );
}

export default Nav;