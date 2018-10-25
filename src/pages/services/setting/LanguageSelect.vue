<template>
  <div class="language-container">
    <ul>
      <li v-for="lang in languages" :key="lang.id" @click="onLangItemClick(lang.id)">
        <span>{{lang.name}}</span>
        <i class="iconfont icon-icon-test" v-if="language === lang.id"></i>
      </li>
    </ul>
  </div>
</template>


<script>
  import {
    LANGUAGE_CONF
  } from '@/config'

  import {
    loadLanguageAsync
  } from '@/setup/setup-i18n'
  export default {
    data () {
      return {
        languages: LANGUAGE_CONF
      }
    },
    methods: {
      onLangItemClick (langId) {
        loadLanguageAsync(langId).then(() => {
          this.$store.commit('setLanguage', langId)
          this.$router.back()
        })
      }
    },
    computed: {
      language () {
        return this.$store.state.language
      }
    }
  }
</script>

<style lang="scss" scoped>
  .language-container {
    > ul {
      padding-left: px2rem(15);
      > li {
        height: px2rem(44);
        padding-right: px2rem(10);
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: $border;
        box-sizing: content-box;
        .iconfont {
          color: $flamingo;
        }
      }
    }
  }
</style>
