import "@babel/polyfill";
import "./plugins/bootstrap-vue";
import "./registerServiceWorker";
import Vue from "vue";
import './plugins/vuetify'
import VueRouter from "vue-router";

// amplify configuration
import Amplify, * as AmplifyModules from "aws-amplify";
import { AmplifyPlugin } from "aws-amplify-vue";
import awsmobile from "./aws-exports";
Amplify.configure(awsmobile);

// Vue components
import App from "./App.vue";
//import Auth from "./components/Auth.vue";
//import Home from "./components/Home.vue";
//import Protected from "./components/Protected.vue";
//import Profile from "./components/Profile.vue";

// Vuex store
import { store } from "./store";

// global styles
// require('./assets/main.css')

// route configuration
// eslint-disable-next-line
//const routes = [
//  { path: "/", component: Auth },
//  { path: "/protected", component: Protected, meta: { requiresAuth: true } },
//  { path: "/home", component: Home },
//  { path: "/profile", component: Profile, meta: { requiresAuth: true } }
//];

import router from "./router";
Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(AmplifyPlugin, AmplifyModules);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
