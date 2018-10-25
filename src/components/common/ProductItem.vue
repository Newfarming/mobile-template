<template>
  <router-link :to="to" class="product-item">
    <div>
      <div class="image-wrap">
        <lazy-image :data-src="product.imageUrl" :observe-callback="handleObserve"></lazy-image>
      </div>
      <section class="product-content">
        <p class="info">
          <span class="price">{{symbol}} {{product.price}}</span>
          <span class="off" v-if="product.discount > 0">{{$t('productText.discount', {discount: product.discount})}}</span>
        </p>
        <p class="platform">
          <span v-if="isExclusive">{{$t('productText.exclusive')}}</span>
          <span class="platform-price" v-else>{{symbol}}{{product.platformPrice}}</span>
          <i class="iconfont icon-dianzan" v-if="product.isPick"></i>
        </p>
      </section>
    </div>
    <img v-show="showCorner" class="item-corner" :src="cornerImg">
  </router-link>
</template>

<script>
  import LazyImage from '@/components/common/LazyImage'
  import googleAnalytics from '@/setup/setup-google-analytics'
  export default {
    components: {
      LazyImage
    },
    props: {
      product: {
        type: Object,
        default: () => {
          return {}
        }
      },
      showCorner: {
        type: Boolean,
        default: false,
      },
      symbol: {
        type: String,
        default: ''
      },
      position: {
        type: Number,
        required: true
      },
      listType: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        isExclusive: this.product.discount <= 0 || !(this.product.platformName || this.product.platformPrice),
        cornerImg: require('static/img/product/corner.png'),
      }
    },
    computed: {
      to () {
        return { name: 'product', params: { productId: this.product.productId, defaultImage: this.product.imageUrl } }
      },
    },
    methods: {
      handleObserve (entry) {
        // 商品列表曝光了就给他添加到ga列表中
        googleAnalytics.addImpression(this.product, this.position, this.listType)
        this.$store.commit('setGaProductListCount')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .product-item {
    width: px2vw(160);
    box-shadow: 0 0 2px $mecury;
    position: relative;
    .image-wrap {
      width: px2vw(160);
      height: px2vw(160);
      display: flex;
      justify-content: center;
      align-items: center;
      > img {
        max-width: 100%;
        max-height: 100%;
      }
    }
    .product-content {
      padding: px2vw(3) px2vw(5);
      p {
        padding-bottom: px2vw(3);
      }
      .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .price {
          font-size: $medium;
        }
        .off {
          font-size: $x-small;
          color: $flamingo;
        }
      }
      .platform {
        font-size: $xx-small;
        color: $dusty-gray;
        line-height: px2rem(18);
        .platform-price {
          text-decoration: line-through;
        }

        .iconfont {
          font-size: $small;
          color: #ffd800;
          float: right;
        }
      }
    }
    .item-corner {
      position: absolute;
      left: 0;
      top: 8%;
      width: 25%;
    }
  }
</style>

