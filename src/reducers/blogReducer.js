import blogService from '../services/blogs';
import { setNotification } from './notificationReducer';
import classes from '../constants/classes';

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_BLOG':
      return state.concat(action.data.blog);
    case 'LIKE_BLOG':
      return state.map(blog => blog.id === action.data.blog.id
        ? action.data.blog
        : blog
      );
    case 'DELETE_BLOG':
      return state.filter(blog => blog.id !== action.data.id);
    case 'INIT_BLOGS':
      return action.data.blogs;
    case 'ADD_COMMENT':
      return state.map(blog => blog.id === action.data.blog.id
        ? action.data.blog
        : blog
      );
    default:
      return state;
  }
};

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT_BLOGS',
      data: {
        blogs
      }
    });
  };
};

export const addBlog = (blog) => {
  return async dispatch => {
    const newBlog = await blogService.addBlog(blog);
    dispatch({
      type: 'ADD_BLOG',
      data: {
        blog: newBlog
      }
    });
    dispatch(setNotification('Blog added', classes.SUCCESS, 3));
  };
};

export const likeBlog = (id) => {
  return async dispatch => {
    const likedBlog = await blogService.updateBlog(id, {}, true);
    dispatch({
      type: 'LIKE_BLOG',
      data: {
        blog: likedBlog
      }
    });
  };
};

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.deleteBlog(id);
    dispatch({
      type: 'DELETE_BLOG',
      data: {
        id
      }
    });
    dispatch(setNotification('Blog deleted', classes.SUCCESS, 3));
  };
};

export const addComment = (comment, id) => {
  return async dispatch => {
    const blog = await blogService.addComment(comment, id);
    dispatch({
      type: 'ADD_COMMENT',
      data: {
        blog
      }
    });
    dispatch(setNotification('Comment added', classes.SUCCESS, 3));
  };
};

export default blogReducer;