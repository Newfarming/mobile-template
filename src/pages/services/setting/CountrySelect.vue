<template>
  <div>
    <country-list @country-change="handleCountryChange"></country-list>
  </div>
</template>

<script>
  import CountryList from '@/components/CountryList'
  import {
    mapState
  } from 'vuex'
  export default {
    components: {
      CountryList
    },
    methods: {
      handleCountryChange (country) {
        // 活动期间，切换到印度重新请求互动数据
        if (this.countryCode === 'in') {
          this.$store.dispatch('getThemes')
        }
        this.$store.dispatch('getHomeFirstData')
        this.$router.back()
      }
    },
    computed: {
      ...mapState({
        countryCode: 'countryCode'
      })
    }

  }
</script>
