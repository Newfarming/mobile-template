<template>
  <section class="download-app" :class="{hide: !isShow}" @click="onClickDownloadApp">
    <img src="/static/img/app/app_icon.png" alt="">
    <div class="app-tips">
      <p class="tips-one">{{$t('tips.tipsOne')}}</p>
      <p class="tips-two">{{$t('tips.tipsTwo')}}</p>
    </div>
    <div class="btn-view">{{$t('button.view')}}</div>
  </section>
</template>

<script>
  import {
    openNativeApp
  } from '@/utils'
  import { mapState, mapGetters } from 'vuex'
  export default {
    props: {
      isShow: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      onClickDownloadApp () {
        openNativeApp()
      }
    },
    computed: {
      ...mapState({
        countryCode: 'countryCode',
      }),
      ...mapGetters({
        amountOff: 'amountOff',
        priceOff: 'priceOff',
        // midEastPromotion: 'midEastPromotion'
      }),
      // idMideastActivityTime () {
      //   return this.midEastPromotion && this.midEastPromotion.expire_time > 0 && this.countryCode === 'sa'
      // },
      isIndia () {
        return this.amountOff ?.expire_time > 0 || this.priceOff ?.expire_time > 0
      }
    }
  }
</script>

<style lang="scss" scoped>
  .download-app {
    display: flex;
    height: px2rem(50);
    text-decoration: none;
    justify-content: space-between;
    align-items: center;
    color: $white;
    background-color: #4c4c4c;
    padding-left: px2rem(10);
    transition: height 0.2s ease-in-out;
    overflow: hidden;

    &.hide {
      height: 0;
    }
    > img {
      width: px2rem(35);
      height: px2rem(35);
    }

    .app-tips {
      margin: 0;

      .tips-two {
        font-size: $x-small;
        color: $mecury;
        margin-top: px2rem(2);
        &.promotion-india {
          font-weight: bold;
        }
      }
    }

    .btn-view {
      width: px2rem(90);
      height: 100%;
      line-height: px2rem(50);
      text-align: center;
      font-size: $medium;
      background-color: $flamingo;
      color: $white;
    }
  }
</style>
