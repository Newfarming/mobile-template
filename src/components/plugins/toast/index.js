import Toast from './Toast'
export default {
  install (Vue, options = {}) {
    const VueToast = Vue.extend(Toast)
    let toast = null

    function $toast (content, params = {
      delay: 2000,
      icon: undefined,
      type: undefined
    }) {
      return new Promise(resolve => {
        if (!toast) {
          toast = new VueToast()
          toast.$mount()
          document.querySelector(options.container || 'body').appendChild(toast.$el)
        }
        params.content = content
        toast.show(params)
        resolve()
      })
    }

    Vue.prototype.$toast = $toast

    Vue.prototype.$toast.error = (content, delay = 2000) => {
      const options = {
        icon: 'icon-J_About',
        type: 'error',
        delay: delay
      }
      return $toast(content, options)
    }

    Vue.prototype.$toast.success = (content, delay = 2000) => {
      const options = {
        icon: 'icon-duihao',
        type: 'success',
        delay: delay
      }
      return $toast(content, options)
    }
  }
}
