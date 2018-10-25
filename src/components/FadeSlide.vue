<template>
  <div class="panel-container">
    <div class="panel-heading" v-if="this.titleName !== ''">
      <span class="title">
        {{$t(titleName)}}
      </span>
    </div>
    <slot name="show-content"></slot>
    <transition name="show-fade">
      <div v-show="slideShow" class="f-oh">
        <slot name="fade-content"></slot>
      </div>
    </transition>
    <div v-if="seeShow" class="panel-body view" @click="onSee">{{$t(seeValue)}}</div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        slideShow: false
      }
    },
    props: {
      titleName: {
        type: String,
        default: ''
      },
      seeShow: {
        type: Boolean,
        default: true
      },
      defaultSee: {
        type: String,
        default: 'productText.seeMore'
      },
      changeSee: {
        type: String,
        default: 'productText.seeLess'
      }
    },
    methods: {
      onSee () {
        this.slideShow = !this.slideShow
      }
    },
    computed: {
      seeValue () {
        return this.slideShow ? this.changeSee : this.defaultSee
      }
    }
  }
</script>

<style lang="scss" scoped>
  .f-oh {
    overflow: hidden !important;
  }
  .panel-container {
    background: $white;
    .panel-heading {
      background: $title-background-color;
      height: px2rem(40);
      display: flex;
      align-items: center;
      padding: 0 px2rem(15);
      border-bottom: $border;
    }
    .panel {
      background-color: $white;
      border: 1px solid transparent;
      border-radius: px2rem(4);
      box-shadow: 0 px2rem(1) px2rem(1) rgba(0, 0, 0, 0.05);
    }
    .view {
      border-top: 1px solid $background-color;
      height: px2rem(46);
      padding: px2rem(13) 0;
      text-align: center;
    }
    //    可以设置不同的进入和离开动画
    /* 设置持续时间和动画函数 */
    .show-fade-enter {
      max-height: px2rem(0);
    }
    .show-fade-leave {
      max-height: px2rem(500);
    }
    .show-fade-enter-active {
      transition: all 0.5s;
    }
    .show-fade-leave-active {
      transition: all 0.5s;
    }
    .show-fade-enter-to {
      max-height: px2rem(500);
    }
    .show-fade-leave-to {
      max-height: px2rem(0);
    }
  }
</style>

