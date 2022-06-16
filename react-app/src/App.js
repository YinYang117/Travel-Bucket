import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import NavBar from './components/Navigation/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import Home from './components/Home';
import IndividualTrip from './components/IndividualTrip';
import { authenticate } from './store/session';
import SplashPage from './components/SplashPage/SplashPage';
import EventModal from './components/EventModal';
import MapContainer from './components/Map';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/Home' >
          <Home/>
        </ProtectedRoute>
        <ProtectedRoute path="/trips/:tripId">
          <IndividualTrip />
        </ProtectedRoute>
        <ProtectedRoute path='/events' >
          <EventModal/>
        </ProtectedRoute>
        <ProtectedRoute path='/map'>
          <MapContainer />
        </ProtectedRoute>
        <Route path='/' >
          <SplashPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
