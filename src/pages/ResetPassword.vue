<template>
  <div id="reset-container" data-is-new-version="False">
    <div class="header">
      <i class="iconfont icon-xiaolian"></i>
      <div class="header-tips phone-tips">{{$t('tips.password')}}</div>
    </div>
    <input class="reset-info" type="text" :placeholder="$t('placeholder.password')" v-model="password">
    <div class="btn-reset-confirm btn-send-validate" @click="confirm">{{$t('button.confirm')}}</div>
  </div>
</template>
<script>
  import {
    urlSearch
  } from '@/utils/common'
  export default {
    components: {
    },
    data () {
      return {
        password: '',
        token: '',
        EorMData: {},
        forget_type: 'forget'
      }
    },
    created () {
      let param = urlSearch()
      this.token = param.token
      // console.log(' this.token', this.token)
    },
    methods: {
      verifyPassword () {
        const emailPtn = /^(\w+)$/
        //   console.log('this.account=>', this.account)
        if (!emailPtn.test(this.password)) {
          this.$toast.error(this.$i18n.t('toast.invalidPwd'))
          return true
        }
        return false
      },
      async confirm () {
        if (this.verifyPassword()) {
          return
        }
        console.log('this.password', this.password)
        const result = await this.$store.dispatch('resetPassword', {
          token: this.token,
          password: this.password
        })
        if (result) {
          this.$toast.success('Reset Success')
          this.$router.push({ name: 'home' })
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
      color: white;
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
