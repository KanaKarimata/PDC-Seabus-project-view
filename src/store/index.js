import { createStore } from 'vuex'
import axiosInstance from '../axios';

export default createStore({
  state: {
    accessToken: localStorage.getItem('accessToken') || '',
    refreshToken: localStorage.getItem('refreshToken') || '',
  },
  getters: {
  },
  mutations: {
    setTokens(state, tokens) {
      state.accessToken = tokens.access;
      state.refreshToken = tokens.refresh;
      localStorage.setItem('accessToken', tokens.access);
      localStorage.setItem('refreshToken', tokens.refresh);
    },
    clearTokens(state) {
      state.accessToken = '';
      state.refreshToken = '';
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await axiosInstance.post('/token/', credentials);
        commit('setTokens', response.data);
      } catch (error) {
        console.error('Login error:', error);
      }
    },
    async refreshToken({ commit, state }) {
      try {
        const response = await axiosInstance.post('/token/refresh/', {
          refresh: state.refreshToken,
        });
        commit('setTokens', response.data);
      } catch (error) {
        commit('clearTokens');
        console.error('Refresh token error:', error);
      }
    },
    logout({ commit }) {
      commit('clearTokens');
    },
  },
  modules: {
  }
})
