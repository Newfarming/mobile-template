// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueTouch from 'vue-touch'
import {
  sync
} from 'vuex-router-sync'
import numeral from 'numeral'

import App from './App'
import router from './router'
import store from './store'
import {
  i18n
} from './setup/setup-i18n'
import googleAnalytics from './setup/setup-google-analytics'
import facebookPixel from './setup/setup-facebook-pixel'
import toast from './components/plugins/toast'
import loading from './components/plugins/loading'
import modal from './components/plugins/modal'

Vue.use(toast)
Vue.use(loading)
Vue.use(modal)

Vue.config.productionTip = false

sync(store, router)

Vue.use(VueTouch, {
  name: 'v-touch'
})

// init ga
googleAnalytics.init()

// facebook pixel init
facebookPixel.init()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  i18n,
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})

Vue.filter('round', (value, fixed = 2) => {
  try {
    return value.toFixed(fixed)
  } catch (e) {
    return value
  }
})

// TODO: 所有金钱相关的值用**numeral**处理
Vue.filter('money', (value, format) => {
  return numeral(value).format(format || '0.00')
})
