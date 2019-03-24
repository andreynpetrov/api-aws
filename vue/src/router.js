import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import { components } from "aws-amplify-vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { path: "/", name: "home", component: Home, meta: { requiresAuth: false } },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/About.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/auth",
      name: "auth",
      component: components.Authenticator
    }
  ]
});

router.beforeResolve((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    let user;
    Vue.prototype.$Amplify.Auth.currentAuthenticatedUser()
      .then(data => {
        if (data && data.signInUserSession) {
          user = data;
        }
        next();
      })
      .catch(e => {
        next({
          path: "/auth",
          query: {
            redirect: to.fullPath
          }
        });
      });
  }
  next();
});

export default router;
