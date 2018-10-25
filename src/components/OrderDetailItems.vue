<template>
  <div class="order-detail-items">
    <div class="title-box" @click="onShowOrderlines">
      <div class="title">
        <span v-if="virtualSellerInfo&&virtualSellerInfo.name" class="store_line">
          <img :src="storeImg"  class="icon_store"/>
          <span class="store_name">{{virtualSellerInfo.name}}</span>
          <span class="items color_grey"> ({{orderLineNumber}} )</span>
        </span>
        <span v-else>{{orderLineNumber}}</span>
        <i class="iconfont icon-xiangshang" :class="{'rotate180':ShowOrderlines}"></i>
      </div>
    </div>
    <transition name="slide-fade">
      <div class="content" v-show="ShowOrderlines">
        <order-detail-item v-for="(item,index) in orderLines" :order="item" :key="index"></order-detail-item>
      </div>
    </transition>

  </div>
</template>
<script>
  import {
    mapState
  } from 'vuex'
  import OrderDetailItem from '@/components/OrderDetailItem'
  import storeImg from '@/assets/img/icon_store.png'
  export default {
    components: {
      OrderDetailItem
    },
    props: ['orderLines', 'virtualSellerInfo'],
    data () {
      return {
        ShowOrderlines: true,
        storeImg: storeImg,
      }
    },
    computed: mapState({
      orderLineNumber () {
        const len = this.orderLines.length
        return this.$i18n.tc('order.orderLineNumber', len, { orderNum: len })
      }
    }),
    methods: {
      onShowOrderlines () {
        this.ShowOrderlines = !this.ShowOrderlines
      }
    }
  }
</script>

<style lang="scss" scoped>
  .icon-xiangshang {
    transition: all 0.3s;
  }
  .rotate180 {
    transform: rotate(180deg);
  }
  .order-detail-items {
    background-color: $white;
    overflow: hidden;
    .content {
      overflow: hidden;
    }
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: $border;
      padding: 0 px2rem(10);
      height: px2rem(44);
      line-height: px2rem(44);
      position: relative;
    }
    .icon_store {
      width: px2rem(20);
      position: absolute;
      top: px2rem(12);
      left: px2rem(7);
    }

    .store_line {
      color: #333333;
      font-size: px2rem(14);
      line-height: px2rem(44);
      height: px2rem(44);
      display: block;
    }
    .color_grey {
      color: #999999;
    }
    @media screen and (min-width: 374px) {
      .store_name {
        padding-left: px2rem(21);
        box-sizing: content-box;
        display: inline-block;
        width: 250px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 4.4rem;
      }
    }
    @media screen and (max-width: 374px) {
      .store_name {
        padding-left: px2rem(21);
        box-sizing: content-box;
        display: inline-block;
        width: 190px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        line-height: 4.4rem;
      }
    }
    .items {
      overflow: hidden;
      display: inline-block;
      line-height: 4.4rem;
    }
  }
</style>
