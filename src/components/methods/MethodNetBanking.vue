<template>
  <method :name="methodName" :identify="identify">
  </method>
</template>

<script>
  import Method from '@/components/methods/Method'
  export default {
    components: {
      Method
    },
    data () {
      return {
        methodName: 'methodName.netBanking',
        identify: 6
      }
    }
  }
</script>

