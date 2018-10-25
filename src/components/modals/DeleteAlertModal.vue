<template>
  <div class="modal-fix" v-show="deleteModalShow">
    <div class="deleteOrderModal">
      <div class="modal_dialog">
        <div class="modal_title">
          {{$t('modal.deleteTip')}}
        </div>
        <div class="modal_btn clearfix">
          <div class="modal_no_btn" @click="deleteModalFalse">{{$t('button.no')}}</div>
          <div class="modal_delete_btn" @click="deleteOrder">{{$t('button.delete')}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      deleteModalShow: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      deleteModalFalse () {
        this.deleteModalShow = false
      },
      deleteOrder () {
        this.$emit('deleteOrder')
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
  }
  .deleteOrderModal {
    position: fixed;
    top: 35vh;
    width: 100%;
    .modal_dialog {
      background-color: $white;
      border-radius: 10px;
      margin: 0 14%;
    }
    .modal_title {
      text-align: center;
      padding: 20px;
      font-size: 18px;
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
</style>
