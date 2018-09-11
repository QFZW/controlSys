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
                type="selection"
                width="55">
                </el-table-column>
                <el-table-column
                prop="name"
                label="名称"
               >
                </el-table-column>
                <el-table-column
                prop="name"
                label="节点数"
               >
                </el-table-column>
                <el-table-column
                prop="name"
                label="状态"
               >
                </el-table-column>
                <el-table-column
                prop="address"
                label="备注"
                >
                </el-table-column>
                 <el-table-column
                prop="address"
                label="创建时间"
                >
                </el-table-column>
                 <el-table-column
                label="操作"
                >
                <template slot-scope="scope">
                    <el-button type="text" size="small" >预览</el-button>
                    <el-button type="text" size="small" >编辑</el-button>
                    <el-button type="text" size="small">删除</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import {listWorkOrderHistory} from '@/api/AssetAdmin.js'
export default {
    name:'',
    data(){
        return{
            formInline:{
                user:''
            },
             tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
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
            console.log(res.data)
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
