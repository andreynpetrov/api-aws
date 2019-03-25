import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import { alert } from "./alert.module";
import { account } from "./account.module";
import { pages } from "./pages.module";

Vue.use(Vuex);

export const store = new Vuex.Store({
  plugins: [createPersistedState()],
  modules: {
    alert,
    account,
    pages
  }
});
