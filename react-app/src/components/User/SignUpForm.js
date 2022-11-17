import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Redirect } from 'react-router-dom';
import { signUp } from '../../store/sessionReducer';
import background from '../../assets/background-log-in-or-sign-up.jpg'
import './User.css';
import flareLogo from '../../assets/flare-branding/logo/flare-logo-4.png';



/******************************* COMPONENT *******************************/
const SignUpForm = () => {

  /************ reducer/API communication ************/
  const dispatch = useDispatch();

  /****************** manage state *******************/
  const user = useSelector(state => state.session.user);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [about, setAbout] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [errors, setErrors] = useState([]);

  /***************** handle events *******************/
  const onSignUp = async (e) => {
    console.log(firstName, lastName, email, password, repeatPassword)
    e.preventDefault();
    if (password !== repeatPassword) {
      setErrors(["Those passwords didn't match. Please try again."])
    } else {
      const data = await dispatch(signUp(username, firstName, lastName, email, password));
      if (data) {
        setErrors(data)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const updateLastName = (e) => {
    setLastName(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateAbout = (e) => {
    setAbout(e.target.value);
  };

  /**************** render component *****************/
  if (user) {
    return <Redirect to='/' />;
  }

  return (

  <div className='page-wrapper-container'>

    <div className="background-image-container">
      <img className="background-image" src={background}></img>
    </div>

    <div className='LoginForm-and-SignUpForm-components'>

      <div className='login-signup-form' id="signup-form">

        <div>
          <img src={flareLogo} className="login-signup-form-logo"></img>
        </div>

        <div>
          <p className="login-signup-form-prompt">Sign up for Flare</p>
        </div>

        <form onSubmit={onSignUp}>

        <div>
            <label></label>
            <input
              type='text'
              name='firstName'
              placeholder='First name'
              onChange={updateUsername}
              value={firstName}
              required={true}
              className="login-signup-form-input-field"
            ></input>
          </div>

          <div>
            <label></label>
            <input
              type='text'
              name='firstName'
              placeholder='First name'
              onChange={updateFirstName}
              value={firstName}
              required={true}
              className="login-signup-form-input-field"
            ></input>
          </div>

          <div>
            <label></label>
            <input
              type='text'
              name='lastName'
              placeholder='Last name'
              onChange={updateLastName}
              value={lastName}
              required={true}
              className="login-signup-form-input-field"
            ></input>
          </div>

          <div>
            <label></label>
            <input
              type='text'
              name='email'
              placeholder='Email address'
              onChange={updateEmail}
              value={email}
              required={true}
              className="login-signup-form-input-field"
            ></input>
          </div>

          <div>
            <label>Write something about yourself</label>
            <input
              type='text'
              name='firstName'
              placeholder='First name'
              onChange={updateAbout}
              value={firstName}
              required={true}
              min={2}
              max={500}
              className="login-signup-form-input-field"
            ></input>
          </div>

          <div>
            <label></label>
            <input
              type='password'
              name='password'
              placeholder='Password'
              onChange={updatePassword}
              value={password}
              required={true}
              className="login-signup-form-input-field"
            ></input>
          </div>

          <div>
            <label></label>
            <input
              type='password'
              name='repeat_password'
              placeholder='Confirm password'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
              className="login-signup-form-input-field"
            ></input>
          </div>

          <div className='errors-container'>
              {errors.map((error, ind) => (
                <div key={ind} className='form-errors'>{error}</div>
              ))}
          </div>

          <button type='submit' className='login-signup-form-button'>Sign up</button>

        </form>

        <div className='disclaimer'>
          By signing up, you agree with Flare's
          <span><a href='https://www.flickr.com/help/terms' className='form-link'>{' '}Terms of Services</a></span>
          {' '}and
          <span><a href='https://www.flickr.com/help/privacy' className='form-link'>{' '}Privacy Policy.</a></span>
        </div>

        <div className='form-redirect-prompt'>
          Already a Flare member? {' '}
          <span>
            <NavLink to='/login' exact={true} className='form-link'>
            Log in here.
            </NavLink>
          </span>
        </div>

      </div>

    </div>
  </div>

  );
};

export default SignUpForm;
