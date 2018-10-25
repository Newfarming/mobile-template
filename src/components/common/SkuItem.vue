<template>
  <div class="product-item">
    <div class="product-image">
      <img :src="product.imageUrl" alt="">
    </div>
    <div class="product-content">
      <p class="product-name">{{product.productName}}</p>
      <p class="product-attrs">{{product.attrs}}</p>
      <div class="product-info">
        <p>
          <span class="product-price">{{symbol}} {{product.price|round}}</span>
          <span class="product-c-price">{{product.platformPrice|round}}</span>
        </p>
        <span class="product-qty">x {{product.quantity}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      symbol: {
        type: String,
        required: true
      },
      product: {
        type: Object,
        default: () => {
          return {}
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .product-item {
    display: flex;
    padding: px2rem(10) px2rem(15);
    border-bottom: $border;

    .product-image {
      width: px2rem(80);
      height: px2rem(80);
      margin-right: px2rem(15);
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
    .product-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .product-name {
        color: $dove-gray;
        height: px2rem(40);
        line-height: px2rem(20);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .product-attrs {
        color: $dusty-gray;
      }

      .product-info {
        color: $dusty-gray;
        display: flex;
        justify-content: space-between;

        .product-price {
          color: $flamingo;
          margin-right: px2rem(10);
        }
        .product-c-price {
          text-decoration: line-through;
        }
        .product-qty {
          color: $dove-gray;
        }
      }
    }
  }
</style>

