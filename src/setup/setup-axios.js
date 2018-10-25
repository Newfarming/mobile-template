import axios from 'axios'
import Vue from 'vue'
import router from '@/router'
import store from '@/store'
import {
  AXIOS_CONF
} from '@/config'

import {
  getCountry,
  getGender,
  getAuthorization,
  getGuestId,
  saveGuestId,
  uuid
} from '@/utils'

// axios.defaults.timeout = AXIOS_CONF.timeout
axios.defaults.baseURL = AXIOS_CONF.baseURL

// axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

window.Promise = Promise

// 判断用户的localStorage是否不可写，在无痕模式下Safari localStorage
if (typeof localStorage === 'object') {
  try {
    localStorage.setItem('localStorage', 1)
    localStorage.removeItem('localStorage')
  } catch (e) {
    Storage.prototype._setItem = Storage.prototype.setItem
    Storage.prototype.setItem = function () {}
    Vue.prototype.$toast(
      'Your web browser does not support storing settings locally. In Safari, the most common cause of this is using "Private Browsing Mode". Some settings may not save or some features may not work properly for you.'
    )
  }
}

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    if (config.url.indexOf('/marketing/facebook/productTag') > -1) {
      return config
    }
    // Do something before request is sent
    config.headers.common['X-Requested-With'] = 'XMLHttpRequest'
    // todo 这里的方法都是直接从 localStorage 中取的，可以考虑从store中取
    let guestId = getGuestId()
    if (!guestId) {
      guestId = uuid()
      saveGuestId(guestId)
    }
    config.headers['Client-Basic'] = JSON.stringify({
      country_code: getCountry(),
      language_code: store.state.language,
      gender: getGender(),
      guest_id: guestId,
      from_site: 'm_site'
    })

    const authorization = getAuthorization()
    if (authorization) {
      config.headers['Authorization'] = authorization
    }
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Do something with response data
    return response
  },
  function (error) {
    // Do something with response error
    return Promise.reject(error)
  }
)

/**
 * 对axios封装一层，为了方便以后做一些修改
 * @param {Object} settings axios的参数相同
 */
export async function ajax (settings) {
  return axios(settings)
    .then(resp => {
      return resp.data
    })
    .catch(error => {
      const {
        status,
        statusText,
        data
      } = error.response
      console.log('error obj =>', error)
      console.log('error data =>', status, statusText, data)
      const errorMsg = data.message || statusText
      Vue.prototype.$loading.hide()
      if (status === 401) {
        // router.push({
        //   name: 'login'
        // })
        // todo 对于401的请求需要特殊的处理，可以用vuex来监听应该，对于每次请求结果的状态都保存进去
      } else {
        if (status === 400 && data && data.code === 999) {
          router.push({
            name: 'login'
          })
        } else {
          Vue.prototype.$toast.error(errorMsg)
          throw new Error(data)
        }
      }
    })
}

export async function get (url, params) {
  const settings = {
    method: 'get',
    url: url,
    params: params
  }
  return ajax(settings)
}

export async function ajaxDelete (url, params) {
  const settings = {
    method: 'delete',
    url: url,
    params: params
  }
  return ajax(settings)
}

export async function post (url, data) {
  const settings = {
    method: 'post',
    url: url,
    data: data
  }
  return ajax(settings)
}

export async function baseLogin (url, data, commit) {
  let {
    user_profile: userProfile,
    authorization
  } = await post(url, data)
  userProfile['authorization'] = authorization
  commit('setUserProfile', userProfile)
  // 登录后重置用户性别
  if (userProfile.sex) {
    commit('updateGender', userProfile.sex)
  }
  return userProfile
}
