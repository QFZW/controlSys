<template>
    <div class="box">
            <div class="seache">
                
                <div><div>111</div><div><el-input v-model="input" placeholder="请输入内容"></el-input></div></div>
                <div><el-button type="primary">查询</el-button></div>
            </div>
            <div class="table">
                 <el-table
                    ref="multipleTable"
                    :data="tableData3"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                   
                    <el-table-column
                    prop="gmtCreated"
                    label="创建日期"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="gmtUpdated"
                    label="修改日期">
                    </el-table-column>
                    <el-table-column
                    prop="id"
                    label="ID">
                    </el-table-column>
                    <el-table-column
                    prop="nnlightctlPropertyId"
                    label="资产ID">
                    </el-table-column>
                    <el-table-column
                    prop="nnlightctlUserIdApply"
                    label="转移申请">
                    </el-table-column>
                    <el-table-column
                    prop="nnlightctlUserIdReceive"
                    label="目标转移接收人">
                    </el-table-column>
                    <el-table-column
                    prop="sourceRepertyId"
                    label="云仓库ID">
                    </el-table-column>
                    <el-table-column
                    prop="targetRepertyId"
                    label="目标仓库">
                    </el-table-column>
                    <el-table-column
                    prop="translateDate"
                    label="转移日期">
                    </el-table-column>
                    <!-- <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                    </el-table-column> -->
                </el-table>
            </div>
             <div class="block">
              
                <!-- <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
                </el-pagination> -->
            </div>
    </div>

</template>

<script>
import {listPropertyTransRecord,changeTime} from '@/api/AssetAdmin.js'
export default {
    name:'',
    data(){
        return{
              activeName: 'second',
              currentPage4:4,
               input: '',
               tableData3: [
                   {gmtCreated:'',
                    gmtUpdated:'',
                    id:'1',
                    nnlightctlPropertyId:'',
                    nnlightctlUserIdApply:'',
                    nnlightctlUserIdReceive:'',
                    sourceRepertyId:'',
                    targetRepertyId:'',
                    translateDate:''
                    }],
        multipleSelection: [],
        formlistdatahide:false,
        formlistdata:{
            id:''
        }
        }

    },created(){

        listPropertyTransRecord().then(res=>{
            for(var i=0;i<res.data.length;i++){
                res.data[i].gmtCreated=changeTime(res.data[i].gmtCreated)
                res.data[i].gmtUpdated=changeTime(res.data[i].gmtUpdated)
                res.data[i].translateDate=changeTime(res.data[i].translateDate)
            }
            this.tableData3=res.data
        })
    },
     methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
       handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

       handleEdit(index, row) {
        console.log(index, row);
        this.formlistdatahide=true
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
}
</script>



<style scoped>
    .box{
        width: 98%;
        margin: 0 auto;
    }
    .topNav{
        margin-top: 20px;
    }
    .table{
        margin-top: 20px;
    }
    .seache,.button_list{
        margin-top: 20px;
        display: flex;
        justify-content: space-between
    }
    .seache >div:nth-child(1) {
        display: flex;
        line-height: 40px;
        width: 300px;
        justify-content: space-around
    }
    .button_list{
        justify-content:space-around;
        margin-top: 20px;
        width: 280px;

    }
    .block{
        background: #fff;
        margin-top: 20px;
    }
</style>

