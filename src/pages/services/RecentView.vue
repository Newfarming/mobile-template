<template>
  <div v-infinite-scroll="loadMore" infinite-scroll-disabled="isLoading" infinite-scroll-distance="100">
    <router-link :to="{name: 'product', params: {productId: product.productId}}" class="recent-item" v-for="product in recentViewData" :key="product.productId">
      <div class="item-image-wrap">
        <img :src="product.imageUrl" alt="">
      </div>
      <div class="item-info">
        <p class="product-name">{{product.productNameLocal}}</p>
        <p class="product-price">
          <span class="list-price">{{symbol}} {{product.price}}</span>
          <span class="platform-price">{{symbol}} {{product.platformPrice}}</span>
        </p>
      </div>
    </router-link>
  </div>
</template>


<script>
  import infiniteScroll from 'vue-infinite-scroll'

  export default {
    async created () {
      await this.getSearchProduct()
    },
    data () {
      return {
        recentViewData: [],
        isLoading: true
      }
    },
    computed: {
      symbol () {
        return this.$store.state.symbol
      }
    },
    mounted () {
      document.body.style.height = '100vh'
    },
    beforeDestroy () {
      document.body.style.height = ''
    },
    methods: {
      async getSearchProduct () {
        this.isLoading = true
        const res = await this.$store.dispatch('searchProducts', {
          searchType: 'recent',
          searchParams: {
            limit: 20,
            offset: this.recentViewData.length
          }
        })

        this.recentViewData = this.recentViewData.concat(res)
        if (res.length === 20) {
          this.isLoading = false
        }
      },
      async loadMore () {
        await this.getSearchProduct()
      }
    },
    directives: {
      infiniteScroll
    }
  }
</script>


<style lang="scss" scoped>
  .recent-item {
    height: px2rem(80);
    display: flex;
    align-items: center;
    padding: 0 px2rem(15);
    border-bottom: $border;

    .item-image-wrap {
      width: px2rem(60);
      height: px2rem(60);
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
    .item-info {
      height: px2rem(60);
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin-left: px2rem(10);
      .product-name {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        line-height: px2rem(20);
      }
      .product-price {
        .platform-price {
          text-decoration: line-through;
          color: $dusty-gray;
          margin-left: px2rem(20);
        }
      }
    }
  }
</style>
