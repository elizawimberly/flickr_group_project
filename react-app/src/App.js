import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/User/LoginForm';
import SignUpForm from './components/User/SignUpForm';
import NavBar from './components/NavigationBars/NavBarMain';
import ProtectedRoute from './components/ProtectedComponents/ProtectedRoute';
import UsersList from './components/ProtectedComponents/UsersList';
import User from './components/ProtectedComponents/User';
import { authenticate } from './store/session';
import Landing from './components/Landing';
import LandingSession from './components/Landing/LandingSession';
import LandingNoSession from './components/Landing/LandingNoSession';
import Explore from './components/Photos/Explore';
import Photostream from './components/Photos/Photostream';

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

        <Route path='/' exact={true} >
          <Landing />
        </Route>

        {/* yeet both landing routes once landing is set up to auto render */}
        <Route path='/landing/no-session' exact={true} >
          <LandingNoSession />
        </Route>

        <Route path='/landing/session' exact={true} >
          <LandingSession />
        </Route>

        <Route path='/explore' exact={true} >
          <Explore />
        </Route>

        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>

        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>


        <Route path='/photostream' exact={true}>
          <Photostream />
        </Route>



        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>

        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}


      </Switch>

    </BrowserRouter>
  );
}

export default App;
