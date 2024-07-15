import axios from 'axios';
import store from './store';
import router from './router';
import { toast } from 'bulma-toast'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api', // Django REST FrameworkのAPIのベースURLを設定
  timeout: 1000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.accessToken; // Vuexストアからトークンを取得
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Authorizationヘッダーにトークンを設定
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // 401エラー（Unauthorized）が返ってきた場合、トークンが無効または期限切れ
      // ログアウト処理を実行し、ログイン状態をクリアする
      store.dispatch('logout');// Vuexストアのログアウトアクションを呼び出し
      router.push('/');// ログイン画面にリダイレクトする

      toast({
        message: 'セッションが切れました。再度ログインしてください。',
        type: 'is-danger',
        dismissible: true,
        pauseOnHover: true,
        duration: 2000,
        position: 'bottom-right',
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;