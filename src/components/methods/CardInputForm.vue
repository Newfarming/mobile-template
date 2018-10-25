<template>
  <form class="card-input-form" id="card-form">
    <!--
    <md-input id="card_number" type="tel" v-model="cardNumber.value" :name="cardNumber.name" :placeholder="cardNumber.placeholder"></md-input>
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

    </div>

    <md-input id="card_secureCode" v-model="cardCvv.value" :name="cardCvv.name" class="card-cvv" type="number" :placeholder="cardCvv.placeholder">
      <i class="iconfont icon-zhuyi cvv-tip" @click="onCvvTipClick"></i>
    </md-input>
    -->
    <div class="form-item card-number" :class="{error: cardNumber.error}">
      <label>{{$t(cardNumber.placeholder)}}</label>
      <div class="input-item">
        <input type="number" id="card_number" v-model="cardNumber.value" :name="cardNumber.name">
      </div>
      <p class="error-msg" v-if="cardNumber.error">Invalid card number，please try again.</p>
    </div>

    <div class="form-item expiration-date" :class="{error: cardExpireDate.error}">
      <label>{{$t('placeholder.expireDate')}}</label>
      <div class="expiration-select">
        <div class="select-item">
          <select :name="cardMonth.name" id="card_month" v-model="cardMonth.value" required>
            <option value="" disabled selected hidden>Month</option>
            <option :value="option.value" v-for="option in cardMonth.options" :key="option.value">{{option.label}}</option>
          </select>
          <i class="iconfont icon-xiala"></i>
        </div>
        <strong>/</strong>
        <div class="select-item">
          <select id="card_year" v-model="cardYear.value" :name="cardYear.name" required>
            <option value="" disabled selected hidden>Year</option>
            <option :value="option.value" v-for="option in cardYear.options" :key="option.value">{{option.label}}</option>
          </select>
          <i class="iconfont icon-xiala"></i>
        </div>
      </div>
      <p class="error-msg" v-if="cardExpireDate.error">Invalid expiration date，please try again.</p>
    </div>

    <div class="form-item cvv-group" :class="{error: cardCvv.error}">
      <label>{{$t(cardCvv.placeholder)}}</label>
      <div class="input-item">
        <input type="number" id="card_secureCode" v-model="cardCvv.value" :name="cardCvv.name" class="card-cvv">
        <i class="iconfont icon-zhuyi cvv-tip" @click="onCvvTipClick"></i>
      </div>
      <p class="error-msg" v-if="cardCvv.error">Invalid cvv，please try again.</p>
    </div>

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
    matchCard
  } from '@/libs/csefun'

  export default {
    components: {
      MdInput,
      MdSelect
    },

    data () {
      return {
        cardNumber: {
          value: '',
          name: 'cardNumber',
          placeholder: 'placeholder.cardNumber',
          error: false
        },
        cardExpireDate: {
          placeholder: 'placeholder.expireDate',
          error: false
        },
        cardMonth: {
          value: '',
          name: 'cardMonth',
          placeholder: 'placeholder.month',
          options: this.genCardMonthOptions()
        },
        cardYear: {
          value: '',
          name: 'cardYear',
          placeholder: 'placeholder.year',
          options: this.genCardYearOptions()
        },
        cardCvv: {
          value: '',
          name: 'cardSecureCode',
          placeholder: 'placeholder.secureCode',
          error: false
        }
      }
    },
    created () {
      asyncLoadScript('https://d14rk0dlif47fw.cloudfront.net/static/opcse.js')
    },
    methods: {
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
      onCvvTipClick () {
        this.$toast(this.$i18n.t('tips.cvv', { digitsValue: '3' }))
      },
      onValidate (pubKey) {
        console.log(this.cardNumber)
        const res = matchCard(this.cardNumber.value, this.cardYear.value, this.cardMonth.value, this.cardCvv.value)
        console.log('verify =>', res)
        this.cardNumber.error = !res.card
        this.cardExpireDate.error = !res.date
        this.cardCvv.error = !res.cvv

        if (!res.card || !res.date || !res.cvv) {
          return false
        }

        const opcseForm = window.opcse.encryptForm('card-form', pubKey)
        opcseForm.handleSubmit()

        const cardData = {
          card_data: this.$el.querySelector('#card_data').value,
          card_no: this.cardNumber.value.replace(/\s+/g, ''),
          cvv: this.cardCvv.value,
          card_expiry_year: this.cardYear.value,
          card_expiry_month: this.cardMonth.value
        }
        console.log('cardData => ', cardData)
        return cardData
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
      }]
      opcseNameMap.map(item => {
        const el = this.$el.querySelector(`[name = '${item.name}']`)
        el.setAttribute('opcse-name', item.opcseName)
      })
    }

  }
</script>

<style lang="scss" scoped>
  .card-input-form {
    .form-item {
      margin-top: 2rem;
      > label {
        display: block;
        margin-bottom: 0.6rem;
      }

      &.error {
        input,
        select {
          border-color: #d00202 !important;
        }
        .error-msg {
          font-size: $x-small;
          color: #d00202;
        }
      }
    }
    .card-number {
      .input-item {
        input {
          display: block;
          width: 100%;
          height: 4.4rem;
          border: $border;
          border-radius: 0.2rem;
          padding: 0 1rem;
        }
      }
    }
    .expiration-date {
      .expiration-select {
        .select-item {
          display: inline-block;
          position: relative;
          select {
            position: relative;
            background: transparent;
            height: 4.4rem;
            min-width: 8rem;
            border: $border;
            border-radius: 0.2rem;
            padding: 0 1rem;
            z-index: 1;
            &:invalid {
              color: $dusty-gray;
            }
          }
          .iconfont {
            font-size: $medium;
            position: absolute;
            right: 0.5rem;
            top: 50%;
            transform: translateY(-50%);
            z-index: 0;
          }
        }
      }
    }

    .cvv-group {
      .input-item {
        position: relative;
        width: 9rem;
        input {
          height: 4.4rem;
          width: 100%;
          border: $border;
          border-radius: 0.2rem;
          padding: 0 1rem;
        }
        .iconfont {
          position: absolute;
          right: 0.5rem;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
</style>
