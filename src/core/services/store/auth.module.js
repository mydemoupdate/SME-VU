import RememberService from "../remenber.service";
import { PUSH_RESPONSE_ERROR, PUSH_ERROR, CLEAR_ERRORS } from "./errors.module"
import { CLEAR_TOASTS } from './toasts.module'
import Auth from '../firebase/auth.firebase'

// action types
export const VERIFY_AUTH = "verifyAuth";
export const LOGIN = "login";
export const LOGOUT = "logout";

// mutation types
export const PURGE_AUTH = "logOut";
export const SET_AUTH = "setUserAuth";

// getters types
export const CURRENT_USER = "currentUser";
export const IS_AUTHENTICATED = "isAuthenticated";
export const EMAIL_VERIFIED = "emailVerified";
export const LOCKED = "currentAuthHasBeenLocked";

const state = {
  user: RememberService.getUser(),
  isAuthenticated: !!RememberService.getUser()
};

const getters = {
  [CURRENT_USER](state) {
    return state.user;
  },
  [IS_AUTHENTICATED](state) {
    return state.isAuthenticated;
  },
  [EMAIL_VERIFIED]() {
    return true;
  },
  [LOCKED](state) {
    return state.user.disabled;
  }
};

const actions = {
  [LOGIN](context, { email, password }) {
    return new Promise((resolve) => {
      return Auth.signInWithEmailAndPassword(email, password).then(function ({ user }) {
        if (user) {
          // login success
          context.commit(SET_AUTH, user);
          resolve(user)
        }
      }).catch(function (error) {
        // login error
        context.dispatch(PUSH_ERROR, { error });
      });
    });
  },
  [LOGOUT](context) {
    Auth.signOut().then(function () {
      context.commit(PURGE_AUTH);
      context.commit(CLEAR_ERRORS);
      context.commit(CLEAR_TOASTS);
    }).catch(function (error) {
      context.dispatch(PUSH_RESPONSE_ERROR, error);
    });
  },
  [VERIFY_AUTH]() {

  },
};

const mutations = {
  [SET_AUTH](state, user) {
    state.isAuthenticated = true;
    state.user = {
      uid: user.uid,
      displayName: user.displayName,
      email: user.email,
      emailVerified: user.emailVerified,
      isAnonymous: user.isAnonymous,
      phoneNumber: user.phoneNumber,
      photoURL: user.photoURL,
      disabled: user.disabled,
      createdAt: user.createdAt,
    };
    RememberService.saveUser(state.user);
  },
  [PURGE_AUTH](state) {
    state.isAuthenticated = false;
    state.user = {};
    RememberService.destroyUser();
  }
};

export default {
  state,
  actions,
  mutations,
  getters,
};
