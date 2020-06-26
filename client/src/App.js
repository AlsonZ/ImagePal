import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Nav from './NavComponent';
import Frontpage from './FrontPageComponent';
import Login from './EntryComponent/LoginComponent.js';
import Register from './EntryComponent/RegisterComponent.js';
import Profile from './ProfileComponent';
import {UserProvider} from './Contexts/UserContext';
import {PostsProvider} from './Contexts/PostsContext';

function App() {
  return (
    <>
      <UserProvider>
        <PostsProvider>
          <div className="App">
            <Router>
              <Nav/>
              <div className="components">
                <Route exact path="/" component={Frontpage}/>  
                <Route exact path="/Login" component={Login}/>  
                <Route exact path="/Register" component={Register}/>  
                <Route exact path="/Profile" component={Profile}/>  
              </div>
            </Router>
          </div>
        </PostsProvider>
      </UserProvider>
    </>
  );
}

export default App;
