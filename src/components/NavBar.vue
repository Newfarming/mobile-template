<template>
  <div class="nav-header">
    <div class="nav nav-left">
      <i class="iconfont icon-qianjin-copy" v-if="navState.isShowBack" @click="onBackBtnClick"></i>
      <div class="nav-country" v-if="navState.isShowCountryBox" @click="onToggleCountryBox">
        <img :src="`/static/img/flags/${countryCode}.jpg`" alt="">
        <i class="iconfont icon-xiala"></i>
      </div>
    </div>
    <span class="nav-title">{{$t(navState.title)}}</span>
    <div class="nav nav-right" @click="onToggleSearchBox">
      <i class="iconfont icon-sousuo" v-if="navState.isShowSearch"></i>
    </div>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'

  export default {
    methods: {
      onToggleCountryBox () {
        this.$emit('toggle-country-box')
      },
      onToggleSearchBox () {
        this.$emit('toggle-search-box')
      },
      onBackBtnClick () {
        window.history.length > 1
          ? this.$router.go(-1)
          : this.$router.push('/')
      }
    },
    computed: mapState({
      navState: state => state.route.query.navState || {},
      countryCode: state => state.countryCode
    })
  }
</script>

<style lang="scss" scoped>
  .nav-header {
    height: px2rem(46);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: $white;
    padding: 0 px2rem(10);
    .nav-title {
      font-size: $medium;
    }
    .nav {
      min-width: px2rem(30);
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      .nav-country {
        display: flex;
        align-items: center;
        box-shadow: 0 0 2px 0 $mecury;
        img {
          width: px2rem(30);
          height: px2rem(20);
        }
        .iconfont {
          font-size: $small;
          color: $dusty-gray;
          padding: 0 px2rem(2);
        }
      }
    }
  }
</style>
