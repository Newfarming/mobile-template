<template>
  <div class="payment-method-container">
    <div class="method-content">
      <section class="order-info">
        <div class="order-title" @click="onOrderShowClick">
          <span class="order-name">{{$t('paymentText.order')}} #{{orderName}}</span>
          <span>
            {{$t('paymentText.total')}}
            <span class="order-total">{{symbol}} {{order.totalLocal |round}}</span>
            <i class="iconfont icon-xiala" :class="{'icon-rotate': isShowOrder}"></i>
          </span>
        </div>
        <div class="order-detail" :class="{show: isShowOrder}">
          <shipping-to class="shipping" :name="shippingInfo.shippingName" :phone="shippingInfo.shippingPhone" :street="shippingInfo.shippingStreet2" :city="shippingInfo.shippingCity" :state="shippingInfo.shippingState" :zip="shippingInfo.shippingZip" :country="shippingInfo.shippingCountry"></shipping-to>
          <price-group :symbol="symbol" :group="payInfo"></price-group>
        </div>
      </section>

      <div class="payment-balance" @click="onBalanceItemClick" v-if="balanceMethod">
        <p class="payment-method-name">{{balanceMethod.text}}</p>
        <i class="iconfont" :class="[isUseBalance ? 'icon-xuanzhong': 'icon-xuanze']"></i>
      </div>

      <section class="payment-method" v-if="quickPayMethod.quickPayCards">
        <div class="title">
          <span>{{$t('payment.accept')}}</span>
          <img :src="image" alt="" v-for="(image, index) in quickPayMethod.images" :key="index">
        </div>
        <div class="payment-item" v-for="{quickpay_id, card_number} in quickPayMethod.quickPayCards" :key="quickpay_id" @click="onCardNumberItemClick(quickpay_id)">
          <p>{{card_number}}</p>
          <i class="iconfont" :class="[quickpay_id === defaultCardId ? 'icon-xuanzhong': 'icon-xuanze']"></i>
        </div>
        <div class="payment-item" @click="onAddCardClick">
          <p class="payment-method-name btn-add-credit">
            <i class="iconfont icon-add1"></i>
            {{$t('button.addNewCard')}}
          </p>
        </div>
      </section>

      <section class="payment-method" v-if="methods && methods.length > 0">
        <div class="title">{{$t('title.paymentMethod')}}</div>
        <div v-for="method in methods" :key="method.name">
          <div class="payment-item" @click="onPaymentMethodItemClick(method.name)">
            <div>
              <div class="payment-image-group">
                <img :src="image" alt="" v-for="(image, index) in method.images" :key="index">
              </div>
              <p class="payment-method-name method-cod" v-if="method.name === 'cod'">
                <i class="iconfont icon-cash"></i>
                {{method.text}}
              </p>

              <p class="payment-method-name" v-if="method.name !== 'cod' && method.text">{{method.text}}</p>
            </div>
            <p class="cod-tip" v-if="method.name === 'cod' && !isCODAvailable">({{$t('other.notAvailable')}},
              <a @click.stop="onClickOpenCodModal">{{$t('other.why')}}?</a>)</p>
            <i class="iconfont" :class="[method.name === defaultMethod ? 'icon-xuanzhong': 'icon-xuanze']"></i>
          </div>

          <section class="payment-section" v-if="method.name === 'ocean_mx' && method.name === defaultMethod">
            <method-ocean-mx :ref="method.name" :pubkey="method.extra.pubkey" :interest-rates="method.extra.interest_rates" :total="paidTotal"></method-ocean-mx>
          </section>
          <section class="payment-section" v-else-if="method.name === 'ocean_br' && method.name === defaultMethod">
            <method-ocean-br :ref="method.name" :pubkey="method.extra.pubkey" :interest-rates="method.extra.interest_rates" :total="paidTotal"></method-ocean-br>
          </section>
          <section class="payment-section" v-else-if="method.name === 'boleto' && method.name === defaultMethod">
            <method-boleto :ref="method.name" :name="shippingInfo.shippingName" :email="shippingInfo.shippingEmail"></method-boleto>
          </section>
          <section class="payment-section method-cod" v-else-if="method.name === 'cod' && method.name === defaultMethod">
            <div>
              <p>{{$t('paymentText.cod.p1')}}</p>
              <p>1.
                <span v-html="$t('paymentText.cod.p2', {arriveDate: codDetail.arrive_date})"></span>
              </p>
              <p>2.{{$t('paymentText.cod.p3')}}</p>
              <p>3.
                <span v-html="$t('paymentText.cod.p4', {symbol: symbol, codFee: codDetail.cod_fee})"></span>
              </p>
              <p>4.{{$t('paymentText.cod.p5')}}</p>
              <p>5.{{$t('paymentText.cod.p6')}}(
                <a @click="onClickOpenCodModal($event, true)">{{$t('paymentText.cod.detail')}}</a>)</p>
            </div>

          </section>
        </div>
      </section>

      <transition name="fade">
        <section class="quick-pay-modal" v-show="isQuickPayFrameShow">
          <iframe name="quickpay_frame" frameborder="0" src=""></iframe>
          <i class="iconfont icon-guanbi" @click="onQuickPayModalCloseClick"></i>
        </section>
      </transition>
    </div>

    <div class="m-btn" @click="onPayNowClick">
      {{$t('button.payNow')}}
    </div>

    <cod-modal v-if="isShowCodModal" @modal-close="isShowCodModal=false" :is-detail="isDetail" :symbol="symbol" :limit="codDetail.amount_total_max" :reasons="codDetail.reasons"></cod-modal>

    <cod-pop v-if="isShowCodPop" :country-code="order.shippingCountryCode" :phone="shippingInfo.shippingPhone" :phone-code="shippingInfo.phoneAreaCode" :order-name="orderName" :rest-time="restTime" @cod-confirm="onHandleCodConfirm" @modal-close="() => this.isShowCodPop=false" @send-sms-code="onHandleSendSmsCode"></cod-pop>
  </div>
</template>
<script>
  import ShippingTo from '@/components/ShippingTo'
  import PriceGroup from '@/components/PriceGroup'
  import MethodOceanMx from '@/pages/payment/MethodOceanMx'
  import MethodOceanBr from '@/pages/payment/MethodOceanBr'
  import MethodBoleto from '@/pages/payment/MethodBoleto'
  import CodModal from '@/components/modals/CodModal'
  import CodPop from '@/components/CodPop'

  import {
    PAYMENT_METHODS,
    PAYMENT_URL,
    PAY_SUCCESS_URL,
    PAY_FAILED_URL
  } from '@/config'
  import {
    PAYMENT_METHOD,
    BALANCE_RESULT
  } from '@/config/const-conf'
  import {
    openNativeApp
  } from '@/utils'
  import googleAnalytics from '@/setup/setup-google-analytics'
  import {
    mapState
  } from 'vuex'

  export default {
    components: {
      ShippingTo,
      PriceGroup,
      MethodOceanMx,
      MethodOceanBr,
      MethodBoleto,
      CodModal,
      CodPop
    },
    async created () {
      this.$loading.show()
      const order = await this.$store.dispatch('getOrderDetail', this.orderName)
      const { methodNames, methods } = await this.$store.dispatch('getPaymentMethods', this.orderName)
      this.$nextTick(() => {
        this.$loading.hide()
      })
      this.symbol = order.currencySymbol
      this.shippingInfo = order.shippingInfo
      this.order = order
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

      this.methodNames = methodNames

      // 计算支付方式
      this.methods = methodNames.map(item => {
        let method = PAYMENT_METHODS[item]
        if (!method) {
          return false
        }

        if (method.name === PAYMENT_METHOD.OCEAN_Q) {
          // method['quickPayCards'] = methods['ocean_q']['quickpay_ids'] || []
          // this.quickPayMethod = method
          // 先隐藏钱海快捷支付
          return false
        } else if (method.name === 'ocean_mx' || method.name === 'ocean_br') {
          method.extra = methods[method.name]
        } else if (method.name === 'balance') {
          this.isUseBalance = true
          this.balance = methods['balance'].balance_local
          method['balance'] = this.balance
          method['text'] = this.$i18n.t(method['text'], { symbol: this.symbol, balance: this.balance })
          this.balanceMethod = method
          return false
        } else if (method.name === PAYMENT_METHOD.COD) {
          this.codDetail = methods[method.name].cod_details
          this.isCODAvailable = this.codDetail.available
        }
        return method
      }).filter(Boolean)
      // 设置默认的请求
      if (this.isUseBalance && this.balance < this.order.totalLocal && this.quickPayMethod.name) {
        this.defaultMethod = this.quickPayMethod.name
      } else if (this.isUseBalance && this.balance < this.order.totalLocal && this.methods.length > 0) {
        this.defaultMethod = this.methods[0].name
      } else {
        this.defaultMethod = methodNames && methodNames.length > 0 ? methodNames[0] : ''
      }
      console.log('methods=>', this.methods)
    },
    data () {
      return {
        isShowOrder: false,
        isQuickPayFrameShow: false,
        quickPayMethod: {},
        balanceMethod: '',
        balance: 0,
        isUseBalance: false,
        symbol: '',
        orderName: this.$route.params.orderName,
        shippingInfo: {},
        order: {},
        payInfo: {},
        methods: [],
        defaultMethod: '',
        defaultCardId: '',
        codDetail: {},
        isShowCodModal: false,
        isCODAvailable: false,
        isDetail: false,
        isShowCodPop: false,
        smsCodeTimer: null,
        resendInterval: 60,
        restTime: 0
      }
    },
    methods: {
      onClickDownloadApp () {
        openNativeApp()
      },
      onOrderShowClick () {
        this.isShowOrder = !this.isShowOrder
      },
      onPaymentMethodItemClick (methodName) {
        console.log('method =>', methodName)
        // 只有在用户没有选择使用余额或者余额不够支付订单的情况下才可以选择其他的支付方式
        if (!this.isUseBalance || this.balance < this.order.totalLocal) {
          if (methodName === PAYMENT_METHOD.COD && !this.isCODAvailable) {
            this.$toast('cod not available')
            return false
          }
          if (methodName === PAYMENT_METHOD.COD) {
            // 如果选中COD支付需要重新计算下COD费用和总的费用
            this.payInfo.codFee = this.codDetail.cod_fee
            this.payInfo.total += this.codDetail.cod_fee
          } else {
            this.payInfo.codFee = 0
            this.payInfo.total = this.order.totalLocal
          }
          this.defaultMethod = methodName
          this.defaultCardId = ''
          if (this.isCodMethod) {
            this.isUseBalance = false
          }
        } else {
          this.$toast(this.$i18n.t('toast.cancelBalance'))
        }
      },
      onCardNumberItemClick (quickPayId) {
        if (!this.isUseBalance || this.balance < this.order.totalLocal) {
          this.defaultMethod = 'ocean_q'
          this.defaultCardId = quickPayId
        } else {
          this.$toast(this.$i18n.t('toast.cancelBalance'))
        }
      },
      onBalanceItemClick () {
        this.isUseBalance = !this.isUseBalance
        // 使用余额支付并且余额足够的时候将选择的其他支付方式取消掉，选中的信用卡也给取消
        if (this.isUseBalance && (this.balance >= this.order.totalLocal || this.isCodMethod)) {
          this.defaultMethod = 'balance'
          this.defaultCardId = ''
        }
      },
      async onPayNowClick () {
        if (this.isUseBalance && this.defaultMethod === 'balance') {
          this.$loading.show()
          this._startBalancePayment(this.orderName)
          return false
        }

        // 取消了余额之后没有选择其他的支付方式，不能继续支付
        if (!this.isUseBalance && this.defaultMethod === 'balance') {
          this.$toast.error(this.$i18n.t('toast.chooseMethod'))
          return false
        }
        console.log('this.defaultMethod ==>', this.defaultMethod)
        if (this.defaultMethod === PAYMENT_METHOD.COD) {
          this.isShowCodPop = true
          return false
        }

        let params = {
          channel: this.defaultMethod,
          payment_url: this.concatURL(PAYMENT_URL),
          pay_success_url: this.concatURL(PAY_SUCCESS_URL(this.orderName)),
          pay_failed_url: this.concatURL(PAY_FAILED_URL(this.orderName)),
          use_balance: this.isUseBalance
        }
        let methodParams = {}
        const sectionArrs = ['ocean_mx', 'ocean_br', 'boleto']
        if (sectionArrs.includes(this.defaultMethod)) {
          methodParams = this.$refs[this.defaultMethod][0].submitMethodForm()
        } else if (this.defaultMethod === 'ocean_q') {
          if (!this.defaultCardId) {
            this.$toast(this.$i18n.t('toast.chooseCard'))
            return false
          }
          methodParams['quickpay_id'] = this.defaultCardId
        }
        console.log('methodParams=>', methodParams)
        if (!methodParams) {
          return false
        }
        for (let key in methodParams) {
          const value = methodParams[key]
          // 过滤掉空数据
          if (value) {
            params[key] = value
          }
        }

        this.$loading.show()
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
      },

      async _startBalancePayment (orderName) {
        const { payment_result: paymentResult } = await this.$store.dispatch('startBalancePayment', orderName)
        switch (paymentResult) {
          case BALANCE_RESULT.success:
            this.$router.replace({
              name: 'paymentSuccess',
              params: {
                orderName: orderName
              }
            })
            break
          case BALANCE_RESULT.alreadyPaid:
          case BALANCE_RESULT.orderExpired:
            this.$router.replace({
              name: 'orderDetail',
              params: {
                orderId: orderName
              }
            })
            break
          case BALANCE_RESULT.noEnoughBalance:
            this.$toast.error(this.$i18n.t('toast.notEnough'))
            break
          case BALANCE_RESULT.fail:
          default:
            this.$router.replace({
              name: 'paymentFailed',
              params: {
                orderName: orderName
              },
              query: {
                error_msg: this.$i18n.t('tips.balanceError')
              }
            })
            break
        }
      },
      makePost (url, data, target) {
        let oForm = document.createElement('form')
        oForm.method = 'post'
        oForm.action = url

        oForm.target = target || '_self'

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
      async onAddCardClick () {
        const res = await this.$store.dispatch('createQuickPay', {
          orderName: this.orderName,
          resultURL: this.concatURL('/payment/credit/result')
        })
        this.makePost(res.url, res.data, 'quickpay_frame')
        setTimeout(() => {
          this.isQuickPayFrameShow = true
        }, 200)
      },
      onQuickPayModalCloseClick () {
        this.isQuickPayFrameShow = false
      },

      handleMessage (event) {
        console.log('handleMessage ==>', event)
        const data = event.data
        if (data.quickpay_id) {
          this.quickPayMethod.quickPayCards.push({
            quickpay_id: data.quickpay_id,
            card_number: data.card_number
          })
          this.onQuickPayModalCloseClick()
          this.$toast.success('Add Card Success.')
        }
      },

      concatURL (uri) {
        let origin = window.location.origin
        if (!origin) {
          origin = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '')
        }
        return `${origin}${uri}`
      },

      onClickOpenCodModal (event, isDetail = false) {
        console.log('isDetail =>', isDetail)
        this.isDetail = isDetail
        this.isShowCodModal = true
      },

      async onHandleCodConfirm ({ smsCode, phone, countryCode }) {
        this.$loading.show()
        let params = {
          order_name: this.orderName,
          channel: this.defaultMethod,
          payment_url: this.concatURL(PAYMENT_URL),
          pay_success_url: this.concatURL(PAY_SUCCESS_URL(this.orderName)),
          pay_failed_url: this.concatURL(PAY_FAILED_URL(this.orderName)),
          use_balance: this.isUseBalance,
          sms_code: smsCode,
          phone: phone,
          country_code: countryCode
        }

        await this.$store.dispatch('startCODPayment', params)
        // cod的ga事件
        googleAnalytics.sendEvent({
          ec: 'Checkout',
          ea: 'Pay Now',
          el: `Click Pay Now & ${this.defaultMethod}`
        })
        this.$router.replace({
          name: 'paymentSuccess',
          params: {
            orderName: this.orderName
          }
        })
      },
      onHandleSendSmsCode () {
        this.restTime = this.resendInterval
        this.smsCodeTimer = setInterval(() => {
          this.restTime -= 1
          if (this.restTime < 0) {
            clearInterval(this.smsCodeTimer)
            this.smsCodeTimer = null
          }
        }, 1000)
      }
    },
    computed: {
      ...mapState({
        countryCode: 'countryCode'
      }),
      paidTotal () {
        if (this.isUseBalance) {
          const total = this.order.totalLocal - this.balance
          return total > 0 ? total : 0
        } else {
          return this.order.totalLocal
        }
      },
      isCodMethod () {
        return this.defaultMethod === PAYMENT_METHOD.COD
      }
    },
    mounted () {
      window.addEventListener('message', this.handleMessage, false)
    },
    beforeRouteLeave (to, from, next) {
      if (!['orderDetail', 'paymentSuccess', 'paymentFailed'].includes(to.name)) {
        next({
          name: 'orderDetail',
          params: {
            orderId: this.orderName
          }
        })
      } else {
        next()
      }
    },
    beforeDestroy () {
      window.removeEventListener('message', this.handleMessage, false)
    }
  }
</script>

<style lang="scss" scoped>
  .payment-method-container {
    display: flex;
    height: 100%;
    flex-direction: column;
    .method-content {
      flex: 1;
      overflow: auto;
      .order-info {
        .order-title {
          padding: 0 px2rem(15);
          height: px2rem(44);
          display: flex;
          justify-content: space-between;
          align-items: center;
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

      .quick-pay-modal {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        z-index: 999;
        background: RGBA(0, 0, 0, 0.8);
        padding: px2rem(20);
        iframe[name="quickpay_frame"] {
          height: 50%;
          width: 100%;
          border-radius: px2rem(4);
          margin-bottom: px2rem(20);
          margin-top: 20%;
        }
        .iconfont {
          font-size: px2rem(45);
          color: $white;
        }
      }

      .payment-balance {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: px2rem(60);
        background: $white;
        margin-top: px2rem(10);
        padding: 0 px2rem(15);
        .iconfont {
          color: $icon-color;

          &.icon-xuanzhong {
            color: $flamingo;
          }
        }
      }

      .payment-method {
        margin-top: px2rem(10);
        .title {
          height: px2rem(44);
          line-height: px2rem(44);
          padding-left: px2rem(15);
          background-color: $title-background-color;
          color: $dove-gray;
          display: flex;
          align-items: center;
          & > img {
            height: px2rem(20);
          }
        }

        .payment-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: $white;
          padding: 0 px2rem(15);
          height: px2rem(60);
          border-top: $border;
          .payment-image-group {
            img {
              height: px2rem(24);
            }
          }

          .cod-tip {
            font-size: $x-small;
            color: $dusty-gray;
            > a {
              font-size: $x-small;
              color: $havelock-blue;
            }
          }

          .payment-method-name {
            &.method-cod {
              font-size: $small;
              color: $dove-gray;
              display: flex;
              align-items: center;
              .iconfont {
                font-size: 2.6rem;
                color: #fcd70d;
                margin-right: px2rem(10);
              }
            }
            font-size: $x-small;
            &.btn-add-credit {
              display: flex;
              align-items: center;
              color: $dove-gray;
              font-size: $small;
              .iconfont {
                font-size: $xx-large;
                color: $dove-gray;
              }
            }
          }

          .iconfont {
            color: $icon-color;

            &.icon-xuanzhong {
              color: $flamingo;
            }
          }
        }

        .payment-section {
          padding: px2rem(15);
          padding-top: 0;
          background: $white;
          overflow: hidden;
          &.method-cod {
            padding: px2rem(15);
            background: inherit;
            font-size: $x-small;
            color: $dusty-gray;
            letter-spacing: 0;
            line-height: px2rem(15);
            p {
              a {
                font-size: $x-small;
                color: $havelock-blue;
              }
              & + p {
                margin-top: px2rem(5);
              }
            }
          }
        }

        .cod-item {
          line-height: px2rem(44);
          background: $white;
          margin-top: 1px;
          padding: 0 px2rem(15);
          text-decoration: underline;
          color: $havelock-blue;
        }
      }
    }

    .m-btn {
      height: px2rem(44);
      line-height: px2rem(44);
      font-size: $medium;
      color: $white;
      background-color: $flamingo;
      text-align: center;
      width: 100%;
    }
  }
</style>
