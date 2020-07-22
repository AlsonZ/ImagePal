import React, { useContext } from 'react';
import './style.css';
import { ReactComponent as UserIcon } from '../../icons/user.svg';
import { ReactComponent as MoonIcon } from '../../icons/moon.svg';
import { ReactComponent as SunIcon } from '../../icons/sun.svg';
import { ReactComponent as CogIcon } from '../../icons/cog.svg';
import { ReactComponent as ExitIcon } from '../../icons/exit.svg';
import { ThemeContext } from '../../Contexts/ThemeContext';
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

const DropDownMenu = () => {

  const [, setTheme] = useContext(ThemeContext);

  const handleThemeChange = (theme) => {
    setTheme(theme);
  }

  return(
    <div className="dropdownmenu">
      <div className="menu">
        <DropDownItem icon={<MoonIcon/>} name="DarkMode" onClick={()=>{handleThemeChange('darkmode')}}/>
        <DropDownItem icon={<SunIcon/>} name="LightMode" onClick={()=>{handleThemeChange('lightmode')}}/>
        <DropDownItem icon={<UserIcon/>} name="Profile"/>
        <DropDownItem icon={<CogIcon/>} name="Settings"/>
        <DropDownItem icon={<ExitIcon/>} name="Logout"/>
      </div>
    </div>
  )

}


export default DropDownMenu;