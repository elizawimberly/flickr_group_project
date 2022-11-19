import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/sessionReducer';
import background from '../../assets/background-log-in-or-sign-up.jpg';
import './User.css';
import flareLogo from '../../assets/flare-branding/logo/flare-logo-4.png';


/******************************* COMPONENT *******************************/
const LoginForm = () => {

  /************ reducer/API communication ************/
  const dispatch = useDispatch();

  /****************** manage state *******************/
  const user = useSelector(state => state.session.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  /***************** handle events *******************/
  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      let dbErrors = data.map(error => error.split(':')[1])
      setErrors(dbErrors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const demoUser = async (e) => {
    e.preventDefault();
    const data = await dispatch(login('demo@aa.io', 'password'));
    if (data) {
      setErrors(data);
    }
  }

  /**************** render component *****************/
  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='page-wrapper-container'>

      <div className="background-image-container">
        <img className="background-image" alt='background' src={background}></img>
      </div>
      {/* <div className='login-form-component' style={{backgroundImage:`url(${background})`}}> */}

      <div className='LoginForm-and-SignUpForm-components'>

        <div className='login-signup-form' id="login-form">

          <div>
            <img src={flareLogo} alt='logo' className="login-signup-form-logo"></img>
          </div>

          <div>
            <p className="login-signup-form-prompt">Log in to Flare</p>
          </div>

          <form onSubmit={onLogin}>

            <div>
              <label htmlFor='email'></label>
              <input
                name='email'
                type='text'
                placeholder='Email address'
                value={email}
                onChange={updateEmail}
                required={true}
                className="login-signup-form-input-field"
                />
            </div>

            <div>
              <label htmlFor='password'></label>
              <input
                name='password'
                type='password'
                placeholder='Password'
                value={password}
                onChange={updatePassword}
                required={true}
                className="login-signup-form-input-field"
                />
            </div>

            <div className='errors-container'>
              {errors.map((error, ind) => (
                <div className='form-errors' key={ind}>{error}</div>
                ))}
            </div>


            <button type='submit' className='login-signup-form-button'>Sign in</button>

            <div onClick={demoUser} className='demo-signup-form-button'>
              Continue as Demo User
            </div>
          </form>

          <div className='form-redirect-prompt'>
            Not a Flare member? {' '}
            <span>
              <NavLink to='/sign-up' exact={true} className='form-link'>
              Sign up here.
              </NavLink>
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginForm;
