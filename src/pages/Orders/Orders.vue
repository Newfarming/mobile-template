<template>
  <div>
    <template v-if="orderInfos.length > 0">
      <orders-cart-items :order-infos="orderInfos" :order-index="orderIndex" :load-disabled="loadDisabled" :order-name="orderName" @loadMore="loadMore" @deleteOrder="deleteModalTrue"></orders-cart-items>
    </template>
    <orders-empty :orderClass="orderClass" v-else></orders-empty>
    <delete-alert-modal :delete-modal-show="deleteModalShow" @deleteOrder="deleteOrder"></delete-alert-modal>
  </div>

</template>
<script>
  import OrdersCartItems from '@/components/OrdersCartItems'
  import OrdersEmpty from '@/components/OrdersEmpty'
  import DeleteAlertModal from '@/components/modals/DeleteAlertModal'
  export default {
    components: {
      OrdersCartItems,
      OrdersEmpty,
      DeleteAlertModal
    },
    async created () {
      this.init()
    },
    data () {
      return {
        userName: '',
        orderInfos: [],
        orderType: '',
        orderClass: 'orders',
        deleteModalShow: false,
        orderIndex: 0,
        orderName: '',
        totalItems: 0,
        loadDisabled: false
      }
    },
    methods: {
      async loadMore () {
        if (!this.loadDisabled) {
          this.totalItems = this.orderInfos.length
          await this.getOrders(this.totalItems)
        }
      },
      deleteModalTrue (orderName, orderIndex) {
        this.orderName = orderName
        this.orderIndex = orderIndex
        this.deleteModalShow = true
      },
      async deleteOrder () {
        this.deleteModalShow = false
        await this.$store.dispatch('deleteOrder', this.orderName)
        this.orderInfos.splice(this.orderIndex, 1)
      },
      async getOrders (offset = 0) {
        this.loadDisabled = true
        const {
          userName,
          orderInfos,
          orderType
        } = await this.$store.dispatch('getOrders', { orderType: 1, offset: offset })
        this.orderInfos = this.orderInfos.concat(orderInfos)
        this.totalItems = this.orderInfos.length
        this.userName = userName
        this.orderType = orderType
        if (orderInfos.length !== 0) {
          this.loadDisabled = false
        }
      },
      async init () {
        this.$loading.show()
        const {
          userName,
          orderInfos,
          orderType
        } = await this.$store.dispatch('getOrders', { orderType: 1 })
        this.orderInfos = orderInfos
        this.totalItems = this.orderInfos.length
        this.totalItems = orderInfos.length
        this.userName = userName
        this.orderType = orderType
        this.$loading.hide()
      }
    }
  }
</script>
