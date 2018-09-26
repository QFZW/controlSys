<template>
    <div class="box">
          <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="月统计" name="first"></el-tab-pane>
          <el-tab-pane label="季统计" name="second"></el-tab-pane>
          <el-tab-pane label="年统计" name="third"></el-tab-pane>
          <el-tab-pane label="全部统计" name="fourth"></el-tab-pane>
          </el-tabs>
          <div class="seach_lest">
              <div class="dateChange">
                  <div>开始时间：</div>
                  <el-date-picker
                    v-model="startDate"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
              </div>
               <div class="dateChange">
                  <div>结束时间：</div>
                  <el-date-picker
                    v-model="endDate"
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
              </div>
              <div class="rightList">
                  <template>
                    <el-select v-model="value" placeholder="选择项目">
                      <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </template>
                  <div class="button">导出</div>
                  <div class="button">打印</div>
              </div>
          </div>
          <div style="clear:both"></div>
         
          <div class="viewsTab">
              <div class="allobj" v-if="objTab">
                    <allobj></allobj>
              </div>
              <div class="aboutObj" v-else="objTab">
                   
                 <div class="objName">XXX项目</div>
                  <aboutbj></aboutbj>
              </div>
          </div>
         
    </div>
 
</template>
<script>
// import echarts from 'echarts'
import Aboutbj from './aboutObj.vue'
import Allobj from './allobj.vue'

import {listDeviceRepaireStatistic,listDeviceDamageCountByMonth} from '@/api/AssetAdmin.js'
  export default {
    data() {
      return {
        activeName: 'first',
         tabPosition: 'top',
        
          dateChange:'',
          endDate:'2018-09-01',
          startDate:'2018-01-01',
           options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        objTab:false
      };
    },
    
    methods: {
      handleClick(tab, event) {
        // console.log(tab, event);
        // console.log(tab.index)
        var faultDate
        var faultDateA
        var d = new Date(this.startDate); 
        faultDate=d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
        var c = new Date(this.endDate); 
        faultDateA=c.getFullYear() + '/' + (c.getMonth() + 1) + '/' + c.getDate() + ' ' + c.getHours() + ':' + c.getMinutes() + ':' + c.getSeconds();
      console.log(this.startDate)
      console.log(this.endDate)
        switch(tab.index){
          case '0' :
           listDeviceRepaireStatistic(faultDate,faultDateA).then(res=>{
             for(var i=0;i<res.data.length;i++){
               console.log(res.data[i].listDeviceRepairStatisticCount)
             }
           })

            listDeviceDamageCountByMonth(faultDate,faultDateA).then(res=>{
             for(var i=0;i<res.data.length;i++){
               console.log(res.data[i].listDeviceRepairStatisticCount)
             }
           })
          break;
          case '1':
          
          break;
          case '2' :
         
          break ;
          case '3' :
          
          break;
        }
      },
      handleClickOne(tab,event){
        console.log(this.tabPosition)
      },
    },
    components:{
      Aboutbj,
      Allobj
    }
  };
</script>

<style lang="scss" scoped>
    .box{
       width: 98%;
       margin: 0 auto;
    }
    .seach_lest{
      margin-top:20px; 
    }

    .objack_tab{
      display: flex;
      float: left;
      font-size: 14px;
    }
    .objack_tab >div{
      padding: 10px 20px;
      border: solid 1px #bbb;
      background: #fff;
    }
    .objack_tab >div:nth-child(1){
      border-right: none;
      border-radius: 5px 0 0 5px;
    }
     .objack_tab >div:nth-child(2){
      // border-right: none;
      border-radius: 0px 5px 5px 0px;
    }
    .objack_tab .active_objack{
      border: solid 1px #409EFF;
      color: #409EFF;
      background: #eee;
    }
    .dateChange{
      display: flex;
      float: left;
      margin-left: 30px;
      line-height: 40px;
      font-size: 14px;
    }
    .rightList{
      float: right;
      display: flex;
      // line-height: 40px;
    }
    .rightList .button{
        background: #409EFF;
        margin-right: 10px;
        border-radius:5px; 
        color: #fff;
        font-size: 14px;
        line-height: 40px;
        padding: 0 20px;
    }
    .rightList div:nth-child(2){
      margin-left: 20px;
    }
    .objName{
      margin-top: 30px;
      width: 100%;
    }

    .allobj{
      margin-top: 20px;
    }
</style>
