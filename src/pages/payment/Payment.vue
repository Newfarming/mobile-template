<template>
  <div class="payment-container">
    <div class="payment-content">
      <div v-if="!isEditAddress">
        <shipping-to :name="partnerInfo.name" :phone="phoneNumber" :street="addressStreet" :city="partnerInfo.city" :state="partnerInfo.state" :zip="partnerInfo.zip" :country="countryName"></shipping-to>
        <div class="m-btn-edit" @click="onEditAddressClick" v-if="!isEditAddress">{{$t('button.editAddress')}}</div>
      </div>
      <section class="address-group" v-else>
        <div class="guest-login" v-if="!isLogin">
          <button class="btn-guest-login" @click="onLoginClick">{{$t('button.guest')}}</button>
          <p>{{$t('tips.checkGuest')}}</p>
        </div>
        <template v-for="address in addressData">
          <md-textarea v-if="address.type === 'textarea'" :name="address.name" :key="address.name" v-model="address.value" :placeholder="address.placeholder" :disabled="!!address.isDisabled" :validate="address.validate" :maxlength="address.maxlength || 0"></md-textarea>

          <md-select v-else-if="address.type === 'select'" :name="address.name" :key="address.name" v-model="address.value" :placeholder="address.placeholder" :disabled="!!address.isDisabled">
            <template slot='options'>
              <option :value="option.value" v-for="option in address.options" :key="option.value" required>{{option.label}}</option>
            </template>
          </md-select>

          <md-input v-else :name="address.name" :key="address.name" :type="address.type" v-model="address.value" :placeholder="address.placeholder" :disabled="!!address.isDisabled" @input-change="address.onChange? address.onChange(address.value): ''" :validate="address.validate" :maxlength="address.maxlength || 0" :fixed-tip="address.fixedTip" :error-text="address.errorText">
            <span class="item-tips" v-if="address.tips" v-html="$t(address.tips)"></span>
          </md-input>
        </template>
      </section>

      <section class="coupon" @click="onCouponSelectClick" v-if="orderInfo.coupons && orderInfo.coupons.length > 0">
        <i class="iconfont icon-J_Coupon"></i>
        <p v-if="chosenCoupon.name">{{chosenCoupon.name}}</p>
        <p v-else>{{$t('paymentText.useCoupon')}} (
          <span class="coupon-num">{{orderInfo.coupons.length}} {{$t('paymentText.available')}}</span> )</p>
        <i class="iconfont icon-qianjin"></i>
      </section>

      <product-summary :products="orderLines" :symbol="symbol"></product-summary>
      <price-group :symbol="symbol" :group="priceInfo"></price-group>
    </div>

    <footer>
      <div class="m-btn" @click="onSubmitOrderClick">
        {{$t('button.submitOrder')}}
      </div>
    </footer>

    <lightbox v-if="isCouponSelectShow">
      <coupons :coupons="orderInfo.coupons" :is-available="true" :can-choose="true" :default-id="chosenCoupon.id || 0" @coupon-choose="handleCouponChosen"></coupons>
    </lightbox>

  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'

  import {
    getChosenProducts,
    isItaly
  } from '@/utils'
  import {
    COUNTRY_MAP,
    transCountry2Id
  } from '@/config'
  import googleAnalytics from '@/setup/setup-google-analytics'
  import ProductSummary from '@/components/ProductSummary'
  import PriceGroup from '@/components/PriceGroup'
  import ShippingTo from '@/components/ShippingTo'
  import MdInput from '@/components/common/MdInput'
  import MdTextarea from '@/components/common/MdTextarea'
  import MdSelect from '@/components/common/MdSelect'
  import Coupons from '@/components/Coupons'
  import Lightbox from '@/components/common/Lightbox'
  export default {
    components: {
      ProductSummary,
      PriceGroup,
      ShippingTo,
      MdInput,
      MdTextarea,
      MdSelect,
      Coupons,
      Lightbox
    },
    async created () {
      const skuId = this.$route.query.skuId
      const quantity = this.$route.query.quantity
      let params = {}
      if (skuId && quantity) {
        this.isBuyBow = true
        params = {
          skuId: [skuId],
          quantity: [quantity]
        }
        this.buyNowData = params
      } else {
        this.chosenProducts = getChosenProducts()
        params = {
          chosenSku: this.chosenProducts
        }
      }
      this.$loading.show()
      this.$store.dispatch('getOrderPreview', params).then(orderInfo => {
        this.$loading.hide()
        this.priceInfo = Object.assign({}, orderInfo)
        if (orderInfo.couponInfo) {
          this.chosenCoupon = orderInfo.couponInfo
          this.calPriceInfo()
        }
        // 计算国家
        const country = COUNTRY_MAP[this.countryCode]
        this.country.value = country.name
        this.countryInfo = country

        if (this.partnerInfo && this.partnerInfo.country_id) {
          // 初始化地址信息
          this.email.value = this.partnerInfo.email
          this.name.value = this.partnerInfo.name
          this.zipcode.value = this.partnerInfo.zip
          this.phone.value = this.partnerInfo.phone
          this.street.value = this.partnerInfo.street2

          // 如果国家不一致则编辑地址
          const tempCountryInfo = this.countryIdMap[this.partnerInfo.country_id]
          if (tempCountryInfo && tempCountryInfo.code === this.countryCode) {
            this.isEditAddress = false
          }
          // this.isEditAddress = this.countryIdMap[this.partnerInfo.country_id].code !== this.countryCode

          if (this.isIndia) {
            this.indiaCity.value = this.partnerInfo.city
            this.indiaState.value = this.partnerInfo.state
            const indiaStreet = this.partnerInfo.street && this.partnerInfo.street.india
            if (indiaStreet) {
              this.flat.value = indiaStreet.flat
              this.colony.value = indiaStreet.colony
              this.landmark.value = indiaStreet.landmark
            } else {
              this.isEditAddress = true
            }
          } else {
            this.city.value = this.partnerInfo.city
            this.state.value = this.partnerInfo.state
          }
        }
        // 其他的一些信息重新初始化

        // this.zipcode.placeholder = this.isIndia ? 'placeholder.pincode' : (isItaly ? 'placeholder.CAP' : 'placeholder.zip')

        // let abc = this.isIndia ? 'Pincode' : (isItaly ? 'placeholder.CAP' : 'Zipcode')

        this.zipcode.maxlength = country.maxlength || ''
        this.phone.placeholder = this.phoneInfo.code ? this.$i18n.t('placeholder.phoneNumWithCode', { code: ` +${this.phoneInfo.code}` }) : 'placeholder.phoneNum'
        this.phone.maxlength = this.phoneInfo.length
        let abc = ''
        if (isItaly()) {
          console.log('isItaly')
          abc = 'CAP'
          this.state.placeholder = 'Province'
          this.zipcode.placeholder = 'placeholder.CAP'
        } else if (this.isIndia) {
          abc = 'Pincode'
          this.zipcode.placeholder = 'placeholder.pincode'
        } else {
          abc = 'ZipCode'
          this.zipcode.placeholder = 'placeholder.zip'
        }
        this.zipcode.fixedTip = `${abc} ${country.zipTips || ''}`
        // 当国家为意大利时 state改为province zipCode改为CAP
        // if (isItaly) {
        //   this.state.placeholder = 'Province'
        //   this.zipcode.placeholder = 'CAP'
        // }
        if (this.isIndia) {
          this.addressData = [
            this.email,
            this.name,
            this.country,
            this.phone,
            this.zipcode,
            this.flat,
            this.colony,
            this.landmark,
            this.indiaState,
            this.indiaCity
          ]
        } else {
          import(/* webpackChunkName: "states" */ '@/assets/json/state/index').then(resp => {
            // 先给非印度国家重新赋值 state_id
            let states = resp.default[this.countryCode]
            states.every(item => {
              if (item.label === this.state.value) {
                this.state.value = item.value
                return false
              } else {
                return true
              }
            })
            this.state.options = states
            // 判断下是否需要邮编，不需要邮编就不显示邮编输入框
            if (this.countryInfo.zipTips) {
              this.addressData = [
                this.email,
                this.name,
                this.country,
                this.street,
                this.state,
                this.city,
                this.zipcode,
                this.phone
              ]
            } else {
              this.addressData = [
                this.email,
                this.name,
                this.country,
                this.street,
                this.state,
                this.city,
                this.phone
              ]
            }
          })
        }
      })
    },
    data () {
      return {
        isDelivery: true,
        isBuyBow: false,
        buyNowData: {},
        isCouponSelectShow: false,
        chosenCoupon: {},
        chosenProducts: undefined,
        priceInfo: {},
        isEditAddress: true,
        countryIdMap: transCountry2Id(),
        addressData: [],
        countryInfo: {},
        email: {
          name: 'email',
          value: '',
          type: 'email',
          placeholder: 'placeholder.email',
          error: false,
          validate: value => {
            if (!value) {
              return [false, 'error.emptyEmail']
            }
            const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
            const res = re.test(value)
            return [res, res ? '' : this.$i18n.t('error.errorEmail')]
          }
        },
        name: {
          name: 'name',
          value: '',
          placeholder: 'placeholder.name',
          error: false,
          maxlength: 50,
          validate: value => {
            if (!value) {
              return [false, this.$i18n.t('error.emptyName')]
            }
            // 用户名不超过50字符
            const res = value.length < 50
            return [res, res ? '' : this.$i18n.t('error.errorName')]
          }
        },
        country: {
          name: 'country',
          isDisabled: true,
          value: '',
          placeholder: 'placeholder.country',
          tips: 'tips.changeCountry',
          optional: true
        },
        phone: {
          name: 'phone',
          value: '',
          placeholder: 'placeholder.phoneNum',
          prefix: '',
          error: false,
          type: 'tel',
          maxlength: 0,
          validate: value => {
            if (!value) {
              return [false, this.$i18n.t('error.emptyPhone')]
            }
            const phoneLen = this.phoneInfo.length
            const res = value.length === phoneLen

            return [res, res ? '' : this.$i18n.t('error.errorPhone', { phoneLen: phoneLen })]
          }
        },
        zipcode: {
          name: 'zip',
          value: '',
          placeholder: 'placeholder.zip',
          error: false,
          validate: this.validatePincode,
          fixedTip: '',
          errorText: '',
          maxlength: 0,
          onChange: async (value) => {
            if (this.isIndia) {
              // 只有印度
              value = value.trim()
              let [isSuccess, errorMsg] = this.validatePincode(value)
              let city = ''
              let state = ''
              let error = ''
              if (isSuccess) {
                const res = await this.$store.dispatch('getAddressByPincode', value)
                city = res.city
                state = res.state
                if (!city || !state) {
                  error = 'Not in the distribution range'
                  this.isDelivery = false
                } else {
                  this.isDelivery = true
                }
              } else {
                error = errorMsg
              }
              this.addressData = this.addressData.map(item => {
                if (item.name === 'city') {
                  item.value = city
                } else if (item.name === 'state') {
                  item.value = state
                } else if (item.name === 'zip') {
                  console.log('error =>', error)
                  if (error) {
                    item.errorText = error
                  }
                }
                return item
              })
            }
          }
        },
        flat: {
          name: 'flat',
          value: '',
          placeholder: 'placeholder.flat',
          error: false,
          validate: value => {
            if (!value) {
              return [false, this.$i18n.t('error.emptyFlat')]
            }
            // 不能全是数字
            const res = isNaN(Number(value))
            return [res, res ? '' : this.$i18n.t('error.errorFlat')]
          }
        },
        colony: {
          name: 'colony',
          value: '',
          placeholder: 'placeholder.colony',
          error: false,
          validate: value => {
            if (!value) {
              return [false, this.$i18n.t('error.emptyColony')]
            }
            // 不能全是数字
            const res = isNaN(Number(value))
            return [res, res ? '' : this.$i18n.t('error.errorColony')]
          }
        },
        landmark: {
          name: 'landmark',
          value: '',
          placeholder: 'placeholder.landmark',
          tips: 'placeholder.optional',
          optional: true
        },
        indiaCity: {
          name: 'city',
          value: '',
          placeholder: 'placeholder.city',
          isDisabled: true,
          prefix: 'placeholder.city',
          tips: 'tips.autoCity',
          optional: true
        },
        city: {
          name: 'city',
          value: '',
          placeholder: 'placeholder.city',
          prefix: 'placeholder.city',
          maxlength: 50,
          validate: value => {
            if (!value) {
              return [false, this.$i18n.t('error.emptyCity')]
            }
            // street不能超过100字符
            const res = value && value.length < 50
            return [res, res ? '' : this.$i18n.t('error.errorCity')]
          }
        },
        indiaState: {
          name: 'state',
          value: '',
          placeholder: 'placeholder.state',
          isDisabled: true,
          prefix: 'placeholder.state',
          optional: true,
          tips: 'tips.autoState'
        },
        state: {
          name: 'state_id',
          value: '',
          placeholder: 'placeholder.state',
          prefix: 'placeholder.state',
          type: 'select',
          options: [],
          tips: '<i class="iconfont icon-qianjin"></i>',
          validate: value => {
            const res = !!value
            return [res, res ? '' : this.$i18n.t('error.tipState')]
          }
        },
        street: {
          type: 'textarea',
          name: 'street2',
          value: '',
          placeholder: 'placeholder.street',
          class: 'textarea-item',
          maxlength: 200,
          validate: value => {
            if (!value) {
              return [false, this.$i18n.t('error.emptyStreet')]
            }
            // street不能超过100字符
            const res = value && value.length < 200
            return [res, res ? '' : this.$i18n.t('error.errorStreet')]
          }
        }
      }
    },
    methods: {
      async onSubmitOrderClick () {
        if (!this.isBuyBow && (!this.chosenProducts || this.chosenProducts.length < 1)) {
          this.$toast.error(this.$i18n.t('error.selectProduct'))
          return false
        }
        let data = {}
        // 检查用户地址信息是否完整
        if (!this.isDelivery) {
          this.isEditAddress = true
          this.$toast.error(this.$i18n.t('toast.deliverError'))
          document.getElementsByName('zip')[0].focus()
          return false
        }
        let isVerified = this.addressData.every(item => {
          console.log('validate item ==>', item)
          let value = item.value
          if (typeof value === 'string') {
            value = value.trim()
          }
          if (!item.optional && item.validate) {
            const [isSuccess, errorMsg] = item.validate(value)
            if (!isSuccess) {
              console.log('error message =>', errorMsg)
              item.error = true
              // 粗暴的设置焦点
              document.getElementsByName(item.name)[0].focus()
            } else {
              item.error = false
            }
          }
          item.value = value
          return !item.error
        })
        if (!isVerified) {
          this.isEditAddress = true
          return false
        }

        data = this.addressData.reduce((map, item) => {
          // 同时过滤掉空的数据
          if (item.value) {
            map[item.name] = item.value
          }
          return map
        }, {})

        // 增加选择的商品
        if (this.isBuyBow) {
          data['buy_now_products'] = this.buyNowData.skuId.join(',')
          data['buy_now_quantitys'] = this.buyNowData.quantity.join(',')
        } else {
          data['cart_choosed_product'] = this.chosenProducts.join(',')
        }
        // 优惠券使用情况
        data['coupon_id'] = this.chosenCoupon.id
        console.log('addressData==>', data)

        this.$loading.show()
        // 创建订单并且保存用户地址
        if (this.isEditAddress) {
          await this.$store.dispatch('updateShippingAddress', data)
        }
        const { orderName, amountTotalUS, paymentMethod } = await this.$store.dispatch('createOrder', data)
        this.orderLines.map((line, index) => {
          googleAnalytics.addProduct(line, index)
        })
        this.$toast.success(this.$i18n.t('toast.submitSuc'))
        googleAnalytics.sendEvent({
          ec: 'Checkout',
          ea: 'Quotations',
          el: `${orderName} & ${amountTotalUS}`
        })
        this.$router.replace({
          name: paymentMethod === 'v3' ? 'paymentMethod2' : 'paymentMethod',
          params: {
            orderName: orderName
          }
        })
      },
      validatePincode (value) {
        const zipTips = this.countryInfo.zipTips
        const abc = this.isIndia ? 'Pincode' : 'Zipcode'

        if (!value) {
          return [false, `${abc} ${zipTips}`]
        }
        const res = this.zipInfo.test(value)
        return [res, res ? '' : `${abc} ${zipTips}`]
      },

      onEditAddressClick () {
        this.isEditAddress = true
      },
      onCouponSelectClick () {
        this.isCouponSelectShow = true
      },
      handleCouponChosen (coupon) {
        this.isCouponSelectShow = false
        this.chosenCoupon = coupon
        this.calPriceInfo()
      },
      calPriceInfo () {
        this.priceInfo = Object.assign({}, this.orderInfo)
        let discount = this.chosenCoupon.discount
        let amountOff = 0
        if (discount.free_shipping) {
          amountOff = this.priceInfo.shippingFee
        } else {
          amountOff = discount.amount_off
        }
        this.priceInfo.coupon = amountOff;
        this.priceInfo.total = parseFloat(this.priceInfo.subtotal) - parseFloat(amountOff)
      },

      onLoginClick () {
        this.$router.push({
          name: 'login'
        })
      }

    },
    computed: {
      ...mapState({
        symbol: 'symbol',
        countryCode: 'countryCode',
        maxOrderMoney: 'maxOrderMoney',
        orderInfo: 'orderInfo',
        partnerInfo: 'partnerInfo',
        phoneInfo: 'phoneInfo',
        orderLines: 'orderLines',
        userProfile: 'userProfile',
        zipInfo: state => {
          return eval(state.zipInfo)
        }
      }),
      isLogin () {
        return Boolean(this.userProfile.authorization)
      },
      isIndia () {
        return this.countryCode === 'in'
      },
      phoneNumber () {
        return this.phoneInfo.code ? this.phoneInfo.code + this.partnerInfo.phone : ''
      },
      countryName () {
        return this.partnerInfo.country_id ? this.countryIdMap[this.partnerInfo.country_id].name : ''
      },
      addressStreet () {
        const stre = this.partnerInfo.street
        if (stre && stre.india) {
          const indiaStre = stre.india
          return [indiaStre.flat, indiaStre.colony, indiaStre.landmark].join(' ')
        } else {
          return this.partnerInfo.street2
        }
      }

    },
    beforeRouteLeave (to, from, next) {
      if (this.isCouponSelectShow) {
        this.isCouponSelectShow = false
        next(false)
      } else {
        next()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .payment-container {
    padding-bottom: px2rem(44);
    display: flex;
    flex-direction: column;

    .payment-content {
      flex: 1;
      overflow: auto;
      background: $background-color;
      .address {
        padding: px2rem(15);
      }
      .address-group {
        background: $white;
        padding: px2rem(10) px2rem(15);

        .guest-login {
          text-align: center;

          .btn-guest-login {
            height: px2rem(40);
            line-height: px2rem(40);
            font-size: $medium;
            color: $white;
            text-align: center;
            background: $flamingo;
            border: none;
            outline: none;
            border-radius: px2rem(20);
            width: px2vw(225);
            margin: px2rem(20) 0;
          }
        }

        .item-tips {
          font-size: $x-small;
          color: $dusty-gray;
          position: absolute;
          right: px2rem(-5);
          top: px2rem(23);
          line-height: px2rem(20);
          transform: scale(0.9);
        }

        .address-item {
          display: flex;
          position: relative;
          flex-direction: row;
          height: px2rem(44);
          padding: 0 px2rem(15);
          border-bottom: $border;
          box-sizing: content-box;

          &.textarea-item {
            height: px2rem(60);
            padding: px2rem(10) px2rem(15);
            box-sizing: border-box;
          }

          input,
          textarea,
          select {
            flex: 1;
            &:disabled {
              background: $white;
            }
          }
          .item-tips {
            font-size: $x-small;
            color: $dusty-gray;
            position: absolute;
            right: px2rem(15);
            top: 50%;
            transform: translate3d(0, -50%, 0);
          }
          .item-prefix {
            display: flex;
            align-items: center;
            margin-right: px2rem(10);
          }
        }
      }

      .coupon {
        margin-top: px2rem(10);
        display: flex;
        height: px2rem(60);
        background: $white;
        align-items: center;
        padding: 0 px2rem(15);
        p {
          flex: 1;
          margin-left: px2rem(15);
          .coupon-num {
            color: $flamingo;
          }
        }

        .icon-J_Coupon {
          font-size: $x-large;
        }
        .icon-qianjin {
          color: $dusty-gray;
        }
      }

      .product-summary,
      .price-group {
        margin-top: px2rem(10);
      }
    }

    .m-btn {
      height: px2rem(44);
      line-height: px2rem(44);
      font-size: $medium;
      color: $white;
      background-color: $flamingo;
      text-align: center;
      width: 100%;
    }

    .m-btn-edit {
      height: px2rem(44);
      line-height: px2rem(44);
      color: $flamingo;
      background: $white;
      text-align: center;
      width: 100%;
      margin-top: px2rem(1);
    }
  }
</style>
