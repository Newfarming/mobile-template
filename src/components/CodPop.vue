<template>
  <modal :title="false" @modal-close="onHandleModalClose" :static="true" class="cod-pop-container">
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
            <p class="md-btn md-btn-primary md-request" :class="{'resend': !isRequestActive}" @click="onClickRequestCode">{{requestText}}</p>
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
  </modal>
</template>
<script>
  import Modal from '@/components/common/Modal'
  export default {
    components: {
      Modal
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
      },
      restTime: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        // requestText: 'Request',
        phoneNumber: this.phone,
        phoneLen: this.phone.length,
        timer: null,
        resendInterval: 60,
        agree: true,
        verifyCode: '',
        verifyCodeLen: 6,
        isAnimate: false
      }
    },
    methods: {

      onInputVerifyCode (event) {
        this.verifyCode = event.target.value.trim().slice(0, this.verifyCodeLen)
      },
      onClickRequestCode () {
        if (this.isRequestActive) {
          this.$emit('send-sms-code')
          this.$store.dispatch('sendSmsCOD', { orderName: this.orderName, phone: this.phoneNumber, countryCode: this.countryCode })
        }
      },
      onClickConfirm () {
        if (this.isConfirmActive) {
          this.$emit('cod-confirm', {
            smsCode: this.verifyCode,
            phone: this.phoneNumber,
            countryCode: this.countryCode
          })
        }
      },
      onHandleModalClose () {
        this.isAnimate = false
        setTimeout(() => {
          this.$emit('modal-close')
        }, 400)
      }
    },
    computed: {
      isRequestActive () {
        return this.agree && this.restTime <= 0 && this.phoneNumber.trim().length === this.phoneLen
      },
      isConfirmActive () {
        return this.agree && this.verifyCode.trim().length === this.verifyCodeLen && this.phoneNumber.trim().length === this.phoneLen
      },
      requestText () {
        return this.restTime > 0 ? `Resend(${this.restTime}s)` : 'Request'
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
  .cod-pop-container /deep/ {
    padding: 0 !important;
    .modal-content {
      margin: 0 !important;
      border-radius: 0 !important;
      background: transparent !important;
      position: absolute;
      bottom: 0;
      min-height: px2rem(300);
      width: 100%;
      display: flex;
      flex-direction: column;

      .pop-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        background: $white;
        transition: transform 0.4s ease-in-out;
        transform: translateY(50rem);
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
                min-width: px2rem(120);
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
  }
</style>
