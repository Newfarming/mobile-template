<template>
  <div>

  </div>
</template>

<script>
  export default {
    created () {
      const quickPayInfo = JSON.parse(this.$route.query.quickpayInfo)
      parent.postMessage(quickPayInfo, '*')
    }
  }
</script>
