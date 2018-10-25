<template>
  <div>
    <section ref="observer" id="download-observer"></section>
    <lazy-image :data-src="query.image" class="search-banner" v-if="query.image"></lazy-image>
    <product-list :show-corner="showCorner" :product-data="productData" @loadmore="handleLoadMore" :is-loading="isProductLoading"></product-list>
  </div>
</template>

<script>
  import ProductList from '@/components/ProductList'
  import LazyImage from '@/components/common/LazyImage'
  import {
    mapGetters,
  } from 'vuex'
  import {
    setObserver,
  } from '@/utils'
  import {
    beforeRouterLeaveMixin
  } from '@/utils/mixin'
  export default {
    components: {
      ProductList,
      LazyImage
    },
    mixins: [beforeRouterLeaveMixin],
    data () {
      return {
        searchType: this.$route.params.searchType,
        query: this.$route.query,
        productData: [],
        isProductLoading: true,
        showCorner: false,
        params: {
          limit: 20,
          offset: 0
        }
      }
    },

    async created () {
      if (this.searchType === 'theme') {
        this.params = {
          theme: this.query.search
        }
      }
      // 角标逻辑 - 打折活动期间显示
      if (this.priceOff.expire_time > 0) {
        this.showCorner = true
      }
      this.$loading.show()
      this.productData = await this.getSearchProducts()
      this.$loading.hide()
      this.$nextTick(() => {
        this.isProductLoading = false
      })
    },

    computed: {
      ...mapGetters({
        priceOff: 'priceOff',
      })
    },

    methods: {
      async handleLoadMore () {
        if (!this.isProductLoading) {
          this.isProductLoading = true
          const products = await this.getSearchProducts()
          this.productData = this.productData.concat(products)

          this.$nextTick(() => {
            this.isProductLoading = products.length === 0
          })
        }
      },
      async getSearchProducts () {
        this.params = Object.assign(this.params, {
          limit: 20,
          offset: this.productData.length
        })
        return this.$store.dispatch('searchProducts', {
          searchType: this.searchType,
          searchParams: this.params
        })
      },
      initObserver () {
        setObserver(this.$refs.observer, async entry => {
          this.$store.commit('setDownloadAppShow')
        }, { callbackCustom: true })
      }
    },

    mounted () {
      this.initObserver()
    }
  }
</script>

<style lang="scss" scoped>
  .search-banner {
    width: px2vw(375);
  }
</style>
