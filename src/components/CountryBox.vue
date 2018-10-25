<template>
  <lightbox class="country-box">
    <div class="box-title" @click="onBackClick">
      <i class="iconfont icon-qianjin-copy"></i>
      <span>{{$t('title.settingCountry')}}</span>
    </div>
    <country-list @country-change="handleCountryChange"></country-list>
  </lightbox>
</template>

<script>
  import Lightbox from '@/components/common/Lightbox'
  import CountryList from '@/components/CountryList'
  import {
    mapState
  } from 'vuex'
  export default {
    components: {
      Lightbox,
      CountryList
    },
    methods: {
      onBackClick () {
        this.$store.commit('updateCountryBox')
      },

      async handleCountryChange (country) {
        this.$store.commit('updateCountryBox')

        this.$loading.show()
        const $main = document.querySelector('#main')
        if ($main) {
          window.scrollTo(0, 0)
        }
        // 活动期间，切换到印度重新请求互动数据
        if (this.countryCode === 'in') {
          this.$store.dispatch('getThemes')
        }
        if (this.countryCode === 'sa') {
          this.$store.dispatch('getThemes')
        }
        await this.$store.dispatch('getHomeFirstData')
        this.$loading.hide()
      }
    },
    computed: {
      ...mapState({
        countryCode: 'countryCode'
      })
    }

  }
</script>

<style lang="scss" scoped>
  .country-box {
    display: flex;
    flex-direction: column;
    .box-title {
      min-height: px2rem(44);
      line-height: px2rem(44);
      text-align: center;
      font-size: $medium;
      border-bottom: $border;
      i {
        float: left;
        width: px2rem(30);
        margin-left: px2rem(5);
      }
    }
    > ul {
      overflow: auto;
      flex: 1;
      padding-left: px2rem(15);
      li {
        position: relative;
        height: px2rem(45);
        border-bottom: $border;
        display: flex;
        align-items: center;
        &.active::after {
          content: "";
          width: px2rem(10);
          height: px2rem(5);
          position: absolute;
          right: px2rem(20);
          border: 2px solid $flamingo;
          border-right: none;
          border-top: none;
          transform: rotate(-45deg);
        }
        img {
          width: px2rem(30);
          height: px2rem(20);
        }
        span {
          margin-left: px2rem(20);
        }
      }
    }
  }
</style>
