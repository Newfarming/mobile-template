<template>
  <div class="mainContainer">
      <div class="OTDNotice">
        <div class="noticeIcon">
            <div class="iconContainer iconfont icon-J_About"></div>
            <div class="noticeTitle">Beware of Scams</div>
        </div>
        <div class="noticeContainer">
            <div class="iconContainer"></div>
            <div class="noticeContent">Don't disclose your OTP to other people. Club Factory will not ask for your OTP in any way.</div>
        </div>
      </div>
      <div class="line"></div>
      <div class="orderAndPhone">
          <form>
            <md-input type='text' name='orderNumber' v-model='orderNumber' placeholder="Order Number">
            </md-input>
            <p class="orderRemind">Find your order number in the confirmation email</p>
              <div class="phoneNumber">
                <router-link :to="{name:'settingCountryCode'}">
                  <div class="ITAC">
                    <span>+</span>
                    <span>{{ITAC.phonePrefix}}</span>
                    <span class="selectTriangle" ></span><span>|</span>
                  </div>
                </router-link>
                <md-input type='number' name='phoneNumber' v-model='phoneNumber' placeholder="Phone Number"></md-input>
              </div>
            
            
            <md-input type='number' name='verificationCode' v-model='verificationCode' placeholder="Verification Code">
              <span v-show="!sendingVCode">
                <span v-show="!testing" class="sendVerificationCode" @click="sendVerificationCode">{{Send}}</span>
                <span v-show="testing" class="sendingVCode" >Sending...</span>
              </span>
              
              <span v-show="sendingVCode" class="sendingVCode" @click="sendVerificationCodeNotice">{{vCodeCountdown}}s</span>
            </md-input>
            
            <div class="findOrder" @click="findOrder">Find My Order</div>
          </form>
          
      </div>

      <footer class="checkOnNative" @click="onClickDownloadApp">
        <img src="/static/img/app/app_icon.png" alt="">
        <div class="app-tips">
          <p class="tips-one">Download Our App for Easy Return</p>
          <p class="tips-two">My Center>Find My Order>Apply for Return</p>
        </div>
        <div class="btn-view">
          <div>></div>
        </div>
      </footer>
  </div>
</template>

<script>
import MdInput from '@/components/common/MdInput'
import { openNativeApp } from '@/utils'
import { mapState } from 'vuex'
import { countries } from '@/config'
import googleAnalytics from '@/setup/setup-google-analytics'

const vCodeCount = 30
export default {
  components: {
    MdInput
  },
  created () {
    let country = countries.filter(function (item) {
      return item.code === localStorage.getItem('country_code')
    })
    if (this.$store.state.phoneCountry === null) {
      this.$store.state.phoneCountry = country[0]
    }
  },
  data () {
    return {
      orderNumber: '',
      ITAC: this.$store.state.phoneCountry,
      phoneNumber: '',
      verificationCode: '',
      sendingVCode: false,
      testing: false,
      vCodeCountdown: '',
      vCodeTimer: null,
      Send: 'Send'
    }
  },
  methods: {
    verificationSendVCode () {
      let orderTest = /^SO[0-9]+$/i
      if (!orderTest.test(this.orderNumber)) {
        this.$toast.error('Please enter a vaild order number')
        return false
      }
      if (this.ITAC.phonePrefix === 0) {
        this.$toast.error('Please Select an Area Code')
        return false
      }
      if (this.phoneNumber.length === 0) {
        this.$toast.error(`Please enter a vaild phone number`)
        return false
      }
      return true
    },
    verificationSendInquire () {
      if (!this.verificationSendVCode()) {
        return false
      }
      if (this.verificationCode.length !== 6) {
        this.$toast.error('Please enter a vaild verificaiton code')
        return false
      }
      return true
    },
    sendVerificationCode () {
      if (!this.verificationSendVCode()) {
        return false
      }
      this.testing = true
      this.Send = 'Resend'
      this.$store.dispatch('getVCodeForInquiryOrderNumber', {
        order_name: this.orderNumber.toUpperCase(),
        phoneNumber: this.phoneNumber,
        country_code: this.ITAC.code
      }).then(result => {
        this.testing = false
        this.vCodeCountdown = vCodeCount
        this.sendingVCode = true
        this.vCodeTimer = setInterval(() => {
          if (this.vCodeCountdown > 1 && this.vCodeCountdown <= vCodeCount) {
            this.vCodeCountdown--
          } else {
            this.sendingVCode = false
            clearInterval(this.vCodeTimer)
            this.vCodeTimer = null
          }
        }, 1000)
      }).catch(res => {
        this.testing = false
      })
    },
    sendVerificationCodeNotice () {
      this.$toast.error(`We have sent a verification code to ${this.vCodeCountdown} . This code will expire in 10 minutes`)
    },
    findOrder () {
      if (!this.verificationSendInquire()) {
        return false
      }
      // ga 打点
      googleAnalytics.sendEvent({
        ec: 'Find My Order',
        ea: 'Click Find My Order',
        el: `Click Find My Order`
      })
      const orderNum = this.orderNumber
      this.$store.dispatch('getOrderForInquiryOrderNumber', {
        order_name: this.orderNumber.toUpperCase(),
        phoneNumber: this.phoneNumber,
        country_code: this.ITAC.code,
        verificationCode: this.verificationCode
      }).then(result => {
        this.$router.push({
          name: 'orderDetail',
          params: {
            orderId: `${orderNum}?token=${result.token}`
          }
        })
      })
    },
    onClickDownloadApp () {
      openNativeApp()
    }
  },
  computed: mapState({
    countryCode: state => state.countryCode
  })
}
</script>


<style lang="scss" scoped>
  .OTDNotice{
      $titleColor:#FF0037;
      background-color: #FFF9F8;
      padding: px2rem(10) 0;
      > div{
          display: flex;
      }
      $leftIconFlex:0.1;
      $rightContainerFlex:0.9;
      .noticeIcon{
          .iconContainer{
              color: $titleColor;
              flex:$leftIconFlex;
              
              display: flex;
              justify-content: center;
              align-items: center;
          }
          .noticeTitle{
              color: $titleColor;
              flex:$rightContainerFlex
          }
      }

      .noticeContainer{
         .iconContainer{
              flex:$leftIconFlex
          }
          .noticeContent{
              flex:$rightContainerFlex
          }
      }
      
  }
  .line{
      height: px2rem(10);
      background-color: #f2f2f2
  }
  .orderAndPhone{
    margin: px2rem(30) px2rem(35);
    .orderRemind{
      font-size: px2rem(12);
      margin-top: px2rem(4);
      color: #CCCCCC;  
    }
    .phoneNumber{
      display: flex;
      align-items: flex-end;
      margin:px2rem(5) 0;
      .ITAC{
        display: flex;
        flex-direction: row;
        padding-bottom: px2rem(10);
        padding-right:px2rem(10); 
        > input{
          width: px2rem(20);
        }
        .selectTriangle{
          margin: 0 px2rem(8);
          display: inline-block;
          position: relative;
          top: px2rem(5);
          height: 0;
          width: 0;
          border:px2rem(4) solid transparent;
          border-top-color: black;
        }
      }
    }
    .sendVerificationCode{
        color: #FF0037
    }
    .sendingVCode{
        color: #F9A196
    }
    .findOrder{
        background-image: linear-gradient(-90deg, #F15540 0%, #E61F44 100%);
        height: px2rem(44);
        margin-top: px2rem(54);
        border-radius: px2rem(4);
        text-align: center;
        line-height: px2rem(44);
        color: white;
        font-size: px2rem(16);
        font-family: PingFangSC-Regular;
    }
  }
  .checkOnNative{
    display: flex;
    bottom: 0;
    height: px2rem(50);
    text-decoration: none;
    justify-content: space-between;
    align-items: center;
    color: $white;
    background-color: #4c4c4c;
    padding-left: px2rem(10);
    transition: height 0.2s ease-in-out;
    overflow: hidden;

    &.hide {
      height: 0;
    }
    > img {
      width: px2rem(35);
      height: px2rem(35);
    }

    .app-tips {
      margin: px2rem(2) px2rem(10);
      .tips-two {
        font-size: $x-small;
        color: $mecury;
        margin-top: px2rem(2);
      }
    }

    .btn-view {
      width: px2rem(40);
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      > div{
        background-color: white;
        color: black;
        border-radius: 50%;
        height: px2rem(20);
        width: px2rem(20);
        text-align: center;
        line-height: px2rem(19);
      }
    }
  }
</style>
