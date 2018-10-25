<template>

  <section class="coupon">
    <p class="coupon-tips" v-if="isAvailable">{{$t('tips.coupon')}}</p>
    <div class="coupon-item" :class="{available: isAvailable}" v-for="coupon in coupons" :key="coupon.id" @click="onCouponItemClick(coupon)">
      <div class="coupon-wrap">
        <div class="coupon-name">{{coupon.name}}</div>
        <div class="coupon-content">
          <div class="available-items">
            {{$t('other.eligibleItems')}}:
            <template v-if="coupon.products">
              <span>{{ coupon.products.join('')}}</span>
            </template>
            <template v-else>
              {{$t('tips.allCategory')}}
            </template>
          </div>
          <div class="coupon-valid-period">
            {{$t("other.period")}}: {{coupon.start_date_local}} - {{coupon.expiry_date_local}}
          </div>
          <div>
            {{$t("other.notice")}}
            <p v-for="(term, index) in coupon.terms" :key="index">{{term}}</p>
          </div>
        </div>
      </div>
      <div class="coupon-choose" v-if="canChoose">
        <i class="iconfont" :class="[chosenId === coupon.id? 'icon-xuanzhong': 'icon-xuanze']"></i>
      </div>
    </div>
  </section>
</template>
<script>
  export default {
    props: {
      coupons: {
        type: Array,
        default: () => []
      },
      isAvailable: {
        type: Boolean,
        default: false
      },
      canChoose: {
        type: Boolean,
        default: false
      },
      defaultId: {
        type: Number,
        default: 0
      }
    },
    data () {
      return {
        chosenId: this.defaultId
      }
    },
    methods: {
      onCouponItemClick (coupon) {
        if (this.canChoose) {
          this.chosenId = coupon.id
          this.$nextTick(() => {
            this.$emit('coupon-choose', coupon)
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .coupon {
    margin-top: px2rem(20);
    .coupon-tips {
      padding: 0 px2rem(15) px2rem(15);
      font-size: 12px;
      color: $dove-gray;
    }
    .coupon-item {
      &.available {
        background: #fffdf1;
        border: 1px dashed #ebe2b3;
        color: #665d2e;
      }

      .coupon-choose {
        margin-left: px2rem(10);
        .iconfont {
          &.icon-xuanzhong {
            color: $flamingo;
          }
        }
      }
      margin: 0 10px 10px;
      border: 1px dashed $icon-color;
      padding: 16px 13px;
      background: $title-background-color;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: $dove-gray;
      .coupon-wrap {
        width: 100%;
        .coupon-name {
          color: $dove-gray;
          font-size: 16px;
          margin-bottom: 8px;
        }
        .coupon-content {
          font-size: 12px;

          .available-items {
            margin-bottom: 3px;
          }

          .coupon-valid-period {
            border-bottom: 1px solid $dove-gray;
            padding-bottom: 7px;
            margin-bottom: 7px;
          }
        }
      }

      .coupon-check i {
        color: #ebe2b3;
        font-size: 24px;
      }
      .coupon-check.checked i {
        color: #d0af02;
      }

      &.available {
        background: #fffdf1;
        border: 1px dashed #ebe2b3;
        color: #665d2e;

        .coupon-name {
          color: #665d2e;
        }

        .coupon-content {
          .coupon-valid-period {
            border-bottom: 1px solid #ebe2b3;
          }
        }
      }
      &.not-yet-available {
        background: #fffdf1;
        border: 1px dashed #ebe2b3;
        color: $icon-color;

        .coupon-name {
          color: $icon-color;
        }
      }
    }
  }
</style>
