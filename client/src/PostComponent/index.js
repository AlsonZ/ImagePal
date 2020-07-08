import React, { useState, useReducer } from 'react';
import './style.css';

const Post = (props) => {

  const initialState = {
    love: '',
    happy: '',
    sad: '',
    angry: '',
    evil: '',
  }
  const handleEmojis = (state, {emoji}) => {;
    switch (emoji) {
      case 'love': {
        const newState = state.love === 'active' ? '' : 'active'
        return({...initialState, love: newState});
      }
      case 'happy': {
        const newState = state.happy === 'active' ? '' : 'active'
        return({...initialState, happy: newState});
      }
      case 'sad': {
        const newState = state.sad === 'active' ? '' : 'active'
        return({...initialState, sad: newState});
      }
      case 'angry': {
        const newState = state.angry === 'active' ? '' : 'active'
        return({...initialState, angry: newState});
      }
      case 'evil': {
        const newState = state.evil === 'active' ? '' : 'active'
        return({...initialState, evil: newState});
      }

    }
  }
  const [state, dispatch] = useReducer(handleEmojis, initialState)
  

  return (
    <div className="post">
      <div className="user">
        Posted by {props.post.author}
      </div>
      <div className="image">
        {/* {props.post.image} */}
        <img src={props.post.imageUrl} height={props.post.height} width={props.post.width}/>
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