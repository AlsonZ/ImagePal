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

  useEffect(() => {
    const fetchData = async () => {
      let res = await fetch('/API/posts/frontpage/10');
      if(res.status === 200) {
        const resData = await res.json();
        console.log(resData);
        setPosts(resData);
      }
    }
    fetchData();
  },[])
  useEffect(() => {
    //update state with posts?
  },[posts])
  useEffect(() => {
    if(user.email !== "") {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false)
    }
  },[user])

  const postdata1 = {
    username: "bob",
    image: "/images/bio.jpg",
    height: "320px",
    width: "600px",
    date: "Sun Jun 28 2020 03:23:43 GMT+1000 (Australian Eastern Standard Time)",
  }
  const postdata2 = {
    username: "bob",
    image: "/images/chem.jpg",
    height: "320px",
    width: "600px",
    date: "Sun Jun 29 2020 03:23:43 GMT+1000 (Australian Eastern Standard Time)",
  }
  const postdata3 = {
    username: "bob",
    image: "/images/chem.jpg",
    height: "320px",
    width: "600px",
    date: Date(),
  }
  const postData = [postdata1, postdata2,postdata1, postdata2,];

  const loadPosts = () => {
    return(posts.map((post) => 
      <Post post={post}/>
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
            <span className="button">New</span>
            <span className="button">Top</span>
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