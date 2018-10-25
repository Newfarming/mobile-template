/**
 * 所有的后端接口的地址全部配置在这里
 */

const protocol = 'https'
const hostname = '127.0.0.1'
const port = 3333
const version = 'api/v1'
const version2 = 'api/v2'
const version3 = 'api/v3'
export const server = `${protocol}://${hostname}:${port}`

export const SHIPPING_INFO = `/${version}/shipping/info`
export const BALANCE = `/${version}/balance/logs`
export const COUPONS = `/${version}/coupons`
export const COUPON = `/${version}/coupon`
export const PRODUCT_SEARCH = `/${version}/product/search`
export const ORDER = `/${version}/order`
export const SHIPPING_ADDRESS = `/${version}/user/shipping_address`
export const VALIDATE_ZIP_CODE = `/${version}/pincode`
export const AUTH_LOGIN = `/${version}/auth/login/`
export const AUTH_SIGN_UP = `/${version}/auth/signup`
export const CART_PRODUCT_QTY_UPDATE = `/${version}/cart/item/update`
export const CATEGORY = `/${version}/category`
export const HOME = `/${version}/index`
export const PRODUCT = `/${version}/product`
export const CART_DELETE = `/${version}/cart/item/delete`
export const CART_GET = `/${version}/cart/item/get`
export const CART_ADD = `/${version}/cart/item/add`
export const ORDER_PREVIEW = `/${version}/order/preview`
export const ORDERS = `/${version}/orders`
export const FB_LOGIN = `/${version}/auth/login/facebook`
export const FORGOT = `/${version}/auth/password`
export const TRACKING_INFO = `/${version}/order/tracking`
export const RECENT_VIEWED = `/${version}/user/recent_viewed`
export const REVIEWS = `/${version}/review`
export const LOCATION = `/${version}/location/by-ip`
export const SEARCH_TREND = `/${version}/search/trend`
export const FEEDBACK = `/${version}/feedback`
export const THEMES = `/${version}/themes`
export const GET_VCODE_FOR_INQUIRY_ORDER_NUMBER = `/${version}/user/order/sms`
export const GET_ORDER_FOR_INQUIRY_ORDER_NUMBER = `/${version}/user/order/token`

// v2
export const V2_CATEGORY = `/${version2}/category`
export const V2_SEARCH = searchType => `/${version2}/product/search/${searchType}`
export const V2_PAYMENT_METHOD = orderName => (`/${version2}/payment/${orderName}/method`)
export const PAYMENT_METHOD = orderName => (`/${version2}/payment/${orderName}/method`)
export const PAYMENT_START = orderName => (`/${version2}/payment/${orderName}/start`)
export const PAYMENT_BALANCE_START = orderName => (`/${version2}/payment/${orderName}/start/balance`)
export const PAYMENT_COD_START = orderName => `/${version2}/payment/${orderName}/start/cod`
export const CREATE_QUICK_PAY = orderName => `/${version2}/payment/ocean/quickpay/${orderName}`
export const V2_SMS_COD = `/${version2}/payment/sms/cod`
export const V2_REVIEW_PRODUCT = `/${version2}/review/product`

// v3
export const V3_PAYMENT_METHOD = orderName => `/${version3}/payment/${orderName}/method`
export const V3_PAYMENT_START = orderName => `/${version3}/payment/${orderName}/start`
