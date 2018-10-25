<template>
  <div class="md-btn md-btn-primary" @click="onHandleClick($event)">
    <span v-if="!loading">{{text}}</span>
    <md-loading v-else></md-loading>
  </div>
</template>

<script>
  import MdLoading from './MdLoading'
  export default {
    components: {
      MdLoading
    },
    props: {
      text: {
        type: String,
        default: 'button'
      },
      loading: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      onHandleClick (event) {
        if (!this.loading) {
          this.$emit('click', event)
        }
      }
    }
  }
</script>
