import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Nav from './NavComponent';
import Frontpage from './FrontPageComponent';
import Login from './EntryComponent/LoginComponent.js';
import Register from './EntryComponent/RegisterComponent.js';
import Profile from './ProfileComponent';
import{ EditPost, NewPost, CommentOnPost} from './FileUploadComponents';
import PostPage from './PostPageComponent';
import {UserProvider} from './Contexts/UserContext';
import {PostsProvider} from './Contexts/PostsContext';
import ProtectedRoute from './ProtectedRoute'

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
                <Route exact path="/Profile/:id" component={Profile}/>  
                <Route exact path="/Post/:id" component={PostPage}/>  
                <ProtectedRoute exact path="/EditPost/:id" component={EditPost}/>  
                <ProtectedRoute exact path="/NewPost" component={NewPost}/>  
                <ProtectedRoute exact path="/CommentOnPost/:id" component={CommentOnPost}/>  
              </div>
            </Router>
          </div>
        </PostsProvider>
      </UserProvider>
    </>
  );
}

export default App;
