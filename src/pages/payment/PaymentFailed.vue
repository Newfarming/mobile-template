<template>
  <div class="payment-failed">
    <p>
      <i class="iconfont icon-iconpd"></i>
    </p>
    <p class="main-text">{{$t('paymentText.sorry')}}!</p>
    <p class="status-text">{{$t('paymentText.paymentFailed')}}</p>
    <p class="error-text">{{errorMessage}}</p>

    <div class="md-button btn-try-again" @click="onTryAgain">{{$t('button.tryAgainNow')}}</div>
    <router-link :to="{name: 'cart'}" class="come-back-later">{{$t('button.comeBack')}}</router-link>
  </div>
</template>

<script>
  import googleAnalytics from '@/setup/setup-google-analytics'
  export default {
    data () {
      return {
        orderName: this.$route.params.orderName,
        errorMessage: this.$route.query.error_msg || this.$i18n.t('tips.payFailed'),
        order: {}
      }
    },
    async created () {
      this.order = await this.$store.dispatch('getOrderDetail', this.orderName)
      googleAnalytics.sendEvent({
        ec: 'Checkout',
        ea: `${this.order.payChannel} Paid Failure`,
        el: `${this.orderName} & ${this.order.totalUS} & ${this.errorMessage}`
      })
    },
    methods: {
      onTryAgain () {
        this.$router.push({
          name: this.order.paymentMethod === 'v3' ? 'paymentMethod2' : 'paymentMethod',
          params: {
            orderName: this.orderName
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .payment-failed {
    text-align: center;
    font-size: $small;
    .iconfont {
      font-size: px2rem(80);
      color: $icon-color;
    }
    .main-text {
      font-size: $size36;
      color: $flamingo;
      text-align: center;
      font-weight: 200;
      line-height: px2rem(60);
    }

    .error-text {
      color: $dove-gray;
      margin-top: px2rem(15);
    }

    .btn-try-again {
      margin: 0 auto;
      margin-top: px2rem(58);
      width: 80%;
      line-height: px2rem(44);
      background-color: $flamingo;
      color: $white;
      font-size: $medium;
      border: none;
      padding: 0;
    }
    .come-back-later {
      margin-top: px2rem(20);
      font-size: $medium;
      color: $dove-gray;
      text-align: center;
      display: block;
      text-decoration: underline;
    }
  }
</style>
