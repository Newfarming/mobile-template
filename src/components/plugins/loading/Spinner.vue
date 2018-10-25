<template>
  <div class="spinner-container" v-show="isShow">
    <svg class="spinner" :class="{ show: isShow }" width="44px" height="44px" viewBox="0 0 44 44">
      <circle class="path" fill="none" stroke-width="4" stroke-linecap="round" cx="22" cy="22" r="20"></circle>
    </svg>
  </div>
</template>

<script>
  import store from '@/store'
  export default {
    data () {
      return {
        isShow: false,
        timer: null
      }
    },
    methods: {
      show (options) {
        this.isShow = !!options.isShow
        if (this.isShow) {
          this.timer = setTimeout(() => {
            store.commit('setLoading', true)
          }, options.delay || 200)
        } else {
          this.hide()
        }
      },
      hide () {
        if (this.timer) {
          clearTimeout(this.timer)
          this.timer = null
          store.commit('setLoading', false)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  $offset: 126;
  $duration: 1.4s;
  .spinner-container {
    position: fixed;
    width: 100%;
    height:100%;
    background-color: rgba(255,255,255,0.8);
    top: 0;
    left: 0;
    z-index: 19;
  }
  .spinner {
    transition: opacity 0.15s ease;
    animation: rotator $duration linear infinite;
    animation-play-state: paused;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: px2rem(-22);
    margin-left: px2rem(-22);

    &.show {
      animation-play-state: running;
    }

    &.v-enter,
    &.v-leave-active {
      opacity: 0;
    }

    &.v-enter-active,
    &.v-leave {
      opacity: 1;
    }
  }

  @keyframes rotator {
    0% {
      transform: scale(0.5) rotate(0deg);
    }

    100% {
      transform: scale(0.5) rotate(270deg);
    }
  }

  .spinner .path {
    stroke: $flamingo;
    stroke-dasharray: $offset;
    stroke-dashoffset: 0;
    transform-origin: center;
    animation: dash $duration ease-in-out infinite;
  }

  @keyframes dash {
    0% {
      stroke-dashoffset: $offset;
    }

    50% {
      stroke-dashoffset: ($offset / 2);
      transform: rotate(135deg);
    }

    100% {
      stroke-dashoffset: $offset;
      transform: rotate(450deg);
    }
  }
</style>
