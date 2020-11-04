import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import main, { options } from '@/core/main'

import '@/core/components'
import './components'

main.init()

new Vue({
  el: '#app',
  template: '<App/>',
  ...options,
  components: {
    App
  }
})
