<template>
  <div>
    <section class="product-list">
      <product-item :show-corner="weatherToShowCorner()" v-for="(product, index) in productData" :key="product.productId" :product="product" :symbol="symbol" :position="index"></product-item>
    </section>
    <infinite-loading force-use-infinite-wrapper="true" v-bind:distance="200" @infinite="infiniteHandler">
      <span slot="spinner">
        <span class="spinner-loading" />
      </span>
    </infinite-loading>
  </div>
</template>

<script>
  import ProductItem from '@/components/common/ProductItem'
  import InfiniteLoading from 'vue-infinite-loading'
  import googleAnalytics from '@/setup/setup-google-analytics'
  import {
    mapState
  } from 'vuex'

  export default {
    components: {
      ProductItem,
      InfiniteLoading
    },
    props: {
      productData: {
        type: Array,
        default: () => {
          return []
        }
      },
      showCorner: {
        type: Boolean,
        default: false,
      }
    },
    data () {
      return {
        isLoading: false
      }
    },
    methods: {
      infiniteHandler ($state) {
        this.$emit('loadmore')
        setTimeout(() => {
          $state.loaded()
        }, 1000)
      },
      // 角标可见性逻辑
      weatherToShowCorner () {
        return this.showCorner;
      }
    },
    directives: {
    },
    computed: mapState({
      symbol: 'symbol',
      gaProductListCount: 'gaProductListCount'
    }),
    watch: {
      gaProductListCount (value) {
        if (value % 20 === 0) {
          googleAnalytics.sendEvent({
            ec: 'Product',
            ea: 'Impression',
            el: 'Product Impression'
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .product-list {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    padding: px2vw(20) px2vw(20) px2vw(30);
    .product-item {
      margin-bottom: px2vw(10);
    }
  }
  .spinner-loading{
    position: relative;
    &:after{
      content:'';
    }
  }
</style>

