import axios from 'axios';
import store from './store';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 1000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.state.accessToken;
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;