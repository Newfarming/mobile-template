import {
  get,
  post,
  ajaxDelete,
  baseLogin
} from '@/setup/setup-axios'

import {
  calcProductSummary,
  calcShippingInfo
} from '@/utils/common'

import {
  HOME,
  PRODUCT,
  AUTH_LOGIN,
  AUTH_SIGN_UP,
  ORDER_PREVIEW,
  SHIPPING_INFO,
  COUPONS,
  CART_PRODUCT_QTY_UPDATE,
  PRODUCT_SEARCH,
  CART_ADD,
  CART_GET,
  CART_DELETE,
  ORDERS,
  ORDER,
  FORGOT,
  VALIDATE_ZIP_CODE,
  SHIPPING_ADDRESS,
  V2_PAYMENT_METHOD,
  PAYMENT_START,
  FB_LOGIN,
  TRACKING_INFO,
  PAYMENT_BALANCE_START,
  CREATE_QUICK_PAY,
  BALANCE,
  COUPON,
  RECENT_VIEWED,
  REVIEWS,
  LOCATION,
  SEARCH_TREND,
  FEEDBACK,
  THEMES,
  V2_SEARCH,
  V2_CATEGORY,
  V2_SMS_COD,
  V2_REVIEW_PRODUCT,
  PAYMENT_COD_START,
  V3_PAYMENT_METHOD,
  V3_PAYMENT_START,
  GET_VCODE_FOR_INQUIRY_ORDER_NUMBER,
  GET_ORDER_FOR_INQUIRY_ORDER_NUMBER
} from './constants/url'

export default {
  async getHomeFirstData ({
    commit,
    state
  }) {
    commit('updateProductLoading', true)
    // 先清空原来的banner数据，否则首页会提前显示出原来的数据，导致页面结构错误
    commit('updateBanners', [])
    let query = {
      offset: 0,
      limit: 20,
      ad: state.route.query.ad,
      category_id: state.activeSubCategory.category_id || state.currentCategoryId || 0
    }

    let {
      product_info: productInfo,
      banners
    } = await get(HOME, query)

    const products = calcProductSummary(productInfo)
    banners = banners.map(item => {
      return {
        id: item.id,
        link: item.link,
        imageUrl: item.img_src,
        searchKey: item.search_key,
        searchType: item.search_type
      }
    })
    commit('updateProductData', products)
    commit('updateBanners', banners)
    setTimeout(() => {
      commit('updateProductLoading', false)
    }, 0)
  },

  async getMoreProductData ({
    commit,
    state
  }) {
    commit('updateProductLoading', true)
    let query = {
      offset: state.productData.length,
      limit: 20,
      ad: state.route.query.ad,
      category_id: state.activeSubCategory.category_id || state.currentCategoryId || 0
    }

    let {
      product_info: productInfo
    } = await get(PRODUCT, query)

    const products = calcProductSummary(productInfo)
    commit('updateProductData', state.productData.concat(products))
    setTimeout(() => {
      commit('updateProductLoading', false)
    }, 0)
  },

  async getCategories ({
    commit,
    state
  }, force = false) {
    // 优先取缓存
    if (force || !state.categories || state.categories.length <= 0) {
      let {
        category_list: categories
      } = await get(V2_CATEGORY)
      commit('updateCategories', categories)
      return categories
    } else {
      return state.categories
    }
  },

  async login ({
    commit
  }, payload) {
    return baseLogin(AUTH_LOGIN, payload, commit)
  },

  async signup ({
    commit
  }, payload) {
    const query = {
      account: payload.account,
      password: payload.password,
      is_sub_email: payload.isSubEmail
    }
    const userProfile = await baseLogin(AUTH_SIGN_UP, query, commit)

    // 退出登录之后需要删除购物车的商品数量
    commit('setCartNumber', 0)
    return userProfile
  },
  async getVCodeForInquiryOrderNumber ({
    commit
  }, queryList) {
    const result = await post(GET_VCODE_FOR_INQUIRY_ORDER_NUMBER, {
      order_name: queryList.order_name,
      phone: queryList.phoneNumber,
      country_code: queryList.country_code
    })
    return result
  },
  async getOrderForInquiryOrderNumber ({
    commit
  }, queryList) {
    const result = await get(GET_ORDER_FOR_INQUIRY_ORDER_NUMBER, {
      order_name: queryList.order_name,
      phone: queryList.phoneNumber,
      country_code: queryList.country_code,
      verification: queryList.verificationCode
    })
    return result
  },
  async getOrderPreview ({
    commit,
    state
  }, {
    chosenSku,
    skuId,
    quantity
  }) {
    let params = {
      cart_choosed_product: chosenSku && chosenSku.length > 0 ? chosenSku.join(',') : undefined,
      buy_now_products: skuId && skuId.length > 0 ? skuId.join(',') : undefined,
      buy_now_quantitys: quantity && quantity.length > 0 ? quantity.join(',') : undefined
    }

    let {
      max_order_money: maxOrderMoney,
      order_info: orderInfo,
      partner_info: partnerInfo,
      phone_info: phoneInfo,
      products,
      zip_info: zipInfo
    } = await get(ORDER_PREVIEW, params)
    orderInfo = {
      total: orderInfo.amount_total,
      shippingFee: orderInfo.shipping_fee,
      subtotal: orderInfo.subtotal,
      tax: orderInfo.tax,
      coupons: orderInfo.available_coupons || [],
      couponInfo: orderInfo.coupon_info
    }
    products = products.map(item => {
      return {
        skuId: item.sku_id,
        sku: item.sku,
        productId: item.product_id,
        productNo: item.product_no,
        productName: item.name,
        price: item.list_price_local,
        platformPrice: item.c_platform_price_local,
        attrs: item.attrs,
        imageUrl: item.image_url,
        quantity: item.product_qty
      }
    })
    commit('setMaxOrderMoney', maxOrderMoney)
    commit('setOrderInfo', orderInfo)
    commit('setPartnerInfo', partnerInfo)
    commit('setPhoneInfo', phoneInfo)
    commit('setOrderLines', products)
    commit('setZipInfo', zipInfo)

    return orderInfo
  },

  /**
   * 获取快递费用
   */
  async getShippingInfo ({
    commit,
    state
  }) {
    const {
      delivery_info: deliveryInfo,
      prepare_info: prepareInfo,
      shipping_costs: shippingCosts
    } = await get(SHIPPING_INFO)

    const shippingInfo = calcShippingInfo(shippingCosts, deliveryInfo, prepareInfo)
    commit('setShippingInfo', shippingInfo)
  },

  /**
   *  获取coupon
   * @param {Number} state -优惠券的状态
   * 0 - 未到可用时间
   * 1 - 可用
   * 2 - 锁定
   * 3 - 已使用
   * 4 - 过期
   *
   * 不传为all
   */
  async getCoupons ({
    commit
  }, state) {
    const {
      coupons
    } = await get(COUPONS, {
      state: state
    })
    // commit('setCoupons', coupons)
    return coupons
  },

  async deleteOrder ({
    commit
  }, orderName) {
    return ajaxDelete(ORDER + '/' + orderName)
  },

  /**
   * 更新购物车中商品的商品数量
   * @param {int} skuId : 更新商品数量的sku id
   * @param {int} qty : 更新后的商品数量,默认更新一个
   */
  async updateProductQty ({
    commit
  }, {
    skuId,
    qty = 1
  }) {
    return post(CART_PRODUCT_QTY_UPDATE, {
      product_id: skuId,
      quantity: qty
    })
  },

  /**
   * 获取商品搜索结果数据
   */
  async getProductSearchData ({
    commit
  }, {
    offset = 0,
    limit = 20,
    query
  } = {}) {
    let {
      product_info: productInfo
    } = await get(PRODUCT_SEARCH, {
      limit: limit,
      offset: offset,
      query: query
    })
    return calcProductSummary(productInfo)
  },

  async getProductDetail ({
    commit
  }, productId) {
    let {
      product_info: productInfo,
      price_off: priceOff,
      rating = 5,
      rating_num: rateNum = 0,
      sku_info: skuInfo = [],
      shipping_info: shippingInfo = {}
    } = await get(PRODUCT + '/' + productId)
    return {
      productId: productInfo.id,
      productName: productInfo.name,
      productNo: productInfo.product_no,
      isTaxInclude: productInfo.is_include_tax,
      active: productInfo.active,
      orders: productInfo.orders,
      price: productInfo.list_price,
      priceUS: productInfo.list_price_us,
      platformPrice: productInfo.c_platform_price,
      isPick: productInfo.is_pick,
      showBuyNowOnly: productInfo.show_buy_now_only,
      get platformDetails () {
        let platformDetails = productInfo.c_details
        let results = []
        if (platformDetails && platformDetails.length > 0) {
          results.push({
            platformName: 'Club Factory',
            price: this.price,
            shipping: 0.0,
            total: this.price,
            platformURL: ''
          })
          results = results.concat(
            platformDetails.map(item => {
              return {
                platformName: item.c_platform,
                price: item.c_price,
                shipping: item.c_shipping,
                total: item.c_price + item.c_shipping,
                platformURL: item.c_url
              }
            })
          )
        }
        return results
      },
      descriptions: productInfo.b_specifics || [],
      get discount () {
        let result = (this.platformPrice - this.price) / this.platformPrice * 100
        return result > 0 ? result.toFixed(0) : ''
      },
      skuIds: productInfo.product_ids,
      skuInfo: skuInfo,
      productImages: productInfo.product_images,
      priceOff: priceOff,
      categoryIds: productInfo.category_id,
      rateScore: parseFloat(rating.toFixed(1)),
      rateNum: rateNum,
      shippingInfo: shippingInfo
    }
  },

  async addCart ({
    commit
  }, {
    skuId,
    addQty = 1
  }) {
    return post(CART_ADD, {
      product_id: skuId,
      add_qty: addQty
    })
  },

  /**
   * 获取购物车数据
   * @param {Number} n: 记录条数，默认0表示全量获取,否则获取n条记录
   */
  async getCart () {
    let cartData = (await get(CART_GET)) || {
      cart_item_list: [],
      cur_page_no: 1,
      page_size: 500,
      total_page: 0,
      total_size: 0
    }

    const cartItems = cartData.paged_cart_items.cart_item_list.map(item => {
      return {
        skuId: item.id,
        productId: item.product_id,
        templateId: item.product_template_id,
        productNo: item.product_no,
        image: item.image_url,
        name: item.name,
        productName: item.name,
        // 礼物的东西先不加
        // tips: 'Your gift will expire in 5 days',
        sku: item.skus,
        salePrice: item.list_price,
        price: item.list_price,
        delPrice: item.c_platform_price,
        priceUS: item.list_price_us,
        quantity: item.quantity,
        categoryIds: item.category_id,
        isAvailable: item.available,
        isChecked: false
      }
    })

    const availableItems = cartItems.filter(item => {
      return item.isAvailable
    })

    const unavailableItems = cartItems.filter(item => {
      return !item.isAvailable
    })

    return {
      availableItems: availableItems,
      unavailableItems: unavailableItems,
      curPageNo: cartData.paged_cart_items.cur_page_no,
      pageSize: cartData.paged_cart_items.page_size,
      totalPage: cartData.paged_cart_items.total_page,
      totalSize: cartData.paged_cart_items.total_size,
      shippingCosts: cartData.shipping_info.shipping_costs,
      shippingInfo: cartData.shipping_info
    }
  },

  /**
   * 删除购物车选项
   * @param {Number} skuId
   */
  async delCartItem ({
    commit
  }, skuId) {
    return post(CART_DELETE, {
      product_id: skuId
    })
  },

  /*
   * 获取订单列表
   * @param {Number} order_type - 订单类型，选填，默认1. 1: all, 2: unpaid, 3: paid
   * @param { Number } page
   * @param {Number} limit
   */
  async getOrders ({
    commit
  }, {
    orderType = 1,
    offset = 0,
    limit = 20
  } = {}) {
    const order = await get(ORDERS, {
      order_type: orderType,
      offset,
      limit
    })
    const orderInfos = order.order_infos.map(item => {
      return {
        orderName: item.order_name,
        currencySymbol: item.currency_symbol,
        paymentDate: item.payment_date,
        expiryString: item.expiry_string,
        payChannel: item.pay_channel,
        totalLocal: item.total_local,
        totalItems: item.total_items,
        orderLines: item.order_lines.map(itm => {
          return {
            productTemplateId: itm.product_template_id,
            productNo: itm.product_no,
            imageUrl: itm.image_url,
            skuId: itm.sku_id,
            name: itm.name,
            priceRealLocal: itm.price_real_local,
            totalRealLocal: itm.total_real_local,
            priceUS: itm.list_price_us,
            quantity: itm.quantity,
            color: itm.color,
            size: itm.size
          }
        }),
        showState: item.show_state,
        paymentMethod: item._payment_method
      }
    })
    return {
      userName: order.user_name,
      orderInfos: orderInfos,
      orderType: order.order_type,
      ordersNum: order.orders_num,
      paymentMethod: order._payment_method
    }
  },

  /**
   * 忘记密码，如果有token就是修改密码，反之，请求后端发送email
   * @param {string} email
   * @param {string} pw
   * @param {string} token
   */
  async forget ({
    commit
  }, {
    email
  }) {
    return post(FORGOT, {
      email,
      url: window.location.origin + '/resetpassword'
    })
  },

  async resetPassword ({
    commit
  }, param) {
    return baseLogin(FORGOT + '/' + param.token, {
      password: param.password
    }, commit)
  },

  async getOrderDetail ({
    commit
  }, orderName) {
    const order = await get(ORDER + '/' + orderName)
    const orderLines = order.order_lines.map(item => {
      return {
        productTemplateId: item.product_template_id,
        productNo: item.product_no,
        imageUrl: item.image_url,
        skuId: item.sku_id,
        name: item.name,
        productName: item.name,
        priceRealLocal: item.price_real_local,
        priceUS: item.list_price_us,
        totalRealLocal: item.total_real_local,
        quantity: item.quantity,
        color: item.color,
        size: item.size,
        sku: `${item.color}, ${item.size}`
      }
    })
    const deliveryInfo = {
      deliveryName: order.delivery_info.delivery_name,
      prepareTime: order.delivery_info.prepare_time,
      shippingTime: order.delivery_info.shipping_time
    }
    const payInfo = {
      deliveryPriceLocal: order.pay_info.delivery_price_local || 0,
      deliveryPriceUS: order.pay_info.delivery_price_us || 0,
      deliveryWay: order.pay_info.delivery_way,
      eachAmount: order.pay_info.each_amount,
      extraFee: order.pay_info.extra_fee || 0,
      installments: order.pay_info.installments,
      subtotalLocal: order.pay_info.subtotal_local || 0,
      balanceLocal: order.pay_info.balance_local || 0,
      codPriceLocal: order.pay_info.cod_price_local || 0,
      taxLocal: order.pay_info.tax_real_price_local || 0
    }
    const shippingInfo = {
      phoneAreaCode: order.shipping_info.phone_area_code,
      shippingCity: order.shipping_info.shipping_city,
      shippingCountry: order.shipping_info.shipping_country,
      shippingEmail: order.shipping_info.shipping_email,
      shippingName: order.shipping_info.shipping_name,
      shippingPhone: order.shipping_info.shipping_phone,
      shippingState: order.shipping_info.shipping_state,
      shippingStreet2: order.shipping_info.shipping_street2,
      shippingZip: order.shipping_info.shipping_zip
    }
    return {
      discount: order.discount || 0,
      expiryString: order.expiry_string,
      arriveDate: order.arrive_date,
      deliveryInfo: deliveryInfo,
      orderName: order.order_name,
      currencySymbol: order.currency_symbol,
      paymentDate: order.payment_date,
      refundInfo: order.refund_info,
      payChannel: order.pay_channel,
      totalLocal: order.total_local,
      totalItems: order.total_items,
      totalUS: order.total_us,
      showState: order.show_state,
      taxLine: order.tax_line,
      shippingInfo: shippingInfo,
      payInfo: payInfo,
      orderLines: orderLines,
      shippingCountryCode: order.country_code,
      paymentMethod: order._payment_method,
      virtualSellerInfo: order.virtual_seller_info || {},
    }
  },
  async getAddressByPincode ({
    commit
  }, pincode) {
    const {
      city,
      state
    } = await get(VALIDATE_ZIP_CODE, {
      pincode: pincode
    })
    return {
      city: city,
      state: state
    }
  },
  async createOrder ({
    commit
  }, data) {
    const {
      order_name: orderName,
      amount_total_us: amountTotalUS,
      _payment_method: paymentMethod
    } = await post(
      ORDER,
      data
    )
    return {
      orderName: orderName,
      amountTotalUS: amountTotalUS,
      paymentMethod: paymentMethod
    }
  },

  /**
   * 更新用户地址信息
   * @param {Object} address
   */
  async updateShippingAddress ({
    commit
  }, address) {
    return post(SHIPPING_ADDRESS, address)
  },

  /**
   * 获取订单的支付方式
   * @param {String} orderName - 订单名称
   */
  async getPaymentMethods ({
    commit
  }, orderName) {
    let {
      methods,
      order_state: orderState
    } = await get(
      V2_PAYMENT_METHOD(orderName)
    )
    let tmpMethods = {}
    const methodNames = methods
      .map(item => {
        let keys = Object.keys(item)
        tmpMethods = Object.assign(tmpMethods, item)
        if (keys && keys.length > 0) {
          return keys[0]
        }
      })
      .filter(Boolean)
    return {
      methods: tmpMethods,
      orderState: orderState,
      methodNames: methodNames
    }
  },

  /**
   * 开启支付
   * @param {String} orderName
   * @param {Object} paymentInfo
   */
  async startPayment ({
    commit
  }, {
    orderName,
    paymentInfo
  }) {
    return post(PAYMENT_START(orderName), paymentInfo)
  },
  /**
   * facebook登陆完成，请求后端完成用户数据的收集
   * @param {obj} fbParam
   */
  async fbLogin ({
    commit
  }, fbParam) {
    const accessToken = fbParam.authResponse.accessToken

    return baseLogin(FB_LOGIN, {
      access_token: accessToken
    }, commit)
  },

  async getTrackingInfo ({
    commit
  }, orderName) {
    let data = await get(TRACKING_INFO + '/' + orderName)

    data.tracking_infos.forEach((item, i) => {
      var ifLastActive = true
      var lastElement = {}
      var lastNode = {}
      // var outDot = false
      item.tracking_msg.forEach((list, j) => {
        list.orangeSymbol = false
        list.lineShow = true
        if (list.active) {
          lastElement = list
        } else {
          ifLastActive = false
          lastElement.orangeSymbol = true
          // console.log('lastElement', lastElement)
          // return false
        }
        list.nodes.forEach((node, k) => {
          node.orangeSymbol = false
          node.lineShow = true
          if (node.active) {
            lastNode = node
            // console.log('lastNode1111', lastNode)
          } else {
            ifLastActive = false
            lastElement.orangeSymbol = true
            lastNode.orangeSymbol = true
            // console.log('lastElement', lastElement)
            // console.log('lastNode=>', lastNode)
            // return false
          }
        })
      })
      if (ifLastActive) {
        const trackingLen = item.tracking_msg.length
        if (item.tracking_msg[trackingLen - 1].nodes.length !== 0) {
          const nodes = item.tracking_msg[trackingLen - 1].nodes
          const nodeIndex =
            item.tracking_msg[item.tracking_msg.length - 1].nodes.length - 1
          nodes[nodeIndex].orangeSymbol = true
          item.tracking_msg[item.tracking_msg.length - 1].orangeSymbol = true
        } else {
          item.tracking_msg[item.tracking_msg.length - 1].orangeSymbol = true
        }
      }
      if (item.tracking_msg[item.tracking_msg.length - 1].nodes.length !== 0) {
        const nodes = item.tracking_msg[item.tracking_msg.length - 1].nodes
        const nodeIndex =
          item.tracking_msg[item.tracking_msg.length - 1].nodes.length - 1
        nodes[nodeIndex].lineShow = false
        item.tracking_msg[item.tracking_msg.length - 1].lineShow = false
      } else {
        item.tracking_msg[item.tracking_msg.length - 1].lineShow = false
      }
    })
    // console.log('data', data)
    return data
  },

  async getBalanceLogs () {
    return get(BALANCE)
  },

  /**
   * 领取coupon
   * @param {String} couponCode
   */
  async getCoupon ({
    commit
  }, couponCode) {
    const {
      coupon
    } = await post(COUPON, {
      coupon_template_code: couponCode
    })
    return coupon
  },

  /**
   * 调用余额支付
   * @param {String} orderName
   */
  async startBalancePayment ({
    commit
  }, orderName) {
    return post(PAYMENT_BALANCE_START(orderName))
  },

  /**
   * 创建一个快捷支付的
   * @param {String} orderName
   */
  async createQuickPay ({
    commit
  }, {
    orderName,
    resultURL
  }) {
    return post(CREATE_QUICK_PAY(orderName), {
      result_url: resultURL
    })
  },

  /**
   * 搜索接口
   * @param {String} searchType
   * @param {Object} searchParams
   */
  async searchProducts ({
    commit
  }, {
    searchType,
    searchParams
  }) {
    const {
      product_list: products
    } = await get(
      V2_SEARCH(searchType),
      searchParams
    )
    return calcProductSummary(products)
  },

  /**
   * 添加用户浏览记录
   * @param {Number} productId
   */
  async saveRecentViewed ({
    commit
  }, productId) {
    return post(RECENT_VIEWED, {
      product_id: productId
    })
  },

  async getProductReviews ({
    commit
  }, {
    productId,
    offset = 0,
    limit = 10
  }) {
    let data = await get(REVIEWS, {
      product: productId,
      offset: offset,
      limit: limit
    })
    const reviewList = data.review_list.map(value => {
      value.skuAll = ''
      if (value.sku && value.sku.attribute_info) {
        value.sku.attribute_info.forEach((item, i) => {
          if (i !== value.sku.attribute_info.length - 1) {
            value.skuAll = value.skuAll + item.attr_name + ':' + item.attr_value_name + ';'
          } else {
            value.skuAll = value.skuAll + item.attr_name + ':' + item.attr_value_name
          }
        })
      }
      return value
    })
    return {
      reviewList: reviewList,
      reviewCount: data.review_count
    }
  },

  /**
   * 根据用户IP获取地址信息
   */
  async getLocation () {
    return get(LOCATION)
  },

  /**
   * 获取热搜关键字
   */
  async getTrends () {
    const {
      keywords
    } = await get(SEARCH_TREND)
    return keywords
  },

  async saveFeedback ({
    commit
  }, content) {
    return post(FEEDBACK, {
      content: content
    })
  },

  /**
   * 获取活动信息
   */
  async getThemes ({
    commit
  }) {
    const themes = await get(THEMES)
    commit('setThemes', themes)
    return themes
  },

  /**
   * 获取uc新人优惠券活动信息
   */
  async postCoupons ({
    commit
  }) {
    const { result } = await post(COUPONS) || {}
    return result
  },

  /**
   * 发送cod验证码
   */
  async sendSmsCOD ({
    commit
  }, {
    orderName,
    phone,
    countryCode
  }) {
    return post(V2_SMS_COD, {
      order_name: orderName,
      phone: phone,
      country_code: countryCode
    })
  },
  async startCODPayment ({
    commit
  }, data) {
    return post(PAYMENT_COD_START(data.order_name), data)
  },

  /**
   * 获取商品的评论
   */
  async getProductReview ({
    commit
  }, {
    productId,
    rankType = 'rating',
    limit = 20,
    offset = 0,
    selfFirst = false,
    filterRating = false,
    needAverageAndCount = false
  }) {
    const params = {
      product_id: productId,
      rank_type: rankType,
      limit: limit,
      offset: offset,
      self_first: selfFirst ? '1' : '0',
      filter_rating: filterRating ? '1' : '0',
      need_average_and_count: needAverageAndCount ? '1' : '0'
    }
    const {
      average_rating: avgRating,
      rating_num: ratingNum,
      review_list: reviewList
    } = await get(V2_REVIEW_PRODUCT, params)
    return {
      avgRating: avgRating,
      ratingNum: ratingNum,
      reviewList: reviewList
    }
  },

  async getPaymentMethodV3 ({
    commit
  }, orderName) {
    const {
      payment_method_info: paymentMethods
    } = await get(V3_PAYMENT_METHOD(orderName))
    return paymentMethods
  },

  async startPaymentV3 ({
    commit
  }, data) {
    return post(V3_PAYMENT_START(data.order_name), data)
  }
}
