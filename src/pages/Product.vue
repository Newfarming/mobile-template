<template>
  <div class="product-content">
    <section ref="observer" id="download-observer"></section>
    <div id="content">
      <product-banner class="product-banner" :product-info="productInfo" :carousel-options="carouselOptions" :symbol="symbol" :images="images" :default-image="defaultImage" :is-pick="isPickProduct" :country-code="countryCode"></product-banner>
      <product-selects :arrive-days="arriveDays" :attr-names="attrNames" :is-pick="isPickProduct" :is-shipping-free="isShippingFree" @size-select="handleSizeSelect"></product-selects>
      <product-reviews class="product-reviews" :rate-score="comment.score" :rate-num="comment.num" :show-more="comment.showMore" :comments="comment.items"></product-reviews>
      <product-description class="product-description" :three-description="threeDescription" :other-description="otherDescription" :description-show="descriptionShow"></product-description>
      <product-confidence class="product-confidence" ref="confidence"></product-confidence>
      <div class="product-related">
        <p class="related-title">{{$t('productText.alsoView')}}</p>
        <product-list :product-data="relateProducts" :is-loading="true" v-if="isRelateProductShow"></product-list>
      </div>
    </div>
    <product-foot-content :cart-number="cartNumber" @add-to-cart="onAddToCart" @buy-now="onBuyNow" :show-buy-now-only="productInfo.showBuyNowOnly" :show-add-to-cart-only="isMidEast">
    </product-foot-content>
    <product-cart-modal :symbol="symbol" :sku-info="skuInfo" :product-image="images && images[0].url" :product-name="productInfo.productName" :product-price="productInfo.price" :category-ids="categoryIds" @modal-close="() => colorSizeSelectShow = false" @confirm="handlConfirm" v-if="colorSizeSelectShow"></product-cart-modal>
  </div>
</template>
<script>
  import ProductBanner from '@/components/ProductBanner'
  import ProductSelects from '@/components/ProductSelects'
  import ProductReviews from '@/components/ProductReviews'
  import ProductDescription from '@/components/ProductDescription'
  import ProductConfidence from '@/components/ProductConfidence'
  import ProductFootContent from '@/components/ProductFootContent'
  import ProductList from '@/components/ProductList'
  import {
    saveChosenProduct,
    setObserver,
    isMidEast
  } from '@/utils'

  import {
    calcShippingInfo
  } from '@/utils/common'

  import {
    mapState,
  } from 'vuex'

  import googleAnalytics from '@/setup/setup-google-analytics'
  import facebookPixel from '@/setup/setup-facebook-pixel'
  import {
    beforeRouterLeaveMixin
  } from '@/utils/mixin'
  export default {
    components: {
      ProductConfidence,
      ProductBanner,
      ProductSelects,
      ProductReviews,
      ProductDescription,
      'product-cart-modal': () => ({
        component: import('@/components/ProductCartModal')
      }),
      ProductFootContent,
      ProductList
    },
    mixins: [beforeRouterLeaveMixin],
    async created () {
      await this.initComp()
    },
    async beforeRouteUpdate (to, from, next) {
      this.$loading.show()
      document.querySelector('#content').scrollTop = 0
      // 在这里就要获取路由中的参数
      this.productId = to.params.productId
      // 先清掉图片，不然后面图片延迟了加载还会显示老的图片
      this.images = []
      await this.initComp()
      this.initObserver()
      this.$nextTick(() => {
        this.$loading.hide()
      })
      next()
    },
    data () {
      return {
        productId: this.$route.params.productId,
        productInfo: {},
        categoryIds: [],
        images: [],
        skuInfo: [],
        descriptions: [],
        threeDescription: [],
        otherDescription: [],
        attrNames: [],
        deliveryInfo: {},
        prepareInfo: {},
        comments: [],
        totalComments: 0,
        colorSizeSelectShow: false,
        descriptionShow: false,
        carouselOptions: {
          perPage: 1,
          autoplay: true,
          paginationSize: 5,
          paginationPadding: 5,
          paginationActiveColor: '$flamingo',
          paginationColor: '#ccc'
        },
        comment: {
          items: [],
          num: 0,
          score: 0,
          showMore: false
        },

        defaultImage: this.$route.params.defaultImage,
        isBuyNow: false,
        relateProducts: [],
        isRelateProductShow: false,
        isPickProduct: false
      }
    },
    computed: {
      ...mapState({
        cartNumber: 'cartNumber',
        symbol: 'symbol',
        countryCode: 'countryCode'
      }),
      isMidEast () {
        return isMidEast()
      },
      arriveDays () {
        return (this.deliveryInfo.max_days || 0) + (this.prepareInfo.max_days || 0)
      },

      productContentStyle () {
        return {
          height: `${window.innerHeight - 46 * 2}px`
        }
      },
      isShippingFree () {
        return this.countryCode === 'in'
      }

    },
    methods: {
      async initComp () {
        await this.getProductInfo()
        this.relateProducts = []
        this.$store.dispatch('getProductReview', {
          productId: this.productId,
          needAverageAndCount: true
        }).then(({ avgRating, ratingNum, reviewList }) => {
          this.comment.items = reviewList.slice(0, 3)
          this.comment.score = avgRating
          this.comment.num = ratingNum
          this.comment.showMore = reviewList.length > 3
        })

        this.$store.dispatch('saveRecentViewed', this.productId)
      },
      handleSizeSelect () {
        this.colorSizeSelectShow = true
        googleAnalytics.sendEvent({
          ec: 'Product',
          ea: 'Open Select Variations',
          el: `Open Select Variations & ${this.productInfo.productNo}`
        })
      },
      async getProductInfo () {
        this.$loading.show()
        let productInfo = await this.$store.dispatch('getProductDetail', this.productId)
        this.$loading.hide()
        this.productInfo = productInfo
        this.categoryIds = productInfo.categoryIds
        this.isPickProduct = productInfo.isPick
        this.images = productInfo.productImages
        this.skuInfo = productInfo.skuInfo
        if (this.skuInfo && this.skuInfo.length > 0) {
          let skuItem = this.skuInfo[0]
          if (skuItem) {
            this.attrNames = skuItem.attribute_info.map(item => {
              return item.attr_name
            })
          }
        }
        this.descriptions = productInfo.descriptions

        const {
          delivery_info: deliveryInfo,
          prepare_info: prepareInfo,
          shipping_costs: shippingCosts
        } = productInfo.shippingInfo
        const shippingInfo = calcShippingInfo(shippingCosts, deliveryInfo, prepareInfo)
        this.$store.commit('setShippingInfo', shippingInfo)

        this.deliveryInfo = deliveryInfo
        this.prepareInfo = prepareInfo

        if (this.descriptions.length <= 3) {
          this.threeDescription = this.descriptions
        } else {
          this.threeDescription = this.descriptions.slice(0, 3)
          this.otherDescription = this.descriptions.slice(3)
        }

        googleAnalytics.addProduct(this.productInfo)
        window.ga('ec:setAction', 'click', {
          list: 'Index'
        })
        if (isMidEast()) {
          window.ga('MidEast.ec:setAction', 'click', {
            list: 'Index'
          })
        }
        facebookPixel.productDetail({
          value: this.productInfo.priceUS,
          contentName: this.productInfo.productName,
          contentIds: [this.productInfo.productNo]
        })
      },

      handleBuyNow (skuId, quantity) {
        this.$router.push({
          name: 'payment',
          query: {
            skuId: skuId,
            quantity: quantity
          }
        })

        googleAnalytics.sendEvent({
          ec: 'Checkout',
          ea: '1 Click Order',
          el: '1 Click Order'
        })
      },
      async handleAdd2Cart (skuId, quantity, attrs) {
        await this.$store.dispatch('addCart', {
          skuId: skuId,
          addQty: quantity
        })
        this.$store.commit('setCartNumber', this.cartNumber + quantity)
        saveChosenProduct([skuId])
        this.$toast.success('Add to cart success.')
        googleAnalytics.addProduct(Object.assign({}, this.productInfo, {
          sku: attrs.join(', '),
          quantity: this.quantity
        }))
        googleAnalytics.doECAction('add')
        googleAnalytics.sendEvent({
          ec: 'Product',
          ea: 'Add product',
          el: `Add to cart & ${this.productInfo.productNo}`
        })

        facebookPixel.addToCart({
          value: this.productInfo.priceUS,
          contentName: this.productInfo.productName,
          contentIds: [this.productInfo.productNo]
        })
      },

      onAddToCart () {
        this.colorSizeSelectShow = true
        this.isBuyNow = false
      },
      onBuyNow () {
        this.colorSizeSelectShow = true
        this.isBuyNow = true
      },
      async handlConfirm ({ skuId, quantity, attrs }) {
        this.colorSizeSelectShow = false
        console.log(skuId, quantity)
        if (this.isBuyNow) {
          this.handleBuyNow(skuId, quantity)
        } else {
          await this.handleAdd2Cart(skuId, quantity, attrs)
        }
      },

      async handleRelateProducts () {
        let params = {
          product_id: this.productId,
          limit: 40,
          offset: 0
        }
        this.relateProducts = await this.$store.dispatch('searchProducts', {
          searchType: 'related',
          searchParams: params
        })
      },

      initObserver () {
        setObserver(this.$refs.observer, async entry => {
          this.$store.commit('setDownloadAppShow')
        }, { callbackCustom: true })
        setObserver(this.$refs.confidence.$el, async entry => {
          this.isRelateProductShow = true
          await this.handleRelateProducts()
        })
      }
    },

    mounted () {
      this.initObserver()
    }

  }
</script>

<style lang="scss" scoped>
  .product-content {
    #content {
      overflow: scroll;
      .product-banner {
        background: $white;
      }
      .product-reviews,
      .product-description,
      .product-confidence {
        margin-top: px2rem(10);
      }
      .product-related {
        margin-top: px2rem(10);
        background: $white;
        .related-title {
          text-align: center;
          padding-top: px2rem(10);
          color: $dusty-gray;
        }
      }
    }
    hr {
      margin: 0;
      width: 100%;
      height: px2rem(10);
      background: $background-color;
      border: none;
    }
  }
</style>
