export function getLocalItem (key) {
  return localStorage.getItem(key)
}

export function setLocalItem (key, value) {
  localStorage.setItem(key, value)
}

export function removeLocalItem (key) {
  localStorage.removeItem(key)
}

export function saveCartNumber (number) {
  setLocalItem('cart_number', number)
}

export function getCartNumber () {
  return Number(getLocalItem('cart_number')) || 0
}

export function saveCountry (code) {
  setLocalItem('country_code', code)
}

export function getCountry (defaultCountry = 'us') {
  return getLocalItem('country_code') || defaultCountry
}

export function getSymbol () {
  return getLocalItem('symbol') || 'USD'
}

export function saveSymbol (symbol) {
  setLocalItem('symbol', symbol)
}

export function getGender () {
  return getLocalItem('gender') || ''
}

export function saveGender (gender) {
  setLocalItem('gender', gender)
}

export function getLanguage () {
  return getLocalItem('language') || 'en'
}
let phoneCountry = {
  code: 'in',
  id: 105,
  language: 'en',
  name: 'India',
  phoneLength: 10,
  phonePrefix: 91,
  // symbol: '', // 符号
  unit: 'INR'
}
export function getPhoneCountry (defaultphoneCountry = phoneCountry) {
  return JSON.parse(getLocalItem('phoneCountry')) || defaultphoneCountry
}

export function saveLanguage (language) {
  setLocalItem('language', language)
}

export function isMidEast () {
  var midEast = ['ae', 'om', 'kw', 'qa', 'bh', 'sa']
  return midEast.indexOf(getCountry()) > -1
}

/**
 * 保存搜索历史，全量更新保存
 * @param {Array} searches
 */
export function saveSearchHistory (searches) {
  const searchStr = JSON.stringify(searches)
  console.log('searchStr===>', searchStr)
  setLocalItem('search_history', searchStr)
}

export function getSearchHistory () {
  const searches = getLocalItem('search_history')
  try {
    return JSON.parse(searches) || []
  } catch (e) {
    return []
  }
}

export function deleteSearchHistory () {
  removeLocalItem('search_history')
}

export function getChosenProducts () {
  let chosenProduct = getLocalItem('cart_chosen_product')
  return chosenProduct ? chosenProduct.split('-').map(item => parseInt(item)) : []
}

export function saveChosenProduct (skuIds) {
  let chosenProducts = getChosenProducts()
  chosenProducts = chosenProducts.concat(skuIds)
  chosenProducts = [...new Set(chosenProducts)]
  setLocalItem('cart_chosen_product', chosenProducts.join('-'))
}

export function deleteChosenProduct (skuIds) {
  let chosenProducts = getChosenProducts()
  chosenProducts = chosenProducts.filter(item => !skuIds.includes(item))
  setLocalItem('cart_chosen_product', chosenProducts.join('-'))
}

export function deleteAllChosenProduct () {
  setLocalItem('cart_chosen_product', '')
}

export function getAuthorization () {
  const userProfile = getUserProfile()
  return userProfile.authorization || ''
}

export function saveUserProfile (userProfile) {
  setLocalItem('user', JSON.stringify(userProfile))
}

export function getUserProfile () {
  let userProfile = getLocalItem('user') || ''
  if (userProfile) {
    return JSON.parse(userProfile)
  } else {
    return {}
  }
}

export function deleteUserProfile () {
  removeLocalItem('user')
}

export function saveGuestId (guestId) {
  setLocalItem('guest_id', guestId)
}

export function getGuestId () {
  return getLocalItem('guest_id') || ''
}

export function uuid () {
  var d = Date.now()
  if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
    d += performance.now()
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16)
  })
}

/**
 * 动态加载js
 * @param {string} url - 动态加载的js文件地址
 */
export function asyncLoadScript (url) {
  let s = document.createElement('script')
  s.type = 'text/javascript'
  s.async = true
  s.src = url
  let x = document.getElementsByTagName('script')[0]
  x.parentNode.insertBefore(s, x)
}

/**
 * 获取一个指定名称的cookie
 * @param {String} name - cookie name
 */
export function getCookie (name) {
  const value = '; ' + document.cookie
  const parts = value.split('; ' + name + '=')
  if (parts.length === 2) {
    return parts.pop().split(';').shift()
  }
}
// 原生 JavaScript 设置 cookie 值
export function setCookie (name, value, time = 10000) {
  var now = new Date()
  var domain = document.domain
  now.setTime(now.getTime() + time * 60 * 60 * 1000)
  document.cookie = name + '=' + escape(value) + ';path=/;expires=' + now.toGMTString() + ';domain=' + domain + ';'
}

export function setObserver (el, callback, options) {
  const callbackCustom = options && options.callbackCustom
  const config = Object.assign({}, {
    rootMargin: '500px 0px',
    threshold: [Number.MIN_VALUE]
  }, options)
  if (!window.IntersectionObserver) {
    // safari不支持这个功能，需要使用 polyfill
    require('intersection-observer')
  }
  const observer = new IntersectionObserver((entries, self) => {
    entries.forEach(async entry => {
      if (callbackCustom) {
        callback(entry)
      } else {
        if (entry.isIntersecting || entry.intersectionRatio > 0) {
          if (callback) {
            callback(entry)
          }
          // 解除观察
          self.unobserve(entry.target)
        }
      }
    })
  }, config)
  observer.observe(el)
}

export function createFunctionWithTimeout (func, timeout = 1000) {
  let flag = false
  const timer = setTimeout(() => {
    flag = true
    func()
  }, timeout)
  return () => {
    if (flag) {
      clearTimeout(timer)
      func()
    }
  }
}

export function openNativeApp (url = 'product_list') {
  let deepLink = encodeURIComponent(`fromfactory://${url}`)
  window.location.href = `https://p39t.adj.st/${url}?adjust_t=jzuif80_l7ioa9i&adjust_deeplink=${deepLink}`
}

export function directOpenApp (url) {
  if (!url) {
    url = '/product_list' + window.location.search
  }
  console.log('url=>', url)
  var isiOS = navigator.userAgent.match('iPad') || navigator.userAgent.match('iPhone') || navigator.userAgent.match('iPod')
  var isAndroid = navigator.userAgent.match('Android')
  if (isAndroid) {
    window.location.href = 'fromfactory:/' + url
  } else if (isiOS) {
    var search = window.location.search ? window.location.search + '&ulink=abc' : '?ulink=abc'
    window.location.href = 'https://ulink.fromfactory.club' + search
  }
}
