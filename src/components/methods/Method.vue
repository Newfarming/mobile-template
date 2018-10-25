<template>
  <section class="payemnt-method">
    <div class="title" :class="{active: isChecked}" @click="onClickMethod">
      <slot name="title">
        <p>{{$t(name)}}</p>
      </slot>
      <i class="iconfont icon-xuanze" :class="[isChecked?'icon-xuanzhong': 'icon-xuanze']"></i>
    </div>

    <slot v-if="isChecked"></slot>
  </section>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  export default {
    props: {
      name: {
        type: String,
        default: ''
      },
      identify: {
        type: Number,
        required: true
      },
      isAvailable: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      onClickMethod () {
        if (this.isAvailable) {
          console.log('identify ==>', this.identify)
          this.$store.commit('setPayMethod', this.identify)
        } else {
          this.$toast('method not available')
        }
      }

    },
    computed: {
      ...mapState({
        currentPayMethod: 'currentPayMethod'
      }),
      isChecked () {
        return this.currentPayMethod === this.identify
      }
    }
  }
</script>

<style lang="scss" scoped>
  .payemnt-method {
    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 1rem;
      background: $white;
      height: 4.4rem;
      color: $dove-gray;
      .iconfont {
        color: $dusty-gray;
        font-size: $x-large;
        &.icon-xuanzhong {
          color: $flamingo;
        }
      }
      &.active {
        color: $flamingo;
      }
    }
  }
</style>
