<template>
  <div class="category">
    <ul>
      <li v-for="topCategory in topCategories" :key="topCategory.id" :class="{'active': topCategory.isActive}" @click="onTopCategoryClick(topCategory.id)">{{topCategory.name}}</li>
    </ul>
    <div class="sub-category" v-show="currentCategoryId > 0">
      <p class="sub-title" @click="onSubCategoryClick">
        {{$t('other.subCategory')}}: {{activeSubCategory.name}}
        <i class="iconfont icon-xiala"></i>
      </p>
      <transition class="fade">
        <div class="sub-content" v-show="isShowSubCategory">
          <span v-for="sub in subCategoriesData" :key="sub.category_id" @click="onSubCategoryItemClick(sub.category_id)">{{sub.name}}</span>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  import {
    mapState,
    mapGetters
  } from 'vuex'
  export default {
    data () {
      return {
        isShowSubCategory: false
      }
    },

    methods: {
      async onTopCategoryClick (categoryId) {
        window.scrollTo(0, 0)
        this.$loading.show()
        this.$store.commit('updateCategoryActive', categoryId)
        this.isShowSubCategory = false
        // 切换类别后重新获取商品数据
        await this.$store.dispatch('getHomeFirstData')
        this.$loading.hide()
      },
      onSubCategoryClick () {
        this.isShowSubCategory = !this.isShowSubCategory
      },
      async onSubCategoryItemClick (subCategoryId) {
        window.scrollTo(0, 0)
        this.$loading.show()
        this.isShowSubCategory = false
        this.$store.commit('updateActiveSubCategory', subCategoryId)
        // 重新获取商品数据
        await this.$store.dispatch('getHomeFirstData')
        this.$loading.hide()
      }
    },
    computed: {
      ...mapState({
        currentCategoryId: 'currentCategoryId',
        activeSubCategory: 'activeSubCategory'
      }),
      ...mapGetters({
        topCategories: 'topCategories',
        subCategoriesData: 'subCategoriesData'
      })
    }
  }
</script>

<style lang="scss" scoped>
  .category {
    background-color: $white;
    ul {
      display: flex;
      flex-direction: row;
      overflow-y: scroll;
      height: px2rem(40);
      align-items: center;
      white-space: nowrap;
      color: $dove-gray;
      padding: 0 px2rem(8);
      &::-webkit-scrollbar {
        display: none;
      }
      li {
        padding: 0 px2rem(10);
        height: 100%;
        line-height: px2rem(40);
        border-bottom: 2px solid $white;
        flex-shrink: 0;
        &.active {
          border-color: $flamingo;
          color: $flamingo;
        }
      }
    }
    .sub-category {
      background: $wild-sand;
      border-top: $border;
      .sub-title {
        height: px2rem(40);
        line-height: px2rem(40);
        color: $dove-gray;
        text-align: center;
        .iconfont {
          margin-left: px2rem(10);
          font-size: $small;
        }
      }
      .sub-content {
        position: absolute;
        background: $wild-sand;
        z-index: 123;
        span {
          display: inline-block;
          width: 50%;
          text-decoration: none;
          color: $dove-gray;
          line-height: px2rem(38);
          text-align: start;
          padding-left: px2rem(20);
        }
      }
    }
    .fade-enter-active,
    .fade-leave-active {
      transition: opacity 0.3s;
    }
    .fade-enter,
    .fade-leave-to {
      opacity: 0;
    }
  }
</style>
