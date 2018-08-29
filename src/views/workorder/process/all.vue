<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="6"><div class="grid-content bg-purple"> <div id="myChart2" :style="{width: '400px', height: '400px'}"></div></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"> <div id="myChart3" :style="{width: '400px', height: '400px'}"></div></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"> <div id="myChart4" :style="{width: '400px', height: '400px'}"></div></div></el-col>
            <el-col :span="6"><div class="grid-content bg-purple"> <div id="myChart5" :style="{width: '400px', height: '400px'}"></div></div></el-col>
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
        this.ddd1()
        this.ddd2()
    },methods:{
         drawLine(){
        let myChart = this.$echarts.init(document.getElementById('myChart2'))
        myChart.setOption(
         {
    title : {
        text: 'camera',
         
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
   
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
}
        );
    },ddd(){
          let myChart = this.$echarts.init(document.getElementById('myChart3'))
        // 绘制图表
        myChart.setOption ({
    title : {
        text: '掉线项目',
         
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
})

    },ddd1(){
          let myChart = this.$echarts.init(document.getElementById('myChart4'))
        // 绘制图表
        myChart.setOption ({
    title : {
        text: '011O',
         
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
})

    },ddd2(){
          let myChart = this.$echarts.init(document.getElementById('myChart5'))
        // 绘制图表
        myChart.setOption ({
    title : {
        text: '亮化',
         
        x:'center'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series : [
        {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
                {value:335, name:'直接访问'},
                {value:310, name:'邮件营销'},
                {value:234, name:'联盟广告'},
                {value:135, name:'视频广告'},
                {value:1548, name:'搜索引擎'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
})

    }
    }
    
}
</script>
