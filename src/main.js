import "@babel/polyfill";
import "./registerServiceWorker";
import Vue from "vue";
import "./plugins/vuetify";
import VueRouter from "vue-router";

// amplify configuration
import Amplify, * as AmplifyModules from "aws-amplify";
import { AmplifyPlugin } from "aws-amplify-vue";
import awsmobile from "./aws-exports";
Amplify.configure(awsmobile);

// Vue components
import App from "./App.vue";

// Vuex store
import { store } from "./store";

// global styles
// require('./assets/main.css')

import router from "./router";
Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(AmplifyPlugin, AmplifyModules);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
