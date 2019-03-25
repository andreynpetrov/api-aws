const state = {
  items: {}
};

const actions = {
  refreshItems({ state, dispatch }) {
    state.items = {};
    dispatch(`getItems`);
  },
  getItems({ state, commit }) {
    if (state.items.count) {
      //commit("getItemsSuccess", state.items);
    } else {
      commit("getItemsRequest");
    }
  }
};

const mutations = {
  getItemsRequest(state) {
    state.items = { loading: true };
  },
  getItemsSuccess(state, response) {
    state.items = response;
  },
  getItemsFailure(state, error) {
    state.items = { error };
  },
  updateFilter(state, payload) {
    state.filter = payload;
  }
};

export const pages = {
  namespaced: true,
  state,
  actions,
  mutations
};
