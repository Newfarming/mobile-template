<template>
  <section v-if="orderInfos.length > 0" v-infinite-scroll="loadMore" infinite-scroll-disabled="loadDisabled" infinite-scroll-distance="50">
    <orders-cart-item v-for="(item,index) in orderInfos" :key="index" :order="item" :index="index" :order-index="orderIndex" :order-name="orderName" @deleteOrder="deleteOrder"></orders-cart-item>
  </section>
</template>
<script>
  import OrdersCartItem from '@/components/OrdersCartItem'
  import infiniteScroll from 'vue-infinite-scroll'
  export default {
    components: {
      OrdersCartItem
    },
    props: {
      orderInfos: {
        type: Array,
        default: () => {
          return []
        }
      },
      loadDisabled: {
        type: Boolean,
        default: false
      },
      orderIndex: {
        type: Number
      },
      orderName: {
        type: String
      }
    },
    directives: {
      infiniteScroll
    },
    data () {
      return {
      }
    },
    methods: {
      loadMore () {
        this.$emit('loadMore')
      },
      deleteOrder (orderName, index) {
        this.$emit('deleteOrder', orderName, index)
      }
    }
  }
</script>
