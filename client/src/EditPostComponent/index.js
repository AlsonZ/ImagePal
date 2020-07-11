import React, { useEffect } from 'react';
import UploadPost from '../UploadPostComponent';

const EditPost = (props) => {

  const postID = props.location.postID ? props.location.postID : '';

  useEffect(() => {
    if(!props.location.postID) {
      //redirect to frontpage or post page
      // mabe also get it from the url like the postpage?
    }
  })

  return(
    <div>
      <UploadPost url="/API/posts/editpost" postID={postID} title="Edit Post"/>
    </div>
  )
}
export default EditPost;