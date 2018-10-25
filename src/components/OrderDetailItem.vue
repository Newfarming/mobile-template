<template>
  <div class="item">
    <router-link class="left" :to="{ name: 'product', params: { productId: order.productTemplateId ,defaultImage:order.imageUrl}}">
      <img :src="order.imageUrl">
    </router-link>

    <div class="right">
      <div class="right-title">
        <span>{{order.name}}</span>
      </div>
      <div class="right-content">
        <div class="right-left">
          <p class="size">
            <span v-if="order.size">{{order.size}}</span>
            <span v-if="order.size && order.color">,</span>
            <span v-if="order.color"> {{order.color}}</span>
          </p>
          <p class="money">{{symbol}} {{order.priceRealLocal | round}}</p>
        </div>
        <div class="right-right">
          x{{order.quantity}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    mapState
  } from 'vuex'
  export default {
    props: ['order'],
    computed: mapState({
      symbol () {
        return this.$store.state.symbol
      }
    })
  }
</script>

<style lang="scss" scoped>
  .right-first {
    height: px2rem(12);
    width: px2rem(240);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: px2rem(10);
    border-bottom: $border;
    .left {
      display: block;
      width: px2rem(80);
      img {
        width: 100%;
      }
    }
    .right {
      flex: 1;
      padding-left: px2rem(10);
      .right-title {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-size: px2rem(14);
        width: px2rem(250);
        height: px2rem(40);
        line-height: px2rem(20);
      }
      .right-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .type {
        font-size: $x-small;
        padding: px2rem(3) px2rem(3);
        color: $flamingo;
        background-color: $backred;
      }
      .size {
        color: $dusty-gray;
        font-size: $small;
        margin-top: px2rem(5);
        width: px2rem(240);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .money {
        color: $dove-gray;
        font-size: $small;
        margin-top: px2rem(3);
        width: px2rem(240);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
</style>
