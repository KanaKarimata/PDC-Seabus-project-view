import { createStore } from 'vuex'
import axiosInstance from '../axios';

export default createStore({
  state: {
    accessToken: localStorage.getItem('accessToken') || '',
    refreshToken: localStorage.getItem('refreshToken') || '',
    selectedTime: '',
    selectedStartDateTime: '',
    selectedEndDateTime: '',
  },
  getters: {
    selectedTime: state => state.selectedTime,
    selectedStartDateTime: state => state.selectedStartDateTime,
    selectedEndDateTime: state => state.selectedEndDateTime,
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
    SET_SELECTED_TIME(state, value) {
      state.selectedTime = value
    },
    SET_SELECTED_START_DATETIME(state, value) {
      state.selectedStartDateTime = value
    },
    SET_SELECTED_END_DATETIME(state, value) {
      state.selectedEndDateTime = value
    },
    updateScheduleDetail(state, { index, data }) {
      state.scheduleDetails[index] = { ...state.scheduleDetails[index], ...data };
    }
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
    updateSelectedTime({ commit }, value) {
      commit('SET_SELECTED_TIME', value);
    },
    updateSelectedStartDateTime({ commit }, value) {
      commit('SET_SELECTED_START_DATETIME', value);
    },
    updateSelectedEndDateTime({ commit }, value) {
      commit('SET_SELECTED_END_DATETIME', value);
    },
  },
  modules: {
  }
})
