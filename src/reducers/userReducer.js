import loginService from '../services/login';
import blogService from '../services/blogs';

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'INIT_USER':
      return action.data.user;
    case 'LOGIN_USER':
      return action.data.user;
    case 'LOGOUT_USER':
      return null;
    default:
      return state;
  }
};

export const initUser = () => {
  return dispatch => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      blogService.setToken(user.token);
      dispatch({
        type: 'INIT_USER',
        data: {
          user
        }
      });
    }
  };
};

export const loginUser = (username, password) => {
  return async dispatch => {
    const user = await loginService.login(username, password);
    localStorage.setItem('user', JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch({
      type: 'LOGIN_USER',
      data: {
        user
      }
    });
  };
};

export const logoutUser = () => {
  return dispatch => {
    blogService.setToken(null);
    localStorage.removeItem('user');
    dispatch({
      type: 'LOGOUT_USER'
    });
  };
};

export default userReducer;