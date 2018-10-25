<template>
  <modal>
    <p class="title">{{$t('modal.protect.title')}}</p>
    <section class="content">
      <p>{{$t('modal.protect.p1')}}</p>
      <br>
      <p>{{$t('modal.protect.p2')}}</p>
      <br>
      <p>
        {{$t('modal.protect.p31')}}
        <span class="warning-imp">{{$t('modal.protect.warningImp')}}</span>
        {{$t('modal.protect.p32')}}
      </p>
      <br>
      <p>{{$t('modal.protect.p4')}}</p>

    </section>
    <button class="md-btn md-btn-primary btn-modal-close" @click="() => this.$emit('modal-close')">{{$t('button.ok')}}</button>
  </modal>
</template>

<script>
  import Modal from '@/components/common/Modal'
  export default {
    components: {
      Modal
    }
  }
</script>

<style lang="scss" scoped>
  .title {
    width: 100%;
    text-align: center;
    background-image: linear-gradient(-225deg, #f15440 0%, #ff0037 100%);
    height: px2rem(44);
    line-height: px2rem(44);
    font-size: $large;
    color: $white;
    border-top-left-radius: px2rem(4);
    border-top-right-radius: px2rem(4);
  }

  .content {
    text-align: left;
    padding: px2rem(15) px2rem(20);
    color: $dove-gray;
    .warning-imp {
      color: $flamingo;
    }
  }
  .btn-modal-close {
    color: $white;
    margin-bottom: px2rem(20);
    width: 80%;
    background-image: linear-gradient(-225deg, #f15440 0%, #ff0037 100%);
  }
</style>
