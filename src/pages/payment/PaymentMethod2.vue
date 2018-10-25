<template>
  <div class="method-container">
    <div class="method-content">
      <section class="order-info">
        <div class="order-title" @click="onOrderShowClick">
          <span class="order-name">{{$t('paymentText.order')}} #{{orderName}}</span>
          <span>
            {{$t('paymentText.total')}}
            <span class="order-total">{{symbol}} {{payInfo.total |money}}</span>
            <i class="iconfont icon-xiala" :class="{'icon-rotate': isShowOrder}"></i>
          </span>
        </div>
        <div class="order-detail" :class="{show: isShowOrder}">
          <shipping-to class="shipping" :name="shippingInfo.shippingName" :phone="shippingInfo.shippingPhone" :street="shippingInfo.shippingStreet2" :city="shippingInfo.shippingCity" :state="shippingInfo.shippingState" :zip="shippingInfo.shippingZip" :country="shippingInfo.shippingCountry"></shipping-to>
          <price-group :symbol="symbol" :group="payInfo"></price-group>
        </div>
      </section>

      <method-balance v-if="isShowbalance" :symbol="symbol" :balance="balanceInfo.balance_local"></method-balance>

      <section class="payment-group">
        <p class="method-title">{{$t('other.creditPayment')}}</p>

        <method-credit-card ref="creditCard" :pub-key="pubKey"></method-credit-card>
        <method-debit-card ref="debitCard" :pub-key="pubKey"></method-debit-card>
        <method-net-banking></method-net-banking>
        <method-wallet></method-wallet>
        <method-cod :symbol="symbol" :cod-fee="codInfo.cod_fee" :arrive-date="codInfo.arrive_date" :limit="codInfo.amount_total_max" :is-available="codInfo.available" :reasons="codInfo.reasons" v-if="isShowCod" ref="methodCod"></method-cod>
      </section>
    </div>

    <div class="md-btn md-btn-primary md-btn-paynow" :class="{disable: !enablePayNow}" @click="onPayNowClick">
      {{$t('button.payNow')}}
    </div>

    <confirm v-if="payFailedConfirm.show" :title="payFailedConfirm.title" :message="payFailedConfirm.message" :left-text="payFailedConfirm.leftText" :right-text="payFailedConfirm.rightText" :style-obj="payFailedConfirm.style" @choose="onHandlePayFailedConfirm"></confirm>

    <confirm v-if="changeMethodConfirm.show" :title="changeMethodConfirm.title" :message="changeMethodConfirm.message" :left-text="changeMethodConfirm.leftText" :right-text="changeMethodConfirm.rightText" :style-obj="changeMethodConfirm.style" @choose="onHandleChangeMethodConfirm"></confirm>
  </div>
</template>

<script>
  import MethodCreditCard from '@/components/methods/MethodCreditCard'
  import MethodDebitCard from '@/components/methods/MethodDebitCard'
  import MethodBalance from '@/components/methods/MethodBalance'
  import MethodNetBanking from '@/components/methods/MethodNetBanking'
  import MethodWallet from '@/components/methods/MethodWallet'
  import MethodCod from '@/components/methods/MethodCod'
  import CodPopModal from '@/components/modals/CodPopModal'

  import Confirm from '@/components/modals/Confirm'

  import ShippingTo from '@/components/ShippingTo'
  import PriceGroup from '@/components/PriceGroup'
  import googleAnalytics from '@/setup/setup-google-analytics'

  import {
    mapState
  } from 'vuex'

  import {
    PAYMENT_URL,
    PAY_SUCCESS_URL,
    PAY_FAILED_URL
  } from '@/config'

  import {
    METHOD_TYPE
  } from '@/config/const-conf'

  export default {
    components: {
      MethodCreditCard,
      MethodDebitCard,
      MethodBalance,
      MethodNetBanking,
      MethodWallet,
      MethodCod,
      CodPopModal,
      ShippingTo,
      PriceGroup,
      Confirm
    },
    data () {
      return {
        orderName: this.$route.params.orderName,
        symbol: '',
        order: {},
        isShowOrder: false,
        shippingInfo: {},
        payInfo: {},
        codInfo: {},
        balanceInfo: {},
        pubKey: '',
        payFailedConfirm: {
          show: false,
          title: 'paymentText.paymentFailed',
          message: '',
          leftText: 'button.cancel',
          rightText: 'button.tryAgain',
          style: {
            fontSize: '1.4rem'
          }
        },
        changeMethodConfirm: {
          show: false,
          title: '',
          message: '',
          leftText: 'button.cancel',
          rightText: 'button.changeMethod',
          style: {
            fontSize: '1.4rem'
          }
        }

      }
    },
    async created () {
      this.$loading.show()
      const order = await this.$store.dispatch('getOrderDetail', this.orderName)
      const paymentMethods = await this.$store.dispatch('getPaymentMethodV3', this.orderName)
      paymentMethods.forEach(item => {
        if (item.type === METHOD_TYPE.COD) {
          this.codInfo = item
        } else if (item.type === METHOD_TYPE.BALANCE) {
          this.balanceInfo = item
        } else if (item.type === METHOD_TYPE.CC || item.type === METHOD_TYPE.DC) {
          this.pubKey = item.pub_key
        }
      })
      this.order = order
      this.shippingInfo = order.shippingInfo
      this.symbol = order.currencySymbol
      const pay = order.payInfo

      // 计算优惠券信息
      const discount = order.discount
      let amountOff = 0
      // 如果是免邮的优惠券直接不用显示
      if (discount && !discount.free_shipping) {
        amountOff = discount.amount_off
      }

      this.payInfo = {
        subtotal: pay.subtotalLocal,
        shippingFee: pay.deliveryPriceLocal,
        tax: pay.taxLocal,
        total: order.totalLocal,
        codFee: pay.codPriceLocal,
        coupon: amountOff
      }
      this.$nextTick(() => {
        this.$loading.hide()
      })
    },
    methods: {
      onPaymentStart (orderName, data) {
        this.$loading.show()
        data = Object.assign({}, {
          order_name: orderName,
          type: this.currentPayMethod
        }, data)
        return this.$store.dispatch('startPaymentV3', data)
          .then(result => {
            googleAnalytics.sendEvent({
              ec: 'Checkout',
              ea: 'Pay Now',
              el: `Click Pay Now & ${this.currentPayMethod}`
            })
            if (result.async) {
              this.makePost(result.pay_url, result.post_data)
            } else {
              switch (result.code) {
                case 0:
                  // 如果是COD，直接强行取消modal，简单粗暴，弹框里面自己控制的显示和隐藏,其他方法太繁琐了,也没有必要
                  if (this.currentPayMethod === METHOD_TYPE.COD) {
                    document.querySelector('.modal').remove()
                  }

                  this.$router.replace({
                    name: 'paymentSuccess',
                    params: {
                      orderName: orderName
                    }
                  })
                  break
                case 1:
                  this.payFailedConfirm.show = true
                  this.payFailedConfirm.message = result.message
                  break
                case 2:
                  this.changeMethodConfirm.show = true
                  this.changeMethodConfirm.message = result.message
                  break
                default:
                  console.log('unknow error...')
                  break
              }
              this.$loading.hide()
            }
          })
      },
      makePost (url, data, target = '_self') {
        if (typeof data === 'string') {
          data = JSON.parse(data)
        }
        let oForm = document.createElement('form')
        oForm.method = 'post'
        oForm.action = url

        oForm.target = target

        for (let key in data) {
          let oInput = document.createElement('input')
          oInput.type = 'text'
          oInput.name = key
          oInput.value = data[key]
          oForm.appendChild(oInput)
        }
        document.body.appendChild(oForm)
        oForm.submit()
        document.body.removeChild(oForm)
      },
      async onPayNowClick () {
        if (!this.enablePayNow) {
          return false
        }
        if (this.currentPayMethod === METHOD_TYPE.COD) {
          this.$modal(CodPopModal, {
            props: {
              phone: this.shippingInfo.shippingPhone,
              phoneCode: this.shippingInfo.phoneAreaCode,
              countryCode: this.order.shippingCountryCode,
              orderName: this.orderName
            },
            on: {
              'cod-confirm': ({ smsCode }) => {
                this.onPaymentStart(this.orderName, {
                  sms_code: smsCode
                })
              }
            }
          })
        } else if ([METHOD_TYPE.WALLET, METHOD_TYPE.NB].includes(this.currentPayMethod)) {
          let params = {
            channel: 'paytm',
            payment_url: this.concatURL(PAYMENT_URL),
            pay_success_url: this.concatURL(PAY_SUCCESS_URL(this.orderName)),
            pay_failed_url: this.concatURL(PAY_FAILED_URL(this.orderName)),
            use_balance: false
          }
          let { url, data } = await this.$store.dispatch('startPayment', {
            orderName: this.orderName,
            paymentInfo: params
          })
          googleAnalytics.sendEvent({
            ec: 'Checkout',
            ea: 'Pay Now',
            el: `Click Pay Now & ${this.defaultMethod}`
          })
          this.makePost(url, data)
        } else {
          let data = {}
          if ([METHOD_TYPE.CC, METHOD_TYPE.DC].includes(this.currentPayMethod)) {
            const refName = this.currentPayMethod === METHOD_TYPE.CC ? 'creditCard' : 'debitCard'
            const res = this.$refs[refName].validate()
            if (!res) {
              return false
            }
            data = Object.assign(res, {
              pay_success_url: this.concatURL(PAY_SUCCESS_URL(this.orderName)),
              pay_failed_url: this.concatURL(PAY_FAILED_URL(this.orderName))
            })
          }
          this.onPaymentStart(this.orderName, data)
        }
      },
      onOrderShowClick () {
        this.isShowOrder = !this.isShowOrder
      },
      concatURL (uri) {
        let origin = window.location.origin
        if (!origin) {
          origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '')
        }
        return `${origin}${uri}`
      },
      onHandlePayFailedConfirm (choice) {
        if (choice) {
          this.payFailedConfirm.show = false
        } else {
          this.$router.replace({
            name: 'orderDetail',
            params: {
              orderId: this.orderName
            }
          })
        }
      },
      onHandleChangeMethodConfirm (choice) {
        if (choice) {
          this.changeMethodConfirm.show = false
        } else {
          this.$router.replace({
            name: 'orderDetail',
            params: {
              orderId: this.orderName
            }
          })
        }
      }
    },
    computed: {
      ...mapState({
        currentPayMethod: 'currentPayMethod'
      }),
      isShowbalance () {
        return this.balanceInfo.balance_local > 0
      },
      isShowCod () {
        return this.codInfo.type
      },
      enablePayNow () {
        return !!this.currentPayMethod
      }
    },
    watch: {
      currentPayMethod (value) {
        if (value === METHOD_TYPE.COD) {
          this.payInfo.codFee = this.codInfo.cod_fee
          this.payInfo.total += this.codInfo.cod_fee
        } else {
          this.payInfo.codFee = 0
          this.payInfo.total = this.order.totalLocal
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .method-container {
    height: 100%;
    .method-content {
      overflow: auto;
      .order-info {
        margin-bottom: 1.2rem;
        .order-title {
          padding: 0 1rem;
          height: px2rem(44);
          display: flex;
          justify-content: space-between;
          line-height: px2rem(44);
          background: $white;
          .order-name {
            color: $dove-gray;
          }
          .order-total {
            color: $flamingo;
          }
          .iconfont {
            color: $icon-color;
          }
        }
        .order-detail {
          max-height: 0;
          transition: max-height 0.15s ease-out;
          overflow: hidden;
          &.show {
            max-height: px2rem(500);
            transition: max-height 0.25s ease-in;
          }
          .address {
            padding: px2rem(15);
            margin-top: px2rem(1);
          }
          .price-group {
            margin-top: px2rem(1);
          }
        }
      }
      .payemnt-method + .payemnt-method {
        border-top: $border;
      }
      .payment-group {
        margin: 1.2rem 0;
        .method-title {
          background: $title-background-color;
          height: 4.4rem;
          line-height: 4.4rem;
          padding: 0 1rem;
        }
      }
    }
    .md-btn-paynow {
      width: 100%;
      font-size: $medium;
      height: 4.4rem;
      line-height: 4.4rem;
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 99;
      border-radius: 0;
      &.disable {
        background-color: $dusty-gray;
      }
    }
  }
</style>
