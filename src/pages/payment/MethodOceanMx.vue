<template>
  <form id="credit-card">
    <md-input id="card_number" type="tel" :maxlength="cardNumber.maxlength" v-model="cardNumber.value" :name="cardNumber.name" :placeholder="cardNumber.placeholder" @blur="initPaymentInstallment"></md-input>
    <div class="card-date">
      <div class="card-year-month">
        <md-select id="card_month" v-model="cardMonth.value" :name="cardMonth.name" class="card-month" required="" :placeholder="cardMonth.placeholder">
          <template slot='options'>
            <option :value="option.value" v-for="option in cardMonth.options" :key="option.value">{{option.label}}</option>
          </template>
          <i class="iconfont icon-xiala"></i>
        </md-select>
        <strong>/</strong>
        <md-select id="card_year" v-model="cardYear.value" :name="cardYear.name" class="card-year" required="" :placeholder="cardYear.placeholder">
          <template slot='options'>
            <option :value="option.value" v-for="option in cardYear.options" :key="option.value">{{option.label}}</option>
          </template>
          <i class="iconfont icon-xiala"></i>
        </md-select>
      </div>
      <md-input id="card_secureCode" v-model="cardCvv.value" :name="cardCvv.name" class="card-cvv" type="number" :placeholder="cardCvv.placeholder">
        <i class="iconfont icon-zhuyi cvv-tip" @click="onCvvTipClick"></i>
      </md-input>
    </div>
    <md-select v-show="isStageShow" v-model="paymentInstallments.value" :name="paymentInstallments.name" id="ocean_mx_pay_installments" class="payment-installment" required="" :placeholder="paymentInstallments.placeholder" @focus="onClickPaymentInstallments">
      <template slot='options'>
        <option value="" disabled selected hidden></option>
        <option :value="option.value" v-for="option in paymentInstallments.options" :key="option.value">{{option.label}}</option>
      </template>
      <i class="iconfont icon-xiala"></i>
    </md-select>
    <p class="card-note">Nota: El pago a plazos está disponible únicamente para tarjetas de crédito, no está permitido para tarjetas de débito o prepago.</p>
    <md-input :name="cardName.name" v-model="cardName.value" type="text" :maxlength="cardName.maxlength" :placeholder="cardName.placeholder"></md-input>
    <input type="hidden" id="card_type" value="" name="payment[card_type]">
    <input type="hidden" id="card_luhn_pass" value="" name="payment[card_luhn_pass]">
    <input type="hidden" id="card_date_pass" value="" name="payment[card_date_pass]">
    <input type="hidden" id="card_secureCode_pass" value="" name="payment[card_secureCode_pass]">
    <input type="hidden" name="remote_ip" value="">
    <input type="hidden" name="interest_rate" value="" maxlength="50">
  </form>
</template>

<script>
  import MdInput from '@/components/common/MdInput'
  import MdSelect from '@/components/common/MdSelect'

  import {
    asyncLoadScript
  } from '@/utils'

  import {
    matchCard,
    checkCardType,
    luhnCheck
  } from '@/libs/csefun'

  export default {
    components: {
      MdInput,
      MdSelect
    },
    props: {
      pubkey: {
        type: String,
        required: true
      },
      interestRates: {
        type: Object,
        required: true
      },
      total: {
        type: Number,
        default: 0
      }
    },
    created () {
      asyncLoadScript('https://d14rk0dlif47fw.cloudfront.net/static/opcse.js')
      this.isStageShow = this.total > 0
    },
    data () {
      return {
        cardType: '',
        isStageShow: false,
        cardNumber: {
          value: '',
          name: 'cardNumber',
          maxlength: 19,
          placeholder: 'Número de tarjeta (Sin guiones ni espacios)'
        },
        cardMonth: {
          value: '',
          name: 'cardMonth',
          placeholder: 'Mes',
          options: this.genCardMonthOptions()
        },
        cardYear: {
          value: '',
          name: 'cardYear',
          placeholder: 'Año',
          options: this.genCardYearOptions()
        },
        cardCvv: {
          value: '',
          name: 'cardSecureCode',
          placeholder: 'CVV'
        },
        paymentInstallments: {
          value: '',
          name: 'oceanMxPayInstallments',
          placeholder: 'Pago a plazos',
          options: []
        },
        cardName: {
          value: '',
          name: 'cardName',
          maxlength: 50,
          placeholder: 'nombre en la tarjeta'
        }
      }
    },
    methods: {
      onCvvTipClick () {
        let digitsValue = '3 or 4'
        if (this.cardType) {
          digitsValue = this.cardType.toUpperCase() === 'AE' ? '4' : '3'
        }
        const message = `The last ${digitsValue} digits displayed on the back of your card`
        this.$toast(message)
      },
      submitMethodForm () {
        const res = matchCard(this.cardNumber.value, this.cardYear.value, this.cardMonth.value, this.cardCvv.value)
        console.log('verify =>', res)
        let errorMsg = ''
        if (!res.card) {
          errorMsg = 'Incorrect card number.'
        } else if (!res.date) {
          errorMsg = 'Invalid expiry date.'
        } else if (!res.cvv) {
          errorMsg = 'Invalid secure code.'
        }
        if (errorMsg) {
          this.$toast.error(errorMsg)
          return false
        }

        if (this.isStageShow && !this.paymentInstallments.value) {
          this.$toast.error('Please choose pay installments.')
          return false
        }

        const opcseForm = window.opcse.encryptForm('credit-card', this.pubkey)
        opcseForm.handleSubmit()

        const cardData = {
          card_data: this.$el.querySelector('#card_data').value,
          card_name: this.cardName.value,
          pay_installments: this.paymentInstallments.value || '1'
        }
        console.log('cardData => ', cardData)
        return cardData
      },

      initPaymentInstallment () {
        const cardNumber = this.cardNumber.value
        this.cardType = checkCardType(cardNumber)
        console.log('card type=>', this.cardType)
        if (!luhnCheck(cardNumber)) {
          this.$toast.error('Incorrect card number.')
          return false
        }

        let maxStages = Math.floor(this.total / 100)
        // 如果最大分期数<=0,直接隐藏分期选项
        if (maxStages <= 0) {
          this.isStageShow = false
          return false
        }

        // AE卡最大只能分6期，其他卡期数根据后端配置
        if (this.cardType.toUpperCase() === 'AE') {
          if (maxStages > 6) {
            maxStages = 6
          }
        }
        let options = []
        for (let i = 1; i <= maxStages; i++) {
          // 以后端返回的利率为准，如果找不到则标识不支持对应的期数分期
          const rate = this.interestRates[i]
          if (rate !== undefined) {
            const totalPaid = this.total * (rate / 100 + 1)
            const eachTotal = totalPaid / i
            options.push({
              value: i,
              label: `${i} x MXN ${eachTotal.toFixed(2)} ( MXN ${totalPaid.toFixed(2)} )`
            })
          }
        }
        console.log('options =>', options)

        this.paymentInstallments.options = options
      },
      genCardMonthOptions () {
        let options = []
        for (let i = 1; i <= 12; i++) {
          const val = i < 10 ? '0' + i : '' + i
          options.push({
            value: val,
            label: val
          })
        }
        return options
      },
      genCardYearOptions () {
        let options = []
        for (let i = 17; i <= 38; i++) {
          const val = '20' + i
          options.push({
            value: val,
            label: val
          })
        }
        return options
      },
      onClickPaymentInstallments () {
        if (!this.paymentInstallments.options.length) {
          this.$toast('Please input card number first.')
          return false
        }
      }
    },
    mounted () {
      const opcseNameMap = [{
        name: 'cardNumber',
        opcseName: 'card_number'
      }, {
        name: 'cardMonth',
        opcseName: 'card_month'
      }, {
        name: 'cardYear',
        opcseName: 'card_year'
      }, {
        name: 'cardSecureCode',
        opcseName: 'card_secureCode'
      }, {
        name: 'oceanMxPayInstallments',
        opcseName: 'ocean_mx_pay_installments'
      }]
      opcseNameMap.map(item => {
        const el = this.$el.querySelector(`[name = '${item.name}']`)
        el.setAttribute('opcse-name', item.opcseName)
      })
    }
  }
</script>

<style lang="scss" scoped>
  #credit-card {
    background: $white;
    .iconfont {
      font-size: $small;
      color: $dusty-gray;
      padding-top: px2rem(10);
      &.cvv-tip {
        font-size: $x-large;
        padding: 0;
        position: absolute;
        right: 0;
      }
    }
    .card-date {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .card-year-month {
        display: flex;
        flex: 1;
        margin-right: px2rem(20);
        > strong {
          padding: px2rem(25) px2rem(10) 0 px2rem(10);
        }
      }

      .card-cvv {
        width: 35%;
      }
    }

    .card-note {
      font-size: $x-small;
      color: $dove-gray;
      margin: px2rem(5) 0 px2rem(10) 0;
    }
  }
</style>
