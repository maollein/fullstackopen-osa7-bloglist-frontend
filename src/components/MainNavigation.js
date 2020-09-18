import React from 'react';
import { Link } from 'react-router-dom';

const MainNavigation = ({ user, logout }) => {

  const getUserDropdown = () => {
    return (
      <li className='nav-item dropdown'>
        <a className='nav-link dropdown-toggle' href='#' role='button' data-toggle='dropdown'>
          {user.username}
        </a>
        <div className='dropdown-menu dropdown-menu-right'>
          <a className='dropdown-item'>Settings</a>
          <a className='dropdown-item' onClick={logout}>Log out</a>
        </div>
      </li>
    );
  };

  const getLogin = () => {
    return (
      <li className='nav-item'>
        <Link className='nav-link' to='/login'>log in</Link>
      </li>
    );
  };

  return (
    <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
      <Link className='navbar-brand' to='/blogs'>Blog app</Link>
      <button className='navbar-toggler' type='button' data-toggle='collapse' data-target='#main-nav' aria-controls='main-nav' aria-expanded='false' aria-label='Toggle navigation'>
        <span className='navbar-toggler-icon'></span>
      </button>
      <div className='collapse navbar-collapse' id='main-nav'>
        <ul className='navbar-nav'>
          <li className='nav-item'>
            <Link className='nav-link' to='/blogs'>blogs</Link>
          </li>
          <li className='nav-item'>
            <Link className='nav-link' to='/users'>users</Link>
          </li>
        </ul>
        <ul className='navbar-nav ml-auto'>
          {user
            ? getUserDropdown()
            : getLogin()
          }
        </ul>
      </div>
    </nav>
  );
};

export default MainNavigation;