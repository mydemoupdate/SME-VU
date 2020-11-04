import Vue from "vue";
import Vuex from "vuex";

import { vuexfireMutations } from 'vuexfire';

import stores from "@/store"
import auth from "./auth.module";
import errors from "./errors.module";
import sidebar from "./sidebar.module";
import toasts from "./toasts.module";
import nav from "./nav.module";

Vue.use(Vuex);

export default new Vuex.Store({
  mutations: {
    ...vuexfireMutations,
  },
  modules: {
    auth,
    errors,
    sidebar,
    toasts,
    nav,
    ...stores,
  }
});
