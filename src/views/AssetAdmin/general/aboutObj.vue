<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="8"><div class="grid-content bg-purple"> <div id="myChart" :style="{width: '500px', height: '400px'}"></div></div></el-col>
            <el-col :span="16"><div class="grid-content bg-purple"> <div id="myChart1" :style="{width: '800px', height: '400px'}"></div></div></el-col>
        </el-row>
         <div>
         
         </div>
    </div>
</template>
<script>
export default {
    name:'demp',
    data(){
        return{

        }
    },
     mounted(){
        this.drawLine()
        this.ddd()
    },methods:{
         drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption(
          {
          tooltip: {
              trigger: 'item',
              formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          legend: {
              orient: 'vertical',
              x: 'center',
              data:['灯具','灯杆']
          },
          series: [
              {
                  name:'访问来源',
                  type:'pie',
                  radius: ['30%', '70%'],
                  avoidLabelOverlap: true,
                  label: {
                      normal: {
                          show: false,
                          position: 'center'
                      },
                      emphasis: {
                          show: false,
                          textStyle: {
                              fontSize: '30',
                              fontWeight: 'bold'
                          }
                      }
                  },
                  labelLine: {
                    
                  },
                  data:[
                      {value:235, name:'灯具'},
                      {value:110, name:'灯杆'},
                      {value:634, name:'全部'},
                    
                  ]
              }
          ]
      }
        );
    },ddd(){
          let myChart = this.$echarts.init(document.getElementById('myChart1'))
        // 绘制图表
        myChart.setOption(
                {
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [820, 932, 901, 934, 1290, 1330, 1320,125,1561,548,456,548],
                    type: 'line',
                    areaStyle: {}
                }]
            }
        );
    }
    }
    
}
</script>
