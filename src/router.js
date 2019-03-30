import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "./views/HomeView.vue";
import { components, AmplifyEventBus } from "aws-amplify-vue";
import * as AmplifyModules from "aws-amplify";
import { AmplifyPlugin } from "aws-amplify-vue";
import { store } from "./store";

Vue.use(VueRouter);
Vue.use(AmplifyPlugin, AmplifyModules);

let user;

// eslint-disable-next-line
getUser().then((user, error) => {
  if (user) {
    router.push({ path: "/" });
  }
});

AmplifyEventBus.$on("authState", async state => {
  if (state === "signedOut") {
    user = null;
    store.commit("account/setUser", null);
    router.push({ path: "/auth" });
  } else if (state === "signedIn") {
    user = await getUser();
    router.push({ path: "/" });
  }
});

function getUser() {
  return (
    Vue.prototype.$Amplify.Auth.currentAuthenticatedUser()
      .then(data => {
        if (data && data.signInUserSession) {
          store.commit("account/setUser", data);
          return data;
        }
      })
      // eslint-disable-next-line
    .catch(e => {
        store.commit("account/setUser", null);
        return null;
      })
  );
}

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { requiresAuth: false }
    },
    {
      path: "/about",
      name: "about",
      component: () => import("./views/AboutView.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/pages",
      name: "pages",
      component: () => import("./views/PagesView.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/page/create",
      name: "createPage",
      component: () => import("./views/CreatePageView.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/page/:slug",
      name: "page",
      component: () => import("./views/PageView.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/auth",
      name: "auth",
      component: components.Authenticator
    }
  ]
});

router.beforeResolve(async (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    user = await getUser();
    if (!user) {
      return next({
        path: "/auth",
        query: {
          redirect: to.fullPath
        }
      });
    }
    return next();
  }
  return next();
});

export default router;
