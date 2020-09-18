import axios from 'axios';
import { useSelector } from 'react-redux';
const baseUrl = '/api/blogs';

const useBlogs = () => {
  const user = useSelector(state => state.user);
  let token = user ? user.token : null;

  const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
  };

  const addBlog = async (blog) => {
    const config = {
      headers: { Authorization: token },
    };
    const request = await axios.post(baseUrl, blog, config);
    return request.data;
  };

  const updateBlog = async (id, blog, like) => {
    const config = {
      headers: { Authorization: token },
    };
    const request = await axios.put(`${baseUrl}/${id}`, { ...blog, like }, config);
    return request.data;
  };

  const deleteBlog = async (id) => {
    const config = {
      headers: { Authorization: token },
    };
    const request = await axios.delete(`${baseUrl}/${id}`, config);
    return request.data;
  };

  return { getAll, addBlog, updateBlog, deleteBlog };
};

export default useBlogs;