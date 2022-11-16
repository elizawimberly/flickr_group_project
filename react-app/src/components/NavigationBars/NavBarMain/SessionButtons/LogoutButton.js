import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../../../../store/sessionReducer';

const LogoutButton = () => {

  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout()).then(Redirect('/'));
  };

  return (
      <p onClick={onLogout} id="logout-button">Logout</p>
  )
};

export default LogoutButton;
