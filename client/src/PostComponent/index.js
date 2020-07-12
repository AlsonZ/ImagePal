import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../Contexts/UserContext';
import './style.css';

const Post = ({post}) => {
  const [user] = useContext(UserContext);
  const initialState = {
    love: '',
    happy: '',
    sad: '',
    angry: '',
    evil: '',
  }
  const [emojis, setEmojis] = useState(initialState);
  const checkLoggedIn = () => {
    if(user.username && user.email) {
      return true;
    } else {
      return false;
    }
  }
  useEffect(() => {
    // load reaction from post
    if(post.reactions && post.reactions[user.username]) {
      setEmojis({[post.reactions[user.username]]: 'active'});
    }
  },[])
  const updatePost = async(data) => {
    console.log(data);
    let url = '/API/posts/updateEmoji';
    const res = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    if(res.status === 200) {
      const resData = await res.json();
      console.log(resData);
      post = resData;
      return true;
    } else {
      return false;
    }
  }
  const handleEmojis = async ({emoji}) => {
    if(checkLoggedIn()) {
      let newState;
      let reaction;
      if(emojis[emoji] === 'active') { // remove reaction
          // delete post.reactions[user.username]
          // post.score -=1;
        newState = '';
        // call on delete reaction route, provide user to remove
        reaction =  '' 
      } else { // add or change reaction
        // if(!post.reactions) { // reactions object does not exist
          // post = {
          //   ...post, 
          //   reactions: {[user.username] : emoji}
          // }
          // post.score +=1;
          
        // } else { 
          // if user reaction exists, do not add to score
          // as it is just changing emoji reaction
          // post.reactions[user.username] = emoji;
          // post.score += post.reactions[user.username] ? 0 : 1
        // }
        reaction = emoji;
        newState = 'active';
      }
      //update backend about post changes
      const updated = await updatePost({_id: post._id, reaction: reaction});
      console.log(updated);
      if(updated) {
        console.log('inside updated runs')
        setEmojis({...initialState, [emoji]: newState});
      } else {
        //error
        console.log('server error');
      }
    } else {
      // alert user to login
      console.log('login required');
    }

  }

  return (
    <div className="post">
      <Link 
        key={post._id}
        to={{
          pathname: `/Post/${post._id}`,
          post: post,
        }} 
        className="postLink"
      >
      <div className="user">
        Posted by {post.author}
      </div>
      <div className="image">
        <img src={post.imageUrl} height={post.height} width={post.width}/>
      </div>
      </Link>
      <ul className="emojis">
        <li className={emojis.love} onClick={()=>{handleEmojis({emoji: 'love'})}}>😍</li>
        <li className={emojis.happy} onClick={()=>{handleEmojis({emoji: 'happy'})}}>😊</li>
        <li className={emojis.sad} onClick={()=>{handleEmojis({emoji: 'sad'})}}>😢</li>
        <li className={emojis.angry} onClick={()=>{handleEmojis({emoji: 'angry'})}}>😡</li>
        <li className={emojis.evil} onClick={()=>{handleEmojis({emoji: 'evil'})}}>😈</li>
      </ul>
    </div>
  );
}

export default Post;