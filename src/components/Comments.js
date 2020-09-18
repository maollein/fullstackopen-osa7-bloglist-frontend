import React, { useState } from 'react';

const Comments = ({ blog, addNewComment }) => {

  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewComment(comment);
    setComment('');
  };

  return (
    <div className='mt-4 mb-3'>
      <h3>comments</h3>
      <form className='mt-2' onSubmit={handleSubmit}>
        {/* <input type='text' value={comment} onChange={e => setComment(e.target.value)} />
        <input type='submit' className='btn btn-outline-primary btn-sm' value='Add comment' /> */}
        <div className="input-group input-group-sm">
          <input type="text" value={comment} onChange={e => setComment(e.target.value)} className="form-control" placeholder="Write a comment" />
          <div className="input-group-append">
            <input className="btn btn-outline-primary" type="submit" />
          </div>
        </div>
      </form>
      <ul className='list-group mt-2'>
        {blog.comments.map((comment, index) => <li className='list-group-item' key={index}>{comment}</li>)}
      </ul>
    </div>
  );
};

export default Comments;