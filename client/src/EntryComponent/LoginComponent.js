import React, {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import {UserContext} from '../Contexts/UserContext.js';
import './style.css';

const Login = (props) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const [errorMessage, setErrorMessage] = useState('placeholder');
  const [, setUser] = useContext(UserContext);

  const checkInput = () => {
    if(email === "" || password === "") {
      setErrorMessage('Please fill out all fields');
      setError("error-visible");
      return false;
    } else if(!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      setErrorMessage('Email is invalid');
      setError("error-visible");
      return false;
    } else if(password.length <= 5) {
      setErrorMessage('Password must be longer than 6 characters');
      setError("error-visible");
      return false;
    } else {
      return true;
    }
  }

  const sendLogin = async (user) => {
    let url = '/API/users/login';
    const res = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user)
    });
    const resData = await res.json();
    if(res.status === 200) {
      setUser(resData);
      props.history.push('/');
    } else {
      setErrorMessage('The email or password is incorrect');
      setError("error-visible");
    }
  }

  const onClick = async (event) => {
    event.preventDefault();
    const inputAllowed = await checkInput();
    if(inputAllowed) {
      let user = {
        email: email,
        password: password
      }
      sendLogin(user);
    }
  }
  const GuestLogin = async (event) => {
    event.preventDefault();
    let user = {
      email: 'guest@guest.com',
      password: 'guestpassword'
    }
    sendLogin(user);
  }

  return (
    <form className="entry">
      <h1>Sign In</h1>
      <p className={`error-text ${error}`}>{errorMessage}</p>
      <input type="email" placeholder="Email" className="input" onChange={event => setEmail(event.target.value)} autoComplete="off"></input>
      <input type="password" placeholder="Password" className="input" onChange={event => setPassword(event.target.value)} autoComplete="off"></input>
      <input type="submit" onClick={onClick} className="submit" value="Sign In"></input>
      <Link to='/Register' className="entry-link">Don't have an account? Sign up</Link>
      <input type="submit" onClick={GuestLogin} className="demo" value="Demo Sign In"></input>
    </form>
  );
}

export default Login;