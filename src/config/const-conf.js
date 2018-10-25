export const BALANCE_RESULT = {
  fail: 0,
  success: 1,
  alreadyPaid: 2,
  noEnoughBalance: 3,
  orderExpired: 4,
  error: 9
}

export const PAYMENT_METHOD = {
  OCEAN: 'ocean',
  OCEAN_Q: 'ocean_q',
  OCEAN_BR: 'ocean_br',
  OCEAN_MX: 'ocean_mx',
  BOLETO: 'boleto',
  CASHFREE: 'cashfree',
  PAYPAL: 'paypal',
  PAYTM: 'paytm',
  PAYU: 'payu',
  XENDIT: 'xendit',
  BALANCE: 'balance',
  COD: 'cod'
}

export const METHOD_TYPE = {
  CC: 1,
  DC: 2,
  BALANCE: 3,
  COD: 4,
  WALLET: 5,
  NB: 6
}

export const STAR_EXPLAIN = {
  1: 'Very Dissatisfied',
  2: 'Dissatisfied',
  3: 'Average',
  4: 'Somewhat Satisfied',
  5: 'Satisfied'
}
