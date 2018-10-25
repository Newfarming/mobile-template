import Spinner from './Spinner'
export default {
  install (Vue, options = {}) {
    const VueSpinner = Vue.extend(Spinner)
    let loading = null

    function $loading (params) {
      return new Promise(resolve => {
        if (!loading) {
          loading = new VueSpinner()
          loading.$mount()
          const rootEl = document.querySelector(options.container || '#main')
          if (rootEl) {
            rootEl.appendChild(loading.$el)
          }
        }
        loading.show(params)
        resolve(loading)
      })
    }
    Vue.prototype.$loading = $loading
    Vue.prototype.$loading.show = (options = {
      delay: 200
    }) => {
      options.isShow = true
      return Vue.prototype.$loading(options)
    }

    Vue.prototype.$loading.hide = (options = {
      delay: 200
    }) => {
      options.isShow = false
      return Vue.prototype.$loading(options)
    }
  }
}
