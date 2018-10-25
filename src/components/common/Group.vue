<template>
  <div class="group-container">
    <section v-for="group in groups" :key="group[0].name" class="group">
      <group-item :name="item.name" :to="item.to" v-for="item in group" :key="item.name"></group-item>
    </section>
  </div>
</template>

<script>
  import GroupItem from '@/components/common/GroupItem'
  export default {
    props: {
      groups: {
        type: Array,
        required: true
      }
    },
    components: {
      GroupItem
    }
  }
</script>

<style lang="scss" scoped>
  .group-container {
    .group {
      background: $white;
      .group-item {
        & + .group-item {
          border-top: $border;
        }
      }
      & + .group {
        margin-top: px2rem(10);
      }
    }
  }
</style>

