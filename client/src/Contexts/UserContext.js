import React,{useState, createContext} from 'react';

export const UserContext = createContext();

export const UserProvider = (props) => {
const [userID, setUserID] = useState({
  email: "",
  username: "",
});
return(
  <UserContext.Provider value={[userID, setUserID]}>
      {props.children}
  </UserContext.Provider>
);
}