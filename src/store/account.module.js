const state = {
  user: null,
  isAuthenticated: null
};

const actions = {
  setIsAuthenticated({ commit }, isAuthenticated) {
    commit("isAuthenticated", isAuthenticated);
  },
  setUser({ commit }, user) {
    commit("setUser", user);
  }
};

const mutations = {
  isAuthenticated(state, isAuthenticated) {
    state.isAuthenticated = isAuthenticated;
  },
  setUser(state, user) {
    state.user = user;
  }
};

export const account = {
  namespaced: true,
  state,
  actions,
  mutations
};
