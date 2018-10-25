import {
  PAYMENT_METHOD
} from './const-conf'

export const AXIOS_CONF = {
  baseURL: '',
  timeout: 10000
}
export const getCountryInfo = (id, symbol, unit, name, code, language, phonePrefix, phoneLength) => {
  return {
    id: id,
    // symbol: symbol,
    unit: unit,
    name: name,
    code: code,
    // image: require(`@/static/img/flags/${code}.jpg`),
    language: language,
    phonePrefix: phonePrefix,
    phoneLength: phoneLength
  }
}

export const countries = [
  getCountryInfo(2, 'AED', 'AED', 'United Arab Emirates', 'ae', 'ar', 971, 9),
  getCountryInfo(14, 'AUD', 'AUD', 'Australia', 'au', 'en', 61, 9),
  getCountryInfo(20, 'BDT', 'BDT', 'Bangladesh', 'bd', 'en', 880, 10),
  getCountryInfo(24, 'BHD', 'BHD', 'Bahrain', 'bh', 'ar', 973, 8),
  getCountryInfo(32, 'BRL', 'BRL', 'Brazil', 'br', 'pt_BR', 55, 9),
  getCountryInfo(39, 'CAD', 'CAD', 'Canada', 'ca', 'en', 1, 10),
  getCountryInfo(66, 'EGP', 'EGP', 'Egypt', 'eg', 'ar', 20, 11),
  getCountryInfo(69, 'EUR', 'EUR', 'Spain', 'es', 'en', 34, 9),
  getCountryInfo(76, 'EUR', 'EUR', 'France', 'fr', 'en', 33, 10),
  getCountryInfo(101, 'IDR', 'IDR', 'Indonesia', 'id', 'id', 62, 11),
  getCountryInfo(103, 'ILS', 'ILS', 'Israel', 'il', 'en', 972, 9),
  getCountryInfo(105, '₹', 'INR', 'India', 'in', 'en', 91, 10),
  getCountryInfo(123, 'KWD', 'KWD', 'Kuwait', 'kw', 'ar', 965, 8),
  getCountryInfo(127, 'LBP', 'LBP', 'Lebanon', 'lb', 'ar', 961, 8),
  getCountryInfo(130, 'LKR', 'LKR', 'Sri Lanka', 'lk', 'en', 94, 9),
  getCountryInfo(157, 'MXN', 'MXN', 'Mexico', 'mx', 'es_MX', 52, 8),
  getCountryInfo(158, 'MYR', 'MYR', 'Malaysia', 'my', 'en', 60, 10),
  getCountryInfo(173, 'OMR', 'OMR', 'Oman', 'om', 'ar', 968, 8),
  getCountryInfo(178, 'PHP', 'PHP', 'Philippines', 'ph', 'en', 63, 10),
  getCountryInfo(188, 'QAR', 'QAR', 'Qatar', 'qa', 'ar', 974, 8),
  getCountryInfo(194, 'SAR', 'SAR', 'Saudi Arabia', 'sa', 'ar', 966, 9),
  getCountryInfo(199, 'SGD', 'SGD', 'Singapore', 'sg', 'en', 65, 8),
  getCountryInfo(219, 'THB', 'THB', 'Thailand', 'th', 'en', 66, 9),
  getCountryInfo(233, 'GBP', 'GBP', 'United Kingdom', 'gb', 'en', 44, 10),
  getCountryInfo(235, 'USD', 'USD', 'United States', 'us', 'en', 1, 10),
  getCountryInfo(243, 'VND', 'VND', 'Vietnam', 'vn', 'en', 84, 10)
  // getCountryInfo(192, 'RUB', 'RUB', 'Russian Federation', 'ru','en'),
].sort((a, b) => {
  return a.name > b.name ? 1 : -1
})

export const LANGUAGE_CONF = [{
  id: 'en',
  name: 'English'
},
{
  id: 'hi',
  name: 'हिंदी'
},
{
  id: 'es',
  name: 'Español'
},
{
  id: 'ar',
  name: 'عربى'
},
{
  id: 'pt',
  name: 'Português'
},
{
  id: 'id',
  name: 'bahasa Indonesia'
}
]

export const COUNTRY_MAP = {
  au: {
    id: 14,
    symbol: 'AUD',
    unit: 'AUD',
    name: 'Australia',
    code: 'au',
    image: '/static/img/flags/au.jpg',
    zipTips: 'include 4 number',
    maxlength: 4,
    phoneLength: 9,
    phonePrefix: 61,
    isActive: false
  },
  bh: {
    id: 24,
    symbol: 'BHD',
    unit: 'BHD',
    name: 'Bahrain',
    code: 'bh',
    image: '/static/img/flags/bh.jpg',
    zipTips: 'include 3-4 number',
    maxlength: 4,
    phoneLength: 8,
    phonePrefix: 973,
    isActive: false
  },
  bd: {
    id: 20,
    symbol: 'BDT',
    unit: 'BDT',
    name: 'Bangladesh',
    code: 'bd',
    image: '/static/img/flags/bd.jpg',
    zipTips: 'include 4 number',
    maxlength: 4,
    phoneLength: 10,
    phonePrefix: 880,
    isActive: false
  },
  br: {
    id: 32,
    symbol: 'BRL',
    unit: 'BRL',
    name: 'Brazil',
    code: 'br',
    image: '/static/img/flags/br.jpg',
    zipTips: 'include 8-9 number or - or space',
    maxlength: 9,
    phoneLength: 9,
    phonePrefix: 55,
    isActive: false
  },
  ca: {
    id: 39,
    symbol: 'CAD',
    unit: 'CAD',
    name: 'Canada',
    code: 'ca',
    image: '/static/img/flags/ca.jpg',
    zipTips: 'include 6-7 number or letter or space',
    maxlength: 7,
    phoneLength: 10,
    phonePrefix: 1,
    isActive: false
  },
  eg: {
    id: 66,
    symbol: 'EGP',
    unit: 'EGP',
    name: 'Egypt',
    code: 'eg',
    image: '/static/img/flags/eg.jpg',
    zipTips: 'include 5 number',
    maxlength: 5,
    phoneLength: 11,
    phonePrefix: 20,
    isActive: false
  },
  fr: {
    id: 76,
    symbol: 'EUR',
    unit: 'EUR',
    name: 'France',
    code: 'fr',
    image: '/static/img/flags/fr.jpg',
    zipTips: 'include 5 number',
    maxlength: 5,
    phoneLength: 10,
    phonePrefix: 33,
    isActive: false
  },
  in: {
    id: 105,
    symbol: '₹',
    unit: 'INR',
    name: 'India',
    code: 'in',
    image: '/static/img/flags/in.jpg',
    zipTips: 'include 6 number',
    maxlength: 6,
    phoneLength: 10,
    phonePrefix: 91,
    isActive: false
  },
  id: {
    id: 101,
    symbol: 'IDR',
    unit: 'IDR',
    name: 'Indonesia',
    code: 'id',
    image: '/static/img/flags/id.jpg',
    zipTips: 'include 5 number',
    maxlength: 5,
    phoneLength: 11,
    phonePrefix: 62,
    isActive: false
  },
  il: {
    id: 103,
    symbol: 'ILS',
    unit: 'ILS',
    name: 'Israel',
    code: 'il',
    image: '/static/img/flags/il.jpg',
    zipTips: 'include 5 or 7 number',
    maxlength: 7,
    phoneLength: 9,
    phonePrefix: 972,
    isActive: false
  },
  kw: {
    id: 123,
    symbol: 'KWD',
    unit: 'KWD',
    name: 'Kuwait',
    code: 'kw',
    image: '/static/img/flags/kw.jpg',
    zipTips: 'include 5 number',
    maxlength: 5,
    phoneLength: 8,
    phonePrefix: 965,
    isActive: false
  },
  lb: {
    id: 127,
    symbol: 'LBP',
    unit: 'LBP',
    name: 'Lebanon',
    code: 'lb',
    image: '/static/img/flags/lb.jpg',
    zipTips: 'include 4 or 8 or 9 number or letter or space',
    maxlength: 9,
    phoneLength: 8,
    phonePrefix: 961,
    isActive: false
  },
  my: {
    id: 158,
    symbol: 'MYR',
    unit: 'MYR',
    name: 'Malaysia',
    code: 'my',
    image: '/static/img/flags/my.jpg',
    zipTips: 'include 5 number',
    maxlength: 5,
    phoneLength: 10,
    phonePrefix: 60,
    isActive: false
  },
  mx: {
    id: 157,
    symbol: 'MXN',
    unit: 'MXN',
    name: 'Mexico',
    code: 'mx',
    image: '/static/img/flags/mx.jpg',
    zipTips: 'include 5 number',
    maxlength: 5,
    phoneLength: 10,
    phonePrefix: 52,
    isActive: true
  },
  om: {
    id: 173,
    symbol: 'OMR',
    unit: 'OMR',
    name: 'Oman',
    code: 'om',
    image: '/static/img/flags/om.jpg',
    zipTips: 'include 3 number',
    maxlength: 3,
    phoneLength: 8,
    phonePrefix: 968,
    isActive: false
  },
  ph: {
    id: 178,
    symbol: 'PHP',
    unit: 'PHP',
    name: 'Philippines',
    code: 'ph',
    image: '/static/img/flags/ph.jpg',
    zipTips: 'include 4 number',
    maxlength: 4,
    phoneLength: 10,
    phonePrefix: 63,
    isActive: false
  },
  qa: {
    id: 188,
    symbol: 'QAR',
    unit: 'QAR',
    name: 'Qatar',
    code: 'qa',
    image: '/static/img/flags/qa.jpg',
    phoneLength: 8,
    phonePrefix: 974,
    isActive: false
  },
  sa: {
    id: 194,
    symbol: 'SAR',
    unit: 'SAR',
    name: 'Saudi Arabia',
    code: 'sa',
    image: '/static/img/flags/sa.jpg',
    phoneLength: 9,
    phonePrefix: 966,
    isActive: false
  },
  sg: {
    id: 199,
    symbol: 'SGD',
    unit: 'SGD',
    name: 'Singapore',
    code: 'sg',
    image: '/static/img/flags/sg.jpg',
    zipTips: 'include 6 number',
    maxlength: 6,
    phoneLength: 8,
    phonePrefix: 65,
    isActive: false
  },
  es: {
    id: 69,
    symbol: 'EUR',
    unit: 'EUR',
    name: 'Spain',
    code: 'es',
    image: '/static/img/flags/es.jpg',
    zipTips: 'include 5 number',
    maxlength: 5,
    phoneLength: 9,
    phonePrefix: 34,
    isActive: false
  },
  lk: {
    id: 130,
    symbol: 'LKR',
    unit: 'LKR',
    name: 'Sri Lanka',
    code: 'lk',
    image: '/static/img/flags/lk.jpg',
    zipTips: 'include 5 number',
    maxlength: 5,
    phoneLength: 9,
    phonePrefix: 94,
    isActive: false
  },
  th: {
    id: 219,
    symbol: 'THB',
    unit: 'THB',
    name: 'Thailand',
    code: 'th',
    image: '/static/img/flags/th.jpg',
    zipTips: 'include 5 number',
    maxlength: 5,
    phoneLength: 9,
    phonePrefix: 66,
    isActive: false
  },
  ae: {
    id: 2,
    symbol: 'AED',
    unit: 'AED',
    name: 'United Arab Emirates',
    code: 'ae',
    image: '/static/img/flags/ae.jpg',
    phoneLength: 9,
    phonePrefix: 971,
    isActive: false
  },
  gb: {
    id: 233,
    symbol: 'GBP',
    unit: 'GBP',
    name: 'United Kingdom',
    code: 'gb',
    image: '/static/img/flags/gb.jpg',
    zipTips: 'include 5-8 number or letter or space',
    maxlength: 8,
    phoneLength: 10,
    phonePrefix: 44,
    isActive: false
  },
  us: {
    id: 235,
    symbol: 'USD',
    unit: 'USD',
    name: 'United States',
    code: 'us',
    image: '/static/img/flags/us.jpg',
    zipTips: 'include 5 or 9 or 10 number or letter or space',
    maxlength: 10,
    phoneLength: 10,
    phonePrefix: 1,
    isActive: false
  },
  vn: {
    id: 243,
    symbol: 'VND',
    unit: 'VND',
    name: 'Vietnam',
    code: 'vn',
    image: '/static/img/flags/vn.jpg',
    zipTips: 'include 6 number',
    maxlength: 6,
    phoneLength: 10,
    phonePrefix: 84,
    isActive: false
  }
}

export function getSupportCountries () {
  return Object.keys(COUNTRY_MAP)
}

export function isSupportCountry (countryCode) {
  if (countryCode) {
    countryCode = countryCode.toLowerCase()
    return getSupportCountries().includes(countryCode)
  }
  return false
}

export function transCountry2Id () {
  const res = {}
  for (let code in COUNTRY_MAP) {
    const country = COUNTRY_MAP[code]
    res['' + country.id] = country
  }
  return res
}

export const PAYMENT_METHODS = {
  balance: {
    name: PAYMENT_METHOD.BALANCE,
    images: [],
    text: 'methodText.balance'
  },
  boleto: {
    name: PAYMENT_METHOD.BOLETO,
    images: [],
    text: 'Boleto'
  },
  cashfree: {
    name: PAYMENT_METHOD.CASHFREE,
    images: [require('@/assets/img/payment/cashfree.jpg')],
    text: 'Freecharge / MobiKwik / Ola / Jio / Oxigen / Airtel'
  },
  ocean_br: {
    name: PAYMENT_METHOD.OCEAN_BR,
    images: [require('@/assets/img/payment/op_payment.jpg')],
    text: 'Cartão de crédito/débito'
  },
  ocean_mx: {
    name: PAYMENT_METHOD.OCEAN_MX,
    images: [require('@/assets/img/payment/ocean_mx.jpg')],
    text: ''
  },
  ocean: {
    name: PAYMENT_METHOD.OCEAN,
    images: [require('@/assets/img/payment/ocean.jpg')]
  },
  ocean_q: {
    name: PAYMENT_METHOD.OCEAN_Q,
    images: [require('@/assets/img/payment/ocean_mx.jpg')]
  },
  paypal: {
    name: PAYMENT_METHOD.PAYPAL,
    images: [require('@/assets/img/payment/paypal.jpg')],
    text: ''
  },
  paytm: {
    name: PAYMENT_METHOD.PAYTM,
    images: [require('@/assets/img/payment/paytm.jpg')],
    text: 'Wallet / Credit&Debit Card / Net Banking'
  },
  payu: {
    name: PAYMENT_METHOD.PAYU,
    images: [require('@/assets/img/payment/payu.jpg')],
    text: 'Wallet / Credit&Debit Card / Net Banking'
  },
  xendit: {
    name: PAYMENT_METHOD.XENDIT,
    images: [require('@/assets/img/payment/xendit.jpg')],
    text: 'Bank Transfer / Credit Card'
  },
  cod: {
    name: PAYMENT_METHOD.COD,
    images: [],
    text: 'Cash on Delivery'
  }
}

export const PAYMENT_URL = '/payment'
export const PAY_SUCCESS_URL = orderName => `/payment/${orderName}/success`
export const PAY_FAILED_URL = orderName => `/payment/${orderName}/failed`
