<template>
  <div class="container">
   <ul>
      <li v-for="country in countries" :key="country.id" @click="changeCountry(country)" :class="country.code===currentCountry.code?'selectCountry':''">
        <span>{{country.name}}</span>
        <i>+{{country.phonePrefix}}</i>
      </li>
    </ul>
  </div>
</template>
<script>
import { COUNTRY_MAP } from '@/config'
export default {
  data () {
    return {
      countries: COUNTRY_MAP,
      currentCountry: this.$store.state.phoneCountry
    }
  },
  methods: {
    changeCountry (country) {
      this.$store.state.phoneCountry = country
      localStorage.setItem('phoneCountry', JSON.stringify(country))
      this.$router.back()
    }
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
  .container {
    > ul {
      > li {
        padding-left: px2rem(15);
        height: px2rem(44);
        padding-right: px2rem(10);
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: $border;
        box-sizing: content-box;
        > i {
          color: #999999;
          font-style: normal;
        }
        .iconfont {
          color: $flamingo;
        }
      }
      > li:nth-child(2n+1){
        background-color: #FBFBFB
      }
      .selectCountry{
        color: red;
        > i {
          color: red;
        }
      }
    }
  }
</style>
