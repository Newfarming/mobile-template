<template>
  <div class="product-cart-modal">
    <div class="modal-content-wrap" @click="onModalBackClick">
      <div class="modal-content" :class="{'modal-slide-up': isSlideUp}">
      <div class="modal-header">
        <i class="iconfont icon-guanbi_cp parity-close" @click="onModalClose"></i>
        <div class="img-wrap">
          <img :src="productImage">
        </div>
        <div class="pro-title">
          <p class="product-name">{{productName}}</p>
          <p class="product-price">{{symbol}} {{productPrice | round}}
          </p>
        </div>
      </div>
      <div class="modal-body">
        <section class="section" v-for="attribute in attributes" :key="attribute.id">
          <p class="label">{{attribute.title}}
            <router-link :to="{name: 'size', query: {categoryIds: categoryIds.join(',')}}" v-if="attribute.title === 'Size'" class="size-chart">{{$t('button.sizeChart')}}&nbsp;&gt;</router-link>
          </p>
          <div class="attr-group">
            <button v-for="attr in attribute.attrs" :key="attr.attrId" :class="{disabled: attr.status === -1, active: attr.status === 1}" @click="skuChoose(attribute.id, attr.attrId, attr.status)">
              {{attr.title}}
            </button>
          </div>
        </section>

        <section class="quantity-section">
          <p class="label">{{$t('productText.quantity')}}</p>
          <div class="quantity-group">
            <button class="btn-div" @click="onChangeQuantity(-1)">-</button>
            <span class="quantity">{{quantity}}</span>
            <button class="btn-div" @click="onChangeQuantity(1)">+</button>
          </div>
        </section>
      </div>
      <button class="md-btn md-btn-primary md-btn-confirm" @click="onConfirmBtnClick">{{$t('button.confirm')}}</button>
    </div>
    </div>
  </div>

</template>
<script>
  import Modal from '@/components/common/Modal'
  export default {
    components: {
      Modal
    },
    props: {
      productName: {
        type: String,
        default: ''
      },
      productPrice: {
        type: Number,
        default: 0
      },
      symbol: {
        type: String,
        required: true
      },
      productImage: {
        type: String,
        default: ''
      },
      skuInfo: {
        type: Array,
        default: () => []
      },
      categoryIds: {
        type: Array,
        default: () => []
      }
    },
    created () {
      this.initSkuInfo()
    },
    data () {
      return {
        quantity: 1,
        attributes: [],
        skuMap: {},
        isSlideUp: false
      }
    },

    methods: {
      /* 点击模态框背景关闭 */
      onModalBackClick (e) {
        const classList = Array.from(e.target.classList || [])
        if (classList.includes('product-cart-modal') || classList.includes('modal-content-wrap')) {
          this.onModalClose()
        }
        return false
      },
      onModalClose () {
        this.isSlideUp = false
        setTimeout(() => {
          this.$emit('modal-close')
        }, 200)
        return false
      },
      onChangeQuantity (value) {
        this.quantity += value
        if (this.quantity < 1) {
          this.quantity = 1
        }
      },
      onConfirmBtnClick () {
        // 先找出选中的属性
        let chosenAttrs = []
        const flag = this.attributes.every(item => {
          let fg = item.attrs.every(attr => {
            if (attr.status === 1) {
              // chosenAttrIds.push(attr.attrId)
              chosenAttrs.push(attr)
              console.log('attr =>', attr)
              return false
            } else {
              return true
            }
          })
          if (fg) {
            this.$toast.error(`Please choose ${item.title}`)
          }
          return !fg
        })
        if (!flag) {
          return false
        }
        const chosenAttrIds = chosenAttrs.map(item => {
          return item.attrId
        })
        console.log('chosenAttrs =>', chosenAttrIds)
        // 判断选择的组合是否在skuMap中，找出对应的sku id
        const skuMapKey = chosenAttrIds.join('-')
        const skuItem = this.skuMap[skuMapKey]
        if (!skuItem) {
          this.$toast.error('Please choose right combination.')
          return false
        }
        this.isSlideUp = false
        setTimeout(() => {
          this.$emit('confirm', {
            skuId: skuItem.skuId,
            quantity: this.quantity,
            attrs: chosenAttrs.map(item => {
              return item.title
            })
          })
        }, 200)
      },

      initSkuInfo () {
        let hash = {}
        let attrMap = {}
        let dest = []
        let skuMap = {}
        this.skuInfo
          .map(item => {
            let attrInfo = item.attribute_info || []
            // 生成当前sku的组合key
            let skuKey = attrInfo.sort((a, b) => {
              return a.attr_id - b.attr_id
            }).map(item => {
              return item.attr_value_id
            }).join('-')
            skuMap[skuKey] = {
              skuId: item.id,
              productId: item.product_template_id
            }
            return attrInfo
          })
          .reduce((a, b) => {
            return a.concat(b)
          }, [])
          .reduce((a, b) => {
            if (!hash[b.attr_value_id]) {
              hash[b.attr_value_id] = true
              a.push(b)
            }
            return a
          }, [])
          .map(attr => {
            if (!attrMap[attr.attr_id]) {
              dest.push({
                id: attr.attr_id,
                title: attr.attr_name,
                attrs: [{
                  attrId: attr.attr_value_id,
                  title: attr.attr_value_name,
                  status: 0
                }]
              })
              attrMap[attr.attr_id] = true
            } else {
              dest.every(item => {
                if (item.id === attr.attr_id) {
                  item.attrs.push({
                    attrId: attr.attr_value_id,
                    title: attr.attr_value_name,
                    status: 0
                  })
                  return false
                }
                return true
              })
            }
          })
        //   console.log('dest: ', dest)
        this.attributes = dest.sort((a, b) => {
          return a.id - b.id
        }).map(item => {
          // TODO 现在没有鞋子尺码，先不转换
          // if (item.title === 'Size') {
          //   item.attrs = item.attrs.map(attr => {
          //     attr.title = `${attr.title}(US)`
          //     return attr
          //   })
          // }
          return item
        })
        this.skuMap = skuMap
        console.log('skuMap ---> ', this.skuMap)
      },
      // 对多个数组进行全排列组合
      doExchange (arr) {
        let len = arr.length
        // 当数组大于等于2个的时候
        if (len >= 2) {
          // 第一个数组的长度
          let len1 = arr[0].length
          // 第二个数组的长度
          let len2 = arr[1].length
          // 2个数组产生的组合数
          let lenBoth = len1 * len2
          //  申明一个新数组
          let items = new Array(lenBoth)
          // 申明新数组的索引
          let index = 0
          for (let i = 0; i < len1; i++) {
            for (let j = 0; j < len2; j++) {
              if (arr[0][i] instanceof Array) {
                items[index] = arr[0][i].concat(arr[1][j])
              } else {
                items[index] = [arr[0][i]].concat(arr[1][j])
              }
              index++
            }
          }
          let newArr = new Array(len - 1)
          for (let i = 2; i < arr.length; i++) {
            newArr[i - 1] = arr[i]
          }
          newArr[0] = items
          return this.doExchange(newArr)
        } else {
          return arr[0]
        }
      },

      skuChoose (id, attrId, status) {
        // todo 这边的选择逻辑还有点问题，以后再调整，先不管了
        //   console.log(id, attrId, status)
        if (status === -1) {
          console.log('disabled...')
          return false
        }

        // 选出剩余组的数据
        let restAttributes = this.attributes.map(item => {
          if (item.id === id) {
            return item.attrs.filter(attr => {
              if (attr.attrId === attrId) {
                attr.status = attr.status === 0 ? 1 : 0
                return attr.status === 1
              } else if (attr.status === 1) {
                attr.status = 0
              }
              return false
            })
          } else {
            return item.attrs
          }
        }).filter(item => {
          return item && item.length > 0
        })
        //   console.log('restAttributes---->', restAttributes)
        if (restAttributes.length <= 1) {
          this.attributes.map(item => {
            item.attrs.map(attr => {
              if (attr.status !== 1) {
                attr.status = 0
              }
            })
          })
          return false
        }

        let echangeAttributes = this.doExchange(restAttributes)
        //   console.log('echangeAttributes---->', echangeAttributes)
        // 在禁用attr之前需要先把其他组所有的禁用attr设置正常,否则禁用后重新选择一个可用的也不会变回
        this.attributes.map(item => {
          if (item.id !== id) {
            item.attrs.map(attr => {
              if (attr.status === -1) {
                attr.status = 0
              }
            })
          }
        })

        echangeAttributes.map(attr => {
          let skuArr = attr.map(item => {
            return item.attrId
          })
          let skuInfo = this.skuMap[skuArr.join('-')]
          if (!skuInfo) {
            skuArr.filter(skuAttrId => {
              return skuAttrId !== attrId
            }).map(skuAttrId => {
              this.attributes.map(item => {
                if (item.id !== id) {
                  item.attrs.map(attr => {
                    if (attr.attrId === skuAttrId) {
                      attr.status = -1
                    }
                  })
                }
              })
            })
          }
        })
      }
    },

    mounted () {
      setTimeout(() => {
        this.isSlideUp = true
      }, 100)
    }

  }
</script>

<style lang="scss" scoped>
  .product-cart-modal {
    position: fixed;
    top: 0;
    left:0;
    width: 100%;
    height:100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    .modal-content-wrap{
      position: relative;
      width: inherit;
      height: inherit;
    }
    .modal-content {
      position: absolute;
      width: 100%;
      bottom: px2rem(-500);
      transition: bottom 0.2s ease-in-out;
      left: 0;
      &.modal-slide-up {
        bottom: -1px;
      }
      .md-btn-confirm {
        height: px2rem(45);
        width: 100%;
        font-size: px2rem(16);
      }
      .modal-header {
        padding: px2rem(12);
        background: $title-background-color;
        display: flex;
        flex-direction: row;
        .parity-close {
          position: absolute;
          top: px2rem(-18);
          right: px2rem(20);
          background: $white;
          padding: px2rem(10);
          border-radius: 50%;
          color: $icon-color;
          font-weight: 700;
          border: $border;
        }
        .img-wrap {
          width: px2rem(100);
          height: px2rem(100);
          img {
            max-width: 100%;
            max-height: 100%;
          }
        }
        .pro-title {
          flex: 1;
          padding: px2rem(20) 0 px2rem(10) px2rem(15);
          .product-name {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            height: px2rem(40);
            line-height: px2rem(20);
          }
          .product-price {
            font-size: $large;
            color: $flamingo;
            white-space: nowrap;
            margin-top: px2rem(10);
          }
        }
      }
      .modal-body {
        padding: 0;
        padding-bottom: px2rem(10);
        max-height: px2rem(340);
        min-height: px2rem(210);
        overflow-y: scroll;
        background: $white;
        .section,
        .quantity-section {
          text-align: left;
          padding: px2rem(12);
          border-bottom: 1px dashed $background-color;
          .label {
            margin-bottom: px2rem(10);
            color: $icon-color;
            position: relative;
            .size-chart {
              position: absolute;
              right: 0;
              font-size: $x-small;
              color: $havelock-blue;
            }
          }

          .attr-group {
            display: flex;
            flex-wrap: wrap;

            button {
              margin-right: px2rem(12);
              margin-bottom: px2rem(12);
              color: $mine-shaft;
              padding: px2rem(8);
              background: $white;
              border: $border;
              min-width: px2rem(44);
              text-align: center;
              &.disabled {
                border-style: dashed;
                cursor: not-allowed;
                background: $alabaster;
                color: $mecury;
              }
              &.active {
                color: $flamingo;
                border-color: $flamingo;
              }
            }
          }

          .quantity-group {
            display: flex;
            button {
              display: inline-block;
              text-align: center;
              width: px2rem(26);
              height: px2rem(26);
              line-height: px2rem(20);
              font-size: $x-small;
              background: $background-color;
              padding: px2rem(3) 0;
              border: none;
              outline: none;
            }
            .quantity {
              display: inline-block;
              min-width: px2rem(30);
              height: px2rem(26);
              line-height: px2rem(26);
              text-align: center;
            }
          }
        }
      }
    }
  }
</style>
