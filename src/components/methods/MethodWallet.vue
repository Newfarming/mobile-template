<template>
  <method :identify="identify">
    <p slot="title" class="method-title">
      <span class="method-name">{{$t(methodName)}}</span>
      <img :src="paytm" alt="">
    </p>
  </method>
</template>

<script>
  import Method from '@/components/methods/Method'
  import paytmNew from '@/assets/img/payment/paytm_new.png'
  export default {
    components: {
      Method
    },
    data () {
      return {
        methodName: 'methodName.wallet',
        identify: 5,
        paytm: paytmNew
      }
    }
  }
</script>

<style lang="scss" scoped>
  .method-title {
    display: flex;
    align-items: center;
    img {
      height: 1.6rem;
      margin-left: 1rem;
    }
  }
</style>
