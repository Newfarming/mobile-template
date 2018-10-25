<template>
  <router-link class="bottom-item" :to="link" :class="{'active': this.$route.name === link.name}">
    <i class="iconfont" :class="icon">
      <md-badge class="tab-badge" :number="badge" v-if="badge > 0"></md-badge>
    </i>
    <span>{{ $t(text) }}</span>
  </router-link>
</template>

<script>
  import MdBadge from '@/components/common/MdBadge'
  export default {
    components: {
      MdBadge
    },
    props: {
      icon: {
        type: String,
        required: true
      },
      text: {
        type: String,
        required: true
      },
      link: {
        type: Object,
        required: true
      },
      badge: {
        type: Number,
        default: 0
      }
    }

  }
</script>

<style lang="scss" scoped>
  .bottom-item {
    display: flex;
    flex-direction: column;
    color: $dove-gray;
    flex: 1;
    text-align: center;
    height: 100%;

    .iconfont {
      font-size: $size30;
      position: relative;
      .tab-badge {
        font-family: graphik, "Helvetica Neue", Helvetica, Arial, sans-serif;
      }
    }
    span {
      line-height: $x-small;
      font-size: $x-small;
    }

    &.active {
      color: $flamingo;
    }
  }
</style>
