import React from 'react';
import { useSelector } from 'react-redux';
import './notification.css';

const Notification = () => {
  const notification = useSelector(state => state.notification);

  return (
    notification.message
      ?
      <div className={notification.style}>
        <p>{notification.message}</p>
      </div>
      :
      null
  );
};

export default Notification;