<template>
  <div class="coupon-container">
    <ul class="coupon-nav">
      <li @click="onCouponNavClick(couponType.name)" :class="{'active': couponType.isActive}" v-for="couponType in couponTypes" :key="couponType.value">{{couponType.title}}</li>
    </ul>
    <section class="coupon-apply">
      <md-input :name="coupon.value" v-model="coupon.value" :placeholder="coupon.placeholder"></md-input>
      <button class="md-btn md-btn-primary" @click="onApplyCouponClick">{{$t('button.apply')}}</button>
    </section>
    <coupons v-if="activeCoupons && activeCoupons.length > 0" :coupons="activeCoupons" :is-available="isAvailableGroup"></coupons>
    <section v-else class="coupon-empty">
      <i class="iconfont icon-J_Coupon"></i>
      <p>{{$t('tips.emptyCoupon')}}</p>
    </section>
  </div>
</template>
<script>
  import MdInput from '@/components/common/MdInput'
  import Coupons from '@/components/Coupons'

  export default {
    components: {
      MdInput,
      Coupons
    },
    async created () {
      await this.init()
    },
    data () {
      return {
        isAvailableGroup: true,
        activeName: 'available',
        coupon: {
          value: '',
          name: 'coupon',
          placeholder: 'placeholder.coupon'
        },
        couponTypes: [
          {
            title: 'Available',
            isActive: true,
            value: '1',
            name: 'available'
          },
          {
            title: 'Used',
            isActive: false,
            value: '3',
            name: 'used'
          },
          {
            title: 'Expired',
            isActive: false,
            value: '4',
            name: 'expired'
          }
        ],
        coupons: {},
        activeCoupons: []
      }
    },
    methods: {
      async init () {
        this.$loading.show()
        this.coupons = await this.$store.dispatch('getCoupons') || {}
        this.onCouponNavClick(this.activeName)
        this.$loading.hide()
      },
      onCouponNavClick (name) {
        this.activeName = name
        this.isAvailableGroup = name === 'available'
        this.activeCoupons = this.coupons[name]
        this.couponTypes.map(item => {
          item.isActive = item.name === name
          return item
        })
      },
      async onApplyCouponClick () {
        let couponValue = this.coupon.value.trim()
        if (couponValue) {
          this.$loading.show()
          const coupon = await this.$store.dispatch('getCoupon', couponValue)
          this.activeName = 'available'
          this.coupons[this.activeName].push(coupon)
          this.onCouponNavClick(this.activeName)
          this.coupon.value = ''
          this.$loading.hide()
          this.$toast.success(this.$i18n.t('toast.receiveCoupon'))
        } else {
          this.$toast.error(this.$i18n.t('toast.promoCodeEmpty'))
        }
      }
    }

  }
</script>

<style lang="scss" scoped>
  .coupon-container {
    .coupon-nav {
      height: px2rem(44);
      display: flex;
      justify-content: space-around;
      align-items: center;
      li {
        position: relative;
        height: 100%;
        line-height: px2rem(44);
        &.active {
          color: $flamingo;
          &::after {
            content: "";
            position: absolute;
            width: 100%;
            height: px2rem(2);
            bottom: 0;
            left: 0;
            background: $flamingo;
          }
        }
      }
    }

    .coupon-apply {
      border-top: px2rem(10) solid $background-color;
      display: flex;
      align-items: center;
      padding: 0 px2rem(15);
    }

    .coupon-empty {
      text-align: center;
      color: $icon-color;
      margin-top: px2rem(30);
      .iconfont {
        font-size: px2rem(128);
      }
      p {
        font-size: $large;
      }
    }
  }
</style>
