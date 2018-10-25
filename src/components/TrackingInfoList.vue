<template>
  <div>
    <div class="list-box" :class="{'state-grey' : !list.active && (!list.orangeSymbol || nodeShow),'state-orange': list.orangeSymbol&& !nodeShow}" @click="onNodesShow">
      <transition name="line-fade">
        <div class="line" v-show="list.lineShow || nodeShow"></div>
      </transition>
      <div class="list">
        <div class="date">
          <p class="first">{{list.local_day}}</p>
          <p class="second">{{list.local_time}}</p>
        </div>
        <div class="icon-box">
          <i class="iconfont icon" :class="{'icon-J_Orders' : list.state === 'so-confirmed' , 'icon-Factory icon-2': list.state === 'factories-preparing', 'icon-Ankerwebicon- icon-3' : list.state === 'warehouse-preparing' , 'icon-daifahuo icon-4' : list.state === 'manifested' , 'icon-J_Shipped icon-5' : list.state === 'delivered' || list.state === 'returned'}"></i>
        </div>
        <div class="message">
          <p class="message-title" v-if="!list.link_url">{{list.title}}</p>
          <p class="message-title" v-else>
            <a :href="list.link_url" class="click-a">{{list.title}}</a>
          </p>
          <p class="message-content">
            <span>{{list.msg}}</span>
          </p>
          <p class="message-tip" v-if=" list.orangeSymbol&& !nodeShow && list.state === 'warehouse-preparing' ">
            <router-link :to="{ name: 'serviceFactoryPrice',}" class="jump-a">
              {{$t('tips.processLong')}}
            </router-link>
          </p>
        </div>
      </div>
    </div>
    <transition name="slide-fade">
      <div class="list-son-box" v-show="nodeShow">
        <tracking-info-node v-for="(node,index) in list.nodes" :key="index" :node="node"></tracking-info-node>
      </div>
    </transition>
  </div>
</template>
<script>
  import TrackingInfoNode from '@/components/TrackingInfoNode'
  export default {
    components: {
      TrackingInfoNode
    },
    data () {
      return {
        nodeShow: false
      }
    },
    props: ['list'],
    computed: {
      lineShow () {

      }
    },
    methods: {
      onNodesShow () {
        if (this.list.nodes.length !== 0) {
          this.nodeShow = !this.nodeShow
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .line-fade-enter-active {
    transition: all 0.3s;
  }
  .line-fade-leave-active {
    transition: all 0.3s;
  }

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
      background-color: black;
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
    .icon-2 {
      font-size: px2rem(13);
      left: px2rem(3);
    }
    .icon-3 {
      font-size: px2rem(13);
      top: px2rem(3);
      left: px2rem(2.5);
    }
    .icon-4 {
      left: px2rem(-1);
      top: px2rem(3);
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
    * {
      color: #c5c5c5 !important;
    }
    .dot {
      background-color: #c5c5c5 !important;
    }
    .line {
      left: px2rem(97);
      border-left: 2px dashed #eeeeee !important;
    }
    .icon-box {
      border-color: #eeeeee !important;
    }
  }
  .state-orange {
    * {
      color: #fb8e00 !important;
    }
    .dot {
      background-color: #fb8e00 !important;
    }
    .line {
      left: px2rem(97);
      border-left: 2px dashed #eeeeee !important;
    }
    .icon-box {
      border-color: #fb8e00 !important;
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
