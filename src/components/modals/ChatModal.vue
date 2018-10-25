<template>
  <modal :title="true" @modal-close="$emit('modal-close')">
    <div class="chat-content">
      <img src="/static/img/app/app_icon.png" alt="">
      <p>{{$t('modal.downloadTip')}}</p>

      <button class="md-btn md-btn-primary btn-download-app" @click="onClickDownloadApp">{{$t('button.downloadApp')}}</button>
    </div>
  </modal>
</template>


<script>
  import Modal from '@/components/common/Modal'
  import {
    openNativeApp
  } from '@/utils'
  export default {
    components: {
      Modal
    },
    methods: {
      onClickDownloadApp () {
        openNativeApp()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .chat-content {
    text-align: center;
    padding: px2rem(10) px2rem(30) px2rem(30) px2rem(30);
    img {
      width: px2rem(50);
      height: px2rem(50);
    }
    p {
      color: $mine-shaft;
      margin: px2rem(20) 0;
      font-size: $medium;
    }

    .btn-download-app {
      width: 100%;
    }
  }
</style>
