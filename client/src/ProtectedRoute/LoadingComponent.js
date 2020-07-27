import React from 'react';
import './style.css';
import {ReactComponent as LoadingIcon} from '../icons/loading.svg';

const Loading = () => {
  return (
    <div className="loading">
      <p>
        <LoadingIcon/>
        <div>
          Loading
        </div>
      </p>
    </div>
  )
}

export default Loading;