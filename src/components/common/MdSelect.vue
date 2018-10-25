<template>
  <div class="md-field" :class="{'md-focused': isFocused, 'has-value': !!value}">
    <label>{{$t(placeholder)}}</label>
    <select :name="name" :disabled="disabled" @focus="onFocus" @blur="onBlur" class="md-select" v-bind:value="value" @input="$emit('input', $event.target.value)" @change="$emit('input-change', $event.target.value)">
      <option disabled value=""></option>
      <slot name="options"></slot>
    </select>
    <slot></slot>
  </div>
</template>
<script>
  export default {
    props: {
      value: {
        type: [String, Number, Boolean, Array],
        required: true,
        default: ''
      },
      placeholder: {
        type: String,
        default: ''
      },
      disabled: {
        type: Boolean,
        default: false
      },

      name: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        isFocused: false
      }
    },
    methods: {
      onFocus (e) {
        this.isFocused = true
        this.$emit('focus', e)
      },
      onBlur (e) {
        this.isFocused = false
        this.$emit('blur', e)
      }
    }

  }
</script>
<style lang="scss" scoped>
  .md-field {
    width: 100%;
    min-height: px2rem(48);
    padding-top: px2rem(16);
    display: flex;
    position: relative;

    .md-select {
      height: px2rem(32);
      line-height: px2rem(16);
      padding: 0;
      display: block;
      flex: 1;
      border: none;
      background: none;
      transition: 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
      transition-property: font-size, padding-top, color;
      color: $mine-shaft;
    }

    label {
      position: absolute;
      top: px2rem(23);
      left: 0;
      pointer-events: none;
      transition: 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
      transition-duration: 0.3s;
      font-size: $small;
      line-height: px2rem(20);
      color: $dusty-gray;
    }
    &::before {
      content: "";
      background: $flamingo;
      position: absolute;
      height: 2px;
      z-index: 2;
      transform: scaleX(0.12);
      bottom: 0;
      right: 0;
      left: 0;
      opacity: 0;
      transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      transition-property: border, opacity, transform;
    }
    &::after {
      content: "";
      position: absolute;
      background: $mecury;
      height: 1px;
      bottom: 0;
      right: 0;
      left: 0;
    }
    &.md-focused {
      &::before {
        opacity: 1;
        transform: scaleX(1);
      }

      label {
        top: 0;
        opacity: 1;
        font-size: $x-small;
        pointer-events: auto;
        color: $flamingo;
      }

      .md-select {
        font-size: $small;
      }
    }
    &.has-value {
      label {
        top: 0;
        opacity: 1;
        font-size: $x-small;
        pointer-events: auto;
      }
      .md-select {
        font-size: $small;
      }
    }
  }
</style>
