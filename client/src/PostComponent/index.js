import React, { useState, useReducer, useContext, useEffect } from 'react';
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
  useEffect(() => {
    //load state from post
    // if(post.reactions[user.username]) {
    //   initialState[post.reactions[user.username]] = 'active';
    // }
  },[])
  // useEffect(() => {
  //   console.log(post.reactions);
  // },[post.reactions])
  const updatePost = async(post) => {
    console.log(post);
    let url = '/API/posts/updateEmoji';
    const res = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(post)
    });
    if(res.status === 200) {
      const resData = await res.json();
      console.log(resData);
      return true;
    } else {
      //error?
      return false;
    }
  }
  const handleEmojis = (state, {emoji}) => {
    let newState;
    if(state[emoji] === 'active') {
      // post.reactions[user.username] = emoji;
      // post.score +=1;
      //remove from array
      newState = '';
    } else {
      // check if array has user, change reaction or add to array
      newState = 'active';
    }
    //update backend about post changes
    // const result = await updatePost(post);
    // return( result ? {...initialState, [emoji]: newState} : initialState);
    return({...initialState, [emoji]: newState});
  }
  const [state, dispatch] = useReducer(handleEmojis, initialState)
  

  return (
    <div className="post">
      <div className="user">
        Posted by {post.author}
      </div>
      <div className="image">
        {/* {props.post.image} */}
        <img src={post.imageUrl} height={post.height} width={post.width}/>
      </div>
      <ul className="emojis">
        <li className={state.love} onClick={()=>{dispatch({emoji: 'love'})}}>😍</li>
        <li className={state.happy} onClick={()=>{dispatch({emoji: 'happy'})}}>😊</li>
        <li className={state.sad} onClick={()=>{dispatch({emoji: 'sad'})}}>😢</li>
        <li className={state.angry} onClick={()=>{dispatch({emoji: 'angry'})}}>😡</li>
        <li className={state.evil} onClick={()=>{dispatch({emoji: 'evil'})}}>😈</li>
        {/*emoji's go here, mabe pass in the array from the posts props to give number of reactions?*/}
      </ul>
    </div>
  );
}

export default Post;