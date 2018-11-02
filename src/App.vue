<template>
  <div id="app">

    <router-view></router-view>
  </div>

  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'

  import {
    setCookie,
    getCountry
  } from '@/utils'

  import {
    isSupportCountry,
    COUNTRY_MAP
  } from '@/config'

  export default {
    name: 'app',
    components: {
    },
    data () {
      return {
        lastTouchEnd: 0,
        sys: ''
      }
    },
    async created () {
      // 首先要判断下用户是否已经选择了国家，即本地是否保存了国家信息，如果没有就用IP定位用户的国家信息即可
      const flag = !getCountry(null)
      if (flag) {
        const resp = await this.$store.dispatch('getLocation')
        console.log('location resp =>', resp)
        let countryCode = resp && resp.countryCode.toLowerCase()
        // 判断是否为支持的国家
        if (!isSupportCountry(countryCode)) {
          countryCode = 'us'
        }
        // 更新vuex中的国家信息
        this.$store.commit('updateCountryCode', countryCode)
        // 更新货币信息
        this.$store.commit('updateSymbol', COUNTRY_MAP[countryCode].symbol)
      }
    },
    computed: {
      ...mapState({
        isLoading: 'isLoading',
        isShowCountry: 'isShowCountryBox',
        isShowSearch: 'isShowSearchBox',
        isShowCategory: state => state.route.query.navState ? state.route.query.navState.isShowCategory : false,
        isShowFooter: state => state.route.query.navState ? state.route.query.navState.isShowFooter : false,
        isShowHeader: state => state.route.query.navState ? state.route.query.navState.isShowHeader : false,
        mainClass: state => state.route.query.navState ? state.route.query.navState.mainClass : 'bg-white',
        isShowDownload: state => state.route.query.navState ? state.route.query.navState.isShowDownload : false,
        isDownloadAppShow: 'isDownloadAppShow'
      })
    },
    methods: {
      handleCountryBox () {
        this.$store.commit('updateCountryBox')
      },
      handleSearchBox () {
        this.$store.commit('updateSearchBox')
      }

    },
    mounted () {
      // 用于解决iOS双击缩放的问题，但是会带来另一个问题，页面滑动的时候非常容易误触，导致点击事件
      // document.documentElement.addEventListener('touchend', event => {
      //   const now = Date.now()
      //   if (now - this.lastTouchEnd <= 300) {
      //     event.preventDefault()
      //   }
      //   this.lastTouchEnd = now
      //   // event.target.click()
      // }, false)

      // 判断是否离线
      if (window.navigator && window.navigator.onLine === false) {
        this.$toast('You are offline.')
      }
      // 判断操作系统
      const u = window.navigator.userAgent
      if (u) {
        const isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
        if (isIos) {
          this.sys = 'ios'
        }
        if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
          this.sys = 'android'
        }
      }

      window.addEventListener('online', () => {
        this.$toast('You are online, Please refresh.')
      }, false)

      window.addEventListener('offline', () => {
        this.$toast('You are offline.')
      }, false)

      document.addEventListener('touchstart', function () { }, true)

      // 设置一个特定的cookie作为标记
      setCookie('group', 'mobile-pwa')
    }
  }
</script>

<style lang="scss">
  @import "./assets/styles/common.scss";
  @import "./assets/iconfont/iconfont.css";
  #app {
    background: $white;
    -webkit-backface-visibility: hidden;

    .app-container {
      overflow: auto;
      -webkit-overflow-scrolling: touch;
    }

    &.ios {
      .app-container {
        overflow: visible;
      }
    }

    > header {
      min-height: px2rem(46);
      border-bottom: $border;
      width: 100vw;
    }

    .app-container > main {
      flex: 1;
      position: relative;
      &.bg-white {
        background: $white;
      }
      &.bg-gray {
        background: $background-color;
      }
      &.loading {
        overflow: hidden;
      }
    }

    > footer {
      height: px2rem(50);
    }
  }
</style>
