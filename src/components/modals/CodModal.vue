<template>
  <modal :title="false" @modal-close="$emit('modal-close')" :static="true">
    <div class="cod-container">
      <p class="title">{{$t(titleText)}}</p>
      <section class="cod-content" v-if="!isShowMoreDetail">
        <p>{{$t('modal.cod.p1')}}</p>
        <div>
          <i v-for="(reason, index) in errorReasons" :key="index">&nbsp;&nbsp;&nbsp;&nbsp;{{$t(`modal.cod.i${reason}`, reason === 2? {symbol: symbol, limit:limit }: {})}}</i>
        </div>
        <p>{{$t('modal.cod.p2')}}</p>
        <p class="see-more" @click="onClickMoreDetail">{{$t('modal.cod.p3')}}</p>
      </section>
      <section class="cod-content detail-content" v-else>
        <p>{{$t('modal.cod.p1')}}</p>
        <div>
          <i>&nbsp;&nbsp;&nbsp;&nbsp;1. {{$t('modal.cod.i1')}}</i>
          <i>&nbsp;&nbsp;&nbsp;&nbsp;2. {{$t('modal.cod.i2', {symbol: symbol, limit:limit })}}</i>
          <i>&nbsp;&nbsp;&nbsp;&nbsp;3. {{$t('modal.cod.i3')}}</i>
          <i>&nbsp;&nbsp;&nbsp;&nbsp;4. {{$t('modal.cod.i4')}}</i>
          <i>&nbsp;&nbsp;&nbsp;&nbsp;5. {{$t('modal.cod.i5')}}</i>
        </div>
        <p>{{$t('modal.cod.p2')}}</p>
      </section>
      <footer>
        <p @click="$emit('modal-close')">{{$t('button.ok')}}</p>
      </footer>
    </div>
  </modal>
</template>


<script>
  import Modal from '@/components/common/Modal'
  export default {
    components: {
      Modal
    },
    props: {
      symbol: {
        type: String,
        required: true
      },
      limit: {
        type: Number,
        default: 0
      },

      isDetail: {
        type: Boolean,
        default: false
      },
      reasons: {
        type: Object,
        default: () => { }
      }
    },
    data () {
      return {
        isShowMoreDetail: this.isDetail,
        errorText: {
          'not_allow_pincode': 1,
          'not_allow_total': 2,
          'battery_included': 3,
          'product_nos_50': 3,
          'cod_times_exhausted': 4,
          'in_black_list': 5
        }
      }
    },
    methods: {
      onClickMoreDetail () {
        this.isShowMoreDetail = true
      }
    },
    computed: {
      titleText () {
        return this.isShowMoreDetail ? 'modal.cod.t1' : 'modal.cod.t2'
      },
      errorReasons () {
        return Object.keys(this.reasons || {})
          .filter(key => {
            return this.reasons[key]
          }).map(key => {
            return this.errorText[key]
          })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .cod-container {
    display: flex;
    flex-direction: column;
    width: 28rem;
    min-height: 36rem;
    max-height: px2rem(475);
    .title {
      height: px2rem(44);
      line-height: px2rem(44);
      background: $flamingo;
      text-align: center;
      font-size: $large;
      color: $white;
      letter-spacing: 0;
      border-top-left-radius: px2rem(4);
      border-top-right-radius: px2rem(4);
    }
    .cod-content {
      flex: 1;
      padding: 0 px2rem(20);
      margin-top: px2rem(15);
      color: $dove-gray;
      letter-spacing: 0;
      line-height: px2rem(18);
      .see-more {
        color: $havelock-blue;
        margin-top: px2rem(15);
      }
      > div {
        color: $dusty-gray;
        margin: px2rem(15) 0;
        > i {
          margin-top: px2rem(15);
          display: block;
        }
      }
      &.detail-content {
        max-height: px2rem(250);
        overflow: auto;
      }
    }
    > footer {
      height: px2rem(77);
      padding: 0 px2rem(20);
      display: flex;
      align-items: center;
      p {
        width: 100%;
        background: $flamingo;
        border-radius: 2px;
        font-size: $large;
        color: $white;
        letter-spacing: 0;
        text-align: center;
        height: px2rem(38);
        line-height: px2rem(38);
        border-bottom-left-radius: px2rem(4);
        border-bottom-right-radius: px2rem(4);
      }
    }
  }
</style>
