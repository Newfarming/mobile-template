<template>
  <lightbox class="search-box">
    <div class="search-input">
      <input type="text" ref="search" :placeholder="$t('placeholder.search')" @keyup.enter="onSearchHandle($event)">
      <span @click="onCancelClick">{{$t('button.cancel')}}</span>
    </div>

    <div class="trending-search" v-if="trends && trends.length > 0">
      <p>{{$t('button.trendingSearches')}}</p>
      <div class="trending-item-list">
        <a href="javascript:void(0)" class="trending-item" v-for="(keyword, index) in trends" :key="index" @click="onHistoryItemClick(keyword)">{{keyword}}</a>
      </div>
    </div>

    <div class="search-history" v-if="isShowHistory">
      <p>{{$t('button.searchHistory')}}</p>
      <ul>
        <li v-for="history in searchHistories" :key="history">
          <a href="javascript:void(0)" @click="onHistoryItemClick(history)">{{history}}</a>
          <i class="iconfont icon-guanbi_cp" @click="onHistoryItemDeleteClick(history)"></i>
        </li>
      </ul>
      <p class="clear-history" @click="onClearHistoryClick">{{$t('button.clear')}}</p>
    </div>
  </lightbox>
</template>

<script>
  import Lightbox from '@/components/common/Lightbox'
  import {
    getSearchHistory,
    deleteSearchHistory,
    saveSearchHistory
  } from '@/utils'
  export default {
    components: {
      Lightbox
    },
    created () {
      this.searchHistories = getSearchHistory()
      this.$store.dispatch('getTrends').then(keywords => {
        this.trends = keywords
      })
    },
    data () {
      return {
        searchHistories: [],
        trends: []
      }
    },
    methods: {
      _filterHistory (histories, history) {
        return histories.filter(item => {
          return item !== history
        })
      },
      onSearchHandle (event) {
        const search = event.target.value.trim()
        if (!search) {
          return false
        }
        // 判断下是不是存在历史中
        const isExists = this.searchHistories.filter(item => {
          return item === search
        }).length > 0
        if (!isExists) {
          this.searchHistories.unshift(search)
          saveSearchHistory(this.searchHistories)
        }
        this.$store.commit('updateSearchBox')
        // 跳转到搜索结果页面展示搜索的结果
        this.$router.push({ path: 'search', query: { q: search } })
      },
      onClearHistoryClick () {
        this.searchHistories = []
        deleteSearchHistory()
      },
      onHistoryItemDeleteClick (history) {
        this.searchHistories = this._filterHistory(this.searchHistories, history)
        saveSearchHistory(this.searchHistories)
      },
      onHistoryItemClick (history) {
        let tmp = this._filterHistory(this.searchHistories, history)
        // 新点击添加到顶部
        tmp.unshift(history)
        this.searchHistories = tmp
        saveSearchHistory(this.searchHistories)
        this.$store.commit('updateSearchBox')
        // 跳转到搜索结果页面展示搜索的结果
        this.$router.push({ path: 'search', query: { q: history } })
      },
      onCancelClick () {
        this.$store.commit('updateSearchBox')
      }
    },
    computed: {
      isShowHistory () {
        return this.searchHistories && this.searchHistories.length > 0
      }
    },
    mounted () {
      // 自动设置焦点，避免焦点在上一层，导致iOS上光标出现问题
      this.$refs.search.focus()
    }
  }
</script>

<style lang="scss" scoped>
  .search-box {
    background: $alabaster !important;
    .search-input {
      height: px2rem(44);
      line-height: px2rem(44);
      display: flex;
      align-items: center;
      padding: 0 px2rem(15);
      > input {
        flex: 1;
        height: px2rem(28);
        outline: none;
        border: none;
        padding-left: px2rem(10);
        background: $seashell;
        border-radius: px2rem(5);
        margin-right: px2rem(10);
      }
      > span {
        font-size: $medium;
        color: $flamingo;
      }
    }

    .trending-search {
      font-size: $medium;
      padding: 0 px2rem(15);
      background: $white;
      > p {
        height: px2rem(44);
        line-height: px2rem(44);
      }
      .trending-item-list {
        .trending-item {
          display: inline-block;
          height: px2rem(28);
          padding: 0 px2rem(12);
          line-height: px2rem(28);
          background: $wild-sand;
          border-radius: px2rem(14);

          margin-right: px2rem(6);
          margin-bottom: px2rem(12);
        }
      }
    }

    .search-history {
      font-size: $medium;
      background: $white;
      > p {
        height: px2rem(44);
        line-height: px2rem(44);
        padding: 0 px2rem(15);
      }
      ul {
        padding-left: px2rem(15);
        li {
          height: px2rem(44);
          display: flex;
          align-items: center;
          border-bottom: $border;
          padding-right: px2rem(10);
          a {
            flex: 1;
            height: 100%;
            line-height: px2rem(44);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .iconfont {
            font-size: $x-small;
            color: $dusty-gray;
            height: 100%;
            width: px2rem(30);
            text-align: center;
            line-height: px2rem(44);
          }
        }
      }
      .clear-history {
        text-align: center;
        color: $flamingo;
      }
    }
  }
</style>
