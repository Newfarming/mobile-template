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
const Categories = resolve => require(['@/pages/Categories'], resolve)
const Cart = resolve => require(['@/pages/Cart'], resolve)
const Account = resolve => require(['@/pages/Account'], resolve)
const Search = resolve => require(['@/pages/SearchResult'], resolve)
const Product = resolve => require(['@/pages/Product'], resolve)
const Login = resolve => require(['@/pages/Login'], resolve)

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
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
  routes: [{
    path: '/',
    redirect: 'home'
  }, {
    path: '/product_list',
    redirect: 'home'
  }, {
    path: '/coupons',
    name: 'coupons',
    component: resolve => require(['@/pages/Coupons'], resolve)
  }, {
    path: '/promotion',
    name: 'promotion',
    component: resolve => require(['@/pages/Promotion'], resolve)
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
  }, {
    path: '/categories',
    name: 'categories',
    component: Categories,
    meta: {
      navState: {
        isShowBack: false,
        isShowFooter: true
      }
    }
  }, {
    path: '/categories/:categoryId',
    name: 'categorySearchList',
    component: resolve => require(['@/pages/CategorySearchList'], resolve)
  }, {
    path: '/cart',
    name: 'cart',
    component: Cart,
    meta: {
      navState: {
        mainClass: 'bg-gray',
        isShowFooter: true
      }
    }
  }, {
    path: '/account',
    name: 'account',
    component: Account,
    meta: {
      navState: {
        isShowBack: false,
        isShowFooter: true,
        isShowHeader: false
      }
    }
  }, {
    path: '/search',
    name: 'search',
    component: Search
  }, {
    path: '/search/:searchType',
    name: 'searchResult',
    component: resolve => require(['@/pages/SearchProductList'], resolve),
    meta: {
      navState: {
        isShowDownload: true,
      }
    }
  }, {
    path: '/account/login',
    name: 'login',
    component: Login,
    meta: {
      navState: {
        isShowBack: false,
        isShowHeader: false
      }
    }
  }, {
    path: '/product/:productId',
    name: 'product',
    component: Product,
    meta: {
      navState: {
        mainClass: 'bg-gray',
        isShowDownload: true,
      }
    }
  },
  {
    path: '/size',
    name: 'size',
    component: resolve => require(['@/pages/Size'], resolve)
  },
  {
    path: '/service/call',
    name: 'serviceCall',
    component: resolve => require(['@/pages/services/Call'], resolve)
  },
  {
    path: '/service/balance',
    name: 'serviceBalance',
    component: resolve => require(['@/pages/services/Balance'], resolve),
    meta: {
      navState: {
        mainClass: 'bg-gray'
      },
      authorization: true
    }
  },
  {
    path: '/service/searchOrderByPhoneAndOrderNumber',
    name: 'serviceSearchOrderByPhoneAndOrderNumber',
    component: resolve => require(['@/pages/services/SearchOrderByPhoneAndOrderNumber'], resolve)
  },
  {
    path: '/service/recent-view',
    name: 'serviceRecentView',
    component: resolve => require(['@/pages/services/RecentView'], resolve)
  },
  {
    path: '/service/coupon',
    name: 'serviceCoupon',
    component: resolve => require(['@/pages/services/Coupon'], resolve),
    meta: {
      authorization: true
    }
  },
  {
    path: '/service/about',
    name: 'serviceAbout',
    component: resolve => require(['@/pages/services/about/Index'], resolve),
    meta: {
      navState: {
        mainClass: 'bg-gray'
      }
    }
  }, {
    path: '/service/about/about-us',
    name: 'serviceAboutUs',
    component: resolve => require(['@/pages/services/about/AboutUs'], resolve),
    meta: {
      navState: {
        mainClass: 'bg-gray'
      }
    }
  },
  {
    path: '/service/about/contact-us',
    name: 'serviceContactUs',
    component: resolve => require(['@/pages/services/about/ContactUs'], resolve)
  },
  {
    path: '/service/about/factory-price',
    name: 'serviceFactoryPrice',
    component: resolve => require(['@/pages/services/about/FactoryPrice'], resolve)
  },
  {
    path: '/service/about/privacy-policy',
    name: 'servicePrivacyPolicy',
    component: resolve => require(['@/pages/services/about/PrivacyPolicy'], resolve)
  },
  {
    path: '/service/about/terms-conditions',
    name: 'serviceTermsConditions',
    component: resolve => require(['@/pages/services/about/TermsConditions'], resolve)
  },
  {
    path: '/service/faq',
    name: 'serviceFAQ',
    component: resolve => require(['@/pages/services/faq/Index'], resolve),
    meta: {
      navState: {
        mainClass: 'bg-gray'
      }
    }
  },
  {
    path: '/service/faq/about-my-account',
    name: 'serviceFAQAboutMyAccount',
    component: resolve => require(['@/pages/services/faq/AboutMyAccount'], resolve)
  },
  {
    path: '/service/faq/about-my-order',
    name: 'serviceFAQAboutMyOrder',
    component: resolve => require(['@/pages/services/faq/AboutMyOrder'], resolve)
  },
  {
    path: '/service/faq/about-payment',
    name: 'serviceFAQAboutPayment',
    component: resolve => require(['@/pages/services/faq/AboutPayment'], resolve)
  },
  {
    path: '/service/faq/about-shipping',
    name: 'serviceFAQAboutShipping',
    component: resolve => require(['@/pages/services/faq/AboutShipping'], resolve)
  },
  {
    path: '/service/faq/payment-protection',
    name: 'serviceFAQPaymentProtection',
    component: resolve => require(['@/pages/services/faq/PaymentProtection'], resolve)
  },
  {
    path: '/service/faq/return-policy',
    name: 'serviceFAQReturnPolicy',
    component: resolve => require(['@/pages/services/faq/ReturnPolicy'], resolve),
    meta: {
      navState: {
        mainClass: 'bg-gray'
      }
    }
  },
  {
    path: '/service/faq/shipping-info',
    name: 'serviceFAQShippingInfo',
    component: resolve => require(['@/pages/services/faq/ShippingInfo'], resolve)
  },
  {
    path: '/service/faq/return-policy/about-returns',
    name: 'serviceFAQReturnPolicyAboutReturns',
    component: resolve => require(['@/pages/services/faq/AboutReturns'], resolve)
  },
  {
    path: '/service/faq/return-policy/about-refunds',
    name: 'serviceFAQReturnPolicyAboutRefunds',
    component: resolve => require(['@/pages/services/faq/AboutRefunds'], resolve)
  },
  {
    path: '/service/faq/return-policy/about-return-shipping',
    name: 'serviceFAQReturnPolicyAboutReturnShipping',
    component: resolve => require(['@/pages/services/faq/AboutReturnShipping'], resolve)
  },
  {
    path: '/service/setting',
    name: 'serviceSetting',
    component: resolve => require(['@/pages/services/setting/Index'], resolve),
    meta: {
      navState: {
        mainClass: 'bg-gray'
      }
    }
  },
  {
    path: '/service/setting/country',
    name: 'settingCountry',
    component: resolve => require(['@/pages/services/setting/CountrySelect'], resolve)
  }, {
    path: '/service/setting/language',
    name: 'settingLanguage',
    component: resolve => require(['@/pages/services/setting/LanguageSelect'], resolve)
  }, {
    path: '/service/setting/conutryCode',
    name: 'settingCountryCode',
    component: resolve => require(['@/pages/services/setting/CountryCodeSelect'], resolve)
  }, {
    path: '/service/setting/feedback',
    name: 'settingFeedback',
    component: () =>
        import('@/pages/services/setting/Feedback'),
    meta: {
      navState: {
        mainClass: 'bg-gray'
      },
      authorization: true
    }
  },
  {
    path: '/service/setting/profile',
    name: 'settingProfileInfo',
    component: () =>
        import('@/pages/services/setting/ProfileInfo'),
    meta: {
      navState: {
        mainClass: 'bg-gray'
      },
      authorization: true
    }
  },
  {
    path: '/orders',
    name: 'orders',
    component: resolve => require(['@/pages/Orders/Orders'], resolve),
    meta: {
      navState: {
        mainClass: 'bg-gray'
      },
      authorization: true
    }
  },
  {
    path: '/orders/unpaid',
    name: 'ordersUnpaid',
    component: resolve => require(['@/pages/Orders/Unpaid'], resolve),
    meta: {
      navState: {
        mainClass: 'bg-gray'
      },
      authorization: true
    }
  },
  {
    path: '/orders/paid',
    name: 'ordersPaid',
    component: resolve => require(['@/pages/Orders/Paid'], resolve),
    meta: {
      navState: {
        mainClass: 'bg-gray'
      },
      authorization: true
    }
  },
  {
    path: '/orders/preparing',
    name: 'ordersPreparing',
    component: resolve => require(['@/pages/Orders/Preparing'], resolve),
    meta: {
      navState: {
        mainClass: 'bg-gray',
        title: 'All Orders'
      },
      authorization: true
    }
  },
  {
    path: '/orders/shipped',
    name: 'ordersShipped',
    component: resolve => require(['@/pages/Orders/Shipped'], resolve),
    meta: {
      navState: {
        mainClass: 'bg-gray'
      },
      authorization: true
    }
  },
  {
    path: '/orders/reviews',
    name: 'ordersReviews',
    component: resolve => require(['@/pages/Orders/Reviews'], resolve),
    meta: {
      navState: {
        mainClass: 'bg-gray'
      },
      authorization: true
    }
  },
  {
    path: '/orders/refund',
    name: 'ordersRefund',
    component: resolve => require(['@/pages/Orders/Refund'], resolve),
    meta: {
      navState: {
        mainClass: 'bg-gray'
      },
      authorization: true
    }
  },

  {
    path: '/order/:orderId',
    name: 'orderDetail',
    component: resolve => require(['@/pages/OrderDetail'], resolve),
    meta: {
      navState: {
        mainClass: 'bg-gray'
      }
    }
  }, {
    path: '/payment',
    name: 'payment',
    component: resolve => require(['@/pages/payment/Payment'], resolve)
  }, {
    path: '/payment/:orderName',
    name: 'paymentMethod',
    component: resolve => require(['@/pages/payment/PaymentMethod'], resolve),
    meta: {
      navState: {
        mainClass: 'bg-gray'
      }
    }
  }, {
    path: '/version2/payment/:orderName',
    name: 'paymentMethod2',
    component: () =>
        import('@/pages/payment/PaymentMethod2'),
    meta: {
      keepAlive: false,
      navState: {
        mainClass: 'bg-gray'
      }
    }
  }, {
    path: '/payment/:orderName/success',
    name: 'paymentSuccess',
    component: resolve => require(['@/pages/payment/PaymentSuccess'], resolve)
  }, {
    path: '/payment/:orderName/failed',
    name: 'paymentFailed',
    component: resolve => require(['@/pages/payment/PaymentFailed'], resolve)
  },
  {
    path: '/payment/credit/result',
    name: 'creditResult',
    component: resolve => require(['@/pages/payment/CardAddResult'], resolve),
    meta: {
      navState: {
        isShowHeader: false
      }
    }
  },
  {
    path: '/forgot',
    name: 'forgot',
    component: resolve => require(['@/pages/Forgot'], resolve)
  },
  {
    path: '/resetpassword',
    name: 'resetPassword',
    component: resolve => require(['@/pages/ResetPassword'], resolve)
  },
  {
    path: '/trackinginfo/:orderName',
    name: 'trackingInfo',
    component: resolve => require(['@/pages/TrackingInfo'], resolve),
    meta: {
      navState: {
        mainClass: 'bg-gray'
      }
    }
  },
  {
    path: '/reviews/:productId',
    name: 'reviews',
    component: resolve => require(['@/pages/Reviews'], resolve)
  },
  {
    path: '/cod/confirm/:orderName',
    name: 'codConfirm',
    component: resolve => require(['@/pages/CodConfirm'], resolve)
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
