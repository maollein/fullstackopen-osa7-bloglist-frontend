import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import classes from '../constants/classes';
import { setNotification } from '../reducers/notificationReducer';
import { loginUser } from '../reducers/userReducer';
import { useHistory } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const history = useHistory();

  const login = (e) => {
    e.preventDefault();
    try {
      dispatch(loginUser(username, password));
      history.push('/blogs');
    } catch (error) {
      dispatch(setNotification(error.response.data.error, classes.ERROR, 3));
    }
  };

  return (
    <div className='mx-auto'>
      <h2>Login</h2>
      <form id='login-form' onSubmit={login}>
        <div className='my-1'>
          <input id='login-username-input' type='text' placeholder='username' value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div className='my-1'>
          <input id='login-password-input' type='password' placeholder='password' value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className='my-1'>
          <input id='login-btn' type='submit' className='btn btn-outline-primary btn-sm' value='Log in' />
        </div>
      </form>
    </div>
  );
};

export default LoginForm;