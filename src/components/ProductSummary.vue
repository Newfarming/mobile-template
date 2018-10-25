<template>
  <section class="product-summary">
    <div class="title" @click="onSummaryTitleClick">
      <p>
        <i class="iconfont icon-gouwuche"></i>
        <span>{{$t('paymentText.summary')}}</span>
      </p>
      <i class="iconfont icon-xiala" :class="{'icon-rotate': isShowSummaryProducts}"></i>
    </div>
    <transition name="fade">
      <div v-if="isShowSummaryProducts">
        <section class="product-group">
          <sku-item v-for="product in products" :key="product.skuId" :symbol="symbol" :product="product"></sku-item>
        </section>

        <div class="footer" @click="onSummaryCloseClick">
          <i class="iconfont icon-xiangshang"></i>
        </div>
      </div>
    </transition>
  </section>
</template>

<script>
  import SkuItem from '@/components/common/SkuItem'
  export default {
    components: {
      SkuItem
    },
    props: {
      products: {
        type: Array,
        default: () => {
          return []
        }
      },
      symbol: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        isShowSummaryProducts: false
      }
    },
    methods: {
      onSummaryTitleClick () {
        this.isShowSummaryProducts = !this.isShowSummaryProducts
      },
      onSummaryCloseClick () {
        this.isShowSummaryProducts = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .product-summary {
    background: $white;
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: px2rem(60);
      padding: 0 px2rem(15);
      border-bottom: $border;
      p {
        display: flex;
        align-items: center;
        .icon-gouwuche {
          font-size: $x-large;
          margin-right: px2rem(15);
        }
      }

      .icon-xiala {
        color: $dusty-gray;
      }
    }

    .footer {
      height: px2rem(44);
      line-height: px2rem(44);
      text-align: center;
      color: $dusty-gray;
    }
  }
</style>
