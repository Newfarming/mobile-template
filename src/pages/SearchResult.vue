<template>
  <product-list class="search-result" :product-data="searchProductData" @loadmore="handleLoadMore" :is-loading="isLoading"></product-list>
</template>

<script>
  import ProductList from '@/components/ProductList'
  import {
    beforeRouterLeaveMixin
  } from '@/utils/mixin'
  export default {
    components: {
      ProductList
    },
    mixins: [beforeRouterLeaveMixin],
    async created () {
      await this.handleLoadMore()
    },
    data () {
      return {
        query: this.$route.query.q,
        isLoading: false,
        searchProductData: []
      }
    },
    methods: {
      async handleLoadMore () {
        if (!this.isLoading) {
          this.isLoading = true
          const params = {
            query: this.query,
            offset: this.searchProductData.length,
            limit: 20
          }
          const products = await this.$store.dispatch('getProductSearchData', params)
          if (products.length === params.limit) {
            this.$nextTick(() => {
              this.isLoading = false
            })
          }
          this.searchProductData = this.searchProductData.concat(products)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search-result {
    background: $white;
  }
</style>

