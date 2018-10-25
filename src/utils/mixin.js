import googleAnalytics from '@/setup/setup-google-analytics'
import {
  mapState
} from 'vuex'
export const beforeRouterLeaveMixin = {
  beforeRouteLeave (to, from, next) {
    console.log('product list router leave...')
    if (this.gaProductListCount % 20) {
      googleAnalytics.sendEvent({
        ec: 'Product',
        ea: 'Impression',
        el: 'Product Impression'
      })
      this.$store.commit('setGaProductListCount', 0, true)
    }
    next()
  },
  computed: {
    ...mapState({
      gaProductListCount: 'gaProductListCount'
    })
  }
}
