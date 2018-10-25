<template>
  <div class='coupons'>
     
      <img class="coupons-header" :src="head">
      <img class="coupons-header" :src="status==2?bodyGot:body">
      <img class="coupons-header" :src="status==2?btGot:bt" @click="btnClick">
      
  </div>
</template>

<script>
  import head from '@/assets/activity/head.jpg'
  import bodyGot from '@/assets/activity/body_got.jpg'
  import body from '@/assets/activity/body.jpg'
  import bt from '@/assets/activity/bt.jpg'
  import btGot from '@/assets/activity/bt_got.jpg'
  import {
    mapGetters
  } from 'vuex'
  export default {
    data () {
      return {
        head,
        body,
        bodyGot,
        bt,
        btGot,
        status: 1
      }
    },
    computed: {
      ...mapGetters({
        isLogin: 'isLogin'
      })
    },
    methods: {
      async btnClick () {
        if (!this.isLogin) {
          this.$router.push({name: 'login'})
          return
        }
        if (this.status === 2) {
          this.$router.push({name: 'home'})
          return
        }
        this.$loading.show()
        let result = await this.$store.dispatch('postCoupons')
        this.status = result
        this.$loading.hide()
        if (this.status === 4) {
          this.$toast.error('The coupons are for new users only')
        } else if (this.status === 3) {
          this.$toast.error('You have already received coupons')
        } else if (this.status === 1) {
          this.$toast.error('Failed to get the coupon.Please try again')
        }
      }
    }
  }
</script>

<style lang="scss" >
    body .app-container{
        padding-bottom: 0!important;
    }
  .coupons{
      font-size: 0;
      position: relative;
      min-height: 94vh;
      background: #728EFD;
      .coupons-header{
          width: 100%;
          vertical-align:top;
      }
      .bgm{
          background-size: cover;
          background-repeat: no-repeat;
      }
  }
  
</style>

