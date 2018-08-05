/*
 * @Author: Ouber23
 * @Date: 2018-08-06 02:49:01
 * @LastEditors: Ouber23
 * @LastEditTime: 2018-08-06 03:13:24
 * @Description: 
 */

<template>
  <div class="ter-report">
    <div class="cont-inpts">
      <el-form ref="searchForm" :model="form" :rules="rules" label-width="80px">
        <el-row type="flex" class="row-bg">
          <el-col :span="6">
            <el-form-item label="控制柜" prop="eleboxId">
              <el-input v-model="form.eleboxId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="日期从" prop="date1">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">到</el-col>
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date2" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item>
            <el-button type="primary" @click="this.changeData" plain>查询</el-button>
      
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <!-- <div class="search">
      <el-button type="primary" @click="this.changeData" plain>查询</el-button>
    </div> -->
    <div class="echarts-lines">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="功率" name="power">
          <div id="power"></div>
          <div id="nonPower"></div>
        </el-tab-pane>
        <el-tab-pane label="电流" name="electricity">
          <div id="electricity"></div>
        </el-tab-pane>
        <el-tab-pane label="电压" name="voltage">
          <div id="voltage">sddsd</div>
        </el-tab-pane>
        <el-tab-pane label="电能" name="electricEnergy">
          <div id="electricEnergy"></div>
        </el-tab-pane>
        <el-tab-pane label="功率因素" name="powerFactor">
          <div id="powerFactor"></div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts';
import { listEleboxPower } from '@/api/EnergyAnalyze/energyanalyze'
// 基于准备好的dom，初始化echarts实例
// let myChart = echarts.init(document.getElementById('voltage'));
export default {
  name: 'TerReport',
  data () {
    return {
      form: {
        eleboxId: '',
        region: '',
        date1: '',
        date2: ''
      },
      rules: {
        eleboxId:  [
            { required: true, message: '请输入控制柜ID', trigger: 'blur' }
          ],
        date1: [
            { required: true, message: '请输入开始日期', trigger: 'blur' }
          ],
        date2: [
            { required: true, message: '请输入结束日期', trigger: 'blur' }
          ],
      },
      powerData: null,
      nonPowerData: null, 
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
      // 功率配置
      powerOption: {
        title: {
          text: '有功功率：（kw）'
        },
        xAxis: [{
          type: 'category',
          name: '日期',
          nameTextStyle: {
            fontWeight: "normal",
            verticalAlign: 'bottom',
            padding: 50,
            fontSize: 16
          },
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15']
        }],
        yAxis: [
          {
            type: 'value',
            name: '有功功率（kw）',
            nameLocation: 'middle',
            nameTextStyle: {
              fontWeight: "normal",
              verticalAlign: 'top',
              padding: 20,
              fontSize: 16
            },
            min: 0,
            max: 1.5,
            interval: 0.25
          }
        ],
        series: [
          {
            name:'用电量',
            type:'line',
            smooth: true,
            data: [0, 1, 0.25, 1.25, 1.5, 0.6, 0.5, 1.3, 1, 0.25, 1.25, 1.5, 0.6, 0.5, 1.3],
            // markArea: {
            //   data: [ [{
            //     name: '早高峰',
            //     xAxis: '07:30'
            //   }, {
            //     xAxis: '10:00'
            //   }], [{
            //     name: '晚高峰',
            //     xAxis: '17:30'
            //   }, {
            //     xAxis: '21:15'
            //   }] ]
            // }
          }
        ]
      },
      // 无功功率
      nonPowerOption: {
        title: {
          text: '无功功率：（kw）'
        },
        xAxis: [{
          type: 'category',
          name: '日期',
          nameTextStyle: {
            fontWeight: "normal",
            verticalAlign: 'bottom',
            padding: 50,
            fontSize: 16
          },
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15']
        }],
        yAxis: [
          {
            type: 'value',
            name: '无功功率（kw）',
            nameLocation: 'middle',
            nameTextStyle: {
              fontWeight: "normal",
              verticalAlign: 'top',
              padding: 20,
              fontSize: 16
            },
            min: 0,
            max: 1.5,
            interval: 0.25
          }
        ],
        series: [
          {
            name:'用电量',
            type:'line',
            smooth: true,
            data: [0, 1, 0.25, 1.25, 1.5, 0.6, 0.5, 1.3, 1, 0.25, 1.25, 1.5, 0.6, 0.5, 1.3],
            // markArea: {
            //   data: [ [{
            //     name: '早高峰',
            //     xAxis: '07:30'
            //   }, {
            //     xAxis: '10:00'
            //   }], [{
            //     name: '晚高峰',
            //     xAxis: '17:30'
            //   }, {
            //     xAxis: '21:15'
            //   }] ]
            // }
          }
        ]
      },
      // 电流
      electricityOption: {
        title: {
          text: '无功功率：（kw）'
        },
        xAxis: [{
          type: 'category',
          name: '日期',
          nameTextStyle: {
            fontWeight: "normal",
            verticalAlign: 'bottom',
            padding: 50,
            fontSize: 16
          },
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15']
        }],
        yAxis: [
          {
            type: 'value',
            name: '无功功率（kw）',
            nameLocation: 'middle',
            nameTextStyle: {
              fontWeight: "normal",
              verticalAlign: 'top',
              padding: 20,
              fontSize: 16
            },
            min: 0,
            max: 1.5,
            interval: 0.25
          }
        ],
        series: [
          {
            name:'用电量',
            type:'line',
            smooth: true,
            data: [0, 1, 0.25, 1.25, 1.5, 0.6, 0.5, 1.3, 1, 0.25, 1.25, 1.5, 0.6, 0.5, 1.3],
            // markArea: {
            //   data: [ [{
            //     name: '早高峰',
            //     xAxis: '07:30'
            //   }, {
            //     xAxis: '10:00'
            //   }], [{
            //     name: '晚高峰',
            //     xAxis: '17:30'
            //   }, {
            //     xAxis: '21:15'
            //   }] ]
            // }
          }
        ]
      },
      // 电能
      electricEnergyOption: {
        title: {
          text: '无功功率：（kw）'
        },
        xAxis: [{
          type: 'category',
          name: '日期',
          nameTextStyle: {
            fontWeight: "normal",
            verticalAlign: 'bottom',
            padding: 50,
            fontSize: 16
          },
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15']
        }],
        yAxis: [
          {
            type: 'value',
            name: '无功功率（kw）',
            nameLocation: 'middle',
            nameTextStyle: {
              fontWeight: "normal",
              verticalAlign: 'top',
              padding: 20,
              fontSize: 16
            },
            min: 0,
            max: 1.5,
            interval: 0.25
          }
        ],
        series: [
          {
            name:'用电量',
            type:'line',
            smooth: true,
            data: [0, 1, 0.25, 1.25, 1.5, 0.6, 0.5, 1.3, 1, 0.25, 1.25, 1.5, 0.6, 0.5, 1.3],
            // markArea: {
            //   data: [ [{
            //     name: '早高峰',
            //     xAxis: '07:30'
            //   }, {
            //     xAxis: '10:00'
            //   }], [{
            //     name: '晚高峰',
            //     xAxis: '17:30'
            //   }, {
            //     xAxis: '21:15'
            //   }] ]
            // }
          }
        ]
      },
      // 功率因素
      powerFactorOption: {
        title: {
          text: '无功功率：（kw）'
        },
        xAxis: [{
          type: 'category',
          name: '日期',
          nameTextStyle: {
            fontWeight: "normal",
            verticalAlign: 'bottom',
            padding: 50,
            fontSize: 16
          },
          data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15']
        }],
        yAxis: [
          {
            type: 'value',
            name: '无功功率（kw）',
            nameLocation: 'middle',
            nameTextStyle: {
              fontWeight: "normal",
              verticalAlign: 'top',
              padding: 20,
              fontSize: 16
            },
            min: 0,
            max: 1.5,
            interval: 0.25
          }
        ],
        series: [
          {
            name:'用电量',
            type:'line',
            smooth: true,
            data: [0, 1, 0.25, 1.25, 1.5, 0.6, 0.5, 1.3, 1, 0.25, 1.25, 1.5, 0.6, 0.5, 1.3],
            // markArea: {
            //   data: [ [{
            //     name: '早高峰',
            //     xAxis: '07:30'
            //   }, {
            //     xAxis: '10:00'
            //   }], [{
            //     name: '晚高峰',
            //     xAxis: '17:30'
            //   }, {
            //     xAxis: '21:15'
            //   }] ]
            // }
          }
        ]
      },
      activeName: 'power'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(this.activeName);
    },
    changeData () {
      console.log(this.form.eleboxId, 'eleboxId')
      console.log('尝试改变数据')
      
      // console.log(this.powerOption.xAxis.data)
      
      console.log(this.$refs['searchForm'])
      this.$refs['searchForm'].validate((valid) => {
          if (valid) {
            let params = {
              eleboxId: this.form.eleboxId,
              startDate: this.form.date1,
              endDate: this.form.date2
            }
            switch(this.activeName){
              case 'power':
                // 有功功率
                listEleboxPower(params).then(res => {
                  console.log(res, '请求功率数据')

                  // 后续数据处理
                })
                break
              case 'electricity':
                // 电流
                listEleboxPower(params).then(res => {
                  console.log(res, '请求功率数据')

                  // 后续数据处理
                })
                break
              case 'voltage':
                // 电压
                listEleboxPower(params).then(res => {
                  console.log(res, '请求功率数据')

                  // 后续数据处理
                })
                break
              case 'electricEnergy':
                // 电压
                listEleboxPower(params).then(res => {
                  console.log(res, '请求功率数据')

                  // 后续数据处理
                })
                break
              case 'powerFactor':
                // 电压
                listEleboxPower(params).then(res => {
                  console.log(res, '请求功率数据')

                  // 后续数据处理
                })
                break
            }
            
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      var drainVoltageChart = echarts.init(document.getElementById('power'));
      drainVoltageChart.setOption(this.powerOption); 
    }
  },
  mounted () {
    // 初始化电压
    var myChart = echarts.init(document.getElementById('voltage'))
    myChart.setOption(this.voltageOption)
    
    // 有功功率
    var drainVoltageChart = echarts.init(document.getElementById('power'))
    drainVoltageChart.setOption(this.powerOption)

    // 无功功率
    var drainVoltageChart = echarts.init(document.getElementById('nonPower'))
    drainVoltageChart.setOption(this.nonPowerOption)

    // 电流
    var drainVoltageChart = echarts.init(document.getElementById('electricity'))
    drainVoltageChart.setOption(this.electricityOption)
    
    // 电能
    var drainVoltageChart = echarts.init(document.getElementById('electricEnergy'))
    drainVoltageChart.setOption(this.electricEnergyOption)

    // 功率因数
    var drainVoltageChart = echarts.init(document.getElementById('powerFactor'))
    drainVoltageChart.setOption(this.powerFactorOption)
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
  .search {
    padding: 25px;
  }
  #voltage, #power, #electricity, #nonPower, #electricity, #electricEnergy, #powerFactor {
    height:500px;
    width: 1000px;
  }
</style>

