import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import JwtService from "./jwt.service";
import i18nService from "./i18n.service"

/**
 * Service to call HTTP request via Axios
 */
const ApiService = {
  init() {
    Vue.use(VueAxios, axios);
  },

  setup() {
    //
  },

  /**
   * Set the default HTTP request headers
   */
  setHeader() {
    Vue.axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${JwtService.getToken()}`;

    Vue.axios.defaults.headers.common[
      "Accept-Language"
    ] = i18nService.getActiveLanguage();
  },

  query(resource, params) {
    this.setup();
    return Vue.axios.get(resource, { params });
  },

  /**
   * Send the GET HTTP request
   * @param resource
   * @param slug
   * @returns {*}
   */
  get(resource, slug = "", params) {
    this.setup();
    return Vue.axios.get(`${resource}/${slug}`, { params });
  },

  /**
   * Set the POST HTTP request
   * @param resource
   * @param params
   * @returns {*}
   */
  post(resource, params) {
    this.setup();
    return Vue.axios.post(`${resource}`, params);
  },

  /**
   * Send the UPDATE HTTP request
   * @param resource
   * @param slug
   * @param params
   * @returns {IDBRequest<IDBValidKey> | Promise<void>}
   */
  update(resource, slug, params) {
    this.setup();
    return Vue.axios.put(`${resource}/${slug}`, params);
  },

  /**
   * Send the PUT HTTP request
   * @param resource
   * @param params
   * @returns {IDBRequest<IDBValidKey> | Promise<void>}
   */
  put(resource, params) {
    this.setup();
    return Vue.axios.put(`${resource}`, params);
  },

  /**
   * Send the DELETE HTTP request
   * @param resource
   * @returns {*}
   */
  delete(resource, slug) {
    this.setup();
    return Vue.axios.delete(`${resource}/${slug}`);
  }
};

const AuthService = {
  ...ApiService,
  setup() {
    Vue.axios.defaults.baseURL = process.env.VUE_APP_AUTH_BASE_API;
  }
}

const UserService = {
  ...ApiService,
  setup() {
    Vue.axios.defaults.baseURL = process.env.VUE_APP_USER_BASE_API;
  }
}

const OrderService = {
  ...ApiService,
  setup() {
    Vue.axios.defaults.baseURL = process.env.VUE_APP_ORDER_BASE_API;
  }
}

const AccountingService = {
  ...ApiService,
  setup() {
    Vue.axios.defaults.baseURL = process.env.VUE_APP_ACCOUNTING_BASE_API;
  }
}

const ProductService = {
  ...ApiService,
  setup() {
    Vue.axios.defaults.baseURL = process.env.VUE_APP_PRODUCT_BASE_API;
  }
}

const NotificationService = {
  ...ApiService,
  setup() {
    Vue.axios.defaults.baseURL = process.env.VUE_APP_NOTIFICATION_BASE_API;
  }
}

const WarehouseService = {
  ...ApiService,
  setup() {
    Vue.axios.defaults.baseURL = process.env.VUE_APP_WAREHOUSE_BASE_API;
  }
}

export {
  AuthService,
  UserService,
  OrderService,
  AccountingService,
  ProductService,
  NotificationService,
  WarehouseService,
}

export default ApiService;
