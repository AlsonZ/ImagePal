import React, { useContext, useEffect, useState } from 'react';
import Post from '../PostComponent';
import {Link} from 'react-router-dom';
import {PostsContext} from '../Contexts/PostsContext';
import {UserContext} from '../Contexts/UserContext';
import './style.css';

const Frontpage = () => {

  const [posts, setPosts] = useContext(PostsContext);
  const [user] = useContext(UserContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sort, setSort] = useState('new-sort');
  const [leaderboard, setLeaderboard] = useState([]);

  const fetchPosts = async (sortType) => {
    let res = await fetch(`/API/posts/frontpage/${sortType}/10`);
    if(res.status === 200) {
      const resData = await res.json();
      console.log(resData);
      setPosts(resData);
    }
  }

  const fetchLeaderboard = async () => {
    const res = await fetch('/API/users/leaderboard');
    if(res.status === 200) {
      const resData = await res.json();
      setLeaderboard(resData);
    }
  }

  useEffect(() => {
    fetchPosts();
    fetchLeaderboard();
  },[])

  useEffect(() => {
    if(user.email !== "") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false)
    }
  },[user])

  const setSorting = (sortType) => {
    setSort(sortType);
    fetchPosts(sortType);
  }

  const loadPosts = () => {
    return(posts.map((post) => 
      <Post post={post}/>
    ))
  }

  const loadLeaderboard = () => {
    return (leaderboard.map((user) =>
      <p className="leaderboard leaderboard-items">
        <span>{user.username}</span>
        <span className="length">{user.length}</span>
      </p>
    ))
  }

  return (
    <>
      {isLoggedIn && 
        <div className="overlay">
          <Link to="/NewPost" className="links">
            <div className="upload-button">+</div>
          </Link>
        </div>
      }
      <div className="frontpage">
        <div className="sorting-parent">
          <div className="sorting">
            <span className={`button ${sort==='new-sort' ? sort:''}`} onClick={()=>{setSorting('new-sort')}}>New</span>
            <span className={`button ${sort==='top-sort' ? sort:''}`} onClick={()=>{setSorting('top-sort')}}>Top</span>
          </div>
        </div>
        <div className="posts-parent">
          {loadPosts()}
        </div>
        <div className="sidebar">
          <div className="sidebar-box">
            <h1>Leaderboard</h1>
            <p className="leaderboard subheadings">
              <span>Username</span>
              <span>Posts</span>
            </p>
            {loadLeaderboard()}
          </div>
          <div className="sidebar-box">
            <h1>About Community</h1>
            <p>About the Imagepal Forum</p>
          </div>
          <div className="sidebar-box">
            <h1>Rules</h1>
            <p>Do not post image with Text</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Frontpage;