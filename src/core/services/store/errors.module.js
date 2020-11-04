import { PUSH_TOAST, ERROR as ERROR_TOAST } from './toasts.module'

// action types
export const NOTIFY_ERROR = "notifyError";
export const PUSH_RESPONSE_ERROR = "pushResponseError";
export const PUSH_ERROR = "pushError";
export const CLEAR_ERRORS = "clearErrors";

// mutation types
// PUSH_ERROR
// CLEAR_ERRORS

// getters types
export const ERRORS = "errors";

const state = {
  errors: []
};

const getters = {
  [ERRORS](state) {
    return state.errors;
  },
}

const actions = {
  [NOTIFY_ERROR](context, error) {
    context.dispatch(PUSH_TOAST, {
      title: error.type || error.status || error.code,
      message: error.message,
      type: ERROR_TOAST
    })
  },
  [PUSH_RESPONSE_ERROR](context, response) {
    context.dispatch(PUSH_ERROR, {
      error: {
        type: response.data.error,
        message: response.data.errors?.message || response.data.message,
        code: response.status,
        status: response.statusText,
      },
      notify: true,
    })
  },
  [PUSH_ERROR](context, { error, notify = true }) {
    context.commit(PUSH_ERROR, error)
    if (notify) {
      context.dispatch(NOTIFY_ERROR, error)
    }
  },
  [CLEAR_ERRORS](context) {
    context.commit(CLEAR_ERRORS)
  },
};

const mutations = {
  [PUSH_ERROR](state, { type, message, code, status }) {
    state.errors.push({
      type,
      message,
      code,
      status,
    });
  },
  [CLEAR_ERRORS](state) {
    state.errors = []
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
