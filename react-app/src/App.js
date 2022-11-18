import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/User/LoginForm';
import SignUpForm from './components/User/SignUpForm';
import NavBar from './components/NavigationBars/NavBarMain';
import { authenticate } from './store/sessionReducer';
import Landing from './components/Landing';
import LandingSession from './components/Landing/LandingSession';
import LandingNoSession from './components/Landing/LandingNoSession';
import Explore from './components/Photos/Explore';
import Photostream from './components/Photos/Photostream';
import PhotoDetailsPage from './components/Photos/PhotoDetailsPage';
import PhotoCreateForm from './components/Photos/PhotoCreateForm';
import PhotoUpdateForm from './components/Photos/PhotoUpdateForm';
import Albumstream from './components/Albums/Albumstream';
import AlbumDetailsPage from './components/Albums/AlbumDetailsPage';
import AlbumCreateForm from './components/Albums/AlbumCreateForm';
import AlbumUpdateForm from './components/Albums/AlbumUpdateForm';

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

        {/* LANDING */}
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


        {/* USER */}
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>

        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>


        {/* PHOTOS */}
        <Route path='/explore' exact={true} >
          <Explore />
        </Route>

        <Route path='/photostream' exact={true}>
          <Photostream />
        </Route>

        <Route path='/photos/upload' exact={true}>
          <PhotoCreateForm />
        </Route>

        <Route path='/photos/:photoId' exact={true}>
          <PhotoDetailsPage />
        </Route>

        <Route path='/photos/:photoId/edit' exact={true}>
          <PhotoUpdateForm />
        </Route>


        {/* ALBUMS */}
        <Route path='/albums' exact={true}>
          <Albumstream />
        </Route>

        <Route path='/albums/create' exact={true}>
          <AlbumCreateForm />
        </Route>

        <Route path='/albums/:albumId' exact={true}>
          <AlbumDetailsPage />
        </Route>

        <Route path='/albums/:albumId/organize' exact={true}>
          <AlbumUpdateForm />
        </Route>


        {/* PROTECTED COMPONENTS
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>

        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}

        <Route>
          Page Not Found
        </Route>


      </Switch>

    </BrowserRouter>
  );
}

export default App;
