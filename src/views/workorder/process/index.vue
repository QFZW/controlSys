<template>
    <div class="box">
       <div class="listtop">
            <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
                <el-radio-button :label="false">月统计</el-radio-button>
                <el-radio-button :label="true">年统计</el-radio-button>
            </el-radio-group>
            <div class="block">
                <span class="demonstration"></span>
                <el-date-picker
                v-model="value4"
                type="month"
                placeholder="请选择日期">
                </el-date-picker>
            </div>
       </div>
       <div style="clear:both"></div>
       <div class="center">
            <aboutbj></aboutbj>
       </div>
        <div class="center">
            <about></about>
       </div>
    </div>
</template>
<script>
import Aboutbj from './aboutObj.vue'
import About from './all.vue'
export default {
    name:'',
    data(){
        return{
            isCollapse: true,
            value4:''
        }
    },components:{
        Aboutbj,
        About
    }
}
</script>
<style scoped>
    .box{
        width: 98%;
        margin: 0 auto;
      
    }
    .listtop{
        margin-top: 20px;
        
    }
    .listtop >div{
        float: left;
    }
    .block{
        margin-left: 20px;
    }
    .center{
        width: 100%;
    }
</style>
