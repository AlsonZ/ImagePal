import React from 'react'
import UploadPost from './UploadPostComponent';

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
  const onFailure = () => {
    //error msg or redirect to front page
  }
  return(
    <UploadPost url="/API/posts/editpost" postID={postID} title="Edit Post" onSuccess={onSuccess}/>
  )
}

export const NewPost = (props) => {
  const onSuccess = (postID) => {
    props.history.push(`/post/${postID}`);
  }
  return(
    <UploadPost url="/API/posts/newpost" title="Create New Post" onSuccess = {onSuccess} />
  )
}
