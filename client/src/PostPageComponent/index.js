import React, { useEffect, useState } from 'react';
import Post from '../PostComponent';

const PostPage = (props) => {

  const [postData, setpostData] = useState('');

  const post = props.location.post ? props.location.post : postData;

  const fetchData = async() => {
    const res = await fetch(`/API/posts/post/${window.location.pathname.split('/')[2]}`);
    console.log(res.status);
    if(res.status === 200) {
      const resData = await res.json();
      // console.log(resData);
      setpostData(resData);
    } else {
      //redirect to frontpage as post doesnt exist
    }
  }

  useEffect(() => {
    // get post if props.location.post does not exist
    
    fetchData();
  },[])


  return (
    <div className="postpage">
      <Post post={post}/>
      <div className="sidebar">sidebar here</div>
    </div>
  )
}

export default PostPage;