<template>
  <div class="balance-container">
    <section class="balance">
      <p>Your balance</p>
      <p class="total">USD {{balance}}</p>
      <p class="tips">Use balance for your next order</p>
    </section>

    <section class="balance-groups" v-if="balanceLogs && balanceLogs.length > 0">
      <p class="title">Bill</p>
      <div class="balance-item" v-for="(log, index) in balanceLogs" :key="index">
        <span class="use-money">{{log.amount}} USD</span>
        <p class='used-right'>
          <span class="used-way">{{log.op_type}}</span>
          <span class="used-date">{{log.create_date}}</span>
        </p>
      </div>
    </section>
    <section class="balance-empty-log" v-else>
      No balance logs
    </section>
  </div>
</template>

<script>
  export default {
    async created () {
      this.$loading.show()
      const res = await this.$store.dispatch('getBalanceLogs')
      this.balance = res.balance
      this.balanceLogs = res.show_logs
      this.$loading.hide()
    },
    data () {
      return {
        balance: 0,
        balanceLogs: []
      }
    }
  }
</script>


<style lang="scss" scoped>
  .balance-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    .balance {
      padding: px2rem(15);
      background: $white;
      .total {
        font-size: $large;
        padding: px2rem(10) 0;
      }
      .tips {
        color: $havelock-blue;
        font-size: $x-small;
      }
    }

    .balance-groups {
      margin-top: px2rem(10);
      .title {
        padding: px2rem(15);
        font-size: $medium;
        background: $white;
      }

      .balance-item {
        display: flex;
        justify-content: space-between;
        height: px2rem(50);
        align-items: center;
        background: $white;
        margin-top: px2rem(1);
        padding: 0 px2rem(15);
        .use-money {
          font-size: $medium;
        }

        .used-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          .used-date {
            font-size: $x-small;
            margin-top: px2rem(5);
            color: $dusty-gray;
          }
        }
      }
    }

    .balance-empty-log {
      flex: 1;
      background: white;
      margin-top: px2rem(10);
      text-align: center;
      padding-top: px2rem(20);
      font-size: px2rem(16);
    }
  }
</style>
