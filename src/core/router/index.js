import Vue from 'vue'
import Router from 'vue-router'
import store from '@/core/services/store'
import redirect from '@/core/redirect'
import config from '@/core/config/routes'
import { IS_AUTHENTICATED } from '@/core/services/store/auth.module'

Vue.use(Router)

const router = new Router({
  mode: 'history', // https://router.vuejs.org/api/#mode
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: config,
})

// Before each route evaluates...
router.beforeEach((routeTo, routeFrom, next) => {
  // Check if auth is required on this route
  // (including nested routes).
  const authRequired = routeTo.matched.some((route) => route.meta.authRequired)

  // If auth isn't required for the route, just continue.
  if (!authRequired) return next()

  // If authenticated, just continue.
  if (!store.getters[IS_AUTHENTICATED]) redirect.auth.toLogin()

  //
  next()
})

router.afterEach((to) => {
  // Use next tick to handle router history correctly
  // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  Vue.nextTick(() => {
    document.title = process.env.VUE_APP_NAME + ' - ' + (to.meta.title || to.name);
  });
});

export default router;
