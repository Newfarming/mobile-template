<template>
  <div class="star">
    <p class="star-state">{{stateText}}</p>
    <div class="star-group">
      <span class="star-bg">☆☆☆☆☆</span>
      <span class="star-convert" :style="{width: (score/5)*6 + 'rem'}">★★★★★</span>
    </div>
  </div>
</template>

<script>
  import {
    STAR_EXPLAIN
  } from '@/config/const-conf'
  export default {
    props: {
      score: {
        type: Number,
        required: true
      },
      starExplain: {
        type: String,
        default: ''
      }
    },
    methods: {

    },
    computed: {
      stateText () {
        return this.starExplain || STAR_EXPLAIN[Math.ceil(this.score)]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .star {
    display: flex;
    .star-state {
      font-size: $x-small;
      margin-right: 0.5rem;
    }
    .star-group {
      position: relative;
      font-size: $x-small;
      color: #ffd119;
      width: 6rem;
      line-height: 1.2rem;
      .star-convert {
        position: absolute;
        left: 0;
        top: 0;
        overflow: hidden;
      }
    }
  }
</style>

