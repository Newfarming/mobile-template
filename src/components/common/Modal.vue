<template>
  <transition name="fade">
    <div class="modal abc" @click="onClickBackground">
      <div class="modal-content">
        <div class="modal-title" v-if="title">
          <slot name="title"></slot>
          <i class="iconfont icon-guanbi_cp" @click="onModalClose"></i>
        </div>
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      title: {
        type: Boolean,
        default: false
      },
      static: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      created () {
        this.$emit('modal-open')
      },
      onModalClose () {
        this.$emit('modal-close')
      },
      onClickBackground (e) {
        if (this.static) {
          const classList = e.target.classList
          if (classList && classList[0] === 'modal') {
            this.onModalClose()
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .modal {
    position: fixed;
    z-index: 99;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    color: $dusty-gray;
    padding: px2rem(24);
    .modal-content {
      background: $white;
      margin: auto;
      border-radius: 4px;
      .modal-title {
        display: flex;
        justify-content: space-between;
        .iconfont {
          margin-left: auto;
          font-size: $x-small;
          margin-right: px2rem(4);
          margin-top: px2rem(4);
          font-weight: bold;
        }
      }
    }
  }
</style>
