import Vue from "vue";
import Vuex from "vuex";
import { account } from "./account.module";
import { pages } from "./pages.module";
//import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export const store = new Vuex.Store({
  //plugins: [createPersistedState()],
  modules: {
    account,
    pages
  }
});
