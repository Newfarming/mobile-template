<template>
  <div class="md-field" :class="{'md-focused': isFocused, 'has-tips':isShowTips,'has-value': !!value}">
    <label>{{$t(placeholder)}}</label>
    <textarea cols="2" :name="name" :disabled="disabled" @focus="onFocus" @blur="onBlur" class="md-textarea" v-bind:value="value" @input="onInput" @change="$emit('input-change', $event.target.value)" :maxlength="maxlength || ''"></textarea>
    <p class="md-tips" v-if="isShowTips">
      <span class="error">{{error}}</span>
      <span v-if="maxlength">{{currentLength}}/{{maxlength}}</span>
    </p>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    props: {
      value: {
        type: [String, Number, Boolean, Array],
        required: true
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
      },
      maxlength: {
        type: Number,
        default: 0
      },
      validate: {
        type: Function,
        default: null
      }
    },
    data () {
      return {
        isFocused: false,
        error: '',
        currentLength: this.value.length
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
      },
      onInput (event) {
        const value = event.target.value
        this.currentLength = value.length
        if (this.maxlength > 0 && this.currentLength > this.maxlength) {
          return
        }
        this._validate(value)
        this.$emit('input', value)
      },
      _validate (value) {
        if (this.validate) {
          const [, errorMsg] = this.validate(value)
          this.error = errorMsg
        }
      }
    },
    computed: {
      isShowTips () {
        return !!this.maxlength || this.validate || this.errorText
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

    .md-textarea {
      height: px2rem(48);
      line-height: px2rem(24);
      padding: 0;
      display: block;
      flex: 1;
      border: none;
      background: none;
      transition: 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
      transition-property: font-size, padding-top, color;
      font-size: 1px;
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

    .md-tips {
      position: absolute;
      bottom: px2rem(-20);
      left: 0;
      width: 100%;
      line-height: px2rem(20);
      font-size: $x-small;
      display: flex;
      justify-content: space-between;
      color: $dusty-gray;
      .error {
        color: $flamingo;
      }
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

      .md-textarea {
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
      .md-textarea {
        font-size: $small;
      }
    }

    &.has-tips {
      margin-bottom: px2rem(20);
    }
  }
</style>

