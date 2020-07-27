import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../Contexts/UserContext';
import './style.css';

const Post = ({post}) => {
  const [user] = useContext(UserContext);
  const isFrontPage = !window.location.pathname.includes('/',1);
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
  const loadReaction = () => {
    if(post.reactions && post.reactions[user.username]) {
      setEmojis({...initialState, [post.reactions[user.username]]: 'active'});
    } else {
      setEmojis(initialState)
    }
  }
  useEffect(() => {
    // load reaction from post
    loadReaction();
  },[])
  const updatePost = async(data) => {
    let url = '/API/posts/updateEmoji';
    const res = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    });
    if(res.status === 200) {
      const resData = await res.json();
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
        newState = '';
        reaction =  '' 
      } else { // add or change reaction
        reaction = emoji;
        newState = 'active';
      }
      //update backend about post changes
      const updated = await updatePost({_id: post._id, reaction: reaction});
      if(updated) {
        loadReaction();
      }
    } else {
      console.log('login is required');
    }

  }
  const loadPost = () => {
    return (
      <>
        <div className="user">
          <span>
            Posted by {post.author}
          </span>
          <span className="score">
            Reactions: {post.score ? post.score : 0}
          </span>
        </div>
        <div className="image">
          <img src={post.imageUrl} height={post.height} width={post.width}/>
        </div>
      </>
    )
  }
  const loadLink = () => {
    if(isFrontPage) {
      return(
        <Link 
          key={post._id}
          to={{
            pathname: `/Post/${post._id}`,
            post: post,
          }} 
          className="postLink"
        >
          {loadPost()}
        </Link>
      )
    } else {
      return (
        loadPost()
      )
    }
  }

  return (
    <div className="post">
      {loadLink()}
      <ul className={`emojis ${post.isComment}`}>
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