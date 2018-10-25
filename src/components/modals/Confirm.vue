<template>
  <div class="modal-fix">
    <div class="deleteOrderModal">
      <div class="modal_dialog">
        <p class="modal-title" v-if="title">{{$t(title)}}</p>
        <div class="modal-content" :style="styleObj">
          {{message}}
        </div>
        <div class="modal_btn clearfix">
          <div class="btn-no" @click="onClickLeft">{{$t(leftText)}}</div>
          <div class="btn-yes" @click="onClickRight">{{$t(rightText)}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      title: {
        type: String,
        default: ''
      },
      message: {
        type: String,
        default: ''
      },
      leftText: {
        type: String,
        default: 'button.no'
      },
      rightText: {
        type: String,
        default: 'button.yes'
      },
      styleObj: {
        type: Object,
        default: () => { }
      }
    },
    methods: {
      onClickRight () {
        this.$emit('choose', true)
      },
      onClickLeft () {
        this.$emit('choose', false)
      }
    }
  }
</script>
<style lang="scss" scoped>
  .modal-fix {
    z-index: 250;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0px;
    background-color: rgba(0, 0, 0, 0.4);
    .deleteOrderModal {
      position: fixed;
      top: 35vh;
      width: 100%;
      .modal_dialog {
        background-color: $white;
        border-radius: 10px;
        margin: 0 14%;
      }
      .modal-title {
        text-align: center;
        padding-top: 2rem;
        font-size: 1.8rem;
        color: $mine-shaft;
      }
      .modal-content {
        text-align: center;
        padding: 2rem;
        font-size: 1.8rem;
        color: $mine-shaft;
      }
      .modal_btn div {
        display: inline-block;
        text-align: center;
        width: 50%;
        color: $flamingo;
        font-size: 18px;
        height: 50px;
        line-height: 50px;
      }
      .modal_btn {
        border-top: 1px solid $mecury;
        display: flex;
      }
      .modal_btn div:first-child {
        border-right: 1px solid $mecury;
      }
    }
  }
</style>
