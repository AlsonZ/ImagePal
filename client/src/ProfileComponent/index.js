import React, { useState, useEffect } from 'react';
import { Link, Route, useRouteMatch, Switch } from 'react-router-dom';
import Post from '../PostComponent';
import './style.css';

const Posts = () => {

  const [userPosts, setUserPosts] = useState([]);

  const fetchData = async() => {
    const res = await fetch('/API/users/posts');
    if(res.status === 200) {
      const resData = await res.json();
      setUserPosts(resData);
    }
  }
  useEffect(() => {
    fetchData();
  },[])

  return(
    <>
      {userPosts.map((post) => 
        <Post post={post}/>
      )}
    </>
  )
}

const ChangeItem = ({item}) => {

  const [oldItem, setOldItem] = useState('');
  const [newItem, setNewItem] = useState('');
  const [checkItem, setCheckItem] = useState('');
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

  const submitItemChange = async() => {
    const items = {
      oldItem: oldItem,
      newItem: newItem,
      checkItem: checkItem
    }
    const res = await fetch(`/API/users/change/${item}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(items)
    });
    if(res.status === 200) {
      // success
      setErrorMessage(`${item} successfully changed`);
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
    if(!oldItem) {
      setErrorMessage(`Please enter your old ${item}`);
      setError("error-visible");
    } else if(!newItem || !checkItem) {
      setErrorMessage(`Please enter a new ${item}`);
      setError("error-visible");
    } else if(newItem === checkItem) {
      await submitItemChange();
    } else {
      setErrorMessage(`The ${item}'s do not match`);
      setError("error-visible");
    }

  }

  return(
    <div className="main-content">
      <div className="form-container">
        <h1>Change {item}</h1>
        <p className={`error-text ${error}`}>{errorMessage}</p>
        <form>
          <label>Old {item}</label>
          <input type={item} placeholder={`Old ${item}`} className="input" onChange={event => setOldItem(event.target.value)} autoComplete="off"></input>
          <label>New {item}</label>
          <input type={item} placeholder={`New ${item}`} className="input" onChange={event => setNewItem(event.target.value)} autoComplete="off"></input>
          <label>Confirm New {item}</label>
          <input type={item} placeholder={`New ${item}`} className="input" onChange={event => setCheckItem(event.target.value)} autoComplete="off"></input>
          <input type="submit" onClick={onClick} className="submit" value={`Change ${item}`}></input>
        </form>
      </div>
    </div>
  )
}

const ChangeEmail = () => {
  return(
    <ChangeItem item="Email"/>
  )
}
const ChangePassword = () => {
  return (
    <ChangeItem item='Password'/>
  )
}

const Profile = () => {

  let { path, url } = useRouteMatch();

  return (
    <div className="profile">
      <div className="main">
        <Switch>
          <Route exact path={`${path}/ChangePassword`} component={ChangePassword}/>
          <Route exact path={`${path}/ChangeEmail`} component={ChangeEmail}/>
          <Route exact path={`${path}`} component={Posts}/>
        </Switch>
      </div>
      <div className="sidebar">
        <div className="sidebar-box about">
          <h1>Settings</h1>
          <p>About the Imagepal Forum</p>
          <Link className="button" to={`${url}`}>View User Posts</Link>
          <Link className="button" to={`${url}/ChangePassword`}>Change Password</Link>
          <Link className="button" to={`${url}/ChangeEmail`}>Change Email</Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;