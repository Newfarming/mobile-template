<template>
  <section class="price-group">
    <div class="price-item">
      <span class="title">{{$t('paymentText.subtotal')}}</span>
      <span>{{symbol}} {{group.subtotal|round}}</span>
    </div>
    <div class="price-item">
      <span class="title">{{$t('paymentText.shipping')}}</span>
      <span v-if="group.shippingFee > 0">{{symbol}} {{group.shippingFee | round}}</span>
      <span v-else>{{$t('paymentText.free')}}</span>
    </div>
    <div class="price-item" v-if="group.tax > 0">
      <p>
        <span class="title">{{$t('paymentText.tax', {rate: '5%'})}}</span>
        <span class="btn-new-policy">{{$t('paymentText.newPolicy')}}</span>
      </p>
      <span>{{symbol}} {{group.tax|round}}</span>
    </div>
    <div class="price-item" v-if="group.codFee > 0">
      <span class="title">{{$t('service.codFee')}}</span>
      <span>{{symbol}} {{group.codFee | round}}</span>
    </div>
    <div class="price-item" v-if="group.coupon">
      <span class="title">{{$t('service.coupon')}}</span>
      <span>- {{symbol}} {{group.coupon|round}}</span>
    </div>

    <div class="price-item total-item">
      <span>{{$t('paymentText.total')}}</span>
      <p>
        <span class="total-price">{{symbol}} {{group.total| round}}</span>
        <span class="tax-tip">({{$t('paymentText.taxInclude')}})</span>
      </p>

    </div>
  </section>
</template>
<script>
  export default {
    props: {
      symbol: {
        type: String,
        required: true
      },
      group: {
        type: Object,
        default: () => {
          return {}
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .price-group {
    padding: px2rem(20) px2rem(15);
    background: $white;
    .price-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: px2rem(20);
      & + .price-item {
        margin-top: px2rem(15);
      }
      &.total-item {
        font-size: $medium;
        border-top: $border;
        height: px2rem(50);
        .total-price {
          color: $flamingo;
        }
        .tax-tip {
          color: $dusty-gray;
          font-size: $small;
        }
      }
      .title {
        color: $dusty-gray;
      }
      .btn-new-policy {
        font-size: $x-small;
        color: $policy-color;
        background: $background-color;
        border: 1px solid $policy-color;
        border-radius: px2rem(2);
        padding: px2rem(2) px2rem(8);
        margin-left: px2rem(8);
      }
    }
  }
</style>
