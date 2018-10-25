<template>
  <div class="cod-pop-modal">
    <div class="cod-pop-bg" @click="onHandleModalClose"></div>
    <div class="pop-content" :class="{show: isAnimate}">
      <p class="title">
        {{$t('other.orderConfirm')}}
        <i class="iconfont icon-guanbi_cp" @click="onHandleModalClose"></i>
      </p>

      <section class="content">
        <div class="form-group">
          <p class="label">{{$t('placeholder.mobilePhone')}}</p>
          <div class="input-group phone">
            <span class="code" v-if="phoneCode">+{{phoneCode}}</span>
            <input type="tel" v-model="phoneNumber" :maxlength="phoneLen">
          </div>
        </div>
        <div class="form-group">
          <p class="label">{{$t('placeholder.smsCode')}}</p>

          <div class="input-group verify">
            <input type="number" v-model="verifyCode" @input="onInputVerifyCode($event)">
            <md-button :text="requestText" :loading="isRequestLoading" class="md-request" :class="{'resend': !isRequestActive}" @click="onClickRequestCode"></md-button>
            <!--
            <p class="md-btn md-btn-primary md-request" :class="{'resend': !isRequestActive}" @click="onClickRequestCode">{{requestText}}</p>
            -->

          </div>
        </div>

        <div class="privacy">
          <label>
            <input type="checkbox" name="agree" v-model="agree" /> {{$t('tips.codPrivacy')}}
            <p class="agree-box" :class="{active: agree}"></p>
          </label>
        </div>
      </section>
      <p class="md-btn md-btn-primary btn-confirm" :class="{active: isConfirmActive}" @click="onClickConfirm">{{$t('button.confirm')}}</p>
    </div>
  </div>
</template>
<script>
  import Modal from '@/components/common/Modal'
  import MdButton from '@/components/common/MdButton'
  import {
    mapState
  } from 'vuex'
  export default {
    components: {
      Modal,
      MdButton
    },
    props: {
      phone: {
        type: String,
        required: true
      },
      phoneCode: {
        type: String,
        default: ''
      },
      countryCode: {
        type: String,
        required: true
      },
      orderName: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        phoneNumber: this.phone,
        phoneLen: this.phone.length,
        timer: null,
        resendInterval: 60,
        agree: true,
        verifyCode: '',
        verifyCodeLen: 6,
        isAnimate: false,
        isRequestLoading: false
      }
    },
    methods: {
      onInputVerifyCode (event) {
        this.verifyCode = event.target.value.trim().slice(0, this.verifyCodeLen)
      },
      async onClickRequestCode () {
        if (this.isRequestActive) {
          this.isRequestLoading = true
          try {
            await this.$store.dispatch('sendSmsCOD', { orderName: this.orderName, phone: this.phoneNumber, countryCode: this.countryCode })
            this.$store.commit('setSmsCodeRestTime', this.resendInterval)
          } finally {
            this.isRequestLoading = false
          }
        }
      },
      onClickConfirm () {
        if (this.isConfirmActive) {
          this.$emit('cod-confirm', {
            smsCode: this.verifyCode
          })
        }
      },
      onHandleModalClose () {
        this.isAnimate = false
        setTimeout(() => {
          this.$parent.hide()
        }, 400)
      }
    },
    computed: {
      ...mapState({
        smsCodeRestTime: 'smsCodeRestTime'
      }),
      isRequestActive () {
        return this.agree && this.smsCodeRestTime <= 0 && this.phoneNumber.trim().length === this.phoneLen
      },
      isConfirmActive () {
        return this.agree && this.verifyCode.trim().length === this.verifyCodeLen && this.phoneNumber.trim().length === this.phoneLen
      },
      requestText () {
        return this.smsCodeRestTime > 0 ? this.$i18n.t('button.resend', { restTime: this.smsCodeRestTime }) : this.$i18n.t('button.request')
      }
    },
    mounted () {
      setTimeout(() => {
        this.isAnimate = true
      }, 100)
    }
  }
</script>


<style lang="scss" scoped>
  .cod-pop-modal {
    position: fixed;
    width: 100vw;
    display: flex;
    bottom: 0;
    left: 0;
    right: 0;
    .cod-pop-bg {
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
    .pop-content {
      min-height: px2rem(300);
      flex: 1;
      display: flex;
      width: 100%;
      flex-direction: column;
      background: $white;
      transition: transform 0.4s ease-in-out;
      transform: translateY(50rem);
      align-self: flex-end;
      &.show {
        transform: translateY(0);
      }

      .title {
        height: px2rem(44);
        line-height: px2rem(44);
        text-align: center;
        position: relative;
        font-size: $x-large;
        color: $dove-gray;
        border-bottom: $border;
        .iconfont {
          position: absolute;
          right: 0.5rem;
          width: px2rem(44);
        }
      }
      .content {
        flex: 1;
        padding: px2rem(12) px2rem(30);
        .form-group {
          width: 100%;
          & + .form-group {
            margin-top: px2rem(20);
          }
          .label {
            font-size: $x-small;
            color: $mine-shaft;
          }

          input {
            height: px2rem(44);
            border-radius: 2px;
            padding-left: px2rem(10);
            flex: 1;
          }
          .input-group {
            position: relative;
            margin-top: px2rem(5);

            &.verify {
              display: flex;
              align-items: center;
              input {
                border: $border;
              }
            }
            &.phone {
              border: $border;
              display: flex;
              align-items: center;
              .code {
                padding-left: px2rem(10);
              }
            }

            .md-request {
              height: px2rem(44);
              line-height: px2rem(44);
              margin-left: px2rem(22);
              &.resend {
                background: $alabaster;
                color: $dusty-gray;
              }
            }
          }
        }
        .privacy {
          margin-top: 2rem;
          font-size: $x-small;
          color: #b5b5b5;
          line-height: 1.8rem;
          label {
            position: relative;
            display: flex;
            input[type="checkbox"] {
              width: 3.2rem;
              opacity: 0;
            }
            .agree-box {
              position: absolute;
              width: 1.5rem;
              height: 1.5rem;
              left: 0;
              top: 0;
              border-radius: 2px;
              border: 1px solid #b5b5b5;
              background: $white;
              &.active {
                border-color: $flamingo;
                &::before {
                  content: "";
                  position: absolute;
                  width: 0.3rem;
                  height: 0.8rem;
                  border: solid $flamingo;
                  border-width: 0 2px 2px 0;
                  transform: rotate(45deg);
                  left: 0.4rem;
                  top: 0.1rem;
                }
              }
            }
          }
        }
      }
      .btn-confirm {
        width: 100%;
        border-radius: 0;
        height: px2rem(46);
        line-height: px2rem(46);
        font-size: $medium;
        opacity: 0.5;
        transition: opacity 0.15s ease;
        &.active {
          opacity: 1;
        }
      }
    }
  }
</style>
