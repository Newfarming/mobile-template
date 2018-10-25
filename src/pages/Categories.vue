<template>
  <div class="category">
    <section class="category-header">
      <input type="text" placeholder="What are you looking for?" @click="onSearchInputClick">
      <i class="iconfont icon-sousuo"></i>
    </section>
    <section class="category-content">
      <ul class="category-nav">
        <li v-for="topCategory in topCategoriesData" :key="topCategory.id" @click="onTopCategoryClick(topCategory)" :class="{'active': topCategory.isActive}">
          <a>{{topCategory.name}}</a>
        </li>
      </ul>
      <category class="category-detail" :categories="subCategoriesData" :header="headerImage"></category>
    </section>
  </div>
</template>

<script>
  import {
    mapState,
    mapGetters
  } from 'vuex'
  import Category from '@/components/Category'
  export default {
    components: {
      Category
    },
    created () {
      this.$store.dispatch('getCategories')
    },
    data () {
      return {
        headerImage: ''
      }
    },
    methods: {
      onSearchInputClick () {
        this.$store.commit('updateSearchBox')
      },
      onTopCategoryClick (category) {
        this.headerImage = category.bannerImageURL
        this.$store.commit('updateCategoryActive', category.id)
      }
    },
    watch: {
      topCategoriesData (value) {
        value.some(item => {
          const flag = item.isActive
          if (flag) {
            this.headerImage = item.bannerImageURL
          }
          return flag
        })
      }
    },
    computed: {
      ...mapState({
        currentSubCategories: state => {
          return state.currentSubCategories
        }
      }),
      ...mapGetters({
        topCategoriesData: 'topCategoriesData',
        subCategoriesData: 'subCategoriesData'
      })
    }
  }
</script>

<style lang="scss" scoped>
  .category {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    background: $white;
    .category-header {
      display: flex;
      padding: px2rem(10);
      background: $wild-sand;
      border-bottom: $border;
      position: relative;
      input {
        border: $border;
        outline: none;
        flex: 1;
        height: px2rem(28);
        border-radius: px2rem(4);
        padding: 0 px2rem(10);
      }
      .iconfont {
        position: absolute;
        right: px2rem(15);
        top: 50%;
        transform: translate3d(0, -50%, 0);
      }
    }
    .category-content {
      display: flex;
      flex-direction: row;
      flex: 1;
      .category-nav {
        width: 25vw;
        text-align: center;
        border-right: $border;
        background: $wild-sand;

        li {
          position: relative;
          height: px2rem(44);
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: $x-small;
          &:first-child {
            border-top: none !important;
          }
          &:last-child {
            border-bottom: none !important;
          }
          &.active {
            background: $white;
            border-top: $border;
            border-bottom: $border;
            &::after {
              content: "";
              position: absolute;
              width: px2rem(2);
              height: 100%;
              top: 0;
              right: px2rem(-2);
              background: $white;
            }
          }
          a {
            padding: 0 px2rem(30);
            flex: 1;
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: $x-small;
          }
        }
      }
      .category-detail {
        flex: 1;
        margin: px2rem(10);
      }
    }
  }
</style>
