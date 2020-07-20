import React from 'react';
import './style.css';
import {ReactComponent as UserIcon} from '../../icons/user.svg'

const DropDownMenu = () => {

  return(
    <div className="dropdownmenu">
      <div className="menu">
        <div className="menu-item">
          <span className="icon">
            <UserIcon />
          </span>
          {/* <UserIcon className="icon"/> */}
          <span className="name">test</span>
        </div>
      </div>
    </div>
  )

}

export default DropDownMenu;