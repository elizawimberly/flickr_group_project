import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import background from '../../assets/background-log-in-or-sign-up.jpg';
import './User.css';
import flareLogo from '../../assets/flare-branding/logo/flare-logo-4.png';


/******************************* COMPONENT *******************************/
const LoginForm = () => {

  /************ reducer/API communication ************/
  const dispatch = useDispatch();

  /****************** manage state *******************/
  const user = useSelector(state => state.session.user);
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /***************** handle events *******************/
  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  /**************** render component *****************/
  if (user) {
    return <Redirect to='/' />;
  }

  return (

    <div className='page-wrapper-container'>
      <div className='login-form-component' style={{backgroundImage:`url(${background})`}}>
      {/* <div className='login-form-component'> */}


      {/* <div className="background-image-container">
        <img className="background-image" src={background}></img>
      </div> */}

        <div className='login-form'>

          <div>
            <img src={flareLogo} className="login-form-logo"></img>
          </div>

          <div>
            <p className="login-form-prompt">Log in to Flare</p>
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
                className="login-form-input-field"
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
                className="login-form-input-field"
                />
            </div>

            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
                ))}
            </div>


            <button type='submit' className='login-form-button'>Sign in</button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
