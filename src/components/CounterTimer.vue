<template>
  <div class="clock">
    <span v-bind:key="timeData[0].label" class="piece" :id="timeData[0].elementId">
      <span class="card">
        <p :style="bgStyle" v-bind:data-value="timeData[0].current | twoDigits"></p>
      </span>
      <span :style="labelStyle" v-show="showLabel" class="label">{{timeData[0].label}}</span>
    </span>
    <span :style="spStyle" class="seperator"> : </span>
    <span v-bind:key="timeData[1].label" class="piece" :id="timeData[1].elementId">
      <span class="card">
        <p :style="bgStyle" v-bind:data-value="timeData[1].current | twoDigits"></p>
      </span>
      <span :style="labelStyle" v-show="showLabel" class="label">{{timeData[1].label}}</span>
    </span>
    <span :style="spStyle" class="seperator"> : </span>
    <span v-bind:key="timeData[2].label" class="piece" :id="timeData[2].elementId">
      <span class="card">
        <p :style="bgStyle" v-bind:data-value="timeData[2].current | twoDigits"></p>
      </span>
      <span :style="labelStyle" v-show="showLabel" class="label">{{timeData[2].label}}</span>
    </span>
  </div>
</template>

<script>
  export default {
    name: 'counterTimer',
    props: {
      showLabel: {
        type: Boolean,
        default: true,
      },
      deadline: {
        type: Number,
        default: 0,
      },
      stop: {
        type: Boolean
      },
      color: {
        type: String,
        default: '#46247D',
      },
      labelColor: {
        type: String,
        default: 'white',
      },
    },
    data () {
      return {
        now: 0,
        show: false,
        interval: null,
        timeData: [
          {
            current: 0,
            previous: 0,
            label: 'HRS',
            elementId: 'clock-hours'
          },
          {
            current: 0,
            previous: 0,
            label: 'MINS',
            elementId: 'clock-minutes'
          },
          {
            current: 0,
            previous: 0,
            label: 'SECS',
            elementId: 'clock-seconds'
          }
        ]
      }
    },
    created () {
      // if (+this.deadline < 0) {
      //   throw new Error('Positive Deadline Needed')
      // }
      // this.now = Math.trunc(+this.deadline)
      // this.interval = setInterval(() => {
      //   this.now--;
      // }, 1000)
    },
    mounted () {
      if (this.now > 0) {
        this.show = true
      }
    },
    computed: {
      seconds () {
        return Math.trunc(this.now) % 60
      },
      minutes () {
        return Math.trunc(this.now / 60) % 60
      },
      hours () {
        return Math.trunc(this.now / 60 / 60)
      },
      // style pass through
      bgStyle () {
        return `background-color: ${this.color}`
      },
      spStyle () {
        return `color: ${this.color}`
      },
      labelStyle () {
        return `color: ${this.labelColor}`
      },
    },
    watch: {
      now (value) {
        if (value <= 0 || this.stop) {
          clearInterval(this.interval)
        } else {
          this.updateTime(0, this.hours)
          this.updateTime(1, this.minutes)
          this.updateTime(2, this.seconds)
        }
      }
    },
    filters: {
      twoDigits (value) {
        if (value.toString().length <= 1) {
          return '0' + value.toString()
        }
        return value.toString()
      }
    },
    methods: {
      timeStart () {
        // this.deadline = 10
        if (+this.deadline < 0) {
          throw new Error('Positive Deadline Needed')
        }
        console.log('deadline', this.deadline)
        this.now = Math.trunc(+this.deadline)
        if (!this.interval) {
          this.interval = setInterval(() => {
            this.now--;
            if (this.now <= 0) {
              this.$emit('timeClear')
              clearInterval(this.interval)
            }
          }, 1000)
        }
      },
      updateTime (idx, newValue) {
        if (idx >= this.timeData.length || newValue === undefined) {
          return
        }

        if (window['requestAnimationFrame']) {
          this.frame = requestAnimationFrame(this.updateTime.bind(this))
        }

        const d = this.timeData[idx]
        const val = (newValue < 0 ? 0 : newValue)

        if (val !== d.current) {
          d.previous = d.current
          d.current = val
        }
      }
    },
    beforeDestroy () {
      if (window['cancelAnimationFrame']) {
        cancelAnimationFrame(this.frame)
      }
    },
    destroyed () {
      clearInterval(this.interval)
    }
  }
</script>

<style scoped lang="scss">
  $size: 2.4rem;
  $borderRadius: 5px;

  .clock {
    display: inline-flex;
    justify-content: space-between;
    text-align: center;
    margin: 0 auto;
    *,
    *:before,
    *:after {
      box-sizing: border-box;
    }

    span {
      flex-spacing: 10px;
    }

    .card {
      position: relative;
      font-size: 1.5rem;
      overflow: hidden;
      p {
        height: $size;
        width: $size;
        line-height: $size;
        text-align: center;
        border-radius: $borderRadius;
        &::after {
          content: attr(data-value);
          color: white;
        }
      }
    }

    .seperator {
      line-height: $size;
      text-align: center;
      min-width: 10px;
    }

    .piece {
      display: inline-block;
      margin: 0 0.2vw;

      @media (min-width: 1000px) {
        margin: 0 px2rem(5);
      }
    }

    .label {
      font-size: 1rem;
      line-height: 1.5;
      display: block;
    }

    @media (min-width: 1000px) {
      .label {
        font-size: 1.2rem;
      }
      .card {
        font-size: 3rem;
      }
    }
  }
</style>
