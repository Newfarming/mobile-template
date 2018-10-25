import {
  getCookie,
  getUserProfile,
  getCountry,
  getLanguage,
  isMidEast,
  createFunctionWithTimeout
} from '@/utils'

export default {
  init () {
    const ga = window.ga = window.ga || function () {
      (ga.q = ga.q || []).push(arguments)
    }
    ga.l = +new Date()
    ga('create', 'UA-71464937-1', 'auto')
    ga('create', 'UA-71464937-3', 'auto', 'MidEast')
    ga('require', 'linker')
    ga('MidEast.require', 'linker')
    ga('linker:autoLink', ['clubfactory.com', 'fromfactory.club'])
    ga(function (tracker) {
      let originalSendHitTask = tracker.get('sendHitTask')
      tracker.set('sendHitTask', function (model) {
        let payLoad = model.get('hitPayload')
        originalSendHitTask(model)
        let gifRequest = new XMLHttpRequest()
        let gifPath = 'https://ga.fromfactory.club/__ua.gif'
        gifRequest.open('GET', gifPath + '?' + payLoad, true)
        gifRequest.send()
      })
    })
    ga('require', 'ec')
    ga('MidEast.require', 'ec')
  },

  initDimensions (utmSource) {
    const userProfile = getUserProfile()
    // 当cookies  UID的值不为空时（会员标识）
    const email = userProfile.loginEmail
    if (email) {
      this.setDimension('dimension2', email)
    }
    // URL或者cookie中的utm_source(广告来源)
    utmSource = utmSource || getCookie('utm_source')
    if (utmSource) {
      this.setDimension('dimension3', utmSource)
    }
    this.setDimension('dimension4', 'mobile-pwa')

    let gender = userProfile.sex
    if (gender === 'M') {
      gender = 'men'
    } else if (gender === 'F') {
      gender = 'women'
    } else {
      gender = 'not set'
    }
    this.setDimension('dimension5', gender)

    const countryCode = getCountry()
    if (countryCode) {
      this.setDimension('dimension6', countryCode)
    }

    // 用户真实的uid
    const uid = userProfile.uid
    if (uid) {
      this.setDimension('dimension8', '' + uid)
    }

    // 自定义语言维度上报
    const language = getLanguage('language')
    if (language) {
      this.setDimension('dimension9', language)
    }
  },

  setDimension (fieldName, fieldValue) {
    window.ga('set', fieldName, fieldValue)
    if (isMidEast()) {
      window.ga('MidEast.set', fieldName, fieldValue)
    }
  },

  sendPageView (page, utmSource) {
    // 上报页面
    window.ga('set', 'page', page)
    // 用户是否在线
    this.setDimension('dimension13', navigator.onLine ? '1' : '0')
    window.ga('send', 'pageview')
    if (isMidEast()) {
      window.ga('MidEast.set', 'page', page)
      window.ga('MidEast.send', 'pageview')
    }
  },

  addImpression (productInfo, position = 0, listType = '') {
    let params = {
      id: productInfo.productNo,
      name: productInfo.productName,
      brand: `${productInfo.productNo} & ${productInfo.priceUS}`,
      price: productInfo.priceUS,
      list: listType,
      position: position,
      category: productInfo.category
    }
    window.ga('ec:addImpression', params)
    if (isMidEast()) {
      window.ga('MidEast.ec:addImpression', params)
    }
  },

  addProduct (product, position = 1) {
    let categoryIds = product.categoryIds
    if (categoryIds && Array.isArray(categoryIds)) {
      categoryIds = categoryIds.join(',')
    }
    let params = {
      id: product.productNo,
      name: product.productName,
      category: categoryIds,
      brand: `${product.productNo} & ${product.priceUS}`,
      price: product.priceUS,
      get variant () {
        if (product.sku) {
          try {
            return product.sku.map(item => {
              return item.name
            }).join(', ')
          } catch (e) {
            return product.sku
          }
        } else {
          return ''
        }
      },
      quantity: product.quantity || 1,
      // 这个位置应该是从列表中过来的位置
      position: position
    }
    window.ga('ec:addProduct', params)
    if (isMidEast()) {
      window.ga('MidEast.ec:addProduct', params)
    }
  },

  addPromo (name, creative, position = 1) {
    let params = {
      name: name,
      creative: creative,
      position: position
    }
    window.ga('ec:addPromo', params)
    if (isMidEast()) {
      window.ga('MidEast.ec:addPromo', params)
    }
  },

  sendEvent ({
    ec,
    ea,
    el,
    ni = true,
    ht = 'event',
    hc = undefined
  } = {}) {
    let params = {
      hitType: ht,
      eventCategory: ec,
      eventAction: ea,
      eventLabel: el,
      nonInteraction: ni,
      hitCallback: hc ? createFunctionWithTimeout(hc) : undefined
    }
    window.ga('send', params)
    if (isMidEast()) {
      window.ga('MidEast.send', params)
    }
  },

  doECAction (action) {
    window.ga('ec:setAction', action)
    if (isMidEast()) {
      window.ga('MidEast.ec:setAction', action)
    }
  }
}
