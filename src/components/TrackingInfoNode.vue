<template>
  <div>
    <div class="list-box" :class="{'state-grey' : !node.active && !node.orangeSymbol,'state-orange': node.orangeSymbol}">
      <div class="line" v-show="node.lineShow"></div>
      <div class="list">
        <div class="date">
          <p class="first">{{node.local_day}}</p>
          <p class="second">{{node.local_time}}</p>
        </div>
        <div class="icon-box dot">
        </div>
        <div class="message">
          <p class="message-title" v-if="!node.link_url">{{node.title}}</p>
          <p class="message-title" v-else>
            <a :href="node.link_url" class="click-a">{{node.title}}</a>
          </p>
          <p class="message-content">
            <span>{{node.msg}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  export default {
    props: ['node']
  }
</script>
<style lang="scss" scoped>
  .click-a {
    color: $havelock-blue !important;
    text-decoration: underline;
  }
  .jump-a {
    color: $havelock-blue !important;
    text-decoration: underline;
    font-size: $x-small;
  }
  .list-box {
    position: relative;
    .line {
      height: 100%;
      border-left: $border;
      position: absolute;
      z-index: 20;
      left: px2rem(98);
      top: px2rem(21);
    }
  }
  .list {
    display: flex;
    padding: px2rem(18) 0;
  }
  .date {
    width: px2rem(80);
    text-align: right;
    .first {
      color: $dove-gray;
    }
    .second {
      color: $dove-gray;
      font-size: px2rem(10);
    }
  }
  .icon-box {
    width: px2rem(21);
    height: px2rem(21);
    border: 1px solid $dove-gray;
    border-radius: px2rem(10.5);
    left: px2rem(88);
    top: px2rem(15);
    background-color: $white;
    z-index: 50;
    position: absolute;
    &.dot {
      width: px2rem(6);
      height: px2rem(6);
      background-color: $black;
      border-radius: px2rem(3);
      left: px2rem(95);
      top: px2rem(20);
    }
    .icon {
      position: absolute;
      font-size: px2rem(15);
      line-height: 100%;
      left: px2rem(2);
      top: px2rem(2);
    }
  }
  .message {
    width: px2rem(240);
    margin-left: px2rem(38);
    .message-title {
      margin-bottom: px2rem(8);
    }
    .message-content {
      font-size: $x-small;
    }
    .message-tip {
      font-size: $x-small;
    }
  }
  .state-grey {
    color: $greyc5 !important;
    .dot {
      background-color: $greyc5 !important;
    }
    .line {
      left: px2rem(97);
      border-left: 2px dashed $greyee !important;
    }
    .icon-box {
      border-color: $greyee !important;
    }
    .jump-a {
      color: $havelock-blue !important;
      text-decoration: underline;
      font-size: $x-small;
    }
  }
  .state-orange {
    * {
      color: $tracking-orange !important;
    }
    .dot {
      background-color: $tracking-orange !important;
    }
    .line {
      left: px2rem(97);
      border-left: 2px dashed $greyee !important;
    }
    .icon-box {
      border-color: $tracking-orange !important;
    }
    .jump-a {
      color: $havelock-blue !important;
      text-decoration: underline;
      font-size: $x-small;
    }
    .click-a {
      color: $havelock-blue !important;
      text-decoration: underline;
    }
  }
</style>
