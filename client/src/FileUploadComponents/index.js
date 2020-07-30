import React, { useState } from 'react'
import UploadPost from './UploadPostComponent';
import { Redirect } from 'react-router-dom';

export const CommentOnPost = (props) => {
  const postID = props.location.postID ? props.location.postID : window.location.pathname.split('/')[2];
  const onSuccess = () => {
    props.history.push(`/post/${postID}`)
  }
  return (
    <UploadPost url={`/API/posts/newComment/${postID}`} postID={postID} title="Reply To Post" onSuccess={onSuccess}/>
  )
}

export const EditPost = (props) => {
  const postID = props.location.postID ? props.location.postID : window.location.pathname.split('/')[2];
  const onSuccess = () => {
    props.history.push(`/post/${postID}`)
  }
  return(
    <UploadPost url="/API/posts/editpost" postID={postID} title="Edit Post" onSuccess={onSuccess}/>
  )
}

export const NewPost = (props) => {
  const [location, setLocation] = useState('');
  const onSuccess = (postID) => {
    // props.history.push(`/post/${postID}`);
    setLocation(postID);
  }
  return(
    <>
      <UploadPost url="/API/posts/newpost" title="Create New Post" onSuccess = {onSuccess} />
      {location && <Redirect push to={`/post/${location}`}/>}
    </>
  )
}
