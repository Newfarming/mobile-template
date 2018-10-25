import Vue from 'vue'
import Router from 'vue-router'

import {
  loadLanguageAsync
} from '../setup/setup-i18n'

import {
  COUNTRY_MAP
} from '@/config'

import googleAnalytics from '@/setup/setup-google-analytics'
import facebookPixel from '@/setup/setup-facebook-pixel'

import store from '@/store'

Vue.use(Router)

const Home = resolve => require(['@/pages/Home'], resolve)

const defaultNavState = {
  isShowBack: true,
  title: '',
  isShowSearch: false,
  isShowCategory: false,
  isShowCountryBox: false,
  isShowFooter: false,
  isShowHeader: true,
  isShowDownload: false,
  mainClass: 'bg-white'
}

const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    redirect: 'home'
  }, {
    path: '/home',
    name: 'home',
    component: Home,
    meta: {
      keepAlive: true,
      navState: {
        isShowBack: false,
        isShowSearch: true,
        isShowCategory: true,
        isShowCountryBox: true,
        isShowFooter: true,
        isShowDownload: true
      }
    }
  }
  ]
})

router.beforeEach((to, from, next) => {
  // 路由变化前设置顶部navbar的参数
  let navState = Object.assign({}, defaultNavState, to.meta.navState)
  navState.title = to.query.title || navState.title || `title.${to.name || 'default'}`
  to.query.navState = navState

  const authorization = to.meta.authorization
  if (authorization && !store.getters.isLogin && to.name !== 'login') {
    next({
      name: 'login'
    })
    return
  }

  // TODO: 这块逻辑需要重构
  // 主页有download-app的banner，需要额外设置container的padding
  if (to.name === 'home') {
    document.body.classList.add('double')
  } else {
    document.body.classList.remove('double')
  }
  if (to.name === 'paymentMethod2') {
    document.body.classList.add('intern')
  } else {
    document.body.classList.remove('intern')
  }
  if (to.name === 'product' || to.name === 'searchResult') {
    document.body.classList.add('one')
  } else {
    document.body.classList.remove('one')
  }

  // 路有变化之前设置参数自带的语言
  const lang = to.query.lang || store.state.language
  const country = to.query.country
  if (country) {
    console.log('country =>', country)
    const countryInfo = COUNTRY_MAP[country]
    if (countryInfo) {
      store.commit('updateCountryCode', countryInfo.code)
      store.commit('updateSymbol', countryInfo.symbol)
    }
  }

  loadLanguageAsync(lang)
    .catch(() => {
      Vue.prototype.$toast.error('Load language failed. Default use English.')
    })
    .finally(() => {
      next()
    })
})

router.afterEach((to, from) => {
  googleAnalytics.initDimensions(to.query.utm_source)
  if (to.name !== 'cart') {
    googleAnalytics.sendPageView(to.path)
  }
  facebookPixel.sendPageView()
  Vue.prototype.$loading.hide()

  // 对于keepAlive的组件，不用滚动到顶部
  if (!to.meta.keepAlive) {
    Vue.prototype.$nextTick(() => {
      const $main = document.querySelector('#main')
      if ($main) {
        window.scrollTo(0, 0)
      }
    })
  }
})

export default router
