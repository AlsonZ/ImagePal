import React, { useState, useEffect } from 'react';
import { Link, Route, useRouteMatch, Switch } from 'react-router-dom';
import Post from '../PostComponent';
import './style.css';

const Posts = () => {

  const [userPosts, setUserPosts] = useState([]);

  const fetchData = async() => {
    const res = await fetch('/API/users/posts');
    if(res.status === 200) {
      console.log('success getting user posts');
      const resData = await res.json();
      console.log(resData);
      setUserPosts(resData);
    }
  }
  useEffect(() => {
    fetchData();
  },[])

  return(
    <div>
      {userPosts.map((post) => 
        <Post post={post}/>
      )}
    </div>
  )
}

const ChangePassword = () => {

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [error, setError] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const logout = async() => {
    const res = await fetch('/API/users/logout', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
    });
    if(res.status === 200) {
      window.location.reload();
    }
  }

  const submitPasswordChange = async() => {
    const passwords = {
      oldPassword: oldPassword,
      newPassword: newPassword,
      checkPassword: checkPassword
    }
    const res = await fetch('/API/users/change/password', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(passwords)
    });
    if(res.status === 200) {
      // success
      setErrorMessage('Password successfully changed');
      setError("success-visible");
      // logout
      setTimeout(() => {
        logout();
      }, 1000)
    } else {
      const resData = await res.json();
      setErrorMessage(resData);
      // setErrorMessage('The Password you entered is incorrect');
      setError("error-visible");
    }
  }

  const onClick = async (e) => {
    e.preventDefault();
    if(!oldPassword) {
      setErrorMessage('Please enter your old password');
      setError("error-visible");
    } else if(!newPassword || !checkPassword) {
      setErrorMessage('Please enter a new password');
      setError("error-visible");
    } else if(newPassword === checkPassword) {
      await submitPasswordChange();
    } else {
      setErrorMessage('The passwords do not match');
      setError("error-visible");
    }

  }

  return(
    <div className="main-content">
      <div className="form-container">
        <h1>Change Password</h1>
        <p className={`error-text ${error}`}>{errorMessage}</p>
        <form>
          <label>Old Password</label>
          <input type="password" placeholder="Old Password" className="input" onChange={event => setOldPassword(event.target.value)} autoComplete="off"></input>
          <label>New Password</label>
          <input type="password" placeholder="New Password" className="input" onChange={event => setNewPassword(event.target.value)} autoComplete="off"></input>
          <label>Confirm New Password</label>
          <input type="password" placeholder="New Password" className="input" onChange={event => setCheckPassword(event.target.value)} autoComplete="off"></input>
          <input type="submit" onClick={onClick} className="submit" value="Change Password"></input>
        </form>
      </div>
    </div>
  )
}

const Profile = () => {

  // const [component, setComponent] = useState(<Posts/>);
  let { path, url } = useRouteMatch();

  return (
    <div className="profile">
      {/* show posts like frontpage, sidebar has like "change password, change username, change email?, all lead to settings page with those options" */}
      <div className="main">
        <Switch>
          <Route exact path={`${path}/ChangePassword`} component={ChangePassword}/>
          <Route exact path={`${path}`} component={Posts}/>
        </Switch>
      </div>
      <div className="sidebar">
        <div className="sidebar-box about">
          <h1>Settings</h1>
          <p>About the Imagepal Forum</p>
          <Link className="button" to={`${url}`}>View User Posts</Link>
          <Link className="button" to={`${url}/ChangePassword`}>Change Password</Link>
          <Link className="button" to={`${url}/ChangePassword`}>Change Email</Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;