<template>
  <fade-slide :title-name="title" :seeShow="see_show">
    <table class="panel-body" slot="show-content">
      <tbody>
        <tr v-for="(item, index) in threeDescription" :key="index">
          <td class="info-type">{{item.key}}</td>
          <td class="info-details">{{item.value}}</td>
        </tr>
      </tbody>
    </table>
    <table class="panel-body" slot="fade-content">
      <tbody>
        <tr v-for="(item, index) in otherDescription" :key="index">
          <td class="info-type">{{item.key}}</td>
          <td class="info-details">{{item.value}}</td>
        </tr>
      </tbody>
    </table>
  </fade-slide>
</template>

<script>
  import FadeSlide from '@/components/FadeSlide'
  export default {
    components: {
      FadeSlide
    },
    data () {
      return {
        title: 'productText.description'
      }
    },
    props: ['threeDescription', 'otherDescription'],
    methods: {
      funcDescriptionSee () {
        this.$emit('funcDescriptionSee')
      }
    },
    computed: {
      see_show () {
        return this.otherDescription && this.otherDescription.length > 0
      }
    }
  }
</script>

<style lang="scss" scoped>
  .panel {
    border-radius: 0;
    border: 0;
  }
  .panel-heading {
    background: $title-background-color;
    height: px2rem(43);
    border-top: 1px solid $mecury;
    border-bottom: 1px solid $background-color;
  }
  .panel-body {
    padding: 0;
    color: $dusty-gray;
    border-collapse: collapse;
  }
  .panel-title {
    margin-top: px2rem(3);
    .description-title {
      font-size: px2rem(14);
    }
  }
  table {
    width: 100%;
    border: 0px solid $background-color;
    td {
      font-size: px2rem(14);
      padding: px2rem(11) px2rem(8) px2rem(11) px2rem(16);
      color: $dusty-gray;
      border-bottom: 1px solid $background-color;
      border-left: 1px solid $background-color;
    }
    td:first-child {
      border-left: none;
    }
    .info-type {
      vertical-align: middle;
    }
    .info-details {
      width: 60%;
      color: $mine-shaft;
      word-break: break-all;
      -webkit-hyphens: auto;
      hyphens: auto;
    }
  }
  a {
    text-decoration: none;
    color: $mine-shaft;
  }
  .panel-body.view {
    height: px2rem(46);
    padding: px2rem(13) 0;
    color: $mine-shaft;
  }

  .panel-heading {
    padding: px2rem(10) px2rem(15);
    border-bottom: 1px solid $icon-color;
    color: $mine-shaft;
    border-top-left-radius: px2rem(3);
    border-top-right-radius: px2rem(3);
  }
  .panel {
    // margin-bottom: px2rem(20);
    background-color: $white;
    border: 1px solid transparent;
    border-radius: px2rem(4);
    box-shadow: 0 px2rem(1) px2rem(1) rgba(0, 0, 0, 0.05);
  }
</style>

