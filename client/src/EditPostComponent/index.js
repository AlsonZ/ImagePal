import React, { useEffect } from 'react';
import UploadPost from '../UploadPostComponent';

const EditPost = (props) => {

  const postID = props.location.postID ? props.location.postID : window.location.pathname.split('/')[2];

  useEffect(() => {
    console.log(window.location.pathname.split('/')[2]);
    console.log(props.location.postID);
    if(!props.location.postID) {
      //redirect to frontpage or post page
      // mabe also get it from the url like the postpage?
    }
    // redirect to post page if not the user who posted it?
    // dont allow people to link to this page?, mabe require the user?
    // dont allow refreshing the edit page?
  },[])

  return(
    <div>
      <UploadPost url="/API/posts/editpost" postID={postID} title="Edit Post"/>
    </div>
  )
}
export default EditPost;