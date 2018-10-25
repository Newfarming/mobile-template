<template>
  <div class="select-group">
    <div class="select-item" @click="onCFSelectClick" v-if="isPick">
      <i class="iconfont icon-dianzan"></i>
      <p class="item-content">{{$t('productText.cfSelect')}}</p>
      <i class="iconfont icon-qianjin"></i>
    </div>

    <div class="select-item" @click="productShipping" v-if="isShippingFree">
      <i class="iconfont icon-delivery"></i>
      <p class="item-content">
        <span class="free-shipping">{{$t('productText.freeShipping')}}</span>
        <span>{{$t('productText.arriveDate', {date: arriveDate})}}</span>
      </p>
      <i class="iconfont icon-qianjin"></i>
    </div>

    <div class="select-item" @click="productShipping" v-else>
      <i class="iconfont icon-delivery"></i>
      <p class="item-content shipping-info">
        <span>{{$t('shippingText.orderFree')}} {{symbol}} {{shippingInfo.orderShippingAmount|round}}</span>
        <span>{{$t('productText.arriveDate', {date: arriveDate})}}</span>
        <span>{{$t('shippingText.orderUnder', {symbol: symbol, amount: shippingInfo.orderShippingAmount, shippingFee: shippingInfo.shippingFee})}}</span>
      </p>
      <i class="iconfont icon-qianjin"></i>
    </div>

    <div class="select-item" @click="() => this.$emit('size-select')" v-if="attrNames.length > 0">
      <p class="item-content size-select">
        <span>
          {{attrNames.join(',&nbsp;&nbsp;')}}
        </span>
        <span class="select-tips">{{$t('productText.select')}}</span>
      </p>
      <i class="iconfont icon-qianjin"></i>
    </div>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    props: {
      arriveDays: {
        type: Number,
        default: 0
      },
      attrNames: {
        type: Array,
        default: () => []
      },
      isPick: {
        type: Boolean,
        default: false
      },
      isShippingFree: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      onCFSelectClick () {
        this.$router.push({
          name: 'searchResult',
          params: {
            searchType: 'editors_picks'
          }
        })
      },
      productShipping () {
        this.$router.push({ name: 'serviceFAQShippingInfo' })
      }
    },
    computed: {
      arriveDate () {
        let now = new Date()
        return this.$i18n.d(now.setDate(now.getDate() + this.arriveDays), 'mini')
      },
      ...mapState({
        shippingInfo: 'shippingInfo',
        symbol: 'symbol'
      })
    }
  }
</script>

<style lang="scss" scoped>
  .select-group {
    .select-item {
      min-height: px2rem(60);
      background: $white;
      border-top: $border;
      padding: px2rem(10) px2rem(13);
      display: flex;
      align-items: center;
      justify-content: space-between;

      .iconfont {
        color: $dove-gray;
        &.icon-dianzan {
          font-size: $x-large;
          padding-right: px2rem(15);
          color: rgb(255, 216, 0);
        }
        &.icon-delivery {
          font-size: px2rem(28);
          padding-right: px2rem(10);
        }
      }
      .item-content {
        flex: 1;
        &.size-select {
          display: flex;
          justify-content: space-between;
          padding-right: px2rem(10);
          .select-tips {
            color: $havelock-blue;
          }
        }
        &.shipping-info {
          display: flex;
          flex-direction: column;
          font-size: $x-small;

          > span {
            padding: px2rem(3) 0;
            &:first-child {
              color: $flamingo;
            }
            &:last-child {
              color: $dove-gray;
            }
          }
        }

        .free-shipping {
          font-size: $x-small;
          border: 1px solid $flamingo;
          color: $flamingo;
          padding: px2rem(2);
          border-radius: px2rem(2);
          margin-right: px2rem(5);
        }
      }
    }
  }
</style>
