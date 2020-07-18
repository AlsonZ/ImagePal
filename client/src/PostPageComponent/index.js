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
      return({
        pathname: `/editpost/${post._id}`,
        postID: post._id
      })
    } else {
      return(`/Post/${post._id}`)
    }

  }
  const handleDelete = async () => {
    const url = '/API/posts/deletepost';
    const data = {
      postID: post._id,
    }
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    })
    if(res.status === 200) {
      // resData = await res.json();
      //redirect to frontpage
      props.history.push('/');
      console.log('this got deleted');
    } else {
      const resData = await res.json();
      console.log(resData);
    }
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
          <Link className="button" to={()=>handleEdit()} >Edit Post</Link>
          <div className="button" onClick={()=>{handleDelete()}}>Delete Post</div>
          <div className="button" >Comment on Post</div>
        </div>
      </div>
    </div>
  )
}

export default PostPage;