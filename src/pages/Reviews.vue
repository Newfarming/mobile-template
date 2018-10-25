<template>
  <div class="product-reviews">
    <div class="review-header">
      <div class="star-info">
        <p class="star-score">{{avgRate}}/5.0</p>
        <p class="star-rate">{{$t('reviewText.rating', {rate: rateNum})}}</p>
      </div>
      <star-score :score="avgRate"></star-score>
    </div>
    <section class="review-content" v-infinite-scroll="onShowMore" infinite-scroll-disabled="isLoading" infinite-scroll-distance="100">
      <review :user-name="comment.user_name" :date="comment.create_at" :sku="comment.sku" :comment="comment.comment" :score="comment.rating" :star-explain="comment.star_explain" :images="comment.images" v-for="comment in renderReviews" :key="comment.id"></review>
      <md-loading class="loading" fill-color="#F15440" v-if="showMore"></md-loading>
      <p class="end-line" v-else>- {{$t('reviewText.noMore')}} -</p>
    </section>
  </div>
</template>

<script>
  import Review from '@/components/Review'
  import MdLoading from '@/components/common/MdLoading'
  import StarScore from '@/components/common/StarScore'
  import infiniteScroll from 'vue-infinite-scroll'
  export default {
    components: {
      Review,
      MdLoading,
      StarScore
    },
    data () {
      return {
        productId: this.$route.params.productId,
        renderReviews: [],
        showMore: false,
        avgRate: 0,
        rateNum: 0,
        offset: 0,
        isLoading: false
      }
    },
    created () {
      this.init()
    },
    mounted () {
      document.body.style.height = '100vh'
    },
    beforeDestroy () {
      document.body.style.height = ''
    },
    methods: {
      async init () {
        if (!this.isLoading) {
          this.isLoading = true
          this.$loading.show()
          const { avgRating, ratingNum, reviewList } = await this.$store.dispatch('getProductReview', {
            productId: this.productId,
            rankType: 'time',
            needAverageAndCount: this.offset === 0,
            offset: this.offset
          })
          this.$loading.hide()

          this.showMore = reviewList.length > 0
          if (this.showMore) {
            if (this.offset === 0) {
              this.avgRate = avgRating
              this.rateNum = ratingNum
            }

            this.renderReviews = this.renderReviews.concat(reviewList)
            this.isLoading = false
            this.offset += 20
          }
        }
      },
      onShowMore () {
        this.init()
      }
    },
    directives: {
      infiniteScroll
    }

  }
</script>

<style lang="scss" scoped>
  .product-reviews {
    .review-header {
      display: flex;
      justify-content: space-between;
      height: 8.8rem;
      align-items: center;
      padding: 0 1.5rem;

      .star-info {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-right: $border;
        padding-right: 2rem;

        .star-score {
          font-size: $size36;
          color: $mine-shaft;
        }
        .star-rate {
          font-size: $x-small;
          color: $dusty-gray;
        }
      }
    }
    .review-content {
      background: $white;
      margin: 0;
      border-radius: 0;
      border: 0;
      .loading {
        display: block;
      }
      .end-line {
        height: 4.4rem;
        line-height: 4.4rem;
        background: $background-color;
        text-align: center;
        color: $dusty-gray;
      }
    }
  }
</style>

