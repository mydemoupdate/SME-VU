
// action types | mutation types
export const PUSH_TOAST = "pushToast";
export const CLEAR_TOASTS = "clearToast";

// getters types
export const TOASTS = "toasts";
export const TIMEOUT_TOASTS = "timeoutToasts";

// types | colors
export const SUCCESS = "success";
export const ERROR = "danger";
export const WARNING = "warning";
export const MESSAGE = "dark";

const state = {
  toasts: [],
  timeout: 5000,
};

const getters = {
  [TIMEOUT_TOASTS](state) {
    return state.timeout;
  },
  [TOASTS](state) {
    return state.toasts;
  },
}

const actions = {
  [PUSH_TOAST](context, toast) {
    context.commit(PUSH_TOAST, toast)
  },
  [CLEAR_TOASTS](context) {
    context.commit(CLEAR_TOASTS)
  },
};

const mutations = {
  [PUSH_TOAST](state, { title, message, type }) {
    state.toasts.push({
      title,
      message,
      type,
    });
  },
  [CLEAR_TOASTS](state) {
    state.toasts = []
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
