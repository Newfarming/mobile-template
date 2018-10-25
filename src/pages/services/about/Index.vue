<template>
  <div>
    <group :groups="groups"></group>
  </div>
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
              name: 'title.serviceFactoryPrice',
              to: { name: 'serviceFactoryPrice' }
            }, {
              name: 'title.servicePrivacyPolicy',
              to: { name: 'servicePrivacyPolicy' }
            }, {
              name: 'title.serviceTermsConditions',
              to: { name: 'serviceTermsConditions' }
            }, {
              name: 'title.serviceAboutUs',
              to: { name: 'serviceAboutUs' }
            }, {
              name: 'title.serviceContactUs',
              to: { name: 'serviceContactUs' }
            }
          ]
        ]
      }
    }
  }
</script>
