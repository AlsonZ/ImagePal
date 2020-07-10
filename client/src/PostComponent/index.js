import React, { useState, useContext, useEffect } from 'react';
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
  const checkLoggedIn = () => {
    if(user.username && user.email) {
      return true;
    } else {
      return false;
    }
  }
  useEffect(() => {
    // load state from post
    if(post.reactions && post.reactions[user.username]) {
      initialState[post.reactions[user.username]] = 'active';
    }
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
  const handleEmojis = async ({emoji}) => {
    if(checkLoggedIn()) {
      let newState;
      if(emojis[emoji] === 'active') {
        // remove reaction 
        delete post.reactions[user.username]
        // post.reactions[user.username] = emoji;
        post.score -=1;
        //remove from array
        newState = '';
      } else {
        // check if array has user, change reaction or add to array
        if(!post.reactions) {
          // reactions object does not exist
          // no pre-existing reactions from user
          post = {
            ...post, 
            reactions: {
              [user.username] : emoji,
            }
          }
          post.score +=1;
        } else {
          // reactions object exists
          // change this into ternary operator
          if(post.reactions[user.username]) {
            // previous reaction exists from user
          } else {
            // no previous reaction from user
            post.score +=1;
          }
          post.reactions[user.username] = emoji;
        }
        newState = 'active';
      }
      //update backend about post changes
      const updated = await updatePost(post);
      if(updated) {
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

  // need to have a check for intial state to change if current user is in array
  const [emojis, setEmojis] = useState(initialState);

  
  

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
        <li className={emojis.love} onClick={()=>{handleEmojis({emoji: 'love'})}}>😍</li>
        <li className={emojis.happy} onClick={()=>{handleEmojis({emoji: 'happy'})}}>😊</li>
        <li className={emojis.sad} onClick={()=>{handleEmojis({emoji: 'sad'})}}>😢</li>
        <li className={emojis.angry} onClick={()=>{handleEmojis({emoji: 'angry'})}}>😡</li>
        <li className={emojis.evil} onClick={()=>{handleEmojis({emoji: 'evil'})}}>😈</li>
        {/*emoji's go here, mabe pass in the array from the posts props to give number of reactions?*/}
      </ul>
    </div>
  );
}

export default Post;