/******************************** IMPORTS ********************************/
// libraries
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
// local files
import LogoutButton from '../../User/LogoutButton';
import './NavBarMain.css';
import flareLogo from '../../../assets/flare-branding/logo/flare-logo-2.png';

/******************************* COMPONENT *******************************/
const NavBarMain = () => {

  const session = true;

  /****************** access store *******************/
  const sessionUser = useSelector(state => state.session.user);

  /************ key into pertinent values ************/
  let userId = true
  // let userId
  // if (sessionUser) userId = sessionUser.id

  /************* conditional components **************/
  let sessionLinks;
  if (userId) {
    sessionLinks = (
      <div className="nav-bar-right">
        <button>Toggle You Menu component</button>
        <button>Toggle Explore Menu component</button>

        <NavLink to='upload' exact={true}>
          <i class="fa-solid fa-cloud" id="navbar-upload-photo-button"></i>
        </NavLink>
        <button>Toggle Account Menu component</button>
      </div>
    )
  } else {
    sessionLinks = (
      <div className="nav-bar-right">
      <NavLink to='/login' exact={true} activeClassName='active'>
        Login
      </NavLink>

      <NavLink to='/sign-up' exact={true} activeClassName='active'>
        Sign Up
      </NavLink>
    </div>
    )
  }

  /**************** render component *****************/
  return (
    <div className='page-wrapper-container'>

      {/* <div className={session ? "navigation-bar" : ""}></div> */}
      <nav className='navigation-bar' id="navbar-main">

            <NavLink to='/' exact={true} activeClassName='active'>
              <img src={flareLogo} className="navigation-bar-logo"></img>
            </NavLink>

            {sessionLinks}

            {/* <NavLink to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink> */}

            {/* <LogoutButton /> */}

      </nav>

    </div>
  );
}

export default NavBarMain;
