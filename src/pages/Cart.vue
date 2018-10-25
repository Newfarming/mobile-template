<template>
  <div class="cart-content">
    <!-- <subtraction&#45;activity :end&#45;time="amountOff.expire_time" :sub&#45;info="amountOffCoupons" :total&#45;amount="totalPay" :symbol="symbol" v&#45;if="!isCartEmpty &#38;&#38; amountOff.expire_time>0"></subtraction&#45;activity> -->
    <div class="shipping-info" v-if="availableItems.length > 0">
      <div>
        <p>{{$t('cartText.total')}}:
          <span class="sub-total">{{symbol}} {{totalPay | round}}</span>
        </p>
        <p class="shipping-free">{{shippingFee}}</p>
      </div>
      <div class="md-btn btn-buy-now" :class="{'btn-normal': buyNowShow}" @click="onBuyNowClick">
        {{$t('button.buyNow')}}
        <span class="choose-count" v-show="buyNowShow">({{totalQuantity}})</span>
      </div>
    </div>

    <div id="cart-container">
      <div class="empty-box" v-if="isCartEmpty">
        <div class="cart-empty">
          <i class="iconfont icon-gouwuche"></i>
          <p class="cart-empty-text">{{$t('cartText.empty')}}</p>
          <p>
            <button class="btn btn-go-shopping" @click="onShoppingClick">{{$t('button.goShopping')}}</button>
          </p>
        </div>
      </div>
      <div class="cart-full" v-else>
        <div class="cart-available available" v-if="availableItems.length > 0">
          <div class="available-header">
            <i class="iconfont icon-xuanze" :class="{'icon-xuanzhong':allCheck}" @click="onAllCheckedClick"></i>
            <p>
              <span class="select-all" v-html="$t('cartText.selectAll')"></span>
              <span class="btn-cart-edit" @click="onClickAvailableEdit">{{$t(availableEdit)}}</span>
            </p>
          </div>
          <div v-show="showPriceOff" class="amountoff-timer timer-background">
            <div class="save-container">
              <div class="save-info">
                <span class="save-item" v-for="(item, idx) in amountOffCoupons">
                  Save {{symbol}}{{item.off_amount}} on {{symbol}}{{item.min_order_amount}}
                </span>
              </div>
              <div class="save-timer">
                <counter-timer label-color="#FFFFFF" :deadline="amountOff.expire_time" v-on:timeClear="timeClear" ref="childtimer" />
                <span class="ends">Ends in </span>
              </div>
            </div>
          </div>
          <cart-item-available v-for="(item,index) in availableItems" :symbol="symbol" :all-delete-show="allDeleteShow" :item="item" :index="index" v-on:quantityChange="quantityChange" v-on:quantityChangeMethod="quantityChangeMethod" v-on:delCartItem="delCartItem" v-on:selectChoose="selectChoose" :key="index"></cart-item-available>
        </div>
        <div class="cart-available unavailable" v-if="unavailableItems.length > 0">
          <div class="available-header">
            <p class="unavailable">{{$t('cartText.unavailable')}}
              <span class="btn-cart-edit" @click="methodUnableDeleteTabShow">{{$t(unavailableEdit)}}</span>
            </p>
          </div>
          <cart-item-unavailable v-for="(item,index) in unavailableItems" :symbol="symbol" :index="index" :all-unable-delete-show="allUnableDeleteShow" :item="item" v-on:delCartItem="delCartItem" :key="index"></cart-item-unavailable>
        </div>
      </div>
    </div>
    <div class="modal-fix" v-show="deleteModalShow">
      <div class="deleteOrderModal">
        <div class="modal_dialog">
          <div class="modal_title">
            Are you sure to delete this item ?
          </div>
          <div class="modal_btn clearfix">
            <div class="modal_no_btn" @click="deleteModalFalse">No</div>
            <div class="modal_delete_btn" @click="delCartItem(OUTproductId, OUTindex, OUTifUnAvailable)">Delete</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import CartItemAvailable from '@/components/CartItemAvailable'
  import CartItemUnavailable from '@/components/CartItemUnavailable'
  import SubtractionActivity from '@/components/SubtractionActivity'
  import CounterTimer from '@/components/CounterTimer'
  import {
    mapGetters,
  } from 'vuex'
  import {
    saveChosenProduct,
    deleteChosenProduct,
    getChosenProducts,
    deleteAllChosenProduct,
  } from '@/utils'
  import {
    calcShippingInfo,
    round
  } from '@/utils/common'

  import googleAnalytics from '@/setup/setup-google-analytics'

  export default {
    components: {
      CartItemAvailable,
      CartItemUnavailable,
      SubtractionActivity,
      CounterTimer,
    },
    async created () {
      this.$loading.show()
      await this.getCartData()
      this.$loading.hide()

      // 上报购物车数据
      this.availableItems.map((item, index) => {
        googleAnalytics.addImpression(item, index, 'Cart')
      })
      googleAnalytics.sendPageView(this.$route.path)
    },
    data () {
      return {
        clear: false,
        cartData: [],
        availableItems: [],
        unavailableItems: [],
        OUTproductId: '',
        OUTindex: '',
        OUTifUnAvailable: '',
        editDeleteShow: false,
        allDeleteShow: false,
        allUnableDeleteShow: false,
        totalPay: 0,
        totalQuantity: 0,
        allCheck: false,
        deleteModalShow: false,
        freeShippingCost: 0,
        coupons: [
          {
            template_id: 748,
            min_order_amount: 3000,
            off_amount: 450
          },
          {
            template_id: 747,
            min_order_amount: 1800,
            off_amount: 180
          },
          {
            template_id: 746,
            min_order_amount: 1000,
            off_amount: 70
          }
        ],
      }
    },
    computed: {
      ...mapGetters({
        amountOff: 'amountOff',
      }),
      availableEdit () {
        return this.allDeleteShow ? 'button.done' : 'button.edit'
      },
      unavailableEdit () {
        return this.allUnableDeleteShow ? 'button.done' : 'button.edit'
      },
      symbol () {
        return this.$store.state.symbol || 'USD'
      },
      countryCode () {
        return this.$store.state.countryCode
      },
      amountOffCoupons () {
        return this.amountOff.coupons ? this.amountOff.coupons.reverse() : []
      },
      shippingFee () {
        if (this.totalPay < this.freeShippingCost) {
          return this.$i18n.t('cartText.shippingFee', { symbol: this.symbol, shippingFee: this.shippingDeliver })
        } else {
          return this.$i18n.t('cartText.shippingFree')
        }
      },
      buyNowShow () {
        return this.totalQuantity > 0
      },
      isCartEmpty () {
        return this.availableItems.length === 0 && this.unavailableItems.length === 0
      },
      showPriceOff () {
        console.log('this.$refs ', this.$refs)
        return this.amountOff ?.expire_time > 0 && !this.clear
        // return false
      }
    },
    watch: {
      availableItems: {
        handler (val) {
          this.totalQuantityCalculate()
        },
        deep: true// 对象内部的属性监听，也叫深度监听
      },
      amountOff: {
        handler (val) {
          if (val.expire_time > 0 && this.$refs ?.childtimer) {
            this.$refs.childtimer.timeStart();
          }
        },
        deep: true// 对象内部的属性监听，也叫深度监听
      }
    },
    methods: {
      timeClear () {
        this.clear = true
      },
      deleteModalFalse () {
        this.deleteModalShow = false
      },
      async getCartData () {
        if (this.countryCode === 'in') {
          this.$store.dispatch('getThemes')
        }
        let cartData = await this.$store.dispatch('getCart')
        this.unavailableItems = cartData.unavailableItems
        const {
          delivery_info: deliveryInfo,
          prepare_info: prepareInfo,
          shipping_costs: shippingCosts
        } = cartData.shippingInfo
        const shippingInfo = calcShippingInfo(shippingCosts, deliveryInfo, prepareInfo)
        this.shippingDeliver = round(shippingInfo.shippingFee)
        this.freeShippingCost = shippingInfo.orderShippingAmount
        this.$store.commit('setShippingInfo', shippingInfo)

        const chosenProducts = getChosenProducts()
        let availableSkuIds = []
        this.availableItems = cartData.availableItems.map(item => {
          item.isChecked = chosenProducts.includes(item.skuId)
          if (item.isChecked) {
            availableSkuIds.push(item.skuId)
          }
          return item
        })
        // 先删除全部的商品
        deleteAllChosenProduct()
        // 保存当前选中的可用商品
        saveChosenProduct(availableSkuIds)

        this.$store.commit('setCartNumber', this.calTotalQuantity())
        this.allCheck = this.isAllChecked()
      },
      async delCartItem (productId, index, ifUnAvailable) {
        if (this.deleteModalShow === false) {
          this.deleteModalShow = true
          this.OUTproductId = productId
          this.OUTindex = index
          this.OUTifUnAvailable = ifUnAvailable
        } else {
          this.deleteModalShow = false
          await this.$store.dispatch('delCartItem', productId)
          this.$toast.success('delete success')
          if (ifUnAvailable) {
            this.unavailableItems.splice(index, 1)
          } else {
            const delItems = this.availableItems.splice(index, 1)
            if (delItems && delItems.length > 0) {
              const delItem = delItems[0]
              googleAnalytics.addProduct(delItem, index)
              googleAnalytics.doECAction('remove')
              googleAnalytics.sendEvent({
                ec: 'Product',
                ea: 'Cart',
                el: `Remove Cart ${delItem.productNo}`
              })
            }
          }
          this.$store.commit('setCartNumber', this.calTotalQuantity())
          this.allCheck = this.isAllChecked()
        }
      },
      selectChoose (item) {
        if (item.isChecked) {
          item.isChecked = false
          this.allCheck = false
          deleteChosenProduct([item.skuId])
        } else {
          item.isChecked = true
          saveChosenProduct([item.skuId])
          this.allSelectDeal()
        }
      },
      allSelectDeal () {
        this.allCheck = true
        this.availableItems.forEach(value => {
          if (!value.isChecked) {
            this.allCheck = false
            return false
          }
        })
      },
      onAllCheckedClick () {
        this.allCheck = !this.allCheck
        this.availableItems.forEach(value => {
          value.isChecked = this.allCheck
        })

        const skuIds = this.availableItems.map(item => item.skuId)
        if (this.allCheck) {
          saveChosenProduct(skuIds)
        } else {
          deleteChosenProduct(skuIds)
        }
      },
      quantityChangeMethod (value) {
        if (!(value.quantity >= 1)) {
          value.quantity = 1
        } else if (value.quantity > 99) {
          value.quantity = 99
        } else {
          value.quantity = parseInt(value.quantity)
        }
        this.$store.dispatch('updateProductQty', {
          skuId: value.skuId,
          qty: value.quantity
        }).then(() => {
          this.$store.commit('setCartNumber', this.calTotalQuantity())
        })
      },
      async quantityChange (item, symbol) {
        let num = item.quantity
        if (symbol === '+') {
          num++
        } else if (num > 1) {
          num--
        }
        if (num > 99) {
          num = 99
        }
        await this.$store.dispatch('updateProductQty', {
          skuId: item.skuId,
          qty: num
        })
        item.quantity = num
        this.$store.commit('setCartNumber', this.calTotalQuantity())
      },
      calTotalQuantity () {
        return this.availableItems.reduce((qty, item) => {
          return qty + item.quantity
        }, 0)
      },
      totalQuantityCalculate () {
        this.totalPay = 0
        this.totalQuantity = 0
        this.availableItems.forEach(value => {
          if (value.isChecked) {
            this.totalQuantity += Number(value.quantity)
            this.totalPay += value.salePrice * value.quantity
          }
        })
      },
      onClickAvailableEdit () {
        this.allDeleteShow = !this.allDeleteShow
      },
      methodUnableDeleteTabShow () {
        this.allUnableDeleteShow = !this.allUnableDeleteShow
      },
      onShoppingClick () {
        googleAnalytics.sendEvent({
          ec: 'Product',
          ea: 'Go Home Click',
          el: 'Home'
        })
        this.$router.push({ name: 'home' })
      },

      onBuyNowClick () {
        if (this.buyNowShow) {
          // 计算下总金额
          const totalPayUS = this.availableItems
            .filter(item => item.isChecked)
            .reduce((total, item) => {
              return total + item.priceUS * item.quantity
            }, 0)
          googleAnalytics.sendEvent({
            ec: 'Checkout',
            ea: 'Click Buy Now',
            el: `Click Buy Now & ${totalPayUS}`
          })
          this.$router.push({ name: 'payment' })
        }
      },

      /**
       * 检测是否全部选中
       */
      isAllChecked () {
        return this.availableItems.every(item => {
          return item.isChecked
        })
      }
    }

  }
</script>

<style lang="scss" scoped>
  .cart-content {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow: hidden;
    height: 100%;

    .shipping-info {
      height: px2rem(60);
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: $white;
      padding: 0 px2rem(12);
      border-bottom: $border;
      font-size: $medium;

      .sub-total {
        color: $flamingo;
      }

      .shipping-free {
        font-size: $x-small;
        margin-top: px2rem(5);
      }

      .btn-buy-now {
        min-width: px2rem(120);
        line-height: px2rem(50);
        height: px2rem(50);
        background: $dusty-gray;
        color: $white;
        border-radius: px2rem(4);
        font-size: $medium;
        &.btn-normal {
          background: $flamingo;
        }
      }
    }

    .modal-fix {
      z-index: 2500;
      background: rgba(0, 0, 0, 0.4);
      width: 100%;
      height: 100%;
      position: fixed;
      top: 0px;
      .deleteOrderModal {
        position: absolute;
        top: 35vh;
        width: 100%;
        .modal_dialog {
          background-color: $white;
          border-radius: px2rem(10);
          margin: 0 14%;
        }
        .modal_title {
          text-align: center;
          padding: px2rem(20);
          font-size: px2rem(18);
          color: $mine-shaft;
        }
        .modal_btn div {
          display: inline-block;
          text-align: center;
          width: 50%;
          color: $flamingo;
          font-size: px2rem(18);
          height: px2rem(50);
          line-height: px2rem(50);
        }
        .modal_btn {
          border-top: 1px solid $mecury;
          display: flex;
        }
        .modal_btn div:first-child {
          border-right: 1px solid $mecury;
        }
      }
    }

    #cart-container {
      flex: 1;
      overflow: hidden;
      .empty-box {
        height: 100%;
        width: 100%;
        background-color: $white;
        .cart-empty {
          text-align: center;
          padding-top: 25%;
          color: $icon-color;
        }
        .icon-gouwuche {
          font-size: px2rem(128);
        }
        .cart-empty-text {
          position: relative;
          margin-bottom: px2rem(18);
          font-size: $large;
          color: $dusty-gray;
        }
        .btn-go-shopping {
          color: $white;
          background: $flamingo;
          height: px2rem(40);
          font-size: $large;
          border-radius: px2rem(20);
          padding: 0 px2rem(30);
          border: none;
          outline: none;
        }
      }

      .cart-full {
        color: $dove-gray;
        .available-header {
          height: px2rem(48);
          line-height: px2rem(48);
          padding: 0 px2rem(12);
          background: $title-background-color;
          position: relative;
          p {
            padding-left: px2rem(38);
            &.unavailable {
              padding-left: 0;
            }
            .select-all {
              span {
                color: $flamingo;
              }
            }
          }
          .icon-xuanze {
            font-size: px2rem(22);
            position: absolute;
          }
          .icon-xuanzhong {
            font-size: px2rem(22);
            color: $flamingo;
          }
          .btn-cart-edit {
            float: right;
            padding: 0 px2rem(10);
            color: $flamingo;
          }
        }
      }
    }
    .amountoff-timer {
      width: 100vw;
      height: 17vw;
      position: relative;
      .save-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        max-width: 100vw;
        overflow-x: auto;
        .save-info {
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 400;
          letter-spacing: 0.1rem;
          .save-item {
            white-space: nowrap;
            color: white;
            font-size: 2.9vw;
            &:not(:last-child) {
              &::after {
                content: '/';
                letter-spacing: 1vw;
              }
            }
          }
        }
        .save-timer {
          direction: rtl;
          * {
            direction: ltr;
          }
          .ends {
            color: #3D0E98;
          }
        }
      }
    }
  }
</style>
