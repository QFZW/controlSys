/*
 * @Author: Ouber23
 * @Date: 2018-07-10 11:37:54
 * @Last Modified by: Ouber23
 * @Last Modified time: 2018-07-10 00:55:19
 */

<template>
  <div class="ter-report">
    <div class="cont-inpts">
      <el-form ref="form" :model="form" label-width="80px">
        <el-row type="flex" class="row-bg">
          <el-col :span="6">
            <el-form-item label="控制柜">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="日期从">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        
        
      </el-form>
    </div>
    <div class="echarts-lines">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="电压" name="voltage">
          <div id="voltage">sddsd</div>
        </el-tab-pane>
        <el-tab-pane label="漏电压" name="second">
          <div id="drainVoltage"></div>
        </el-tab-pane>
        <el-tab-pane label="电流" name="third">电流</el-tab-pane>
        <el-tab-pane label="功率" name="fourth">功率</el-tab-pane>
        <el-tab-pane label="电能" name="fifth">电能</el-tab-pane>
        <el-tab-pane label="功率因素" name="sixth">功率因素</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts';
// 基于准备好的dom，初始化echarts实例
// let myChart = echarts.init(document.getElementById('voltage'));
export default {
  name: 'TerReport',
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      voltageOption: {
        title: {
          text: '一天用电量分布',
          subtext: '纯属虚构'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          }
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {}
          }
        },
        xAxis:  {
          type: 'category',
          boundaryGap: false,
          data: ['00:00', '01:15', '02:30', '03:45', '05:00', '06:15', '07:30', '08:45', '10:00', '11:15', '12:30', '13:45', '15:00', '16:15', '17:30', '18:45', '20:00', '21:15', '22:30', '23:45']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} W'
          },
          axisPointer: {
            snap: true
          }
        },
        visualMap: {
          show: false,
          dimension: 0,
          pieces: [{
            lte: 6,
            color: 'green'
          }, {
            gt: 6,
            lte: 8,
            color: 'red'
          }, {
            gt: 8,
            lte: 14,
            color: 'green'
          }, {
            gt: 14,
            lte: 17,
            color: 'red'
          }, {
            gt: 17,
            color: 'green'
          }]
        },
        series: [
          {
            name:'用电量',
            type:'line',
            smooth: true,
            data: [300, 280, 250, 260, 270, 300, 550, 500, 400, 390, 380, 390, 400, 500, 600, 750, 800, 700, 600, 400],
            markArea: {
              data: [ [{
                name: '早高峰',
                xAxis: '07:30'
              }, {
                xAxis: '10:00'
              }], [{
                name: '晚高峰',
                xAxis: '17:30'
              }, {
                xAxis: '21:15'
              }] ]
            }
          }
        ]
      },
      drainVoltageOption: {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true
        }]
      },
      activeName: 'second'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  },
  mounted () {
    // 初始化电压
    var myChart = echarts.init(document.getElementById('voltage'));
    myChart.setOption(this.voltageOption);
    
    // 漏电压
    var drainVoltageChart = echarts.init(document.getElementById('drainVoltage'));
    drainVoltageChart.setOption(this.drainVoltageOption); 
   
  }
}
// 使用刚指定的配置项和数据显示图表。
// myChart.setOption(option);
</script>

<style>
  .cont-inpts {
    height: 92px;
    padding-top: 20px;
    background: white;
  }
  .echarts-lines {
    padding: 25px;
    padding-top: 0px;
    margin-top: 25px;
    background: white;
  }
  #voltage, #drainVoltage {
    height:500px;
    width: 1000px;
  }
</style>

