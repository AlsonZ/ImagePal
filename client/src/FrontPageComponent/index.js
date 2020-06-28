import React, { useContext } from 'react';
import Post from '../PostComponent';
import {Link} from 'react-router-dom';
import {PostContext} from '../Contexts/PostsContext';
import './style.css';

const Frontpage = () => {

  // const postsData = useContext(PostContext);

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
  const postData = [postdata1, postdata2,postdata1, postdata2];

  const loadPosts = () => {
    return(postData.map((post) => 
      <Post post={post}/>
    ))
  }

  return (
    <>
      <div className="overlay">
        <Link to="/NewPost" className="links">
          <div className="upload-button">+</div>
        </Link>
      </div>
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