import React from 'react';
import Post from '../PostComponent'
import {PostContext} from '../Contexts/PostsContext';
import './style.css';

const Frontpage = () => {

  const postdata = {
    username: "bob",
    image: "image",

  }

  return (
    <div className="frontpage">
      <div className="sorting-parent">
        <div className="sorting">
          sorting goes here
        </div>
      </div>
      <div className="posts-parent">
        <Post post={postdata}/>
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
  );
}

export default Frontpage;