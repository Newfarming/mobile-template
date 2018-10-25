<template>
  <div>
    <orders-cart-item v-if="orderInfos.length > 0" v-for="(item,index) in orderInfos" :key="index" :order="item"></orders-cart-item>
    <orders-empty :orderClass="orderClass" v-if="orderInfos.length === 0"></orders-empty>
  </div>

</template>
<script>
  import OrdersCartItem from '@/components/OrdersCartItem'
  import OrdersEmpty from '@/components/OrdersEmpty'

  export default {
    components: {
      OrdersCartItem,
      OrdersEmpty
    },
    async created () {
      this.init()
    },
    data () {
      return {
        userName: '',
        orderInfos: [],
        orderType: '',
        ordersNum: '',
        orderClass: 'Preparing'
      }
    },
    methods: {
      async init () {
        const {
          userName,
          orderInfos,
          orderType,
          ordersNum
        } = await this.$store.dispatch('getOrders')
        this.orderInfos = orderInfos.filter((item, key) => {
          return item.showState === 'Processing'
        })
        this.userName = userName
        this.orderType = orderType
        this.ordersNum = ordersNum
      }
    }
  }
</script>

<style lang="scss" scoped>
  .m-cart {
    &:first-child {
      margin-top: 0;
    }
  }
</style>
