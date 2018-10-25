<template>
  <div>
    <div class="order-title" :class="{'background-grey':showState === 'Canceled' || showState === 'Expired'}">
      <div class="headicon">
        <i class="iconfont" :class="{
          'icon-plane':showState === 'Shipped',
          'icon-J_Unpaid':showState === 'Canceled' || showState === 'Failed' || showState === 'Expired' || showState === 'Unpaid' || showState === 'Pending',
          'icon-Ankerwebicon-':showState === 'Processing'
        }"></i>
        <span class="head-word">{{payChannel === 'cod' ?`COD-${showState}`: showState}}</span>
      </div>
      <div class="title-word">
        <div v-if="arravieDateShow">
          <span>{{$t('order.deliveryDate', {arriveDate: arriveDate})}}</span>
        </div>
        <div v-else>
          <span v-if="showState === 'Processing' && payChannel !== 'cod'">{{$t('tips.processing')}}</span>
          <span v-if="showState === 'Failed'">{{$t('tips.failed')}}</span>
          <span v-if="showState === 'Unpaid'">{{$t('tips.unpaid')}}</span>
        </div>
        <p v-if="payChannel === 'cod' && showState === 'Processing'">{{$t('tips.codProcessing')}}</p>
        <p v-else-if="payChannel === 'cod'">{{$t('tips.codOther')}}</p>
      </div>
    </div>

    <div class="message-box">
      <div class="title-message">
        <div class="phone">
          {{shippingInfo.shippingName}} +{{shippingInfo.phoneAreaCode}} {{shippingInfo.shippingPhone}}
        </div>
        <div class="message">
          <span>{{shippingInfo.shippingStreet2}}&nbsp;</span>
          <span>{{shippingInfo.shippingCity}}&nbsp;</span>
          <span>{{shippingInfo.shippingState}}&nbsp;</span>
          <span>{{shippingInfo.shippingZip}}&nbsp;</span>
          <span>{{shippingInfo.shippingCountry}}</span>
        </div>
      </div>
      <div class="order-message">
        <span class="orderid">{{$t('paymentText.order')}} {{orderName}}</span>
        <span class="date" v-if="paymentDate">{{$t('order.paidDate', {paymentDate: paymentDate})}}</span>
      </div>
      <router-link v-if="showState === 'Shipped' || showState === 'Processing'" :to="{ name: 'trackingInfo', params: { orderName: orderName}}">
        <div class="tip-box">
          <span>
            <strong>{{$t('order.tracking')}}:</strong>
            <span class="soft">{{$t(payChannel === 'cod'?'tips.confirmCod':'tips.confirm')}}</span>
          </span>
          <i class="iconfont icon-qianjin"></i>
        </div>
      </router-link>
    </div>
    <div class="pay-total-box">
      <div class="content-box">
        <div class="item">
          <span class="left">{{$t('paymentText.subtotal')}}</span>
          <span class="right">{{currencySymbol}} {{payInfo.subtotalLocal | round}}</span>
        </div>
        <div class="item">
          <span class="left">{{$t('paymentText.shipping')}}</span>
          <span class="right" v-if="payInfo.deliveryPriceLocal === 0">
            <span v-if="payInfo.deliveryWay">{{payInfo.deliveryWay}}&nbsp;&nbsp;</span>{{$t('paymentText.free')}}</span>
          <span class="right" v-else>
            <span v-if="payInfo.deliveryWay">{{payInfo.deliveryWay}}&nbsp;&nbsp;</span>{{currencySymbol}} {{payInfo.deliveryPriceLocal | round}}</span>
        </div>
        <div class="item" v-if="taxLine && taxLine.price_real_local>0">
          <span class="left">{{$t('paymentText.tax', {rate: taxLine.product_name})}}
            <span class="btn-new-policy ">{{$t('paymentText.newPolicy')}}</span>
          </span>
          <span class="right">{{currencySymbol}} {{taxLine.price_real_local | round}}</span>
        </div>
        <div class="item" v-if="payInfo.codPriceLocal > 0">
          <span class="left">{{$t('service.codFee')}}</span>
          <span class="right">{{currencySymbol}} {{payInfo.codPriceLocal | round}}</span>
        </div>
        <div class="item" v-if="typeof discount === 'object'&&discount.available">
          <span class="left">{{$t('service.coupon')}}</span>
          <span class="right">-{{currencySymbol}} {{discount.amount_off | round}}</span>
        </div>
        <div class="item" v-if="payInfo.balanceLocal > 0">
          <span class="left">{{$t('service.balance')}}</span>
          <span class="right">-{{currencySymbol}} {{payInfo.balanceLocal | round}}</span>
        </div>
      </div>
      <div class="total-box">
        <span class="left">{{$t('paymentText.total')}}</span>
        <span class="right">
          <span class="card"></span>
          <span class="money">{{currencySymbol}} {{total | round}}</span>
        </span>
      </div>
    </div>

  </div>

</template>

<script>
  export default {
    props: [
      'orderName',
      'currencySymbol',
      'paymentDate',
      'payChannel',
      'totalLocal',
      'totalItems',
      'showState',
      'taxLine',
      'arriveDate',
      'shippingInfo',
      'payInfo',
      'orderInfo',
      'discount'
    ],
    computed: {
      total () {
        return this.totalLocal - this.payInfo.balanceLocal
      },
      arravieDateShow () {
        return this.paymentDate && (this.showState === 'Shipped' || this.showState === 'Processing')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .btn-new-policy {
    font-size: $x-small;
    color: $policy-color;
    background: $background-color;
    border: 1px solid $policy-color;
    border-radius: px2rem(2);
    padding: px2rem(2) px2rem(8);
    margin-left: px2rem(4);
  }
  .f-dn {
    display: none !important;
  }
  .group-p {
    padding: px2rem(10) px2rem(15) !important;
    margin-bottom: px2rem(10);
  }
  .order-title {
    min-height: px2rem(140);
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: $flamingo;
    color: $white;
    letter-spacing: 0.8px;
    .headicon {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: px2rem(21);
      .iconfont {
        font-size: px2rem(45);
      }
      .head-word {
        font-size: $large;
        height: px2rem(25);
        line-height: px2rem(25);
        margin-top: px2rem(5);
      }
    }
    .title-word {
      font-size: $x-small;
      margin-top: px2rem(5);
      text-align: center;
      p {
        padding: 2rem 3.4rem;
        text-align: left;
      }
    }
  }
  .background-grey {
    background-color: $dove-gray;
  }
  .message-box {
    background-color: $white;
    margin-bottom: px2rem(10);
    .title-message {
      border-bottom: $border;
      padding: 0 px2rem(15) px2rem(5);
      .phone {
        line-height: px2rem(36);
        height: px2rem(36);
        font-size: px2rem(14);
      }
      .message {
        font-size: px2rem(12);
        line-height: px2rem(16);
      }
    }
    .order-message {
      padding: 0 px2rem(15);
      color: $dusty-gray;
      font-size: $x-small;
      height: px2rem(41);
      line-height: px2rem(41);
      display: flex;
      justify-content: space-between;
    }
    .tip-box {
      height: px2rem(44);
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: $policy-color;
      background-color: $blue-dust;
      padding: 0 px2rem(10);
    }
  }
  .pay-total-box {
    padding-bottom: px2rem(10);
    margin-bottom: px2rem(10);
    background-color: $white;
    .content-box {
      border-bottom: $border;
      padding-top: px2rem(7);
      padding-bottom: px2rem(3);
      .item {
        padding: 0 px2rem(13);
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: px2rem(25);
        line-height: px2rem(25);
        .left {
          color: $dusty-gray;
        }
      }
    }
    .total-box {
      padding: px2rem(10) px2rem(13) 0;
      display: flex;
      justify-content: space-between;
      .card {
        color: $dusty-gray;
      }
      .money {
        color: $flamingo;
      }
    }
  }
</style>
