<template>
  <div class="order-box">
    <div class="order-main">
      <order-detail-title :discount="discount" :order-name="orderName" :payment-date="paymentDate" :delivery-info="deliveryInfo" :expiry-string="expiryString" :refund-info="refundInfo" :pay-channel="payChannel" :total-local="totalLocal" :total-items="totalItems" :show-state="showState" :tax-line="taxLine" :arrive-date="arriveDate" :shipping-info="shippingInfo" :pay-info="payInfo" :currency-symbol="currencySymbol"></order-detail-title>
      <order-detail-items :order-lines="orderLines" :virtual-seller-info="virtualSellerInfo"></order-detail-items>
      <order-foot-tracking :order-name="orderName" :show-state="showState"></order-foot-tracking>
    </div>
    <router-link :to="{name:paymentMethod === 'v3' ? 'paymentMethod2': 'paymentMethod',params: { orderName: this.orderName}}" class="order-foot-btn" v-if="showState === 'Failed' || showState === 'Unpaid'">
      <button>{{footContent}}</button>
    </router-link>
    <footer class="checkOnNative" @click="onClickDownloadApp">
      <img src="/static/img/app/app_icon.png" alt="">
      <div class="app-tips">
        <p class="tips-one">Download Our App for Easy Return</p>
        <p class="tips-two">My Center>Find My Order>Apply for Return</p>
      </div>
      <div class="btn-view">
        <div>></div>
      </div>
    
    </footer>
  </div>
</template>
<script>
  import OrderDetailTitle from '@/components/OrderDetailTitle'
  import OrderDetailItems from '@/components/OrderDetailItems'
  import OrderFootTracking from '@/components/OrderFootTracking'
  import { openNativeApp } from '@/utils'
  export default {
    components: {
      OrderDetailTitle,
      OrderDetailItems,
      OrderFootTracking
    },
    async created () {
      this.init()
    },
    data () {
      return {
        orderName: '',
        currencySymbol: '',
        paymentDate: '',
        payChannel: '',
        totalLocal: 0,
        totalItems: 0,
        showState: '',
        taxLine: '',
        arriveDate: '',
        shippingInfo: {},
        payInfo: {},
        orderLines: [],
        deliveryInfo: {},
        expiryString: '',
        refundInfo: '',
        discount: {},
        paymentMethod: '',
        virtualSellerInfo: {},
      }
    },
    computed: {
      footContent () {
        if (this.showState === 'Unpaid') {
          return 'Proceed to checkout'
        } else if (this.showState === 'Failed') {
          return 'Try Again'
        }
      }
    },
    methods: {
      onClickDownloadApp () {
        openNativeApp()
      },
      async init () {
        this.$loading.show()
        console.log('$route.params', this.$route.params)
        let orderId = this.$route.params.orderId
        const {
          orderName,
          currencySymbol,
          paymentDate,
          deliveryInfo,
          expiryString,
          refundInfo,
          payChannel,
          totalLocal,
          totalItems,
          showState,
          taxLine,
          arriveDate,
          shippingInfo,
          payInfo,
          discount,
          orderLines,
          paymentMethod,
          virtualSellerInfo,
        } = await this.$store.dispatch('getOrderDetail', orderId)
        console.log('$route.params', this.$route.params)
        this.orderName = orderName
        this.currencySymbol = currencySymbol
        this.paymentDate = paymentDate
        this.payChannel = payChannel
        this.totalLocal = totalLocal
        this.totalItems = totalItems
        this.showState = showState
        this.taxLine = taxLine
        this.discount = discount
        this.arriveDate = arriveDate
        this.shippingInfo = shippingInfo
        this.payInfo = payInfo
        this.orderLines = orderLines
        this.deliveryInfo = deliveryInfo
        this.expiryString = expiryString
        this.refundInfo = refundInfo
        this.paymentMethod = paymentMethod
        this.virtualSellerInfo = virtualSellerInfo
        this.$loading.hide()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .order-box {
    display: flex;
    flex-direction: column;
    height: 100%;
    .order-main {
      min-height: calc(100% - 4.6rem);
      overflow: auto;
    }
    .order-foot-btn {
      height: px2rem(46);
      button {
        background-color: $flamingo;
        border: none;
        outline: none;
        width: 100%;
        height: 100%;
        line-height: 100%;
        text-align: center;
        font-size: $medium;
        color: $white;
      }
    }
  }
  .checkOnNative{
    display: flex;
    bottom: 0;
    height: px2rem(50);
    text-decoration: none;
    justify-content: space-between;
    align-items: center;
    color: $white;
    background-color: #4c4c4c;
    padding-left: px2rem(10);
    transition: height 0.2s ease-in-out;
    overflow: hidden;

    &.hide {
      height: 0;
    }
    > img {
      width: px2rem(35);
      height: px2rem(35);
    }

    .app-tips {
      margin: px2rem(2) px2rem(10);
      .tips-two {
        font-size: $x-small;
        color: $mecury;
        margin-top: px2rem(2);
      }
    }

    .btn-view {
      width: px2rem(40);
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      > div{
        background-color: white;
        color: black;
        border-radius: 50%;
        height: px2rem(20);
        width: px2rem(20);
        text-align: center;
        line-height: px2rem(19);
      }
    }
  }   
</style>
