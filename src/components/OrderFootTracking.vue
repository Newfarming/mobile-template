<template>
  <router-link v-if="showState === 'Shipped' || showState === 'Processing'" :to="{ name: 'trackingInfo', params: { orderName: orderName}}">
    <div class="tip-box">
      <span>
        <i class="iconfont icon-shape3 location"></i>
        <span>{{$t('paymentText.order')}} {{$t('order.tracking')}}</span>
      </span>
      <i class="iconfont icon-qianjin"></i>
    </div>
  </router-link>
</template>

<script>
  export default {
    props: [
      'orderName',
      'showState'
    ]
  }
</script>

<style lang="scss" scoped>
  .tip-box {
    height: px2rem(60);
    line-height: px2rem(60);
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: $mine-shaft;
    background-color: $blue-dust;
    padding: 0 px2rem(10);
    margin-top: 12px;
    background-color: $white;
    font-size: $small;
    .red {
      color: $flamingo;
    }
  }
  .location {
    font-size: px2rem(20);
    color: $policy-color;
    margin-right: px2rem(12);
    position: relative;
    top: 0;
  }
</style>
