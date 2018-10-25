<template>
  <method class="balance" :identify="identify">
    <p slot="title">
      <span class="method-name">{{$t(methodName)}}</span>(
      <span class="balance-total">{{symbol}} {{balance}}</span>)
    </p>
  </method>
</template>

<script>
  import Method from '@/components/methods/Method'
  import { getCountry } from '@/utils'
  import { COUNTRY_MAP } from '@/config'
  export default {
    components: {
      Method
    },
    props: {
      balance: {
        type: Number,
        default: 0
      },
      symbol: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        methodName: 'methodName.balance',
        identify: 3
      }
    },
    computed: {
      balanceSymbol () {
        return COUNTRY_MAP[getCountry()]?.symbol;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .balance /deep/ {
    .title {
      height: 6rem !important;
      .method-name {
        color: $dove-gray;
      }
      .balance-total {
        color: $flamingo;
      }
    }
  }
</style>
