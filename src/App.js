import React, { useEffect } from 'react';
import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import { initBlogs } from './reducers/blogReducer';
import { useDispatch, useSelector } from 'react-redux';
import { initUser } from './reducers/userReducer';
import { initUsers } from './reducers/usersReducer';
import Users from './components/Users';
import Notification from './components/Notification';
import User from './components/User';
import Blog from './components/Blog';
import { logoutUser } from './reducers/userReducer';
import {
  Switch, Route, useRouteMatch, useHistory
} from 'react-router-dom';
import './App.css';
import MainNavigation from './components/MainNavigation';

const App = () => {
  const user = useSelector(state => state.user);
  const users = useSelector(state => state.users);
  const blogs = useSelector(state => state.blogs);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(initUser());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(initBlogs());
    }
  }, [user, dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(initUsers());
    }
  }, [user, dispatch]);

  const logout = () => {
    dispatch(logoutUser());
    history.push('/login');
  };

  const matchUser = useRouteMatch('/users/:id');
  const userToShow = matchUser
    ? users.find(u => u.id === matchUser.params.id)
    : null;
  const matchBlog = useRouteMatch('/blogs/:id');
  const blogToShow = matchBlog
    ? blogs.find(u => u.id === matchBlog.params.id)
    : null;

  return (
    <div>
      <MainNavigation user={user} logout={logout} />
      <div className='container-fluid pt-3'>
        <div className='row'>
          <div className='col-lg-3'></div>
          <div className='col-lg-6'>
            <Notification />
            <Switch>
              <Route path='/users/:id'>
                <User user={userToShow} />
              </Route>
              <Route path="/users">
                <Users />
              </Route>
              <Route path="/blogs/:id">
                <Blog blog={blogToShow} user={user} />
              </Route>
              <Route path="/blogs">
                <Blogs />
              </Route>
              <Route path="/login">
                <LoginForm />
              </Route>
              <Route path="/">
                <Blogs />
              </Route>
            </Switch>
          </div>
          <div className='col-lg-3'></div>
        </div>
      </div>
    </div>
  );
};

export default App;