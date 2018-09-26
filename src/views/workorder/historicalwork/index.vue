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
                prop="nnlightctlWorkflowerId"
                label="工单流ID"
                >
                </el-table-column>
                <el-table-column
                prop="serialNumber"
                label="编号"
               >
                </el-table-column>
                <el-table-column
                prop="address"
                label="地址"
               >
                </el-table-column>
                <el-table-column
                prop="content"
                label="内容"
               >
                </el-table-column>
                <el-table-column
                prop="nnlightctlMaskerId"
                label="当前处理人"
               >
                </el-table-column>
                <el-table-column
                prop="nnlightctlProjectId"
                label="项目ID"
               >
                </el-table-column>
                <el-table-column
                prop="nnlightctlRegionId"
                label="地区"
               >
                </el-table-column>
                <el-table-column
                prop="nnlightctlWorkflowerId"
                label="工作流"
               >
                </el-table-column>
                 <el-table-column
                prop="nnlightctlWorkflowerMoveRecordId"
                label="当前工作流状态"
               >
                </el-table-column>
                 <el-table-column
                prop="priority"
                label="优先级"
               >
                </el-table-column>
                 <el-table-column
                prop="serialNumber"
                label="编号"
               >
                </el-table-column>
                 <el-table-column
                prop="state"
                label="状态"
               >
                </el-table-column>
                 <el-table-column
                prop="workSource"
                label="来源"
               >
                </el-table-column>
                 <el-table-column
                prop="workCreated"
                label="工单创建时间"
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
