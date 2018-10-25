<template>
  <div id="app" :class="sys">
    <header id="header" ref="header" v-if="isShowHeader">
      <download-app v-if="isShowDownload" :is-show="isDownloadAppShow"></download-app>
      <nav-bar @toggle-country-box="handleCountryBox" @toggle-search-box="handleSearchBox"></nav-bar>
      <category-bar v-if="isShowCategory"></category-bar>
    </header>
    <div class="app-container">
      <main id="main" ref="main" :class="[mainClass, isLoading ? 'loading': '']">

        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>

        <router-view v-if="!$route.meta.keepAlive"></router-view>

      </main>
    </div>

    <footer v-if="isShowFooter">
      <tab></tab>
    </footer>

    <section>
      <transition name="fade">
        <country-box v-if="isShowCountry"></country-box>
        <search-box v-if="isShowSearch"></search-box>
      </transition>
    </section>
  </div>
</template>

<script>
  import {
    getCountry
  } from '@/utils'

  export default {
    name: 'app',
    components: {
    },
    data () {
      return {
        lastTouchEnd: 0,
        sys: '',
        flag: ''
      }
    },
    async created () {
      // 首先要判断下用户是否已经选择了国家，即本地是否保存了国家信息，如果没有就用IP定位用户的国家信息即可
      this.flag = !getCountry(null)
    },
    computed: {
    },
    methods: {
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
