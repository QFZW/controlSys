<template>
    <div class="box">
        <div class="list">
           <el-form :inline="true" :model="formInline" class="demo-form-inline">
              <el-form-item label="">
                <el-input v-model="formInline.user" placeholder="请输入工单编号或工单内容"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
            </el-form>
        </div>

        <div class="center">
           
            <el-table
                ref="multipleTable"
                :data="tableData3"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
                <el-table-column
                prop="gmtCreated"
                label="创建时间"
               >
                </el-table-column>
                <el-table-column
                prop="gmtUpdated"
                label="修改时间"
               >
                </el-table-column>
                <el-table-column
                prop="id"
                label="ID"
               >
                </el-table-column>
                <el-table-column
                prop="mem"
                label="备注"
                >
                </el-table-column>
                 <el-table-column
                prop="nnlightctlWorkOrderId"
                label="工单信息ID"
                >
                </el-table-column>
                 <el-table-column
                prop="recordDate"
                label="记录时间"
                >
                </el-table-column>
                
            </el-table>
        </div>
    </div>
</template>
<script>
import {listWorkOrderHistory,changeTime} from '@/api/AssetAdmin.js'
export default {
    name:'',
    data(){
        return{
            formInline:{
                user:''
            },
             tableData3: [
               
             ],
        multipleSelection: []
      }
        
    },
    methods:{
          onSubmit(){
           console.log('submit!');
      },
       handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    },
    created(){
      
         listWorkOrderHistory().then(res=>{
            for(var i=0;i<res.data.length;i++){
                res.data[i].gmtCreated=changeTime(res.data[i].gmtCreated)
                res.data[i].gmtUpdated=changeTime(res.data[i].gmtUpdated)
                res.data[i].recordDate=changeTime(res.data[i].recordDate)
              }
            this.tableData3=res.data
            })
    }
}
</script>
<style scoped>
    .box{
        width: 98%;
        margin: 0 auto;
    }
    .list{
        width: 100%;
        margin-top: 20px;
    }
    .buttonlist{
        margin-bottom: 20px;
    }
</style>
