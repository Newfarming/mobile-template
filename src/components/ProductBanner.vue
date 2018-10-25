<template>
  <div class="product-banner">
    <!-- 轮播图 -->
    <div class="product-swipe">
      <swipe ref="swipe" :swipe="swipe" v-if="images && images.length > 0">
        <div v-for="(img, index) in images" :key="index" class="swipe-item">
          <lazy-image :data-src="img.url" :index="index" :default-img="defaultImage"></lazy-image>
        </div>
      </swipe>
    </div>
    <!-- 活动倒计时 -->
    <div v-show="showPriceOff" class="priceoff-timer timer-background">
      <div class="price">
        <span class="price-currency">{{symbol}}</span>
        <span class="price-number-integer"
        >{{priceInteger}}</span><span class="price-number-fraction"
        >{{priceFractional}}</span>
      </div>
      <div class="timer">
        <div v-if="showBackTo" class="info"> <!-- 恢复价格文案 -->
          Back to {{symbol}}{{originPrice}}
        </div>
        <div v-else class="info">
          Price will be dropped to {{symbol}}{{originPrice}} <!-- 打折倒计时 -->
        </div>
        <counter-timer :deadline="priceOff.expire_time" v-on:timeClear="timeClear" ref="childtimer" /> {{ showBackTo ? 'in' : 'Starts in' }}
      </div>
      <div class="more" @click="onThemeClick()">
        <i class="iconfont icon-qianjin"></i>
      </div>
    </div>
    <!-- 产品名 -->
    <div class="product-title">
      <h6 itemprop="name">
        {{productInfo.productName}}
      </h6>
    </div>
    <!-- 编号 -->
    <div class="product-info">
      <span class="product-no ">
        {{$t('productText.itemNo')}} {{productInfo.productNo}}
      </span>
      <i class="iconfont icon-dianzan product-icon " v-if="isPick"></i>
    </div>
    <!-- 打折力度与出售数量 -->
    <div class="product-quick-info">
      <div>
        <div v-if="countryCode === 'in'" class="box-price in-box-price">
          <span class="price-currency">
            {{symbol}}
          </span>
          <span class="price-number">{{productInfo.price | money}}</span>
        </div>
        <div v-else class="box-price">
          <span class="price-number">{{productInfo.price | money}}</span>
          <br>
          <span class="price-currency">
            {{symbol}}
          </span>
        </div>
        <div class="circle-group">
          <div class="circle-red" v-if="productInfo.discount > 0" v-html="$t('productText.off', {discount: productInfo.discount})">
          </div>
          <div class="circle-blue" v-if="productInfo.orders > 0" v-html="$t('productText.sold', {orders: productInfo.orders})">
          </div>
        </div>
      </div>
      <div v-if="productInfo.isTaxInclude" class="tax-included">
        Tax Included
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters, mapState } from 'vuex'
  import numeral from 'numeral'
  import { isFinite } from 'lodash-es'
  import Swipe from '@/components/common/Swipe'
  import LazyImage from '@/components/common/LazyImage'
  import CounterTimer from '@/components/CounterTimer'
  export default {
    components: {
      Swipe,
      LazyImage,
      CounterTimer,
    },
    props: ['images', 'productInfo', 'symbol', 'defaultImage', 'isPick', 'countryCode'],
    async created () {
      // 只有印度有大促活动
      if (this.countryCode === 'in') {
        await this.$store.dispatch('getThemes')
      }
    },
    data () {
      return {
        clear: false
      }
    },

    methods: {
      timeClear () {
        this.clear = true
      },
      async onThemeClick () {
        const linkto = this.priceOff?.link
        if (linkto) {
          window.location.href = linkto
          return
        }
        const banner = this.banners[0];
        banner && this.$router.push({
          name: 'searchResult',
          params: {
            searchType: banner.searchType
          },
          query: {
            search: banner.searchKey,
            image: banner.imageUrl
          }
        })
      },
    },
    computed: {
      to () {
        // TODO: 活动页
        return {
          name: 'home',
        }
      },
      swipe () {
        return {
          activeIndex: 0,
          count: this.images.length,
        }
      },
      showPriceOff () {
        if (this.priceOff?.expire_time > 0 && this.$refs?.childtimer) {
          this.$refs.childtimer.timeStart();
        }
        return this.productInfo?.priceOff?.origin_price > 0 && !this.clear
      },
      showBackTo () {
        return this.productInfo?.priceOff?.price_back
      },
      priceInteger () {
        const price = Math.trunc(this.productInfo.price)
        if (isFinite(price)) {
          return price
        }
        return '--'
      },
      priceFractional () {
        const price = this.productInfo.price
        if (isFinite(price)) {
          return numeral(price).format('.00')
        }
        return '--'
      },
      originPrice () {
        const originPrice = this.productInfo?.priceOff?.origin_price
        if (isFinite(originPrice)) {
          return numeral(originPrice).format('0.00')
        }
        return '--'
      },
      ...mapGetters({
        priceOff: 'priceOff',
      }),
      ...mapState({
        banners: 'banners',
      }),
    },
    beforeUpdate () {
      if (this.$refs.swipe) {
        this.$refs.swipe.init()
      }
    },
  }
</script>

<style lang="scss" scoped>
  .product-banner {
    .product-info {
      font-size: px2rem(12);
      text-align: center;
      background: $white;
      padding-top: px2rem(10);
      .product-no {
        padding: px2rem(3) px2rem(10);
        background: #fbfbfb;
        border-radius: px2rem(3);
        color: $dove-gray;
      }
      .product-icon {
        color: #ffd800;
        font-size: px2rem(16);
        margin-left: px2rem(4);
      }
    }
    .product-swipe {
      height: 100vw;
      min-height: 100vw;
      .swipe {
        height: 100%;
      }
    }
    .priceoff-timer {
      width: 100vw;
      height: 10vh;
      display: flex;
      align-items: center;
      padding: 0 1.3rem;

      .price {
        flex: 2;
        color: white;
        white-space: nowrap;
        .price-currency {
          font-size: 2.5vh;
        }
        .price-number-integer {
          font-size: 5vh;
        }
        .price-number-fraction {
          font-size: 2vh;
        }
      }
      .timer {
        flex: 4;
        direction: rtl;
        position: relative;
        padding-top: 2rem;
        @media (max-width: 350px) {
          padding-top: 1.2rem;
        }
        .info {
          font-size: 1.2rem;
          color: #fff;
          white-space: nowrap;
          height: 2rem;
          line-height: 2rem;
          @media (max-width: 350px) {
            height: 1.2rem;
            line-height: 1.2rem;
          }
          width:10rem;
          text-align: left;
          position:absolute;
          top: 0;
          right:0;
          font-size: 1.2rem;
          transform: scale(0.9);
        }
        * {
          direction: ltr;
        }
      }
      .more {
        flex: 1.5;
        color: #fff;
        direction: rtl;
        * {
          direction: ltr;
        }
        .iconfont {
          font-weight: bold;
        }
      }
    }
    .product-title {
      background: $white;
      text-align: center;
      font-family: Arial;
      position: relative;
      color: $mine-shaft;
      padding: px2rem(27) px2rem(16) 0 px2rem(16) !important;
      h6 {
        margin: 0;
        font-size: px2rem(16);
        line-height: px2rem(22);
      }
    }
    .product-quick-info {
      position: relative;
      width: 100%;
      padding: 0;
      padding-bottom: px2rem(15);
      text-align: center;
      background: $white;
      .box-price {
        position: relative;
        padding-left: px2rem(8);
        top: px2rem(12);
        display: inline-block;
        text-align: center;
        color: $flamingo;
        &.in-box-price {
          top: 0;
          .price-currency {
            line-height: px2rem(25);
            font-size: px2rem(24);
          }
        }
        .price-number {
          position: relative;
          font-size: px2rem(24);
          line-height: px2rem(24);
        }
        .price-currency {
          vertical-align: top;
          line-height: px2rem(14);
        }
      }
      .circle-group {
        top: px2rem(8);
        position: relative;
        display: inline-table;
        border-collapse: separate;
        border-spacing: px2rem(8);
        .circle-blue {
          position: relative;
          width: px2rem(50);
          height: px2rem(50);
          vertical-align: middle;
          display: table-cell;
          text-align: center;
          border-radius: 50%;
          font-size: px2rem(14);
          line-height: px2rem(14);
          padding: px2rem(6);
          border: 1px solid #40a7f1;
          color: #40a7f1;
        }
        .circle-red {
          position: relative;
          width: px2rem(50);
          height: px2rem(50);
          vertical-align: middle;
          display: table-cell;
          text-align: center;
          border-radius: 50%;
          border: 1px solid $flamingo;
          font-size: px2rem(14);
          color: $flamingo;
          line-height: px2rem(14);
        }
      }
      .tax-included {
        background: #F6A79D;
        color: #fff;
        font-size: px2rem(14);
        border-radius: 5px;
        text-align: center;
        width: px2rem(180);
        margin: 0 auto;
        line-height: px2rem(25);
        margin-top: px2rem(10);
      }
    }
  }
</style>
