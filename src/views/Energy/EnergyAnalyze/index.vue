/*
 * @Author: Ouber23
 * @Date: 2018-07-10 11:37:54
 * @Last Modified by: Ouber23
 * @Last Modified time: 2018-07-10 00:55:19
 */

<template>
  <div class="energy-analyze">
    <h4 class="analyze-title">用电量</h4>
    <div class="main">
      <el-row :gutter="60" class="el-padding" v-if="energyConsume">
        <el-col :span="5">
          <div class="grid-content grid-kwh grid1">
            <h5>今年</h5>
            <p>{{energyConsume[0].total}}kwh</p>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content grid-kwh grid2">
            <h5>本月</h5>
            <p>{{energyConsume[1].total}}kwh</p>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="grid-content grid-kwh grid3">
            <h5>昨天</h5>
            <p>{{energyConsume[2].total}}kwh</p>
          </div>
        </el-col>
        <el-col :span="9" class="grid-kwh"></el-col>
      </el-row>
      <el-row>
        <el-col :span="15"><div class="grid-content bg-purple" id="mainEcharts" :style="{width:'663px',height:'572px'}"></div></el-col>
        <el-col :span="9">
          <div class="grid-content bg-purple-light" id="mainEchartsBing1" :style="{width:'356px',height:'278px'}">
          <div class="grid-content bg-purple-light" id="mainEchartsBing2" :style="{width:'356px',height:'278px'}"></div>
        </div></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
import { getCommonEnergyStatistic, listEnergyStatisticByDay } from '@/api/EnergyAnalyze/energyanalyze'
// 基于准备好的dom，初始化echarts实例

console.log(echarts)

export default {
  name: 'EnergyAnalyze',
  data () {
    return {
      keyss: true,
      energyConsume: null,
      echartsOption: {
        title: {
          text: '月能耗'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            name: '日期',
            nameTextStyle: {
              align: 'center'
            },
            type: 'category',
            data: ['1-1', '1-2', '1-3', '1-4', '1-5', '1-6', '1-7', '1-8', '1-9', '1-10', '1-11', '1-12']
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '耗电量（kw/h）',
            nameLocation: 'middle',
            nameTextStyle: {
              fontWeight: "bold",
              verticalAlign: 'top',
              padding: 10,
              fontSize: 16
            },
            min: 0,
            max: 1.2
          }
        ],
        series: [
          {
            name: '用电量',
            type: 'bar',
            data: [0.6, 0, 0.3, 0, 0.5, 0, 0.1, 0, 1, 0, 0.8, 0]
          }
        ]
      },
      monthTotal: {
        title: {
          text: '月消耗'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['城市消耗', '民用消耗']
        },
        series: [
          {
            name:'访问来源',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data:[
              {value:335, name:'直接访问'},
              {value:310, name:'邮件营销'}
            ]
          }
        ]
      },
      dayTotal: {
        title: {
          text: '月消耗'
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          x: 'left',
          data: ['城市消耗', '民用消耗']
        },
        series: [
          {
            name:'访问来源',
            type:'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: true,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data:[
              {value:335, name:'直接访问'},
              {value:310, name:'邮件营销'}
            ]
          }
        ]
      }
    }
  },

  created () {
    let that = this
    // 组件创建成功拉取数据
    that.$nextTick(function () {
      getCommonEnergyStatistic().then(res => {
        console.log(res, '能量分析数据')
        that.energyConsume = res.data
      })
      for (var i=1; i < 13; i++){
        listEnergyStatisticByDay(i).then(res=>{
          console.log(res)
          that.echartsOption.series[0]['data'][i] = 1
        })
      }
    })
    
  },
  mounted () {
    if (document.getElementById('mainEcharts')) {
      var myChart = echarts.init(document.getElementById('mainEcharts'))
      let myChartBing1 = echarts.init(document.getElementById('mainEchartsBing1'))
      // let myChartBing2 = echarts.init(document.getElementById('mainEchartsBing2'))
      myChart.setOption(this.echartsOption)
      myChartBing1.setOption(this.monthTotal)
      // myChartBing2.setOption(this.dayTotal)
    }
  
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
  // .energy-analyze {
  //   // background: red;
  // }

  .energy-analyze {
    padding-top: 14px;
    padding-left: 20px;
    background: #F5F7FA;
  }
  .analyze-title {
    padding-left: 12px;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
  }
  .grid-kwh {
    padding-left: 15px;
    h5 {
      font-size: 14px;
      height: 50px;
      line-height: 50px;
    }
    p {
        font-size: 18px;
        height: 50px;
        line-height: 50px;
        color: blue;
    }
  }
  .grid1 {
    border: 1px solid #1C9DF2;
  }
  .grid2 {
    border: 1px solid #9E82EE;
  }
  .grid3 {
    border: 1px solid #39DCBA;
  }
  .el-padding {
    padding: 30px;
    background: white;
  }
</style>
