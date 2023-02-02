import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

// Protected Routes redirect a user who is not logged in back to our main page "/"
const ProtectedRoute = props => {
  const user = useSelector(state => state.session.user)
  return (
    <Route {...props}>
      {(user)? props.children  : <Redirect to='/' />}
    </Route>
  )
};

export default ProtectedRoute;
