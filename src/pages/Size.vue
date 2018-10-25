<template>
  <div class="box">
    <div class="out">
      <div class="tab-box">
        <ul>
          <li v-for="(item,index) in chartData" :key="item.id" v-bind:class="{'active': item.isChoosed}" @click="changeTab(index)">
            <div> {{item.display_name}}
              <span v-if="item.size_type">({{item.size_type}})</span>
            </div>
          </li>
        </ul>
      </div>
      <div class="table-box j-out_table" v-if="chartData.length>0" @scroll="outTableScroll">
        <div class="m-table " v-show=" item.isChoosed" v-for="(item) in chartData" :key="item.id">
          <table>
            <thead>
              <tr>
                <th v-for="(col,index) in item.data[0]" :key="index">
                  <div>
                    {{col}}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row,index) in item.data.slice(1)" :key="index">
                <td v-for="(col,key) in row" :key="key">
                  <div>
                    {{col}}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="fixed">
      <div class="tab-box">
        <ul>
          <li v-for="(item,index) in chartData" :key="item.id" v-bind:class="{'active': item.isChoosed}" @click="changeTab(index)">
            <div> {{item.display_name}}
              <span v-if="item.size_type">({{item.size_type}})</span>
            </div>
          </li>
          <!-- <size-tab v-for="(item,index) in chartData" :item="item" :key="index" v-on:changeTab="changeTab"></size-tab> -->
        </ul>
      </div>
      <div class="table-box j-fixed_table" v-if="chartData.length>0" @scroll="fixedTableScroll">
        <div class="m-table" v-show=" item.isChoosed" v-for="(item) in chartData" :key="item.id">
          <table>
            <thead>
              <tr>
                <th v-for="(col,index) in item.data[0]" :key="index">
                  <div>
                    {{col}}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(row,index) in item.data.slice(1)" :key="index">
                <td v-for="(col,key) in row" :key="key">
                  <div>
                    {{col}}
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import sizeChart from '@/config/size'

  export default {

    mounted () {
      let categroyIds = this.$route.query.categoryIds.split(',')
      let sizeChartName = []
      categroyIds.forEach((value, key) => {
        sizeChart.getSizeChartByCategoryId(value).forEach((val, k) => {
          sizeChartName.push(val)
        })
      })
      let chartdata = []
      if (sizeChartName) {
        chartdata = sizeChartName.map((value, key) => {
          return sizeChart.getSizeChart(value)
        })
      }
      chartdata.forEach((value, key) => {
        if (key === 0) {
          value.isChoosed = true
        } else {
          value.isChoosed = false
        }
      })
      this.chartData = chartdata

      console.log('this.categroyId', categroyIds)
      console.log('this.chartData =>', this.chartData)
    },
    data () {
      return {
        // sizeChartName: [],
        tabChoosed: 0,
        chartData: [],
        chartDisplayControl: [],
        eleOutBox: '',
        eleFixedBox: ''
      }
    },
    computed: {

    },
    methods: {
      changeTab (index) {
        console.log('index', index)
        let chardata = this.chartData
        chardata.forEach((value, key) => {
          value.isChoosed = false
        })
        chardata[index].isChoosed = true
        this.chartData = chardata
        console.log('this.chartData=>', this.chartData)
      },
      outTableScroll (event) {
        if (!this.eleFixedBox) {
          this.eleFixedBox = document.querySelector('.j-fixed_table')
        }
        let scrollLeft = event.target.scrollLeft
        this.eleFixedBox.scrollLeft = scrollLeft
      },
      fixedTableScroll (event) {
        if (!this.eleOutBox) {
          this.eleOutBox = document.querySelector('.j-out_table')
        }
        let scrollLeft = event.target.scrollLeft
        this.eleOutBox.scrollLeft = scrollLeft
      }
    }
  }
</script>
<style  lang="scss" scoped>
  .fixed {
    position: fixed;
    top: px2rem(47);
    background-color: $white;
    width: 100vw;
    padding: 0 px2rem(10);
    height: px2rem(90);
    overflow-y: hidden;
  }
  .out {
    width: 100vw;
    padding: 0 px2rem(10);
  }
  .tab-box {
    padding: 0 px2rem(8);
    ul {
      display: flex;
      height: px2rem(40);
      align-items: center;
      white-space: nowrap;
      color: $dove-gray;
      overflow: auto;
      li {
        padding: 0 px2rem(10);
        height: 100%;
        line-height: px2rem(40);
        border-bottom: 2px solid $white;
        &.active {
          border-color: $flamingo;
          color: $flamingo;
        }
      }
    }
    li,
    ol,
    ul {
      list-style: none;
    }
  }

  .tab-box {
    width: 100%;
    overflow-x: auto;
  }
  .table-box {
    width: 100%;
    overflow-x: auto;
  }
  .m-table {
    margin-top: px2rem(3);
    width: 100%;
    text-align: center;
    table {
      tr:nth-child(2n) {
        td {
          background-color: #fafafa;
        }
      }
      th {
        border-bottom: 1px solid #ebeef5;
        padding: px2rem(3) px2rem(5);
        height: px2rem(50);
      }
      td {
        border-bottom: 1px solid #ebeef5;
        padding: px2rem(3) px2rem(5);
      }
    }
  }
  table {
    min-width: 100%;
  }
</style>
