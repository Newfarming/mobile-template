<template>
  <div>
    <tracking-info-item v-for="(item,index) in trackingInfo" :key="index" :item="item"></tracking-info-item>
  </div>
</template>
<script>
  import TrackingInfoItem from '@/components/TrackingInfoItem'
  export default {
    components: {
      TrackingInfoItem
    },
    data () {
      return {
        trackingInfo: null,
        trackingMessage: [],
        trackingNo: '',
        deliveryDate: '',
        courier: ''
      }
    },
    async  created () {
      let orderName = this.$route.params.orderName
      let trackingInfo = await this.$store.dispatch('getTrackingInfo', orderName)
      this.trackingInfo = trackingInfo.tracking_infos
    },
    methods: {
    }
  }
</script>
<style lang="scss" scoped>
</style>
