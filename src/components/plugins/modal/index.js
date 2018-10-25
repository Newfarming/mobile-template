import HocModal from '@/hoc/modal'
import {
  i18n
} from '@/setup/setup-i18n'
import store from '@/store'
export default {
  install (Vue, options = {}) {
    function $modal (comp, params, selector) {
      return new Promise((resolve, reject) => {
        const VueModal = Vue.extend(HocModal(comp, params))
        let modal = new VueModal({
          i18n,
          store
        }).$mount()
        document.querySelector(selector || 'body').appendChild(modal.$el)
        resolve(modal)
      })
    }

    Vue.prototype.$modal = $modal
  }
}
