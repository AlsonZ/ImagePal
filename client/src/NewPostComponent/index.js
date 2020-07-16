import React from 'react';
import UploadPost from '../UploadPostComponent';

const NewPost = (props) => {

  const onSuccess = (postID) => {
    props.history.push(`/post/${postID}`);
  }

  return(
    <div>
      <UploadPost url="/API/posts/newpost" onSuccess = {onSuccess}/>
    </div>
  )
}
export default NewPost;