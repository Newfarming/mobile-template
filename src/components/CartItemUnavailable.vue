<template>
  <div class="item">
    <div class="behind">
      <button class="btn-delete" @click="delCartItem(item.productId, index,true)">{{$t('button.delete')}}</button>
    </div>
    <div class="item-content" :class="{left68:allUnableDeleteShow}">
      <div class="product-image">
        <router-link :to="{ name: 'product', params: { productId: item.templateId, defaultImage:item.imageUrl}}" class="product-item">
          <img :src="item.image">
        </router-link>
      </div>
      <div class="product-info">
        <div class="product-title"> {{item.name}}</div>
        <div class="product-bottom">
          <p class="outstock">
            <span>{{$t('cartText.outStock')}}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['item', 'allUnableDeleteShow', 'symbol', 'index'],
    methods: {
      delCartItem (val1, val2, val3) {
        this.$emit('delCartItem', val1, val2, val3)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .left68 {
    left: px2rem(-68) !important;
  }
  .item {
    position: relative;
  }
  .btn-delete {
    background: #e83a3a;
  }
  .behind {
    position: absolute;
    right: 0;
    height: 100%;
    font-size: 0;
    border-top: 1px solid $background-color;
    border-bottom: 1px solid $background-color;
    display: -webkit-flex;
    display: flex;
    button {
      height: 100%;
      width: px2rem(68);
      font-size: px2rem(16);
      color: white;
    }
  }
  .item-content {
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-align-items: center;
    align-items: center;
    padding: px2rem(15) px2rem(12);
    background: white;
    margin-top: px2rem(1);
    position: relative;
    left: 0;
    transition: left 0.2s ease-out;
  }
  .icon-xuanze {
    font-size: px2rem(22);
  }
  .icon-xuanzhong {
    font-size: px2rem(22);
    color: $flamingo;
  }
  .product-image {
    margin: 0 px2rem(15) 0 px2rem(13);
    border: 1px solid $dove-gray;
    min-width: px2rem(80);
    max-width: px2rem(80);
    min-height: px2rem(80);
    max-height: px2rem(80);
    width: px2rem(80);
    height: px2rem(80);
    text-align: center;
    position: relative;
  }
  .product-info {
    width: 100%;
  }
  .product-title {
    height: px2rem(38);
    word-break: break-all;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    line-height: px2rem(18);
    margin-bottom: px2rem(10);
  }
  .product-attr {
    color: $dove-gray;
  }
  .product-bottom {
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: row;
    flex-direction: row;
    -webkit-align-items: flex-end;
    align-items: flex-end;
    -webkit-justify-content: space-between;
    justify-content: space-between;
    .outstock {
      color: $dusty-gray;
      font-size: $small;
    }
    .product-price {
      span:first-child {
        font-size: px2rem(14);
        color: $flamingo;
        padding-right: px2rem(10);
      }
      span:last-child {
        font-size: px2rem(12);
        color: $dove-gray;
        text-decoration: line-through;
      }
    }
  }
  .operate-qty {
    height: px2rem(24);
    display: -webkit-flex;
    display: flex;
    color: $mine-shaft;
  }
  .btn-qty {
    width: px2rem(24);
    height: 100%;
    background: #f5f5f6;
    font-size: px2rem(12);
  }
  .quantity {
    width: px2rem(30);
    outline: none;
    border: 0;
    text-align: center;
    font-size: px2rem(12);
    color: $dove-gray;
    padding: 0;
    background: $title-background-color;
  }
  .product-image img {
    max-width: 100%;
    max-height: 100%;
  }
</style>
