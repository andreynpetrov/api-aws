import { pageService } from "../services";

const state = {
  page: {},
  pageList: {}
};

const actions = {
  getPage({ state, commit }, slug) {
    commit("getPageRequest");
    pageService
      .getPage(state, slug)
      .then(
        response => commit("getPageSuccess", response),
        error => commit("getPageFailure", error)
      );
  },
  updatePage({ state, commit }, page) {
    commit("updatePageSuccess", page)
/*     commit("updatePageRequest");
    pageService
      .updatePage(state, page)
      .then(
        response => commit("updatePageSuccess", response),
        error => commit("updatePageFailure", error)
      ); */
  },
  getPageList({ state, commit }) {
    commit("getPageListRequest");
    pageService
      .getPageList(state)
      .then(
        response => commit("getPageListSuccess", response),
        error => commit("getPageListFailure", error)
      );
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
  },
  updatePageRequest(state) {
    state.page = { updating: true };
  },
  updatePageSuccess(state, response) {
    state.page = response;
  },
  updatePageFailure(state, error) {
    state.page = { error };
  },
  getPageListRequest(state) {
    state.pageList = { loading: true };
  },
  getPageListSuccess(state, response) {
    state.pageList = { loading: false, Pages: response };
  },
  getPageListFailure(state, error) {
    state.pageList = { error };
  }
};

export const pages = {
  namespaced: true,
  state,
  actions,
  mutations
};
