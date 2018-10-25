<template>
  <transition appear name="fade">
    <div class="modal" v-if="isShowModal">
      <div @click="hide" class="modal-back"></div>
      <slot></slot>
    </div>
  </transition>
</template>
<script>
  export default {
    props: {
      isShow: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        isShowModal: this.isShow
      }
    },
    methods: {
      show () {
        this.isShowModal = true
      },
      hide () {
        this.isShowModal = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .modal {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
    .modal-back {
      background: rgba(0, 0, 0, 0.5);
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
    }
  }
</style>

