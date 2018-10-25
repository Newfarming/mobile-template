<template>
  <modal @modal-close="handleModalClose" :static="true">
    <div class="content">
      <div class="gender-group">
        <div class="gender-item" @click="onGenderChooseClick('male')">
          <img :src="male" alt="">
          <i class="iconfont icon-xuanzhong"></i>
        </div>
        <div class="gender-item" @click="onGenderChooseClick('female')">
          <img :src="female" alt="">
          <i class="iconfont icon-xuanzhong"></i>
        </div>
      </div>
      <p>{{$t('modal.genderTip')}}</p>
    </div>
  </modal>
</template>

<script>
  import Modal from '@/components/common/Modal'
  import male from '@/assets/img/male.png'
  import female from '@/assets/img/female.png'
  export default {
    components: {
      Modal
    },
    data () {
      return {
        male: male,
        female: female
      }
    },
    methods: {
      handleModalClose () {
        this.$emit('modal-close')
      },
      onGenderChooseClick (choose) {
        let gender = choose === 'male' ? 'M' : 'F'
        this.$store.commit('updateGender', gender)
        // 重新获取首页数据
        this.$store.dispatch('getHomeFirstData')
        this.handleModalClose()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    width: 80vw;
    margin: px2rem(20) 0;
    .gender-group {
      display: flex;
      justify-content: space-around;

      .gender-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: px2rem(90);
        }
        .iconfont {
          font-size: $size36;
          margin-top: px2rem(10);
        }
      }
    }
    p {
      padding: px2rem(18);
      text-align: center;
      border-top: $border;
      margin-top: px2rem(10);
      line-height: px2rem(20);
    }
  }
</style>

