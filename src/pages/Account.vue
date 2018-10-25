<template>
  <div class="account-container">
    <section class="account-header">
      <i class="iconfont icon-setting" @click="onSettingClick"></i>
      <span>{{$t('title.account')}}</span>
    </section>
    <section class="account-info">
      <div class="login-info" v-if="isLogin">
        <div class="login-face">
          {{(userProfile.loginEmail && userProfile.loginEmail[0]) || 'CF'}}
        </div>
        <div class="login-user">
          <p class="login-user-name">{{userProfile.nickname}}</p>
          <p class="login-user-email">{{userProfile.loginEmail}}</p>
        </div>
      </div>
      <button v-else @click="onLoginClick">{{$t('button.guest')}}</button>
    </section>

    <div class="account-bottom">
      <section class="account-group">
        <div class="group-header">
          <span>{{$t('title.orders')}}</span>
          <router-link :to="{name:'orders'}">
            {{$t('button.viewAll')}}
            <i class="iconfont icon-qianjin"></i>
          </router-link>
        </div>

        <div class="group-content group-order">
          <router-link :to="order.to" v-for="order in orders" :key="order.name">
            <i class="iconfont" :class="order.icon"></i>
            <span>{{$t(order.name)}}</span>
            <div class="count" v-if="parseInt(order.counts) > 0">{{order.counts}}</div>
          </router-link>
        </div>
      </section>

      <section class="account-group">
        <div class="group-header">
          <span>{{$t('title.service')}}</span>
        </div>

        <div class="group-content group-service">
          <router-link :to="service.to" v-for="service in services" :key="service.name" @click.native="service.callback ? service.callback() : ''">
            <i class="iconfont" :class="service.icon"></i>
            <span>{{$t(service.name)}}</span>
            <span v-if="service.notice" class="notice">{{service.notice}}</span>
          </router-link>
        </div>
      </section>

      <section class="account-group">
        <div class="group-header">
          <span>{{$t('title.setLangAndCountry')}}</span>
        </div>

        <div class="group-content group-language">
          <router-link :to="lang.to" v-for="lang in langes" :key="lang.name">
            <span>{{$t(lang.name)}}</span>
            <p class="right-arrow">
              <img :src="`/static/img/flags/${countryCode}.jpg`" alt="" v-if="lang.type === 'image'">
              <span v-else>{{lang.display}}</span>
              <i class="iconfont icon-qianjin"></i>
            </p>
          </router-link>
        </div>
      </section>
    </div>

    <chat-modal v-if="isChatModalShow" @modal-close="isChatModalShow=false"></chat-modal>
  </div>
</template>
<script>
  import {
    mapState,
    mapGetters
  } from 'vuex'
  import {
    LANGUAGE_CONF
  } from '@/config'

  import ChatModal from '@/components/modals/ChatModal'
  export default {
    components: {
      ChatModal
    },
    data () {
      return {
        isChatModalShow: false,
        orders: [
          {
            name: 'order.unpaid',
            icon: 'icon-J_Unpaid',
            to: {
              name: 'ordersUnpaid'
            },
            counts: 0
          },
          {
            name: 'order.paid',
            icon: 'icon-J_Paid',
            to: {
              name: 'ordersPaid'
            },
            counts: 0
          }
        ],
        services: [
          {
            name: 'service.recentView',
            icon: 'icon-J_Recent',
            to: {
              name: 'serviceRecentView'
            }
          },
          {
            name: 'service.coupon',
            icon: 'icon-J_Coupon',
            to: {
              name: 'serviceCoupon'
            }
          },
          {
            name: 'service.balance',
            icon: 'icon-J_Balance',
            to: {
              name: 'serviceBalance'
            }
          },

          {
            name: 'service.FindMyOrder',
            icon: 'icon-J_Orders',
            to: {
              name: 'serviceSearchOrderByPhoneAndOrderNumber'
            }
          },
          // {
          //   name: 'service.favorite',
          //   icon: 'icon-iconxinxing',
          //   to: ''
          // },
          {
            name: 'service.chat',
            icon: 'icon-J_Chat other',
            to: '',
            callback: () => {
              this.isChatModalShow = true
            }
          },
          {
            name: 'service.call',
            icon: 'icon-call other',
            to: {
              name: 'serviceCall'
            }
          },
          {
            name: 'service.faq',
            icon: 'icon-icontishiwenhao other',
            to: {
              name: 'serviceFAQ'
            }
          },
          {
            name: 'service.aboutUs',
            icon: 'icon-zhuyi other',
            to: {
              name: 'serviceAbout'
            }
          }
        ]
      }
    },
    created () {
      if (this.isLogin) {
      }
    },
    computed: {
      ...mapState({
        countryCode: 'countryCode',
        symbol: 'symbol',
        language: 'language',
        userProfile: 'userProfile'
      }),
      ...mapGetters({
        isLogin: 'isLogin'
      }),

      langes () {
        return [
          {
            name: 'lang.shipTo',
            display: this.countryCode,
            to: {
              name: 'settingCountry'
            },
            type: 'image'
          },
          // {
          //   name: 'Currency',
          //   display: this.symbol,
          //   to: ''
          // },
          {
            name: 'lang.language',
            display: (() => {
              const lang = LANGUAGE_CONF.filter(item => {
                return item.id === this.language
              })
              return (lang && lang.length > 0) ? lang[0].name : LANGUAGE_CONF[0].name
            })(),
            to: {
              name: 'settingLanguage'
            }
          }
        ]
      }
    },
    methods: {
      onSettingClick () {
        this.$router.push({
          name: 'serviceSetting'
        })
      },
      onLoginClick () {
        this.$router.push({
          name: 'login'
        })
      },
      async getPaidOrders () {
        let {
          ordersNum
        } = await this.$store.dispatch('getOrders', { orderType: 3 })

        ordersNum = Number(ordersNum) > 99 ? '99+' : ordersNum
        this.orders[1].counts = ordersNum
      },
      async getUnPaidOrders () {
        let {
          ordersNum
        } = await this.$store.dispatch('getOrders', { orderType: 2 })

        ordersNum = Number(ordersNum) > 99 ? '99+' : ordersNum
        this.orders[0].counts = ordersNum
      }
    }

  }
</script>
<style lang="scss" scoped>
  .account-container {
    background-image: linear-gradient(225deg, #f15540 0%, #e61f44 100%);
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    .account-header {
      height: px2rem(44);
      line-height: px2rem(44);
      text-align: center;
      padding: 0 px2rem(15);
      font-size: $medium;
      color: $white;
      .iconfont {
        float: left;
        font-size: $x-large;
      }
    }
    .account-info {
      min-height: px2rem(120);
      display: flex;
      justify-content: center;
      align-items: center;
      button {
        height: px2rem(40);
        line-height: px2rem(40);
        font-size: $medium;
        color: $flamingo;
        text-align: center;
        background: $white;
        border: none;
        outline: none;
        border-radius: px2rem(20);
        width: px2vw(225);
        margin-top: px2rem(-20);
      }

      .login-info {
        display: flex;
        flex-direction: row;
        flex: 1;
        margin-left: px2rem(15);
        color: $white;
        .login-face {
          width: px2rem(56);
          height: px2rem(56);
          background: $white;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: px2rem(40);
          color: $dusty-gray;
        }
        .login-user {
          padding: px2rem(10);
          .login-user-name {
            font-size: $medium;
            width: px2rem(275);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .login-user-email {
            font-size: $x-small;
            margin-top: px2rem(8);
            width: px2rem(275);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
    .account-bottom {
      background: $background-color;
      flex: 1;
      border-top-left-radius: px2rem(10);
      border-top-right-radius: px2rem(10);
      .account-group {
        background: $white;
        & + .account-group {
          margin-top: px2rem(10);
        }

        &:first-child {
          border-top-left-radius: px2rem(10);
          border-top-right-radius: px2rem(10);
        }

        .group-header {
          height: px2rem(52);
          line-height: px2rem(52);
          padding: 0 px2rem(15);
          border-bottom: $border;
          span {
            font-size: $large;
          }
          a {
            float: right;
            color: $dusty-gray;
          }
        }
        .group-content {
          clear: both;
          &.group-order {
            height: px2rem(66);
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .count {
              position: absolute;
              background-color: $flamingo;
              color: $white;
              height: px2rem(18);
              line-height: px2rem(18);
              padding: 0 px2rem(5);
              border-radius: px2rem(9);
              left: px2rem(24);
              top: px2rem(-7);
            }
            a {
              display: flex;
              flex-direction: column;
              align-items: center;
              font-size: $x-small;
              position: relative;
              margin-left: px2rem(25);
              width: px2rem(40);
              &:first-child {
                margin-left: px2rem(22);
              }
              .iconfont {
                font-size: $xx-large;
              }
            }
          }
          &.group-service {
            display: flex;
            flex-wrap: wrap;
            a {
              height: px2rem(70);
              width: px2vw(93.75);
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              font-size: $x-small;
              position: relative;
              .iconfont {
                color: $flamingo;
                font-size: $xx-large;
                &.other {
                  color: $cornflower-blue;
                }
              }
              .notice {
                position: absolute;
                bottom: px2rem(12);
                color: $flamingo;
              }
            }
          }
          &.group-language {
            display: flex;
            flex-direction: column;
            padding-left: px2rem(15);

            a {
              & + a {
                border-top: $border;
              }
              display: flex;
              height: px2rem(44);
              justify-content: space-between;
              align-items: center;
              padding-right: px2rem(15);
              .right-arrow {
                color: $dusty-gray;
                display: flex;
                align-items: center;
                img {
                  width: px2rem(30);
                  height: px2rem(20);
                }
              }
            }
          }
        }
      }
    }
  }
</style>

