<template>
  <transition name="fade">
    <div class="toast" v-show="isShow">
      <i class="iconfont" :class="[icon, type]" v-if="type"></i>
      <slot>
        <p>{{content}}</p>
      </slot>
    </div>
  </transition>

</template>

<script>
  export default {
    data () {
      return {
        isShow: false,
        content: '',
        delay: 0,
        icon: '',
        type: '',
        timer: null
      }
    },
    methods: {
      show (params) {
        this.content = params.content
        this.delay = params.delay || 2000
        this.isShow = true
        this.icon = params.icon
        // tyep ==> success, error
        this.type = params.type
        this.setTimer()
      },

      hide () {
        this.isShow = false
      },

      setTimer () {
        clearTimeout(this.timer)
        this.timer = setTimeout(() => {
          this.hide()
        }, this.delay)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .toast {
    position: fixed;
    right: 50%;
    bottom: 10%;
    display: block;
    overflow: hidden;
    box-shadow: 0 0 px2rem(6) $dove-gray;
    opacity: 0.9;
    border-radius: px2rem(3) px2rem(3);
    padding: px2rem(10);
    color: $white;
    background: $mine-shaft;
    transform: translate(50%, -50%);
    z-index: 999999;
    text-align: center;
    .iconfont {
      font-size: $xx-large;
      margin-bottom: px2rem(10);
      &.error {
        color: $flamingo;
      }
      &.success {
        color: $green;
      }
    }
  }
</style>
