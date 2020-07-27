import React from 'react';
import './style.css';
import {ReactComponent as WarningIcon} from '../icons/warning.svg';

const NotFound = () => {
  return (
    <div className="not-found">
      <p>
        <WarningIcon/>
        <div>
          Page Not Found!
        </div>
      </p>
    </div>
  )
}

export default NotFound;