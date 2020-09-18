import React from 'react';

const User = ({ user }) => {
  if (!user) return null;

  return (
    <div className='mx-auto'>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <div className='list-group'>
        {user.blogs.map(blog =>
          <a href={`/blogs/${blog.id}`} className='list-group-item list-group-item-action' key={blog.id}>{blog.title}</a>
        )}
      </div>
    </div>
  );
};

export default User;