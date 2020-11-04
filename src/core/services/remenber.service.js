import VueCookie from "vue-cookie";

const ID_USER_KEY = "currentUser";
const USER_EXPIRES = 15; // day

export function sharedDomain() {
  // return (process.env.VUE_APP_DOMAIN_NAME.indexOf('.') > 0 ? '.' : '') + process.env.VUE_APP_DOMAIN_NAME
  return process.env.VUE_APP_DOMAIN_NAME
}

export const getUser = () => {
  return JSON.parse(VueCookie.get(ID_USER_KEY));
};

export const saveUser = user => {
  VueCookie.set(ID_USER_KEY, JSON.stringify(user), {
    expires: USER_EXPIRES,
    domain: sharedDomain()
  })
};

export const destroyUser = () => {
  VueCookie.delete(ID_USER_KEY, { domain: sharedDomain() })
};

export default { getUser, saveUser, destroyUser };
