import React, { useRef } from 'react';
import classes from '../constants/classes';
import AddBlogForm from './AddBlogForm';
import Togglable from '../components/Togglable';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from '../reducers/notificationReducer';
import { addBlog } from '../reducers/blogReducer';
import './blog.css';

const Blogs = () => {

  const dispatch = useDispatch();

  const sortBlogList = (listOfBlogs) => {
    const newBlogList = [...listOfBlogs];
    newBlogList.sort((a, b) => b.likes - a.likes);
    return newBlogList;
  };

  const blogList = sortBlogList(useSelector(state => state.blogs));
  const user = useSelector(state => state.user);

  const addBlogFormRef = useRef();

  const addNewBlog = async (title, author, url) => {
    try {
      dispatch(addBlog({ title, author, url }));
      addBlogFormRef.current.toggleVisibility();
    } catch (error) {
      dispatch(setNotification(error.response.data.error, classes.ERROR, 3));
    }
  };

  return (
    <div className='mx-auto'>
      <h2>blogs</h2>
      <Togglable buttonLabel="Add blog" ref={addBlogFormRef}>
        <AddBlogForm addBlog={addNewBlog} />
      </Togglable>
      <div className='list-group mb-3'>
        {user
          ? blogList.map(blog =>
            // <Blog key={blog.id} blog={blog} deleteBlog={removeBlog} user={user} likeBlog={like} />
            <a className='list-group-item list-group-item-action' key={blog.id} href={`/blogs/${blog.id}`}>{blog.title}</a>
          )
          : null
        }
      </div>
    </div>
  );
};

export default Blogs;