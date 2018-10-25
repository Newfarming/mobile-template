<template>
  <method :name="methodName" :identify="identify">
    <div class="content">
      <p class="accept">{{$t('other.accept')}} <img :src="paymentImage" alt=""></p>
      <card-input-form ref="cardForm"></card-input-form>
    </div>
  </method>
</template>

<script>
  import Method from '@/components/methods/Method'
  import CardInputForm from '@/components/methods/CardInputForm'
  import paymentImage from '@/assets/img/payment/payment.png'
  export default {
    components: {
      Method,
      CardInputForm
    },
    props: {
      pubKey: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        methodName: 'methodName.dc',
        identify: 2,
        paymentImage: paymentImage
      }
    },
    methods: {
      validate () {
        return this.$refs.cardForm.onValidate(this.pubKey)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    background: $white;
    padding: 1.5rem 2rem;
    .accept {
      font-size: $x-small;
      color: $dusty-gray;
      display: flex;
      align-items: center;
      img {
        height: 1.6rem;
        margin-left: 1rem;
      }
    }
  }
</style>

