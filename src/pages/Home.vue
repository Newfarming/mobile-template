<template>

  <div class="home" id="home">
    12345
</template>

<script>
  // import ProductList from '@/components/ProductList'
  export default {
    components: {
    },
    async created() {
      // this.$loading.show()
    },

    data() {
      return {
        isShowGenderChoose: false,
      }
    },

    methods: {
    },

    computed: {
      // ...mapState({
      //   countryCode: 'countryCode'
      // }),

      // ...mapGetters({
      //   amountOff: 'amountOff'
      // })


    },

    mounted() {
    },

    activated() {
    },

    deactivated() {
    },

    beforeRouteLeave(to, from, next) {
    }
  }
</script>

<style lang="scss" scoped>
  .banner-container {
    width: 100%;
  }
  .activity {
    width: 100%;
    img {
      max-width: 100%;
      display: block;
    }
  }
  #download-observer {
    width: 100%;
    height: 0;
  }
  .block {
    height: px2rem(40);
  }
</style>
