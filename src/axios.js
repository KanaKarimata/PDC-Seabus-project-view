import axios from 'axios';
import store from './store'; // Vuexストアのインポート

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api', // Django REST FrameworkのAPIのベースURLを設定
  timeout: 1000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.state.accessToken; // Vuexストアからトークンを取得（必要に応じて変更）
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Authorizationヘッダーにトークンを設定
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;