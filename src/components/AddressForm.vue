<template>
  <section class="address-form">
    <div class="address-item" v-for="address in addressForm" :key="address.model">
      <p class="item-prefix" v-if="address.prefix">{{address.prefix}}</p>
      <input :type="address.type || 'text'" :placeholder="address.placeholder" :value="address.value" v-model="address.model">
      <span class="item-tips" v-if="address.tips">{{address.tips}}</span>
    </div>
  </section>
</template>

<script>
  export default {
    props: {
      addressForm: {
        type: Array,
        default: () => []
      }
    }
  }
</script>

<style lang="scss" scoped>
  .address-form {
    .address-item {
      display: flex;
      position: relative;
      flex-direction: row;
      height: px2rem(44);
      padding: 0 px2rem(15);
      border-bottom: $border;
      box-sizing: content-box;
      input {
        flex: 1;
        &:disabled {
          background: $white;
        }
      }
      .item-tips {
        font-size: $x-small;
        color: $dusty-gray;
        position: absolute;
        right: px2rem(15);
        top: 50%;
        transform: translate3d(0, -50%, 0);
      }
      .item-prefix {
        display: flex;
        align-items: center;
        margin-right: px2rem(10);
      }
    }
  }
</style>
