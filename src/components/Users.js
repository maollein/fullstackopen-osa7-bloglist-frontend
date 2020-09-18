import React from 'react';
import { useSelector } from 'react-redux';

const Users = () => {
  const users = useSelector(state => state.users);

  return (
    <div className='mx-auto'>
      <h2>Users</h2>
      <table className='table mt-4'>
        <thead>
          <tr>
            <th scope="col">users</th>
            <th scope="col">blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td><a href={`/users/${user.id}`}>{user.name}</a></td>
              <td>{user.blogs ? user.blogs.length : 0}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;