import Vue from 'vue'
import router from './router'
import store from './services/store'
import ApiService from './services/api.service'
import i18n from "./plugins/vue-i18n";
import CoreuiVue from '@coreui/vue'
import { iconsSet as icons } from '@/assets/icons/icons.js'
import lodash from './plugins/lodash'

import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

export const options = {
    router,
    store,
    i18n,
    icons,
    lodash,
}

export default {
    init() {
        Vue.config.performance = true
        Vue.use(CoreuiVue)
        Vue.prototype.$log = console.log.bind(console)

        Vue.component('Treeselect', Treeselect)

        Vue.component('Splitpanes', Splitpanes)
        Vue.component('Pane', Pane)

        ApiService.init();
    }
}