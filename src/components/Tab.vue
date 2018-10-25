<template>
  <div class="tab-bar">
    <tab-item v-for="item in tabbarItems" :key="item.text" :icon="item.icon" :text="item.text" :link="item.link" :badge="item.badge"></tab-item>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import TabItem from 'components/common/TabItem'
  export default {
    components: {
      TabItem
    },
    computed: {
      ...mapState({
        cartNumber: 'cartNumber'
      }),
      tabbarItems () {
        return [
          {
            icon: 'icon-home',
            text: 'tab.home',
            link: { name: 'home' }
          },
          {
            icon: 'icon-chugui1',
            text: 'tab.categories',
            link: { name: 'categories', params: { category: 51 } }
          },
          {
            icon: 'icon-gouwuche',
            text: 'tab.cart',
            link: { name: 'cart' },
            badge: +this.cartNumber
          },
          {
            icon: 'icon-geren',
            text: 'tab.account',
            link: { name: 'account' }
          }
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tab-bar {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border-top: $border;
    height: 100%;
    background: $white;
  }
</style>
