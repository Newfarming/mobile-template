<template>
  <div class="login-container">
    <div class="btn-close">
      <i class="iconfont icon-guanbi_cp" @click="onLoginCloseClick"></i>
    </div>
    <div class="login-logo">
      <img :src="logoTrans" alt="">
    </div>
    <section class="login-content" v-if="isShowLoginGuide">
      <div class="fb-login">
        <img :src="fbLogoTrans" alt="">
        <span>{{$t('button.loginFacebook')}}</span>
      </div>
      <div class="login-select-text">{{$t('tips.or')}}</div>
      <div class="btn-group">
        <div class="btn-signup">{{$t('button.signUp')}}</div>
        <div class="btn-login">{{$t('button.login')}}</div>
      </div>
    </section>

    <section class="login-wrap">
      <div class="btn-tab">
        <div class="btn-signup" :class="{'active': !isLogin}" @click="onSignUpTabClick">{{$t('button.signUp')}}</div>
        <div class="tb-split"></div>
        <div class="btn-login" :class="{'active': isLogin}" @click="onLoginTabClick">{{$t('button.login')}}</div>
      </div>
      <form class="account-login-form" v-if="isLogin">
        <md-input type='text' :class="{'phone-input':ifTelphoneNumber&&ifIndia}" v-model="username" :name="username" :placeholder="accountPlaceholder">
          <div class="phone-front" v-if="ifTelphoneNumber&&ifIndia">+91</div>
        </md-input>
        <md-input type='password' v-model="password" :name="password" placeholder="placeholder.password">
          <router-link :to="{ name: 'forgot'}">
            <span class="lab-forgot">{{$t('button.forgot')}}?</span>
          </router-link>

        </md-input>
        <div class="btn-login" @click="onLoginClick">{{$t('button.login')}}</div>
      </form>
      <form class="account-signup-form" v-else>
        <md-input type='text' :class="{'phone-input':ifTelphoneNumber&&ifIndia}" v-model="username" :name="username" :placeholder="accountPlaceholder">
          <div class="phone-front" v-if="ifTelphoneNumber&&ifIndia">+91</div>
        </md-input>
        <div class="form-item">
          <md-input :type='isShowPassword?"text": "password"' v-model="password" :name="password" placeholder="placeholder.password">
            <i class="iconfont" :class="[isShowPassword?'icon-TIM-': 'icon-yincang']" @click="onPwdSeeClick"></i>
          </md-input>
        </div>
        <div class="btn-signup" @click="onSignupClick">{{$t('button.signUp')}}</div>
      </form>
      <div v-if="!isLogin" class="split-line">
        By clicking Sign Up, you agree to
        <router-link to="/service/about/terms-conditions" exact>our Terms</router-link>
      </div>
      <div class="split-line">or</div>
      <div class="fb-login" @click="onFBLogin">
        <i class="iconfont icon-facebook"></i>
        <span>{{$t('button.loginFacebook')}}</span>
      </div>
    </section>
  </div>
</template>
<script>
  import logoTrans from '@/assets/img/logo-transparent.png'
  import fbLogoTrans from '@/assets/img/fb-logo-trans.png'
  import MdInput from '@/components/common/MdInput'
  import googleAnalytics from '@/setup/setup-google-analytics'
  import {
    getParameterByName
  } from '@/utils/common'
  export default {
    components: {
      MdInput
    },
    data () {
      return {
        isSubEmail: false,
        logoTrans: logoTrans,
        fbLogoTrans: fbLogoTrans,
        isShowLoginGuide: false,
        isLogin: true,
        isShowPassword: true,
        username: '',
        password: '',
        accountToastMessage: '',
        passwordToastMessage: ''
      }
    },
    created () {
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: '154486991584752',
          xfbml: true,
          cookie: true,
          version: 'v2.8'
        })
        window.FB.AppEvents.logPageView()
      };

      (function (d, s, id) {
        var js
        var fjs = d.getElementsByTagName(s)[0]
        if (d.getElementById(id)) { return }
        js = d.createElement(s); js.id = id
        js.src = '//connect.facebook.net/en_US/sdk.js'
        fjs.parentNode.insertBefore(js, fjs)
      }(document, 'script', 'facebook-jssdk'))
    },
    computed: {
      ifTelphoneNumber () {
        // const reg = /^[0-9]*$/
        // return this.username !== '' && reg.test(this.username)
        return false
      },
      ifIndia () {
        return this.$store.state.countryCode === 'in'
      },
      accountPlaceholder () {
        return 'placeholder.email'
      },
      inputClass () {
        return this.ifTelphoneNumber && this.ifIndia ? 'phone-input' : ''
      }
    },
    methods: {
      redirect () {
        const redirect = getParameterByName('redirect')
        if (redirect) {
          window.location.replace(decodeURIComponent(redirect))
        } else {
          this.$router.back()
        }
      },
      onFBLogin () {
        window.FB.login(async (response) => {
          if (response.status === 'connected') {
            const userProfile = await this.$store.dispatch('fbLogin', response)
            this.sendGAEvent('Login', 'Facebook')
            this.redirect()
            this.$toast.success(this.$i18n.t('toast.successLogin', { nickname: userProfile.nickname }))
          } else {
            this.sendGAEvent('Login', 'Facebook', 'Something went wrong! Please try again.')
            this.$toast.error(this.$i18n.t('toast.errorLogin'))
          }
        }, {
          scope: 'email, public_profile',
          return_scopes: true
        })
      },
      checkAccountInput () {
        var emailReg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/
        var telReg = /^(\d){10}$/
        if (this.ifTelphoneNumber && this.ifIndia) {
          if (telReg.test(this.username)) {
            return true
          } else {
            this.accountToastMessage = 'toast.invalidPhone'
            return false
          }
        } else {
          if (emailReg.test(this.username)) {
            return true
          } else {
            this.accountToastMessage = 'toast.invalidEmail'
            return false
          }
        }
      },
      checkPasswordInput () {
        // var pwdReg = /^(\w){6}(\w)*$/
        var pwdReg = /^(\S){1,}$/
        if (pwdReg.test(this.password)) {
          return true
        } else {
          this.passwordToastMessage = 'toast.invalidPwd'
          return false
        }
      },
      onLoginCloseClick () {
        this.$router.back()
      },
      onSignUpTabClick () {
        this.isLogin = false
      },
      onLoginTabClick () {
        this.isLogin = true
      },
      onPwdSeeClick () {
        this.isShowPassword = !this.isShowPassword
      },
      onSignupClick () {
        if (!this.checkAccountInput()) {
          this.$toast.error(this.$i18n.t(this.accountToastMessage))
          return false
        }
        if (!this.checkPasswordInput()) {
          this.$toast.error(this.$i18n.t(this.passwordToastMessage))
          return false
        }

        this.$store.dispatch('signup', {
          account: this.username,
          password: this.password,
          isSubEmail: !this.ifTelphoneNumber
        }).then(userProfile => {
          this.sendGAEvent('SignUp', this.ifTelphoneNumber ? 'Phone' : 'Username')
          this.redirect()
        }).catch(error => {
          this.sendGAEvent('SignUp', this.ifTelphoneNumber ? 'Phone' : 'Username', error)
        })
      },
      onLoginClick () {
        if (!this.checkAccountInput()) {
          this.$toast.error(this.$i18n.t(this.accountToastMessage))
          return false
        } else if (!this.checkPasswordInput()) {
          this.$toast.error(this.$i18n.t(this.passwordToastMessage))
          return false
        }

        this.$store.dispatch('login', {
          account: this.username,
          password: this.password
        }).then(userProfile => {
          this.sendGAEvent('Login', this.ifTelphoneNumber ? 'Phone' : 'Username')
          this.redirect()
        }).catch(error => {
          this.sendGAEvent('Login', this.ifTelphoneNumber ? 'Phone' : 'Username', error)
        })
      },

      sendGAEvent (type, method, error) {
        let el = ''
        if (error) {
          el = `${type} with ${method} & Failure:${error}`
        } else {
          el = `${type} with ${method} & Success`
        }
        googleAnalytics.sendEvent({
          ec: 'Member',
          ea: type,
          el: el
        })
      }
    }
  }
</script>
<style lang="scss" scoped>
  .phone-input /deep/ {
    .md-input {
      padding-left: px2rem(45) !important;
    }
    .phone-front {
      position: absolute;
      left: px2rem(5);
      border: 1px solid $dove-gray;
      bottom: px2rem(6);
      padding: px2rem(1) px2rem(2);
    }
  }

  .login-container {
    font-size: $medium;
    text-align: center;
    .btn-close {
      text-align: right;
      .iconfont {
        display: inline-block;
        padding: px2rem(10);
      }
    }
    .login-logo {
      position: relative;
      text-align: center;
      width: px2rem(90);
      height: px2rem(90);
      margin: px2rem(50) auto;
      box-shadow: 0 0 px2rem(10) px2rem(1) rgba(255, 0, 0, 0.5);
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: $flamingo;
      color: $white;
      &::after {
        content: "";
        position: absolute;
        width: px2rem(80);
        height: px2rem(80);
        border-radius: 50%;
        border: 1px solid $white;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      img {
        width: px2rem(70);
      }
    }

    .login-content {
      padding: 0 px2rem(20);
      .fb-login {
        display: flex;
        justify-content: center;
        align-items: center;
        height: px2rem(44);
        border-radius: px2rem(4);
        background: $facebook-bg-color;
        color: $white;
        .iconfont {
          font-size: $xx-large;
          margin-right: px2rem(15);
        }
      }
      .login-select-text {
        height: px2rem(22);
        line-height: px2rem(22);
        margin: px2rem(25) 0;
        color: $dusty-gray;
      }
      .btn-group {
        display: flex;
        justify-content: space-between;
        .btn-login,
        .btn-signup {
          box-sizing: content-box;
          height: px2rem(40);
          line-height: px2rem(40);
          width: px2vw(150);
          color: $dove-gray;
          border: 1px solid $dove-gray;
          border-radius: px2rem(4);
        }
      }
    }

    .login-wrap {
      padding: 0 px2rem(20);
      color: $dove-gray;
      .btn-tab {
        display: flex;
        justify-content: space-around;
        padding: 0 px2rem(30);
        height: px2rem(25);
        line-height: px2rem(25);

        .btn-login,
        .btn-signup {
          flex: 1;
          &.active {
            color: $flamingo;
          }
        }
        .tb-split {
          width: px2rem(1);
          height: 100%;
          background: $mecury;
        }
      }
      .account-login-form,
      .account-signup-form {
        position: relative;
        margin-top: px2rem(30);
        input {
          width: 100%;
          height: 100%;
        }
        .lab-forgot {
          color: $flamingo;
        }
        .btn-login,
        .btn-signup {
          height: px2rem(44);
          line-height: px2rem(44);
          background: $flamingo;
          color: $white;
          border-radius: px2rem(4);
          margin-top: px2rem(30);
        }
      }

      .split-line {
        margin-top: px2rem(20);
        font-size: 13px;
        color: #999999;
        text-align: center;
          a {
            font-size: 13px;
            color: $blue;
            text-align: center;
            line-height: 18px;
            text-decoration: underline;
          }
      }

      .fb-login {
        display: flex;
        justify-content: center;
        align-items: center;
        height: px2rem(44);
        border-radius: px2rem(4);
        background: $facebook-bg-color;
        color: $white;
        margin-top: px2rem(20);
        .iconfont {
          font-size: $xx-large;
          margin-right: px2rem(15);
        }
      }
    }
  }
</style>
