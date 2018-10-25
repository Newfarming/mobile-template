<template>
  <div class='promotion'>
      <img class="promotion-header" :src="head">
      <img class="promotion-header" :src="body">
      <img class="promotion-header" :src="footer">
  </div>
</template>

<script>
  import head from '@/assets/activity/promotion/1.jpg'
  import body from '@/assets/activity/promotion/2.jpg'
  import footer from '@/assets/activity/promotion/3.jpg'
  export default {
    data () {
      return { head, body, footer, }
    }
  }
</script>

<style lang="scss" >
body .app-container{
    padding-bottom: 0!important;
}
.promotion{
    font-size: 0;
    position: relative;
    height: calc(100vh - 4.6rem);
    background: #701814;
    .promotion-header{
        width: 100%;
        vertical-align:top;
    }
    .bgm{
        background-size: cover;
        background-repeat: no-repeat;
    }
}
</style>

