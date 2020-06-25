import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Nav from './NavComponent';
import Frontpage from './FrontPageComponent';
import Login from './EntryComponent/LoginComponent.js';
import Register from './EntryComponent/RegisterComponent.js';

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
