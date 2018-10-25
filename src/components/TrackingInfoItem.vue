<template>
  <div class="item">
    <div class="item-title" @click="onShowItem">
      <div class="title-left">
        <div v-if="ifEstimated">
          <div>
            <span class="title-main-estimated">{{$t('shippingText.deliveryTime')}}:</span>
            <span class="title-value">{{item.delivery_date}}</span>
          </div>
        </div>
        <div v-else>
          <div>
            <span class="title-main">{{$t('shippingText.deliveryDate')}}:</span>
            <span class="title-value">{{item.delivery_date}}</span>
          </div>
          <div>
            <span class="title-main">{{$t('shippingText.courier')}}:</span>
            <span class="title-value">{{item.courier}}</span>
          </div>
          <div>
            <span class="title-main">{{$t('shippingText.trackingNo')}}:</span>
            <span class="title-value">{{item.tracking_no}}</span>
          </div>
        </div>

      </div>
      <div class="title-right">
        <i class="iconfont icon-xiangshang" :class="{'rotate180':showItem,'jiantou-move':!ifEstimated}"></i>
      </div>
    </div>
    <transition name="slide-fade">
      <div class="item-content" v-show="showItem">
        <div class="lists">
          <tracking-info-list v-for="(list,index) in item.tracking_msg" :key="index" :list="list"></tracking-info-list>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import TrackingInfoList from '@/components/TrackingInfoList'

  export default {
    components: {
      TrackingInfoList
    },
    data () {
      return {
        showItem: true
      }
    },
    props: {
      item: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    computed: {
      ifEstimated () {
        if (this.item.courier && this.item.tracking_no) {
          return false
        } else {
          return true
        }
      }
    },
    methods: {
      onShowItem () {
        this.showItem = !this.showItem
      }
    }
  }
</script>
<style lang="scss" scoped>
  .rotate180 {
    transform: rotate(180deg);
  }
  .jiantou-move {
    position: relative;
    top: px2rem(23);
  }
  .item /deep/ {
    background-color: $white;
    margin-top: px2rem(-1);
    margin-bottom: px2rem(9);
    .item-title {
      display: flex;
      justify-content: space-between;
      line-height: px2rem(24);
      padding: px2rem(8) px2rem(9) px2rem(8) px2rem(22);
      background-color: $title-background-color;
      font-size: $small;
      border-top: $border;
      border-bottom: $border;
      transition: all 0.3s;
      .title-main {
        display: inline-block;
        color: $dusty-gray;
        width: px2rem(92);
      }
      .title-main-estimated {
        display: inline-block;
        color: $dusty-gray;
      }
      .title-value {
        color: $mine-shaft;
      }
      .icon-xiangshang {
        color: $icon-color;
      }
    }
    .item-content {
      overflow: hidden;
    }
  }
</style>
