<template>
  <group :groups="groups"></group>
</template>

<script>
  import Group from '@/components/common/Group'
  export default {
    components: {
      Group
    },
    data () {
      return {
        groups: [
          [
            {
              name: 'title.serviceFAQReturnPolicyAboutReturns',
              to: { name: 'serviceFAQReturnPolicyAboutReturns' }
            }, {
              name: 'title.serviceFAQReturnPolicyAboutRefunds',
              to: { name: 'serviceFAQReturnPolicyAboutRefunds' }
            }, {
              name: 'title.serviceFAQReturnPolicyAboutReturnShipping',
              to: { name: 'serviceFAQReturnPolicyAboutReturnShipping' }
            }
          ]
        ]
      }
    }
  }
</script>
