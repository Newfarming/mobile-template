<template>
  <div class="review">
    <div class="user-info">
      <div>
        <p class="header">{{userName[0]}}</p>
        <span class="name">{{userName}}</span>
      </div>
      <star-score :score="score" :star-explain="starExplain"></star-score>
    </div>

    <p class="product-info">
      <span class="review-time">{{date}}</span>
      <span class="sku">{{sku}}</span>
    </p>

    <div class="description">
      <p>{{comment}}</p>
      <div v-if="images.length > 0" class="image-group">
        <div class="review-image" v-for="(url, index) in images" :data-index="index" v-bind:key="index">
          <img @click="open($event)" v-bind:src="add_size(url)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import StarScore from '@/components/common/StarScore'

  import fancyBox from '@/components/common/vue-fancybox'

  export default {
    components: {
      StarScore
    },
    props: {
      userName: {
        type: String,
        default: ''
      },
      date: {
        type: String,
        default: ''
      },
      sku: {
        type: String,
        default: ''
      },
      comment: {
        type: String,
        default: ''
      },
      score: {
        type: Number,
        default: ''
      },
      images: {
        type: Array,
        default: () => []
      },
      starExplain: {
        type: String,
        default: ''
      }
    },
    methods: {
      open (e) {
        const imgs = this.images.map(item => {
          const width = window.innerWidth
          const height = window.innerHeight
          const url = this.add_size(item)
          return {url, width, height}
        })
        fancyBox(e.target, imgs)
      },
      add_size (url) {
        const urls = url.split('.')
        const suffix = urls.pop()
        return urls.join('.') + '_500x500.' + suffix
      }
    }
  }
</script>

<style lang="scss" scoped>
  .review {
    color: $dusty-gray;
    font-size: $small;
    border-top: $border;
    padding: 0.5rem 1.5rem 1rem 1.5rem;
    position: relative;

    .user-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 4.4rem;
      .name {
        font-size: $medium;
        color: $mine-shaft;
        font-weight: bold;
        margin-bottom: px2rem(2);
      }
      .header {
        display: inline-block;
        width: 2.6rem;
        height: 2.6rem;
        line-height: 2.6rem;
        text-align: center;
        background: #f9a196;
        border-radius: 50%;
        color: $white;
      }
    }
    .product-info {
      font-size: $x-small;
      .sku {
        margin-left: 1.5rem;
      }
    }

    .description {
      margin-top: px2rem(7);
      color: $dove-gray;
      .image-group {
        display: flex;
        align-items: center;
        margin-top: 1rem;
        flex-flow: row wrap;
        .review-image {
          width: 11.2rem;
          height: 11.2rem;
          margin-right: 0.2rem;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          img {
            max-width: 100%;
            max-height: 100%;
          }
        }
      }
    }
  }
</style>

