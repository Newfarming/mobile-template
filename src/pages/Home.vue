<template>

  <div class="home" id="home">
    <transition name="fade">
      <gender-choose @modal-close="handleModalClose" v-if="isShowGenderChoose"></gender-choose>
    </transition>

    <div class="banner-container" v-if="this.currentCategoryId === 0">

      <!-- 1. 如果单张的banner，不使用轮播 -->
      <section class="activity themes" v-if='banners.length === 1'>
        <img :src="banner.imageUrl" alt="" @click="onBannerClickDelegate(banner)">
      </section>

      <!-- 2. 如果多张的banner，使用轮播 -->
      <swipe class="banner" :swipe="swipe" v-else>
        <div class="swipe-item" v-for="(banner, index) in banners" :key="index">
          <img :src="banner.imageUrl" alt="" @click="onBannerClickDelegate(banner)">
        </div>
      </swipe>
    </div>

    <section ref="observer" id="download-observer"></section>

    <!-- 子Banner -->
    <div class="banner-container" v-if="this.currentCategoryId === 0">
      <section class="activity" v-if="subbanner.imageUrl">
        <img :src="subbanner.imageUrl" alt="" @click="onSubBannerClickDelegate">
      </section>
    </div>

    <confirm message='Open "Club Factory" in App?' @choose="onHandleChoose" v-if="isShowOpenApp"></confirm>
    <product-list :product-data="productData" @loadmore="handleLoadMore" :is-loading="isProductLoading"></product-list>
  </div>
</template>

<script>
  import ProductList from '@/components/ProductList'
  import Swipe from '@/components/common/Swipe'
  import Confirm from '@/components/modals/Confirm'
  import {
    mapState,
    mapGetters
  } from 'vuex'
  import {
    setObserver,
    openNativeApp,
    directOpenApp
  } from '@/utils'

  import {
    urlSearch
  } from '@/utils/common'

  import {
    beforeRouterLeaveMixin
  } from '@/utils/mixin'
  import activity from '@/assets/activity/banner.jpg'
  import ucTheme from '@/assets/activity/m_banner_uc.jpg'
  import promotionTheme from '@/assets/activity/promotion.jpg'
  import mideastBanner from '@/assets/activity/mideast_banner.jpg'
  export default {
    components: {
      ProductList,
      Swipe,
      Confirm,
      'gender-choose': () => ({
        component: import('@/components/GenderChoose')
      })
    },

    mixins: [beforeRouterLeaveMixin],
    async created () {
      this.$loading.show()
      const params = urlSearch()
      if ((params['utm_medium'] === 'masthead' || (params['utm_medium'] && params['utm_medium'][0] === 'masthead')) && params['ulink'] !== 'abc') {
        this.isShowOpenApp = true
      }
      this.$store.dispatch('getThemes')
      const categoryId = this.$route.query.categoryId
      if (categoryId) {
        await this.$store.dispatch('getCategories')
        this.$store.commit('setActiveCategory', Number(categoryId))
      } else {
        this.$store.dispatch('getCategories')
      }
      await this.$store.dispatch('getHomeFirstData')
      this.$loading.hide()
    },

    data () {
      return {
        isShowGenderChoose: false,
        isActived: false,
        activity: activity,
        mideastBanner: mideastBanner,
        isShowOpenApp: false,
        ucTheme,
        promotionTheme,
      }
    },

    methods: {
      handleLoadMore () {
        if (!this.isProductLoading && this.isActived) {
          this.$store.dispatch('getMoreProductData')
        }
      },

      handleModalClose () {
        this.isShowGenderChoose = false
      },

      // 首Banner点击逻辑
      onBannerClickDelegate (banner) {
        // 1. 活动banner传递onclick函数
        if (banner.onclick) {
          return onclick()
        }
        // 2. 默认轮播图的跳转逻辑
        if (banner.link) {
          window.location.href = banner.link
        } else {
          this.$router.push({
            name: 'searchResult',
            params: {
              searchType: banner.searchType
            },
            query: {
              search: banner.searchKey,
              image: banner.imageUrl
            }
          })
        }
      },

      // 子Banner点击逻辑
      onSubBannerClickDelegate (banner) {
        const linkto = this.priceOff?.link
        if (linkto) {
          window.location.href = linkto
        }
      },

      initObserver () {
        setObserver(this.$refs.observer, async entry => {
          this.$store.commit('setDownloadAppShow')
        }, { callbackCustom: true })
      },

      onClickDownloadApp () {
        openNativeApp()
      },

      onHandleChoose (result) {
        if (result) {
          directOpenApp()
        }
        this.isShowOpenApp = false
      }
    },

    computed: {
      ...mapState({
        countryCode: 'countryCode',
        productData: 'productData',
        banners: 'banners',
        isProductLoading: 'isProductLoading',
        gender: 'gender',
        isShowSearchBox: 'isShowSearchBox',
        isShowCountryBox: 'isShowCountryBox',
        currentCategoryId: 'currentCategoryId',
        gaProductListCount: 'gaProductListCount',
        homePosition: 'homePosition',
        themes: 'themes'

      }),

      ...mapGetters({
        amountOff: 'amountOff',
        priceOff: 'priceOff',
        promotion: 'promotion',
        blankTime: 'blankTime',
        couponTheme: 'couponTheme',
        midEastPromotion: 'midEastPromotion'
      }),

      banner () {
        // 预热期
        if (this.promotion.expire_time > 0) {
          return {
            imageUrl: promotionTheme,
            onclick: () => {},
          }
        }
        // 中东大促
        if (this.midEastPromotion && this.midEastPromotion.expire_time > 0 && this.countryCode === 'sa') {
          return {
            imageUrl: mideastBanner,
            onclick: () => {
              openNativeApp()
            },
          }
        }
        // UC推广
        if (this.couponTheme?.expire_time > 0) {
          return {
            imageUrl: ucTheme,
            onclick: () => {
              this.$router.push({
                name: 'coupons',
                query: {
                  title: 'Special Benefit'
                }
              })
            },
          }
        }
        // 单张banner
        if (this.banners.length === 1) {
          return this.banners[0] || {}
        }

        return {}
      },

      // NOTICE: 子Banner图片, 后端现在暂时约定从打折信息的link字段中取
      subbanner () {
        return {
          imageUrl: this.priceOff?.img_src
        }
      },

      swipe () {
        return {
          activeIndex: 0,
          autoplay: 3500,
          count: this.banners.length
        }
      },
    },

    mounted () {
      if (!this.gender) {
        setTimeout(() => {
          this.isShowGenderChoose = true
        }, 3000)
      }
      this.initObserver()
    },

    activated () {
      this.isActived = true
      // 恢复用户的位置
      const $main = document.querySelector('#main')
      if ($main) {
        window.scrollTo(0, this.homePosition.y)
      }
    },

    deactivated () {
      this.isActived = false
    },

    beforeRouteLeave (to, from, next) {
      // home页离开的时候先保存了用户的位置，之后再进来的时候重新设置位置信息
      const position = {
        x: 0,
        y: document.querySelector('#main').scrollTop
      }
      this.$store.commit('setHomePosition', position)

      if (this.isShowSearchBox) {
        this.$store.commit('updateSearchBox')
        next(false)
      } else if (this.isShowCountryBox) {
        this.$store.commit('updateCountryBox')
        next(false)
      } else {
        next()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .banner-container {
    width: 100%;
  }
  .activity {
    width: 100%;
    img {
      max-width: 100%;
      display: block;
    }
  }
  #download-observer {
    width: 100%;
    height: 0;
  }
  .block {
    height: px2rem(40);
  }
</style>
