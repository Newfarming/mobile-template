<template>
  <div>
  </div>
</template>

<script>
  import {
    openNativeApp
  } from '@/utils'
  export default {
    created () {
      const orderName = this.$route.params.orderName
      openNativeApp(`confirm/cod/${orderName}`)

      this.$router.replace({
        name: 'home'
      })
    }
  }
</script>
