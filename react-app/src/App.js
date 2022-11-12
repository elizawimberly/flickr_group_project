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

        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>

        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>

        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}

        <Route path='/' exact={true} >
          <h1>Currently and H1 tag; replace with conditional component</h1>
          {/* <Landing /> */}
        </Route>

      </Switch>

    </BrowserRouter>
  );
}

export default App;
