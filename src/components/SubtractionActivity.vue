<template>
  <div class="subtraction">
    <div class="sub-now">
      <p class="sub-info" v-if="isMaxOff">
        You've enjoyed {{symbol}}{{offAmount}}
      </p>
      <p class="sub-info" v-else>
        Add {{symbol}}
        <i>{{needAmount}}</i> for {{symbol}}
        <i>{{offAmount}}</i> OFF
      </p>
      <p class="expire-time">
        End in
        <span v-if="day > 0">
          <span class="time-day">{{day}}</span> Days
        </span>
        <span class="time-back time-hour">{{hour}}</span>&nbsp;:
        <span class="time-back time-minute">{{minute}}</span>
        <span v-if="day <= 0">&nbsp;:
          <span class="time-back time-second">{{second}}</span>
        </span>
      </p>
    </div>

    <p class="sub-content">{{subInfoText}}</p>
  </div>
</template>

<script>
  import {
    round
  } from '@/utils/common'
  export default {
    props: {
      subInfo: {
        type: Array,
        default: () => []
      },
      endTime: {
        type: Number,
        default: 100
      },
      totalAmount: {
        type: Number,
        default: 0
      },
      symbol: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        restTime: this.endTime,
        day: 0,
        hour: '00',
        minute: '00',
        second: '00',
        timer: null,
        needAmount: 0,
        offAmount: 0,
        isMaxOff: false
      }
    },
    created () {
      this.calcuAmount(this.totalAmount)
      this.timer = setInterval(() => {
        const timeArray = this.calcuTime(this.restTime)
        this.day = timeArray[0]
        this.hour = timeArray[1]
        this.minute = timeArray[2]
        this.second = timeArray[3]

        this.restTime -= 1
        if (this.restTime <= 0) {
          this.clearTimer()
        }
      }, 1000)
    },
    computed: {
      subInfoText () {
        return this.subInfo.map(item => {
          return `${item.off_amount} off ${item.min_order_amount}+`
        }).join(' / ')
      }

    },
    watch: {
      totalAmount (value) {
        this.calcuAmount(value)
      }
    },
    methods: {
      calcuTime (restTime) {
        const oneMinute = 60
        const oneHour = oneMinute * 60
        const oneDay = oneHour * 24

        const day = Math.floor(restTime / oneDay)

        restTime -= day * oneDay
        let hour = Math.floor(restTime / oneHour)
        if (hour < 10) {
          hour = '0' + hour
        }

        restTime -= hour * oneHour
        let minute = Math.floor(restTime / oneMinute)
        if (minute < 10) {
          minute = '0' + minute
        }

        restTime -= minute * oneMinute
        let second = restTime
        if (second < 10) {
          second = '0' + second
        }
        return [day, hour, minute, second]
      },
      calcuAmount (total) {
        this.isMaxOff = this.subInfo.every(item => {
          const restAmount = total - item.min_order_amount
          if (restAmount >= 0) {
            this.offAmount = item.off_amount
            return true
          } else {
            this.needAmount = round(-restAmount)
            this.offAmount = item.off_amount
            return false
          }
        })
      },
      clearTimer () {
        if (this.timer) {
          clearInterval(this.timer)
          this.timer = null
        }
      }
    },
    beforeDestroy () {
      this.clearTimer()
    }
  }
</script>

<style lang="scss" scoped>
  .subtraction {
    background: linear-gradient(to bottom, #b505fe, #d841f8);
    min-height: px2rem(55);
    color: $white;
    display: flex;
    justify-content: center;
    flex-direction: column;
    padding: px2rem(12);
    .sub-now {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .sub-info {
        font-weight: 500;
      }

      .expire-time {
        font-size: $x-small;
        .time-day {
          color: #fbf401;
        }

        .time-back {
          background: $mine-shaft;
          padding: px2rem(2);
          border-radius: px2rem(4);
          color: #fbf401;
        }
      }
    }
    .sub-content {
      margin-top: px2rem(5);
      color: #f8ddff;
    }
  }
</style>
