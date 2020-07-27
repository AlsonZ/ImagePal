import React, { useContext, useState } from 'react';
import './style.css';
import { ReactComponent as UserIcon } from '../../icons/user.svg';
import { ReactComponent as MoonIcon } from '../../icons/moon.svg';
import { ReactComponent as SunIcon } from '../../icons/sun.svg';
import { ReactComponent as ExitIcon } from '../../icons/exit.svg';
import { ThemeContext } from '../../Contexts/ThemeContext';
import { UserContext } from '../../Contexts/UserContext';
import { Redirect } from 'react-router-dom';

const DropDownItem = ({icon, name, onClick}) => {
  return(
    <div className="menu-item" onClick={onClick}>
      <span className="icon">
        {icon}
      </span>
      <span className="name">{name}</span>
    </div>
  )
}

const DropDownMenu = (props) => {

  const [, setTheme] = useContext(ThemeContext);
  const [user, setUser] = useContext(UserContext);
  const [location, setLocation] = useState('');

  const handleThemeChange = (theme) => {
    setTheme(theme);
    props.setActive('');
  }
  const handleLink = (location) => {
    setLocation(location);
    //allow time for a redirect before closing menu
    setTimeout(()=>{props.setActive('');}, 10)
  }
  const handleLogout = async () => {
    const res = await fetch('/API/users/logout', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
    });
    if(res.status === 200) {
      props.setActive('');
      window.location.reload();
    }
    const resData = await res.json();
    console.log(resData);
  }

  return(
    <div className="dropdownmenu">
      <div className="menu">
        <DropDownItem icon={<MoonIcon/>} name="DarkMode" onClick={()=>{handleThemeChange('darkmode')}}/>
        <DropDownItem icon={<SunIcon/>} name="LightMode" onClick={()=>{handleThemeChange('lightmode')}}/>
        <DropDownItem icon={<UserIcon/>} name="Profile" onClick={()=>{handleLink('/profile')}}/>
        {/* <DropDownItem icon={<CogIcon/>} name="Settings" onClick={()=>{handleLink('/settings')}}/> */}
        <DropDownItem icon={<ExitIcon/>} name="Logout" onClick={()=>{handleLogout()}}/>
      </div>
      {location && <Redirect push to={location}/>}
    </div>
  )

}


export default DropDownMenu;