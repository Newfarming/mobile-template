<template>
  <div class="footer">
    <div class="btn-home" @click="onHomeClick">
      <i class="iconfont icon-fanhui"></i>
      <span>{{$t('tab.home')}}</span>
    </div>

    <div class="btn-cart" @click="onCartClick">
      <i class="iconfont icon-gouwuche"></i>
      <md-badge :number="cartNumber" v-if="cartNumber > 0"></md-badge>
    </div>

    <div v-if="!showBuyNowOnly || showAddToCartOnly" class="btn-group btn-add-cart" :class="{'btn-red':showAddToCartOnly}" @click="() => this.$emit('add-to-cart')">
      {{$t('button.add2cart')}}
    </div>

    <div v-if="!showAddToCartOnly" class="btn-group btn-buy-now" @click="() => this.$emit('buy-now')">
      {{$t('button.buyNow')}}
    </div>
  </div>
</template>

<script>
  import MdBadge from '@/components/common/MdBadge'
  export default {
    components: {
      MdBadge
    },
    props: {
      cartNumber: {
        type: Number,
        default: 0
      },
      showBuyNowOnly: {
        type: Boolean,
        default: false
      },
      showAddToCartOnly: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      onHomeClick () {
        this.$router.push({
          name: 'home'
        })
      },
      onCartClick () {
        this.$router.push({
          name: 'cart'
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .footer {
    height: px2rem(46);
    bottom: 0;
    width: 100%;
    position: fixed;
    display: flex;
    align-items: center;
    box-shadow: 0 px2rem(3) px2rem(10) #bdbdbd;
    border-top: $border;
    background: $white;
    -webkit-transform: translated3d(0, 0, 0);
    -webkit-overflow-scroll: touch;
    .btn-home,
    .btn-cart {
      display: flex;
      min-width: px2rem(70);
      height: px2rem(47);
      padding: 0 px2rem(10);
      color: $dusty-gray;
      justify-content: center;
      align-items: center;
      span {
        font-size: $x-small;
        margin-left: px2rem(5);
      }
    }
    .btn-cart {
      border-left: $border;
      position: relative;
      .iconfont {
        font-size: $xx-large;
      }
    }

    .btn-group {
      flex: 1;
      text-align: center;
      color: $white;
      height: px2rem(47);
      font-size: px2rem(15);
      display: flex;
      justify-content: center;
      align-items: center;
      &.btn-add-cart {
        background: $mine-shaft;
      }
      &.btn-red {
        background: $flamingo;
      }
      &.btn-buy-now {
        background: $flamingo;
      }
    }
  }
</style>

