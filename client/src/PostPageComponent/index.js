import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import Post from '../PostComponent';
import { UserContext } from '../Contexts/UserContext'
import './style.css';

const PostPage = (props) => {

  const [postData, setpostData] = useState('');
  const [isAuthor, setIsAuthor] = useState(false);
  const [user] = useContext(UserContext);
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
    fetchData();
  },[])
  useEffect(() => {
    if(user.username === post.author) {
      setIsAuthor(true);
    } else {
      setIsAuthor(false);
    }
  },[user])

  const handleEdit = () => {
    // cannot edit if there is reactions or comments
    if(post.comments && post.comments.length <= 0 && !post.reactions) {
      return({
        pathname: `/editpost/${post._id}`,
        postID: post._id
      })
    } else {
      // do nothing
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
  const handleComment = () => {
    return({
      pathname: `/CommentOnPost/${post._id}`,
      postID: post._id
    })
  }
  const loadComments = () => {
    if(post) {
      return(
        post.comments.map((comment) => {
          const commentProp = {...comment, isComment: "isComment"}
          return(<Post post={commentProp}/>)
        })
      )
    }
  }

  return (
    <div className="postpage">
      <div className="postparent">
        <Post post={post}/>
        <h1>Replies</h1>
        {loadComments()}
      </div>
      <div className="sidebar">
        <div className="sidebar-box post-options">
          <h1>Post Options</h1>
          {isAuthor && <Link className="button" to={()=>handleEdit()} >Edit Post</Link>}
          {isAuthor && <div className="button" onClick={()=>{handleDelete()}}>Delete Post</div>}
          <Link className="button" to={()=>handleComment()}>Reply To Post</Link>
          {post && <div className="date">Uploaded at: <span>{post.uploadDate.toString().split('T')[0]}</span></div>}
          {post.lastEditDate && <div className="date">Last Edited at: <span>{post.lastEditDate.toString().split('T')[0]}</span></div>}
        </div>
      </div>
    </div>
  )
}

export default PostPage;