import { createStore } from 'vuex'
import axiosInstance from '../axios';

export default createStore({
  state: {
    isAuthenticated: false,
    accessToken: localStorage.getItem('accessToken') || '',
    refreshToken: localStorage.getItem('refreshToken') || '',
    selectedTime: '',
    selectedStartDateTime: '',
    selectedEndDateTime: '',
    editPermissionEnum: {
      MASTER: 6,
      TO_YOKOHAMA_STATION: 2,
      FROM_RED_BRICK_TO_YAMASHITA_PARK: 3,
      FROM_RED_BRICK_TO_HAMMER_HEAD: 4,
      TO_YAMASHITA_PARK: 5
    }
  },
  getters: {
    selectedTime: state => state.selectedTime,
    selectedStartDateTime: state => state.selectedStartDateTime,
    selectedEndDateTime: state => state.selectedEndDateTime,
    getEditPermission: state => state.editPermissionEnum
  },
  mutations: {
    setAuthenticate(state) {
      state.isAuthenticated = true;
    },
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
      state.isAuthenticated = false;
    },
    initializeStore(state) {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        state.accessToken = accessToken;
        state.isAuthenticated = true;
      } else {
        state.accessToken = '';
        state.isAuthenticated = false;
      }
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        state.refreshToken = refreshToken;
      } else {
        state.refreshToken = '';
      }
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
        commit('setAuthenticate');
      } catch (error) {
        console.error('Login error:', error);
        throw error;
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
