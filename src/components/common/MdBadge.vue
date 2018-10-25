<template>
  <div class="md-badge" :class="{'two-num': isTwoNum, 'large-num': isLargeNum}">
    {{contentNum}}
  </div>
</template>

<script>
  export default {
    props: {
      number: {
        type: Number,
        default: 0
      }
    },
    computed: {
      contentNum () {
        return this.number > 99 ? '99+' : this.number
      },
      isTwoNum () {
        return this.number > 9 && this.number < 100
      },
      isLargeNum () {
        return this.number >= 100
      }
    }
  }
</script>

<style lang="scss" scoped>
  .md-badge {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 50%;
    top: 50%;
    transform: translate(px2rem(20), px2rem(-18));
    color: $white;
    height: px2rem(18);
    min-width: px2rem(18);
    font-size: $x-small;
    &::before {
      position: absolute;
      content: "";
      background: $flamingo;
      height: px2rem(18);
      width: 100%;
      top: 0;
      left: 0;
      z-index: -1;
      border-radius: px2rem(9);
    }
    &.two-num {
      transform: translate(px2rem(20), px2rem(-18));
    }
    &.large-num {
      transform: translate(px2rem(25), px2rem(-18));
      padding: px2rem(2);
    }
  }
</style>
