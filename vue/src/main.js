import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import Amplify, * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'
import awsmobile from './aws-exports'

Amplify.configure(awsmobile)

Vue.config.productionTip = false;
Vue.use(AmplifyPlugin, AmplifyModules)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

