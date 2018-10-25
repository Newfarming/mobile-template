<template>
  <section class="address">
    <p class="lab-ship">{{$t('shippingText.shippingTo')}}</p>
    <p class="phone-name">
      <span class="name">{{name}}</span>
      <span class="phone">{{phone}}</span>
    </p>
    <div class="shipping-address">
      <span class="street">{{street}}</span>
      <span class="city">{{city}}</span>
      <span class="state">{{state}}</span>
      <span class="zip">{{zip}}</span>
      <span class="country">{{country}}</span>
    </div>
  </section>
</template>
<script>
  export default {
    props: {
      name: {
        type: String,
        default: ''
      },
      phone: {
        type: String,
        default: ''
      },
      street: {
        type: String,
        default: ''
      },
      city: {
        type: String,
        default: ''
      },
      state: {
        type: String,
        default: ''
      },
      zip: {
        type: String,
        default: ''
      },
      country: {
        type: String,
        default: ''
      }
    }
  }
</script>
<style lang="scss" scoped>
  .address {
    background: $white;
    .lab-ship {
      font-size: $medium;
      line-height: px2rem(22);
      color: $dusty-gray;
    }
    .phone-name {
      margin-top: px2rem(5);
      margin-bottom: px2rem(10);
    }
    .street {
      word-wrap: break-word;
    }
  }
</style>
