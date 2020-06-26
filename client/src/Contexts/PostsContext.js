import React,{useState, createContext} from 'react';

export const PostsContext = createContext();

export const PostsProvider = (props) => {
// const [posts, setPosts] = useState({
//   username: "",
//   image: "",
//   comments: {},
//   numberOfEmojiReactions: {},
// });
const [posts, setPosts] = useState({});
return(
  <PostsContext.Provider value={[posts, setPosts]}>
      {props.children}
  </PostsContext.Provider>
);
}