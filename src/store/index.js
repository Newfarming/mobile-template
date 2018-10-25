import Vue from 'vue'
import Vuex from 'vuex'

import {
  getCountry,
  getSymbol,
  getGender,
  getLanguage,
  getUserProfile,
  getCartNumber,
  getPhoneCountry
} from '@/utils'

import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    countryCode: getCountry(),
    symbol: getSymbol(),
    gender: getGender(),
    language: getLanguage(),
    phoneCountry: getPhoneCountry(),
    searchOrderByPhoneOrder: '',
    navState: {
      isShowBack: true,
      title: '',
      isShowSearch: false
    },
    isShowCountryBox: false,
    isShowSearchBox: false,
    topCategories: [],
    // 当前一级目录的ID
    currentCategoryId: 0,
    // 所有的二级目录的对象集合，以一级目录的ID作为键，二级目录内容作为值
    allSubCategories: {},
    // 当前选中的一级目录下的全部二级目录
    currentSubCategories: [],
    // 当前选中的二级目录
    activeSubCategory: {},

    productData: [],
    banners: [],
    isProductLoading: true,

    // categories页面的分类数据
    categories: [],
    // 登录用户基本信息集合
    userProfile: getUserProfile(),

    maxOrderMoney: 0,
    orderInfo: {},
    partnerInfo: {},
    phoneInfo: {},
    orderLines: [],
    // 邮编验证正则，地址页面需要每次都更新
    zipInfo: '',
    shippingInfo: {},

    // ocean_q信用卡添加的结果
    quickPayCardInfo: {},

    gaProductListCount: 0,

    // 保存home页用户的位置
    homePosition: {
      x: 0,
      y: 0
    },
    isDownloadAppShow: false,
    cartNumber: getCartNumber(),
    themes: {},
    currentPayMethod: '',
    smsCodeRestTime: 0
  },
  mutations: mutations,
  actions: actions,
  getters: getters
})
