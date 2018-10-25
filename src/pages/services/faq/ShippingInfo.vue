<template>
  <div class="content">
    <div class="container">
      <div class="row row-top">
        <span class="pull-left row-sz">{{$t('shippingText.shippingTo')}}</span>
        <span class="f-fr">{{countryName}}</span>
      </div>
      <table class="row f-nomargin">
        <tbody>
          <tr class="table-tr">
            <td class="td-title ">{{$t('shippingText.courier')}}</td>
            <td class="td-shippinginfo-courier">{{shippingInfo.courier}}</td>
          </tr>
          <tr class="table-tr">
            <td class="td-pp">{{$t('shippingText.prepare')}}</td>
            <td class="td-shippinginfo-shippingtime">{{$t('shippingText.rangeDay', {min: shippingInfo.shippingTime && shippingInfo.shippingTime[0], max: shippingInfo.shippingTime&&shippingInfo.shippingTime[1]})}}</td>
          </tr>
          <tr class="table-tr">
            <td class="td-cost ">{{$t('shippingText.cost')}}</td>
            <td class="td-tit ">
              <template v-if="isFreeShipping">
                {{$t('shippingText.freeShipping')}}
              </template>
              <template v-else>
                {{$t('shippingText.shippingFee', {symbol: symbol, amount: shippingInfo.orderShippingAmount, shippingFee: shippingInfo.shippingFee})}}
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  import {
    mapState
  } from 'vuex'
  import {
    COUNTRY_MAP
  } from '@/config'
  export default {
    created () {
      this.$store.dispatch('getShippingInfo')
    },
    computed: {
      ...mapState({
        shippingInfo: 'shippingInfo',
        symbol: 'symbol',
        countryCode: 'countryCode'
      }),
      isFreeShipping () {
        return this.shippingInfo.shippingFee === 0
      },
      countryName () {
        return COUNTRY_MAP[this.countryCode].name
      }
    }
  }
</script>
<style lang="scss" scoped>
  .table-tr {
    text-align: left;
    border-top: 1px solid $mecury;
    .td-title {
      color: $dusty-gray;
      font-size: px2rem(14);
      width: 38%;
      padding: px2rem(12) px2rem(18);
      padding-right: px2rem(8);
    }
    .td-shippinginfo-courier {
      padding-left: px2rem(30);
      border-left: 1px solid $mecury;
    }
    .td-pp {
      color: $dusty-gray;
      font-size: px2rem(14);
      width: 38%;
      padding: px2rem(12) px2rem(18);
      padding-right: px2rem(8);
    }
    .td-shippinginfo-shippingtime {
      padding: px2rem(12) px2rem(10) px2rem(12) px2rem(30);
      border-left: 1px solid $mecury;
    }
    .td-cost {
      color: $dusty-gray;
      font-size: px2rem(14);
      width: 38%;
      padding: px2rem(18) px2rem(8) px2rem(30) px2rem(18);
    }
    .td-tit {
      padding: px2rem(10) px2rem(20) px2rem(10) px2rem(25);
      border-left: 1px solid $mecury;
    }
  }
  .f-nomargin {
    margin: 0;
    width: 100%;
  }
  .f-fr {
    float: right;
  }
  .row-sz {
    font-size: $small;
  }
  .content {
    padding: 0;
  }
  .container {
    padding: 0;
    background: $white;
  }
  .row-top {
    margin: px2rem(21) px2rem(18);
  }
  .row {
    border-collapse: collapse;
    tr:last-child {
      td {
        border-bottom: 1px solid $mecury;
      }
    }
  }
</style>
