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

  const fetchData = async () => {
    let res = await fetch(`/API/posts/frontpage/${sort}/10`);
    if(res.status === 200) {
      const resData = await res.json();
      console.log(resData);
      setPosts(resData);
    }
  }

  useEffect(() => {
    fetchData();
  },[])

  useEffect(() => {
    if(user.email !== "") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false)
    }
  },[user])

  const setSorting = (type) => {
    setSort(type);
    fetchData();
  }

  const loadPosts = () => {
    return(posts.map((post) => 
      <Post key={post._id} post={post}/>
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
          <div className="sidebar-box about">
            <h1>About Community</h1>
            <p>About the Imagepal Forum</p>
          </div>
          <div className="sidebar-box rules">
            <h1>Rules</h1>
            <p>Do not post image with Text</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Frontpage;