<template>
  <div class="empty-box">
    <div class="cart-empty">
      <i class="iconfont" :class="{' icon-J_Orders':orderClass === 'orders' , 'icon-J_Unpaid':orderClass === 'Unpaid' , 'icon-J_Preparing':orderClass === 'Preparing', 'icon-J_Shipped':orderClass === 'icon-J_Shipped', 'icon-J_Review':orderClass === 'Reviews', 'icon-J_Refund':orderClass === 'Refund','icon-J_Paid':orderClass === 'Paid'}"></i>
      <p class="cart-empty-text">{{$t('order.empty')}}</p>
      <p>
        <button class="btn btn-go-shopping" @click="jumphome">{{$t('button.goShopping')}}</button>
      </p>
    </div>
  </div>

</template>
<script>
  export default {
    props: ['orderClass'],
    methods: {
      jumphome () {
        this.$router.push({ name: 'home' })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .empty-box {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: $white;
  }
  .cart-empty {
    text-align: center;
    padding-top: 25%;
    color: #bbbbbb;
  }
  .iconfont {
    font-size: px2rem(128);
  }
  .cart-empty-text {
    position: relative;
    //   top: px2rem(-20);
    color: $dusty-gray;
    margin-top: px2rem(6);
    margin-bottom: px2rem(18);
    font-size: px2rem(18);
  }
  .cart-empty {
    .btn-go-shopping {
      color: $white;
      background: $flamingo;
      height: px2rem(40);
      font-size: px2rem(18);
      border-radius: px2rem(20);
      padding: 0 px2rem(30);
      border: none;
      outline: none;
    }
  }
</style>
