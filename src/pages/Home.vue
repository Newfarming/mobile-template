<template>
  <div class="home" id="home">
    这里是首页
  </div>
</template>

<script>
  import {
    beforeRouterLeaveMixin
  } from '@/utils/mixin'
  import activity from '@/assets/activity/banner.jpg'
  import ucTheme from '@/assets/activity/m_banner_uc.jpg'
  import promotionTheme from '@/assets/activity/promotion.jpg'
  import mideastBanner from '@/assets/activity/mideast_banner.jpg'
  export default {
    components: {

    },

    mixins: [beforeRouterLeaveMixin],
    async created () {
    },
    data () {
      return {
        isShowGenderChoose: false,
        isActived: false,
        activity: activity,
        mideastBanner: mideastBanner,
        isShowOpenApp: false,
        ucTheme,
        promotionTheme,
      }
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
