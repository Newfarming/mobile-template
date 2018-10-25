<template>
  <div class="category">
    <div v-if="header" class="header-image">
      <img :src="header" alt="">
    </div>
    <section class="catgeory-group">
      <router-link :to="{name: 'categorySearchList', params: {categoryId: category.category_id}, query: {title: category.name}}" tag="div" class="category-item" v-for="category in categories" :key="category.category_id">
        <div class="category-img">
          <img :src="category.banner_image_url" alt="">
        </div>
        <p>{{category.name}}</p>
      </router-link>
    </section>
  </div>
</template>

<script>
  export default {
    props: {
      header: {
        type: String,
        default: ''
      },
      categories: {
        type: Array,
        default: () => {
          return []
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .category {
    .header-image {
      width: 100%;
      img {
        width: 100%;
      }
    }
    .catgeory-group {
      display: flex;
      flex-flow: row wrap;
      .category-item {
        height: px2vw(93.75);
        width: px2vw(82.5);
        display: inline-flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        font-size: $x-small;
        border: $border;
        margin-bottom: px2rem(10);
        margin-left: px2rem(4);
        .category-img {
          height: px2vw(56.25);
          img {
            max-width: 100%;
            max-height: 100%;
          }
        }
        p {
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          height: px2rem(30);
          line-height: px2rem(15);
        }
      }
    }
  }
</style>
