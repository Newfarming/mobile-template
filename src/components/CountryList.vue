<template>
  <ul>
    <li v-for="country in countryData" :key="country.id" @click="onCountryClick(country)" :class="{'active': country.isActive}">
      <img :src="country.image" alt="">
      <span>{{country.name}}</span>
    </li>
  </ul>
</template>

<script>
  import {
    COUNTRY_MAP
  } from '@/config'

  import {
    mapState
  } from 'vuex'

  export default {
    methods: {
      getCountries () {
        let countries = []
        for (let code in COUNTRY_MAP) {
          let country = COUNTRY_MAP[code]
          country.isActive = this.countryCode === country.code
          countries.push(country)
        }
        console.log(countries)
        return countries.sort((a, b) => {
          return a.name > b.name ? 1 : -1
        })
      },
      onCountryClick (country) {
        this.$store.commit('updateCountryCode', country.code)
        this.$store.commit('updateSymbol', country.symbol)
        // 切换国家后重新请求分类数据
        this.$store.dispatch('getCategories', true)
        this.countryData.map(item => {
          item.isActive = item.code === country.code
        })
        // 切换国家之后需要清空首页的数据，然后首页的用户位置也要清空
        this.$store.commit('setHomePosition', { x: 0, y: 0 })
        this.$emit('country-change', country)
      }
    },
    computed: {
      ...mapState({
        countryCode: 'countryCode'
      }),
      countryData () {
        return this.getCountries()
      }
    }

  }
</script>

<style lang="scss" scoped>
  ul {
    overflow: auto;
    flex: 1;
    padding-left: px2rem(15);
    li {
      position: relative;
      height: px2rem(45);
      border-bottom: $border;
      display: flex;
      align-items: center;
      &.active::after {
        content: "";
        width: px2rem(10);
        height: px2rem(5);
        position: absolute;
        right: px2rem(20);
        border: 2px solid $flamingo;
        border-right: none;
        border-top: none;
        transform: rotate(-45deg);
      }
      img {
        width: px2rem(30);
        height: px2rem(20);
      }
      span {
        margin-left: px2rem(20);
      }
    }
  }
</style>
