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
        myChart.setOption ({
    color: ['#3398DB'],
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'直接访问',
            type:'bar',
            barWidth: '60%',
            data:[10, 52, 200, 334, 390, 330, 220]
        }
    ]
})

    }
    }
    
}
</script>
