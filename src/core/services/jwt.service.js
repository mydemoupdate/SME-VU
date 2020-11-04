import VueCookie from "vue-cookie";

const ID_TOKEN_KEY = "access_token";
const TOKEN_EXPIRES = 1; // day

export function sharedDomain() {
  // return (process.env.VUE_APP_DOMAIN_NAME.indexOf('.') > 0 ? '.' : '') + process.env.VUE_APP_DOMAIN_NAME
  return process.env.VUE_APP_DOMAIN_NAME
}

export const getToken = () => {
  return VueCookie.get(ID_TOKEN_KEY);
};

export const saveToken = token => {
  VueCookie.set(ID_TOKEN_KEY, token, {
    expires: TOKEN_EXPIRES,
    domain: sharedDomain()
  })
};

export const destroyToken = () => {
  VueCookie.delete(ID_TOKEN_KEY, { domain: sharedDomain() })
};

export default { getToken, saveToken, destroyToken };
