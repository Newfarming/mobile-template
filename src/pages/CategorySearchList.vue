<template>
  <div>
    <product-list :product-data="productData" @loadmore="handleLoadMore" :is-loading="isProductLoading"></product-list>
  </div>
</template>

<script>
  import ProductList from '@/components/ProductList'
  import {
    mapState
  } from 'vuex'
  import {
    beforeRouterLeaveMixin
  } from '@/utils/mixin'
  export default {
    components: {
      ProductList
    },
    mixins: [beforeRouterLeaveMixin],
    created () {
      this.$loading.show()
      this.$store.commit('updateCategoryActive', this.categoryId)
      // 先清空原先存的商品数据，再发送请求重新获取
      this.$store.commit('updateProductData', [])
      this.$store.dispatch('getMoreProductData')
        .then(() => {
          this.$loading.hide()
        })
    },
    data () {
      return {
        categoryId: this.$route.params.categoryId
      }
    },
    computed: mapState({
      productData: 'productData',
      isProductLoading: 'isProductLoading'
    }),
    methods: {
      handleLoadMore () {
        if (!this.isProductLoading) {
          this.$store.dispatch('getMoreProductData')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
</style>
