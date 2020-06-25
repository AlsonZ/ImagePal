import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Nav from './navbar';
import Login from './entry/login.js';
import Register from './entry/register.js';
import Frontpage from './frontpage';

function App() {
  return (
    <div className="App">
      <Router>
        <Nav/>
        <div className="posts">
          <Route exact path="/" component={Frontpage}/>  
          <Route exact path="/Login" component={Login}/>  
          <Route exact path="/Register" component={Register}/>  
        </div>
      </Router>
    </div>
  );
}

export default App;
