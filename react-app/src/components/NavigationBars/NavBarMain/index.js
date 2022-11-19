/******************************** IMPORTS ********************************/
// libraries
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// local files
import './NavBarMain.css';
import flareLogo from '../../../assets/flare-branding/logo/flare-logo-2.png';
import ToggleAccountMenu from './SessionButtons/ToggleAccountMenu';
import ToggleYouMenu from './SessionButtons/ToggleYouMenu';
import ToggleExploreMenu from './SessionButtons/ToggleExploreMenu';

/******************************* COMPONENT *******************************/
const NavBarMain = () => {

  /****************** access store *******************/
  const sessionUser = useSelector(state => state.session.user);

  /************ key into pertinent values ************/
  let userId
  if (sessionUser) userId = sessionUser.id

  /************* conditional components **************/
  let sessionLinks;
  if (userId) {
    sessionLinks = (
      <>
        <div className="nav-bar-right-A">
          <div>
            <ToggleYouMenu />
          </div>
          <div>
            <ToggleExploreMenu />
          </div>
        </div>

        <div className='nav-bar-right-B'>
          <div>
            <NavLink to='/photos/upload' exact={true}>
              <i class="fa-solid fa-cloud" id="navbar-upload-photo-button"></i>
            </NavLink>
          </div>
          <div>
            <ToggleAccountMenu />
          </div>
        </div>
      </>
    )
  } else {
    sessionLinks = (
      <>
        <div className='nav-bar-right-B'>
          <div>
            <NavLink to='/login' exact={true} activeClassName='active' id="login-button">
              Log In
            </NavLink>
          </div>

          <div>
            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              <button id="signup-button">Sign Up</button>
            </NavLink>
          </div>
        </div>
      </>
    )
  }

  /**************** render component *****************/
  return (
    <div className='page-wrapper-container'>

      {/* <div className={session ? "navigation-bar" : ""}></div> */}
      {/* <nav className={'navigation-bar'} id={landingNoSession && landingNoSession ? "landing-no-session-navbar-main": "navbar-main"}> */}
      <nav className={'navigation-bar'} id="navbar-main">

        <div class="nav-bar-left">
            <NavLink to={'/'} exact={true} activeClassName='active'>
              <img src={flareLogo} alt='logo' className="navigation-bar-logo"></img>
            </NavLink>
        </div>

        <div className="nav-bar-right">
          {sessionLinks}
        </div>

            {/* <NavLink to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink> */}

            {/* <LogoutButton /> */}

      </nav>

    </div>
  );
}

export default NavBarMain;
