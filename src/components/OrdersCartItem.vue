<template>
  <div class="m-cart">
    <div class="cart-title-box">
      <div class="cart-title">
        <div class="left">
          <span class="title">{{$t('title.orders')}} {{order.orderName}}</span>
        </div>
        <div class="right" v-if="order.showState !== 'Unpaid'">
          <span>{{order.payChannel==='cod' && order.showState === 'Processing'?'COD-Confirmed':order.showState}}</span>
        </div>
        <div class="right color-red" v-else>
          <span>{{$t('order.expire', {expireTime: order.expiryString})}}</span>
        </div>
      </div>
    </div>
    <router-link v-if="order.showState === 'Shipped' || order.showState === 'Processing'" :to="{ name: 'trackingInfo', params: { orderName: order.orderName}}">
      <div class="cart-tip-box cart-tip green">
        <div>
          <strong class="important">{{$t('order.tracking')}}:</strong>
          <span class="content">{{$t(order.payChannel === 'cod'?'tips.confirmCod':'order.trackingTip')}}</span>
        </div>
        <div class="iconjump">
          <i class="iconfont icon-qianjin"></i>
        </div>
      </div>
    </router-link>

    <div class="cart-main-box">
      <div class="cart-main" @click="onOrderDetailClick">
        <div class="imgbox">
          <lazy-image :data-src="item.imageUrl" alt="" :key="index" v-for="(item,index) in order.orderLines" class="lazy-image"></lazy-image>
        </div>
        <div class="contentbox">
          <div class="iconjump">
            <i class="iconfont icon-qianjin"></i>
          </div>
        </div>
      </div>
      <div class="cart-foot">
        <div class="total-item">
          <span>{{$t('order.total')}}:{{order.currencySymbol}} {{order.totalLocal | round}} ({{totalItem}}) </span>
        </div>

        <div class="review-item" v-if="order.showState === 'Unpaid'">
          <button class="unpaid-delete" @click="deleteItemMethod">{{$t('button.delete')}}</button>
          <button class="unpaid-paynow" @click="onPayNowClick">{{$t('button.payNow')}}</button>
        </div>
        <div class="review-item" v-if="order.showState === 'Expired'">
          <button class="expired-delete" @click="deleteItemMethod">{{$t('button.delete')}}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import LazyImage from '@/components/common/LazyImage'
  import Modal from '@/components/common/Modal'
  export default {
    components: {
      Modal,
      LazyImage
    },
    props: ['order', 'index'],
    data () {
      return {
        deleteModalShow: false
      }
    },
    computed: {
      symbol () {
        return this.$store.state.symbol
      },
      totalItem () {
        if (this.order.totalItems > 1) {
          return `${this.order.totalItems} items`
        } else {
          return `${this.order.totalItems} item`
        }
      }
    },
    methods: {
      onPayNowClick () {
        this.$router.push({
          name: this.order.paymentMethod === 'v3' ? 'paymentMethod2' : 'paymentMethod',
          params: {
            orderName: this.order.orderName
          }
        })
      },
      onOrderDetailClick () {
        this.$router.push({
          name: 'orderDetail',
          params: {
            orderId: this.order.orderName
          }
        })
      },
      deleteModalFalse () {
        this.deleteModalShow = false
      },
      async deleteItemMethod () {
        this.$emit('deleteOrder', this.order.orderName, this.index)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .lazy-image {
    width: px2rem(80) !important;
    height: px2rem(80) !important;
    display: inline-block;
    margin-right: px2rem(10);
  }
  .modal-fix {
    z-index: 250;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .modal {
    background-color: $white;
    .modal-main {
      font-size: $large;
      padding: 20px;
      color: $mine-shaft;
      text-align: center;
    }
    .modal-foot {
      display: flex;
    }
  }
  .m-cart {
    background-color: $white;
    color: $dove-gray;
    margin-top: 10px;
    .cart-title-box,
    .cart-tip-box,
    .cart-main-box,
    .cart-foot-box {
      padding: 0 px2rem(18) 0 px2rem(10);
    }
    .green {
      color: $green;
    }
    .red {
      color: $bloodred;
    }
    .cart-title {
      line-height: px2rem(41);
      height: px2rem(41);
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .cart-tip {
      line-height: px2rem(41);
      height: px2rem(41);
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .cart-main {
      height: 120px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      border-bottom: $border;
      .imgbox {
        width: 90%;
        white-space: nowrap;
        overflow: auto;
      }
    }
    .cart-tip-box {
      background-color: $blue-dust;
    }
    .redback {
      background-color: $backred;
    }
    .cart-foot {
      .total-item {
        display: flex;
        justify-content: flex-end;
        height: px2rem(40);
        line-height: px2rem(40);
      }
      .review-item {
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
        height: px2rem(40);
      }
      .review-button {
        border: $button-border;
        border-radius: $button-radius;
        background-color: inherit;
        font-size: $medium;
        width: px2rem(120);
        height: px2rem(33);
        outline: none;
        color: $dove-gray;
      }
      .unpaid-delete {
        border: $button-border;
        border-radius: $button-radius;
        background-color: inherit;
        font-size: $medium;
        width: px2rem(120);
        height: px2rem(33);
        outline: none;
        margin-right: px2rem(4);
        color: $dove-gray;
      }
      .unpaid-paynow {
        border: none;
        outline: none;
        border-radius: $button-radius;
        background-color: $flamingo;
        color: $white;
        font-size: $medium;
        width: px2rem(120);
        height: px2rem(33);
      }
      .expired-delete {
        border: $button-border;
        border-radius: $button-radius;
        background-color: inherit;
        font-size: $medium;
        width: px2rem(120);
        height: px2rem(33);
        outline: none;
        color: $dove-gray;
      }
    }
  }
  .color-red {
    color: $flamingo;
  }
</style>
