<template>
  <method :identify="identify" :is-available="isAvailable">
    <p slot="title" class="cod-title">
      <span class="method-name">{{$t(methodName)}}</span>
      <span class="cod-tips" v-if="!isAvailable">({{$t('other.notAvailable')}},
        <a @click.stop="onClickCodWhy">{{$t('other.why')}}?</a>)</span>
    </p>
    <div class="cod-info">
      <p>{{$t('paymentText.cod.p1')}}</p>
      <p>1.
        <span v-html="$t('paymentText.cod.p2', {arriveDate: arriveDate})"></span>
      </p>
      <p>2.{{$t('paymentText.cod.p3')}}</p>
      <p>3.
        <span v-html="$t('paymentText.cod.p4', {symbol: symbol, codFee: codFee})"></span>
      </p>
      <p>4.{{$t('paymentText.cod.p5')}}</p>
      <p>5.{{$t('paymentText.cod.p6')}}(
        <a @click="onClickCodDetail">{{$t('paymentText.cod.detail')}}</a>)</p>
    </div>
  </method>
</template>

<script>
  import Method from '@/components/methods/Method'
  import CodModal2 from '@/components/modals/CodModal2'
  export default {
    components: {
      Method
    },
    props: {
      symbol: {
        type: String,
        required: true
      },
      codFee: {
        type: Number,
        default: 0
      },
      limit: {
        type: Number,
        default: 0
      },
      arriveDate: {
        type: String,
        default: ''
      },
      isAvailable: {
        type: Boolean,
        default: true
      },
      reasons: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        methodName: 'methodName.cod',
        identify: 4
      }
    },
    methods: {
      onClickCodWhy () {
        this.$modal(CodModal2, {
          props: {
            symbol: this.symbol,
            reasons: this.reasons,
            limit: this.limit
          }
        })
      },
      onClickCodDetail () {
        this.$modal(CodModal2, {
          props: {
            symbol: this.symbol,
            isDetail: true,
            reasons: this.reasons,
            limit: this.limit
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .cod-title {
    flex: 1;
    .cod-tips {
      color: $dove-gray;
      float: right;
      margin-right: 1.5rem;
      a {
        color: $havelock-blue;
      }
    }
  }
  .cod-info {
    font-size: $x-small;
    color: $dusty-gray;
    letter-spacing: 0;
    line-height: 1.5rem;
    padding: 1rem;
    p {
      & + p {
        margin-top: 0.5rem;
      }
      > a {
        color: $havelock-blue;
      }
    }
  }
</style>
