import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Post from '../PostComponent';
import './style.css';

const PostPage = (props) => {

  const [postData, setpostData] = useState('');
  const post = props.location.post ? props.location.post : postData;

  const fetchData = async () => {
    const res = await fetch(`/API/posts/post/${window.location.pathname.split('/')[2]}`);
    console.log(res.status);
    if(res.status === 200) {
      const resData = await res.json();
      // console.log(resData);
      setpostData(resData);
      return resData;
    } else {
      //redirect to frontpage as post doesnt exist
    }
  }

  useEffect(() => {
    // get post if props.location.post does not exist
    fetchData();
  },[])

  const handleEdit = () => {
    // cannot edit if there is reactions or comments
    if(post.comments && post.comments.length <= 0 && !post.reactions) {
      // go to edit post page, same as new post page
      // return(`/editpost/${post._id}`)
      return({
        pathname: `/editpost/${post._id}`,
        postID: post._id
      })
    } else {
      return(`/Post/${post._id}`)
    }

  }
  const handleDelete = () => {
    if(post.comments.length > 0) {
      // cannot delete
      // can only replace with placeholder
    }
    // send api call to delete
    // when it is deleted redirect to frontpage
  }


  return (
    <div className="postpage">
      <div className="postparent">
        <Post post={post}/>
      </div>
      <div className="sidebar">
        <div className="sidebar-box post-options">
          <h1>Post Options</h1>
          {/* onClick={()=>{handleEdit()}} */}
          <Link className="link" to={()=>handleEdit()} >Edit Post</Link>
          <Link className="link" onClick={()=>{handleDelete()}}>Delete Post</Link>
        </div>
      </div>
    </div>
  )
}

export default PostPage;