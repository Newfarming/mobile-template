<template>
  <div id="reset-container" data-is-new-version="False">
    <div class="header">
      <i class="iconfont icon-xiaolian"></i>
      <div class="header-tips phone-tips">{{$t('tips.registerEmail')}}</div>
      <div class="header-tips email-tips hidden">{{$t('tips.resetPwd')}}</div>
    </div>
    <input class="reset-info" type="url" :placeholder="$t('placeholder.email')" v-model="account">
    <div class="btn-reset-confirm btn-send-validate" @click="forget">{{$t('button.confirm')}}</div>
  </div>
</template>
<script>
  export default {
    components: {
    },
    data () {
      return {
        account: '',
        EorMData: {},
        forget_type: 'forget'
      }
    },
    methods: {
      verifyEmail () {
        const emailPtn = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/
        if (!emailPtn.test(this.account)) {
          this.$toast.error(this.$i18n.t('toast.errorEmail'))
          return true
        }
        return false
      },
      async forget () {
        if (this.verifyEmail()) {
          return
        }
        const result = await this.$store.dispatch('forget', { email: this.account })
        if (result && this.forget_type === 'forget') {
          this.forget_type = 'sended'
        } else if (result) {
          this.$toast.success(this.$i18n.t('toast.resendSuc'))
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  #reset-container {
    padding: px2rem(25) px2rem(20);
    text-align: center;
    .header {
      padding: px2rem(10);
      border: 1px dotted $mecury;
      color: $dusty-gray;
      i {
        font-size: px2rem(48);
        color: #53bd13;
      }
    }
    .hidden {
      display: none;
    }
    .reset-info {
      width: 100%;
      height: px2rem(48);
      outline: none;
      border: none;
      border-bottom: 1px solid $mecury;
      font-size: $medium;
      margin-top: px2rem(20);
    }
    .btn-reset-confirm {
      height: px2rem(44);
      line-height: px2rem(44);
      background: $flamingo;
      color: $white;
      border-radius: px2rem(3);
      margin-top: px2rem(30);
      font-size: px2rem(16);
    }
  }

  #pic-code {
    margin-top: px2rem(20);
  }

  #pic-code .pic-code-tips {
    font-size: px2rem(12);
    color: $dove-gray;
  }

  #pic-code .pic-code-content {
    margin-top: px2rem(24);
  }

  #pic-code .pic-code-content img {
    width: px2rem(86);
    height: px2rem(28);
  }

  #pic-code .pic-code-content input[name="picVerifyCode"] {
    outline: none;
    border: 1px solid $mecury;
    width: px2rem(80);
    height: px2rem(28);
    padding: 0 px2rem(5);
    margin-left: px2rem(10);
    position: relative;
    top: px2rem(2);
  }

  #pic-code .pic-code-content .pic-code-error {
    color: #ff0000;
    font-size: px2rem(12);
  }
</style>
