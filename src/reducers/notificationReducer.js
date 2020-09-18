const notificationReducer = (state = { message: '', style: '', timeout: null }, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return { ...state, message: action.data.message, style: action.style };
    case 'REMOVE_NOTIFICATION':
      return { ...state, message: '', style: '' };
    case 'ADD_TIMEOUT':
      return { ...state, timeout: action.data.timeoutId };
    case 'REMOVE_TIMEOUT':
      return { ...state, timeout: null };
    default:
      return state;
  }
};

export const addTimeout = (id) => {
  return {
    type: 'ADD_TIMEOUT',
    data: {
      timeoutId: id
    }
  };
};

export const removeTimeout = () => {
  return {
    type: 'REMOVE_TIMEOUT'
  };
};

export const showNotification = (message, style) => {
  return {
    type: 'SHOW_NOTIFICATION',
    data: {
      message,
      style
    }
  };
};

export const removeNotification = () => {
  return {
    type: 'REMOVE_NOTIFICATION'
  };
};

export const setNotification = (message, style, time) => {
  return async (dispatch, getState) => {
    const timeoutId = getState().notification.timeout;
    if (timeoutId) {
      clearTimeout(timeoutId);
      dispatch(removeTimeout());
    }
    dispatch(showNotification(message, style));
    const id = setTimeout(() => {
      dispatch({ type: 'REMOVE_NOTIFICATION' });
      dispatch(removeTimeout());
    }, time * 1000);
    dispatch(addTimeout(id));
  };
};

export default notificationReducer;