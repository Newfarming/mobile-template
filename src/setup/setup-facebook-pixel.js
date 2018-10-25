import axios from 'axios'
export default {
  // facebook 广告需求
  async getContentIds (content_ids) {
    const ids = await axios.get(`https://www.clubfactory.com/marketing/facebook/productTag/?productNoList=${content_ids.join(',')}`).then((resp) => { return resp.data })
    return ids
  },

  init () {
    (function (f, b, e, v, n, t, s) {
      if (f.fbq) return
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      }
      if (!f._fbq) f._fbq = n
      n.push = n
      n.loaded = !0
      n.version = '2.0'
      n.queue = []
      t = b.createElement(e)
      t.async = !0
      t.src = v
      s = b.getElementsByTagName(e)[0]
      s.parentNode.insertBefore(t, s)
    }(window,
      document, 'script', 'https://connect.facebook.net/en_US/fbevents.js'))
    // Insert Your Facebook Pixel ID below.
    window.fbq('init', '763200933862443')
  },

  sendPageView () {
    window.fbq('track', 'PageView')
  },

  /**
   * 加入购物车
   * @param {Object} param
   */
  async addToCart ({
    value,
    currency,
    contentName,
    contentIds,
    contents
  }) {
    const ids = await this.getContentIds(contentIds)
    console.log('ids', ids)
    window.fbq('track', 'AddToCart', {
      value: value,
      currency: 'USD',
      content_name: contentName,
      content_type: 'product',
      content_ids: ids
    })
  },

  async productDetail ({
    value,
    currency,
    contentName,
    contentIds
  }) {
    const ids = await this.getContentIds(contentIds)
    window.fbq('track', 'ViewContent', {
      content_name: contentName,
      content_ids: ids,
      content_type: 'product',
      value: value,
      currency: 'USD'
    })
  },

  async paymentSuccess ({
    value,
    currency,
    contentName,
    contentIds
  }) {
    const ids = await this.getContentIds(contentIds)
    window.fbq('track', 'Purchase', {
      content_name: contentName,
      content_ids: ids,
      content_type: 'product',
      value: value,
      currency: 'USD'
    })
  }
}
