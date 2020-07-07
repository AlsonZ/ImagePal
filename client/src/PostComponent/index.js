import React from 'react';
import './style.css';

const Post = (props) => {

  return (
    <div className="post">
      <div className="user">
        Posted by {props.post.author}
      </div>
      <div className="image">
        {/* {props.post.image} */}
        <img src={props.post.imageUrl} height={props.post.height} width={props.post.width}/>
      </div>
      <div className="emojis">
        emoji's here
        {/*emoji's go here, mabe pass in the array from the posts props to give number of reactions?*/}
      </div>
    </div>
  );
}

export default Post;