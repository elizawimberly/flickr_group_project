
import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../User/LogoutButton';
import './NavBar.css';

const NavBar = () => {
  return (
    <div className='page-wrapper-container'>

      <nav className='navigation-bar-main'>

            <NavLink to='/' exact={true} activeClassName='active'>
              Home
            </NavLink>

            <NavLink to='/login' exact={true} activeClassName='active'>
              Login
            </NavLink>

            <NavLink to='/sign-up' exact={true} activeClassName='active'>
              Sign Up
            </NavLink>

            {/* <NavLink to='/users' exact={true} activeClassName='active'>
              Users
            </NavLink> */}

            <LogoutButton />

      </nav>

    </div>
  );
}

export default NavBar;
