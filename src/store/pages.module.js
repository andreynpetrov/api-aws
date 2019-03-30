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
  createPage({ state, commit }, page) {
    commit("createPageRequest");
    pageService
      .createPage(state, page)
      .then(
        response => commit("createPageSuccess", page),
        error => commit("createPageFailure", error)
      );
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
  createPageRequest(state) {
    state.page = { loading: true };
  },
  createPageSuccess(state, page) {
    state.page = page;
  },
  createPageFailure(state, error) {
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
