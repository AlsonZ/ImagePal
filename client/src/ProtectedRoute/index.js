import React, { useContext, useEffect } from 'react';
import {Route, Redirect} from 'react-router-dom'
import {UserContext} from '../Contexts/UserContext'

const ProtectedRoute = ({component: Component, ...rest}) => {
  const [user] = useContext(UserContext)
  return(
    <Route
      {...rest}
      render = {(props) => {
        if(user.loading) {
          return (
            <div>
              LOADING
            </div>
          )
        }
        if(user.username && user.email) {
          return <Component {...props}/>
        } else {
          return <Redirect to='/Login'/>
        }
      }}
    />
  )
}

export default ProtectedRoute;