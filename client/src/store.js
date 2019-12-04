import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);


const types = {
  //判断是否认证通过
  SET_AUTHENTICATED: "SET_AUTHENTICATED",
  //设置用户
  SET_USER: "SET_USER"
};

const state = {
  //是否授权
  isAuthenticated: false,
  //存储用户信息
  user: {}
};

const getters = {
  //获取是否授权
  isAuthenticated: state => state.isAuthenticated,
  user: state => state.user
};

const mutations = {
  [types.SET_AUTHENTICATED](state, isAuthenticated) {
    if (isAuthenticated) state.isAuthenticated = isAuthenticated;
    else state.isAuthenticated = false;
  },

  [types.SET_USER](state, user) {
    if (user) state.user = user;
    else state.user = {};
  }
};

const actions = {
  setAuthenticated: ({ commit }, isAuthenticated) => {
    commit(types.SET_AUTHENTICATED, isAuthenticated);
  },
  setUser: ({ commit }, user) => {
    commit(types.SET_USER, user);
  },
  //清除当前的状态
  clearCurrentState: ({ commit }) => {
    commit(types.SET_AUTHENTICATED, false);
    commit(types.SET_USER, null);
  }
};

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});
