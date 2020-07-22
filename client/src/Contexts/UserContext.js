import React,{useState, createContext, useEffect} from 'react';

export const UserContext = createContext();

export const UserProvider = (props) => {

  const initialUser = {
    email: "",
    username: "",
    loading: true,
  }

  const [user, setUser] = useState(initialUser);

  const checkLoggedIn = async () => {
    const res = await fetch('/API/users/checkLoggedIn');
    if(res.status === 200) {
      // console.log('test');
      // console.log(res.status);
      const resData = await res.json();
      setUser({
        email: resData.email,
        username: resData.username,
        loading: false,
      });
    } else {
      // not logged in or error
      setUser({
        ...initialUser,
        loading: false
      })
    }
  }
  useEffect(() => {
    checkLoggedIn();
  },[])

  return(
    <UserContext.Provider value={[user, setUser]}>
        {props.children}
    </UserContext.Provider>
  );
}