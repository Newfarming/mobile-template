<template>
  <router-link :to="to" tag="div" class="group-item">
    <span>{{$t(name)}}</span>
    <span class="icon-right">
      <i class="iconfont icon-qianjin"></i>
    </span>
  </router-link>
</template>

<script>
  export default {
    props: {
      name: {
        type: String,
        required: true
      },
      to: {
        type: Object,
        default: () => {
          return {}
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .group-item {
    box-sizing: content-box;
    height: px2rem(44);
    padding: 0 px2rem(15) 0 px2rem(20);
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: $medium;
    .icon-right {
      color: $dusty-gray;
    }
  }
</style>
