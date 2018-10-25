<template>
  <div>
    <fade-slide>
      <div slot="show-content">
        <div class="confidence-groups">
          <router-link :to="{name:'serviceFactoryPrice'}" class="confidence-item">
            <i class="iconfont icon-goubianyixianshizhekou"></i>
            <span class="factory-price">{{$t('title.serviceFactoryPrice')}}</span>
          </router-link>
          <router-link class="confidence-item item-middle" :to="{name:'serviceFAQReturnPolicy'}">
            <i class="iconfont icon-tuihuanhuo1"></i>
            <span v-html="$t('productText.easyReturn')"></span>
          </router-link>
          <router-link class="confidence-item" :to="{name:'serviceFAQPaymentProtection'}">
            <i class="iconfont icon-anquanzhifu"></i>
            <span>100% {{$t('title.serviceFAQPaymentProtection')}}</span>
          </router-link>
        </div>
        <div class="confidence-title">
          <p>{{$t('productText.confidenceTitle1')}}</p>
          <p>{{$t('productText.confidenceTitle2')}}</p>
        </div>
      </div>
      <div slot="fade-content">
        <img class="confidence-img" src="/static/img/service/confidence.jpg">
      </div>
    </fade-slide>
  </div>
</template>

<script>
  import FadeSlide from '@/components/FadeSlide'
  export default {
    components: {
      FadeSlide
    }
  }
</script>

<style lang="scss" scoped>
  .confidence-groups {
    height: px2rem(110);
    display: flex;
    align-items: center;
    background: $white;
    text-align: center;
    border-bottom: 1px solid $background-color;
    .confidence-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: center;
      text-decoration: none;
      position: relative;
      align-items: center;

      & + .confidence-item {
        border-left: $border;
      }
      .icon-goubianyixianshizhekou {
        font-size: px2rem(50);
      }
      .icon-tuihuanhuo1 {
        font-size: px2rem(30);
      }
      .icon-anquanzhifu {
        font-size: px2rem(38);
      }
      .iconfont {
        color: $flamingo;
        margin-top: px2rem(-30);
      }
      .factory-price {
        bottom: px2rem(20);
      }
      span {
        width: 100%;
        font-size: px2rem(12);
        color: $dusty-gray;
        position: absolute;
        bottom: px2rem(8);
      }
    }
  }
  .confidence-title {
    background: $white;
    height: px2rem(100);
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    p {
      margin: 0;
      color: $mine-shaft;
    }
    p:first-child {
      font-size: px2rem(20);
    }
    p:last-child {
      font-size: px2rem(12);
      margin-top: px2rem(6);
    }
  }
  .confidence-img {
    width: 100%;
  }
</style>

