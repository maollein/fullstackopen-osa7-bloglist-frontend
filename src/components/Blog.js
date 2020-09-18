import React from 'react';
import './blog.css';
import { likeBlog, deleteBlog, addComment } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import { useDispatch } from 'react-redux';
import classes from '../constants/classes';
import { useHistory } from 'react-router-dom';
import Comments from './Comments';

const Blog = ({ blog, user }) => {

  const dispatch = useDispatch();
  const history = useHistory();
  if (!blog) return null;

  const getDeleteButton = () => {
    if (blog.user.id === user.id) {
      return <input type='button' value='delete' onClick={confirmAndDelete} className='btn btn-outline-danger btn-sm' />;
    } else return null;
  };

  const removeBlog = async (id) => {
    try {
      dispatch(deleteBlog(id));
      history.push('/blogs');
    } catch (error) {
      dispatch(setNotification(error.response.data.error, classes.ERROR, 3));
    }
  };

  const like = async () => {
    dispatch(likeBlog(blog.id));
  };

  const confirmAndDelete = () => {
    if (window.confirm('Permanently delete this blog')) {
      removeBlog(blog.id);
    }
  };

  const addNewComment = (comment) => {
    dispatch(addComment({ comment }, blog.id));
  };

  return (
    <div className='mx-auto full-blog'>
      <h2>{blog.title} {blog.author}</h2>
      <p>{blog.url}</p>
      <p>{blog.likes} likes</p>
      <p>{blog.user.name}</p>
      <input className='btn btn-outline-primary btn-sm' type='button' value='like' onClick={like} />
      {getDeleteButton()}
      <Comments blog={blog} addNewComment={addNewComment}/>
    </div>
  );
};

export default Blog;
