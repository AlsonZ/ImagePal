import React from 'react';
import UploadPost from '../UploadPostComponent';

const NewPost = () => {
  return(
    <div>
      <UploadPost url="/API/posts/newpost" />
    </div>
  )
}
export default NewPost;