<template>
  <div class="feeback">
    <textarea class="feedback-content" cols="30" rows="10" v-model="feedback" :placeholder="placeholder"></textarea>
    <button class="feeback-button" @click="onClickFeedback">{{$t('button.submit')}}</button>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        placeholder: this.$i18n.t('placeholder.feedback'),
        feedback: ''
      }
    },
    methods: {
      onClickFeedback () {
        this.$store.dispatch('saveFeedback', this.feedback)
          .then(resp => {
            this.$toast.success(this.$i18n.t('toast.feedbackSuccess'))
            this.feedback = ''
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .feeback {
    display: flex;
    flex-direction: column;
    .feedback-content {
      padding: px2rem(15);
    }
    .feeback-button {
      background-color: $flamingo;
      line-height: px2rem(44);
      color: $white;
      width: 100%;
      font-size: $medium;
    }
  }
</style>
