import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './style.css';

const Register = (props) => {

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState('placeholder');

  const checkInput = () => {
    if(email === "" || password === "") {
      setErrorMessage('Please fill out all fields');
      setError("error-visible");
    } else if(!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      setErrorMessage('Email is invalid');
      setError("error-visible");
    } else if(password.length <= 5) {
      setErrorMessage('Password must be longer than 6 characters');
      setError("error-visible");
    } 
  }
  
  const createNewUser = async (user) => {
    let url = '/API/users/register';
    const res = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user)
    });
    const resData = await res.json();
    if(resData.message === "registered") {
      // setEmail('');
      // setPassword('');
      props.history.push('/Login');
    } else {
      setErrorMessage(resData.error);
      setError("error-visible");
    }
  }

  const onClick = async (event) => {
    event.preventDefault();
    //check email and password is suitible
    const inputAllowed = await checkInput();
    if(inputAllowed) {
      const user = {
        email: email,
        username: username,
        password: password
      }
      createNewUser(user);
    }
  }

  return (
    <form className="entry">
      <h1>Sign Up</h1>
      <p className={`error-text ${error}`}>{errorMessage}</p>
      <input type="email" placeholder="Email" className="input" onChange={event => setEmail(event.target.value)} autoComplete="off"></input>
      <input type="text" placeholder="Username" className="input" onChange={event => setUsername(event.target.value)} autoComplete="off"></input>
      <input type="password" placeholder="Password" className="input" onChange={event => setPassword(event.target.value)} autoComplete="off"></input>
      <input type="submit" onClick={onClick} className="submit" value="Sign Up"></input>
      <Link to='/Login' className="entry-link">Already have an account? Sign in</Link>
    </form>
  );
}

export default Register;