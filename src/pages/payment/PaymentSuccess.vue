<template>
  <div class="payment-success">
    <section class="header">
      <i class="iconfont icon-xuanzhong"></i>
      <p>{{$t(isCodChannel ?'paymentText.codPaySuc': 'paymentText.paymentSuccess')}}</p>
    </section>

    <p class="cod-tips" v-if="isCodChannel">{{$t('tips.codProcessing')}}</p>

    <section class="button-group">
      <div class="md-btn md-btn-primary btn-go-home" @click="onClickHomepage">{{$t('button.homepage')}}</div>
      <div class="md-btn btn-view-order" @click="onClickOrderDetail">{{$t('button.viewOrderDetail')}}</div>
    </section>

    <section class="warning">
      <i class="iconfont icon-zhuyi"></i>
      <p>
        <span class="warning-start">{{$t('paymentText.warningTitle')}}</span>
        <span>{{$t('paymentText.warningContent')}}</span>
        <span class="see-detail" @click="() => this.isShowProtectModal = true">{{$t('button.detail')}}</span>
      </p>
    </section>

    <section class="order-info">
      <p>
        <span class="order-label">{{$t('paymentText.myOrder')}}</span> {{orderName}}</p>
      <p>{{$t('paymentText.paidTotal')}}
        <span class="order-total">{{symbol}} {{totalPaid|round}}</span>
      </p>
    </section>

    <shipping-to class="shipping" :name="shippingInfo.shippingName" :phone="shippingInfo.shippingPhone" :street="shippingInfo.shippingStreet2" :city="shippingInfo.shippingCity" :state="shippingInfo.shippingState" :zip="shippingInfo.shippingZip" :country="shippingInfo.shippingCountry"></shipping-to>

    <section class="delivery-info" v-if="deliveryInfo.deliveryName">
      <table>
        <tbody>
          <tr>
            <td>{{$t('shippingText.courier')}}</td>
            <td>{{deliveryInfo.deliveryName}}</td>
          </tr>

          <tr>
            <td>{{$t('shippingText.prepare')}}</td>
            <td>{{$t('shippingText.rangeDay', {min: deliveryInfo.shippingTime[0], max: deliveryInfo.shippingTime[1]})}}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <section class="arrive-info">
      <p>{{$t('shippingText.deliveryTime')}}</p>
      <p>{{arriveDate}}</p>
    </section>

    <protect-modal v-if="isShowProtectModal" @modal-close="() => this.isShowProtectModal = false"></protect-modal>
  </div>
</template>

<script>
  import ShippingTo from '@/components/ShippingTo'
  import ProtectModal from '@/components/modals/ProtectModal'
  import googleAnalytics from '@/setup/setup-google-analytics'
  import facebookPixel from '@/setup/setup-facebook-pixel'
  import {
    isMidEast
  } from '@/utils'

  export default {
    components: {
      ShippingTo,
      ProtectModal
    },
    async created () {
      this.$loading.show()
      const order = await this.$store.dispatch('getOrderDetail', this.orderName)
      this.$loading.hide()
      console.log('order =>', order)
      this.shippingInfo = order.shippingInfo
      this.symbol = order.currencySymbol
      this.totalPaid = order.totalLocal

      this.deliveryInfo = {
        deliveryName: order.deliveryInfo.deliveryName,
        shippingTime: (() => {
          const prepareTime = order.deliveryInfo.prepareTime.split('-')
          const shippingTime = order.deliveryInfo.shippingTime.split('-')
          return [Number(prepareTime[0]) + Number(shippingTime[0]), Number(prepareTime[1]) + Number(shippingTime[1])]
        })()
      }
      this.arriveDate = order.arriveDate

      this.isCodChannel = order.payChannel === 'cod'

      // 上报ga
      order.orderLines.map((item, index) => {
        googleAnalytics.addProduct(item, index)
      })
      // 订单的基本信息
      let gaData = {
        'id': this.orderName,
        'revenue': order.totalUS,
        'shipping': order.payInfo.deliveryPriceUS,
        'option': order.totalUS,
        'coupon': ''
      }
      window.ga('ec:setAction', 'purchase', gaData)
      if (isMidEast()) {
        window.ga('MidEast.ec:setAction', 'purchase', gaData)
      }
      googleAnalytics.sendEvent({
        ec: 'Checkout',
        ea: `${order.payChannel} Paid Success`,
        el: `${order.totalUS} & ${this.orderName} & ${order.totalUS}`
      })

      facebookPixel.paymentSuccess({
        value: order.totalUS,
        contentName: order.name,
        contentIds: order.orderLines.map(item => item.productNo)
      })
    },
    data () {
      return {
        orderName: this.$route.params.orderName,
        shippingInfo: {},
        symbol: '',
        totalPaid: 0.00,
        deliveryInfo: {},
        arriveDate: '',
        isShowProtectModal: false,
        isCodChannel: false
      }
    },
    methods: {
      onClickHomepage () {
        this.$router.push({
          name: 'home'
        })
      },
      onClickOrderDetail () {
        this.$router.push({
          name: 'orderDetail',
          params: {
            orderId: this.orderName
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .payment-success {
    background: $white;
    text-align: center;
    padding: px2rem(20) 0;

    .header {
      color: $dove-gray;
      .iconfont {
        font-size: 74px;
        color: $flamingo;
        margin-bottom: px2rem(15);
      }
    }

    .cod-tips {
      font-size: $x-small;
      color: $dove-gray;
      text-align: center;
      line-height: 1.6rem;
      margin-top: 2rem;
      padding: 0 2.4rem;
    }

    .button-group {
      display: inline-flex;
      flex-direction: column;
      margin-top: px2rem(20);
      .btn-view-order {
        border: 1px solid $dove-gray;
        margin-top: px2rem(15);
      }
    }

    .warning {
      display: flex;
      padding: px2rem(20);
      background-color: #fff7f9;
      margin-top: px2rem(15);
      .iconfont {
        font-size: 26px;
        color: $flamingo;
      }
      p {
        padding-left: px2rem(10);
        text-align: left;
        flex: 1;
        line-height: 1.3;
        .see-detail {
          color: $havelock-blue;
        }
        .warning-start {
          color: $flamingo;
        }
      }
    }

    .order-info {
      color: $dusty-gray;
      margin-top: px2rem(20);
      p {
        padding-bottom: px2rem(15);
      }
      .order-label {
        color: $mine-shaft;
      }
      .order-total {
        color: $flamingo;
      }
    }

    .shipping {
      padding: px2rem(15) px2rem(15) 0 px2rem(15);
      border-top: $border;
      text-align: left;
    }

    .delivery-info {
      margin-top: px2rem(20);
      > table {
        width: 100%;
        tr {
          td {
            width: 50%;
            padding: px2rem(10);
            text-align: left;
            border: $border;
            border-left: 0;
            border-right: 0;
            &:last-child {
              text-align: right;
              border-left: $border;
              color: $dusty-gray;
            }
          }
        }
      }
    }

    .arrive-info {
      margin-top: px2rem(20);
      p {
        &:last-child {
          color: $flamingo;
        }
      }
    }
  }
</style>
