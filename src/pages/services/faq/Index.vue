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
          [{
            name: 'title.serviceFAQShippingInfo',
            to: { name: 'serviceFAQShippingInfo' }
          }, {
            name: 'title.serviceFAQReturnPolicy',
            to: { name: 'serviceFAQReturnPolicy' }
          }, {
            name: 'title.serviceFAQPaymentProtection',
            to: { name: 'serviceFAQPaymentProtection' }
          }],
          [{
            name: 'title.serviceFAQAboutMyAccount',
            to: { name: 'serviceFAQAboutMyAccount' }
          }, {
            name: 'title.serviceFAQAboutMyOrder',
            to: { name: 'serviceFAQAboutMyOrder' }
          }, {
            name: 'title.serviceFAQAboutShipping',
            to: { name: 'serviceFAQAboutShipping' }
          }, {
            name: 'title.serviceFAQAboutPayment',
            to: { name: 'serviceFAQAboutPayment' }
          }
          ]
        ]
      }
    }
  }
</script>
