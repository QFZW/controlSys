<template>
    <div>
        <el-table
                :data="tableData"
                border
                style="width: 100%">
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
                label="操作"
                >
                <template slot-scope="scope">
                   
                    <el-button type="text" @click="handleClick(scope.row)" size="small">下载附件</el-button>
                </template>
                </el-table-column>
            </el-table>
      
         <div class="block">
            <span class="demonstration"></span>
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
            </el-pagination>
        </div>



          <el-dialog title="认领" :visible.sync="dialogTableVisible">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="认领人">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-form>
             <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script>

import {listWorkOrder,changeTime} from '@/api/AssetAdmin.js'
export default {
    name:'allwork',
    data(){
        return{
             tableData: [],
          dialogTableVisible : false,
        form:{
            name:''
        },
         currentPage4: 4
        }
    },
    methods:{
         handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
       handleClick(row) {
        console.log(row);
        this.dialogTableVisible = true
      },
    },
    created(){
        listWorkOrder().then(res=>{
            for(var i=0;i<res.data.length;i++){
                  res.data[i].gmtCreated=changeTime(res.data[i].gmtCreated)
                   res.data[i].gmtUpdated=changeTime(res.data[i].gmtUpdated)
              }
            this.tableData=res.data
        })
    }
}
</script>
