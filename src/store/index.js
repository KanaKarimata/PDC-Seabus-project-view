import { createStore } from 'vuex'
import axiosInstance from '../axios';

export default createStore({
  state: {
    isAuthenticated: false,
    accessToken: localStorage.getItem('accessToken') || '',
    refreshToken: localStorage.getItem('refreshToken') || '',
    editPermissionEnum: {
      MASTER: 6,
      YOKOHAMA_STATION: 1,
      RED_BRICK: 2,
      YAMASHITA_PARK: 3
    },
    userPermission: [],
    operationRuleList: [],
    operationRuleName: null
  },
  getters: {
    getEditPermission: state => state.editPermissionEnum,
    getUserPermission: state => state.userPermission,
    getOperationRuleList: state => state.operationRuleList,
    getOperationRuleName: state => state.operationRuleName
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
    setUserPermission(state, data) {
      state.userPermission = data
    },
    setOperationRuleList(state, data) {
      state.operationRuleList = data
    },
    setOperationRuleName(state, data) {
      state.operationRuleName = data
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
    async getOperationRuleListData({ commit }) {
      try {
        const response = await axiosInstance.get('http://localhost:8000/operation-rule/index/')
        console.log('APIレスポンス:', response.data)
        commit('setOperationRuleList', response.data.operation_rules);
        commit('setUserPermission', response.data.user_permissions);
      } catch (error) {
        console.error('APIエラー:', error.response ? error.response.data : error.message)
      }
    },
    async getOperationRuleInfo({ commit }, operation_rule_id) {
      // try {
      //   const response = await axiosInstance.get(`http://localhost:8000/operation-rule/info/${operation_rule_id}/`)
      //   console.log('APIレスポンス:', response.data)
      //   commit('setOperationRuleName', response.data.operation_rule_name);
      // } catch (error) {
      //   console.error('APIエラー:', error.response ? error.response.data : error.message)
      // }
    },
  },
  modules: {
  }
})
