import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const createApi = () => {
  const api = axios.create({
    baseURL: 'http://localhost:8080',
    withCredentials: true,
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const navigate = useNavigate();
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        localStorage.removeItem('token'); 
        localStorage.removeItem('userId'); 

        navigate('/error');
      }
      return Promise.reject(error);
    }
  );

  return api;
};

export const api = createApi();
