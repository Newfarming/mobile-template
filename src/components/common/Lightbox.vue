<template>
  <div class="lightbox">
    <slot></slot>
  </div>
</template>
<script>
  export default {
    mounted () {
      const h = document.querySelector('html')
      h.setAttribute('class', 'noscroll')
    },
    destroyed () {
      const h = document.querySelector('html')
      h.setAttribute('class', '')
    }
  }
</script>
<style lang="scss" scoped>
  .lightbox {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: $white;
  }
</style>
