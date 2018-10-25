<template>
  <div>
    <md-input v-for="input in boletoData" :key="input.name" :name="input.name" v-model="input.value" :type="input.type" maxlength="14" :placeholder="input.placeholder"></md-input>
  </div>
</template>

<script>
  import MdInput from '@/components/common/MdInput'
  import {
    asyncLoadScript
  } from '@/utils'
  export default {
    components: {
      MdInput
    },
    props: {
      name: {
        type: String,
        default: ''
      },
      email: {
        type: String,
        default: ''
      }
    },
    created () {
      asyncLoadScript('https://d14rk0dlif47fw.cloudfront.net/static/cpf_cnpj.min.js')
    },
    data () {
      return {
        boletoData: [
          {
            value: this.name,
            placeholder: 'placeholder.name',
            name: 'pay_name',
            validation: value => {
              const flag = value && value.length <= 100
              return [flag, flag ? '' : 'Please provide your name']
            }
          },
          {
            value: this.email,
            placeholder: 'placeholder.email',
            name: 'pay_email',
            type: 'email',
            validation: value => {
              // TODO 可以进一步校验邮箱格式
              const flag = !!value
              return [flag, flag ? '' : 'Please provide your email']
            }
          },
          {
            value: '',
            placeholder: 'placeholder.cpf',
            name: 'pay_cpf',
            validation: value => {
              if (!value) {
                return [false, 'Please provide your CPF']
              }
              const flag = window.CPF.isValid(value, true)
              return [flag, flag ? '' : 'Please enter correct CPF']
            }
          }
        ]
      }
    },
    methods: {
      submitMethodForm () {
        const flag = this.boletoData.every(item => {
          const value = item.value.trim()
          const [flag, errorMsg] = item.validation(value)
          if (!flag) {
            this.$toast.error(errorMsg)
          }
          return flag
        })

        if (!flag) {
          return false
        }

        return this.boletoData.reduce((map, item) => {
          map[item.name] = item.value
          return map
        }, {})
      }
    }
  }
</script>
