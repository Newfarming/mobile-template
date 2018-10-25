/**
 * 保留两位小数
 * @param {int} value
 */
export function round (value) {
  try {
    return Math.round(value * 100) / 100
  } catch (e) {
    return 0
  }
}

export function calDiscount (price, platformPrice) {
  try {
    price = parseInt(price) || 0
    platformPrice = parseInt(platformPrice) || 0
    const rest = platformPrice - price
    if (rest <= 0) {
      return 0
    }
    return parseInt(rest / platformPrice * 100)
  } catch (e) {
    return 0
  }
}

export function calcProductSummary (productInfo) {
  return productInfo.map(item => {
    return {
      productId: item.id,
      productNo: item.product_no,
      imageUrl: item.image_url,
      price: round(item.list_price),
      priceUS: round(item.list_price_us),
      platformPrice: round(item.c_platform_price),
      platformName: item.c_platform_name,
      discount: calDiscount(item.list_price, item.c_platform_price),
      isPick: item.is_pick,
      productName: item.name,
      productNameLocal: item.name_local
    }
  })
}

export function calcShippingInfo (shippingCosts, deliveryInfo, prepareInfo) {
  let shippingFee = 0
  let orderShippingAmount = 0
  for (let i in shippingCosts) {
    const cost = shippingCosts[i]
    if (cost.shipping_cost_local === 0) {
      orderShippingAmount = cost.order_amount_local
      const preCost = shippingCosts[i - 1]
      if (preCost) {
        shippingFee = preCost.shipping_cost_local
      }
      break
    }
  }
  return {
    courier: deliveryInfo.carrier,
    shippingTime: [
      deliveryInfo.min_days + prepareInfo.min_days,
      deliveryInfo.max_days + prepareInfo.max_days
    ],
    shippingFee: shippingFee,
    orderShippingAmount: orderShippingAmount
  }
}
export function urlSearch () {
  var name, value
  var str = location.href // 取得整个地址栏
  var num = str.indexOf('?')
  str = str.substr(num + 1) // 取得所有参数   stringvar.substr(start [, length ]

  var arr = str.split('&') // 各个参数放到数组里
  var obj = {}
  for (var i = 0; i < arr.length; i++) {
    num = arr[i].indexOf('=')
    if (num > 0) {
      name = arr[i].substring(0, num)
      value = arr[i].substr(num + 1)
      obj[name] = value
    }
  }
  return obj
}

export function getParameterByName (name) {
  var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search)
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
}

export function findActiveCategory (categories, categoryId, categoryArray) {
  if (categories) {
    return categories.some(item => {
      let flag = item.category_id === categoryId
      categoryArray.push(item)
      if (!flag) {
        flag = findActiveCategory(item.sub_category, categoryId, categoryArray)
        if (!flag) {
          categoryArray.pop()
        }
      }
      return flag
    })
  }
  return false
}
