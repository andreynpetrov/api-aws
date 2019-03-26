import { pageService } from "../services";

const state = {
  page: {}
};

const actions = {
  getPage({ state, commit }, slug) {
    commit("getPageRequest");
    var response = pageService.getPage(state, slug);
    console.log(response);
    commit("getPageSuccess", response);
    /*     pageService
      .getPage(state, slug)
      .then(
        response => commit("getPageSuccess", response),
        error => commit("getPageFailure", error)
      ); */
  }
};

const mutations = {
  getPageRequest(state) {
    state.page = { loading: true };
  },
  getPageSuccess(state, response) {
    state.page = response;
  },
  getPageFailure(state, error) {
    state.page = { error };
  }
};

export const pages = {
  namespaced: true,
  state,
  actions,
  mutations
};
