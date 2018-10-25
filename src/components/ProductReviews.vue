<template>
  <div class="panel-group">
    <div class="panel-heading">
      <p class="review-title">{{$t('reviewText.review')}}</p>
      <span class="review-rating">{{$t('reviewText.rating', {rate: rateNum})}}</span>
    </div>

    <div class="avg-rate" v-if="rateScore > 0">
      <p class="avg-score">{{rateScore}}/5.0</p>
      <star-score :score="rateScore"></star-score>
    </div>
    <section v-if="comments.length > 0">
      <review :user-name="comment.user_name" :date="comment.create_at" :sku="comment.sku" :comment="comment.comment" :score="comment.rating" :star-explain="comment.star_explain" :images="comment.images" v-for="comment in comments" :key="comment.id"></review>
      <router-link :to="{name:'reviews'}" v-if="showMore">
        <p class="foot-item">{{$t('reviewText.all')}}</p>
      </router-link>
    </section>

    <div class="panel-empty" v-else>
      {{$t('reviewText.empty')}}
    </div>
  </div>
</template>

<script>
  import Review from '@/components/Review'
  import StarScore from '@/components/common/StarScore'
  export default {
    components: {
      Review,
      StarScore
    },
    props: {
      rateScore: {
        type: Number,
        default: 0
      },
      rateNum: {
        type: Number,
        default: 0
      },
      comments: {
        type: Array,
        default: () => []
      },
      showMore: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="scss" scoped>
  .panel-group {
    background: $white;
    .panel-heading {
      background: $title-background-color;
      display: flex;
      height: px2rem(40);
      align-items: center;
      padding: 0 px2rem(15);

      .review-rating {
        font-size: $small;
        color: $dusty-gray;
        margin-left: 0.5rem;
        padding-left: 0.5rem;
        border-left: 0.1rem solid $dusty-gray;
        line-height: 1.4rem;
      }
    }
    .avg-rate {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 6.4rem;
      padding: 0 1.5rem;
      .avg-score {
        font-size: $xx-large;
      }
    }
    .foot-item {
      text-align: center;
      border-top: 1px solid $background-color;
      height: px2rem(46);
      padding: 1.3rem 0;
    }
    .panel-empty {
      padding: px2rem(15);
    }
  }
</style>

