<template>
    <div>
        <div class="list">
           <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="分类">
                <el-select v-model="formInline.region" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态">
                <el-select v-model="formInline.region" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="工作流">
                <el-select v-model="formInline.region" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
              <el-form-item label="">
                <el-input v-model="formInline.user" placeholder="请输入工单编号或工单内容"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
            </el-form>
        </div>
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
                width="200"
                >
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small" >认领</el-button>
                    <el-button type="text" size="small">下载附件</el-button>
                    <el-button type="text" size="small" @click="listchange(scope.row)" >编辑</el-button>
                    <el-button type="text" size="small">删除</el-button>
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


            
        <el-dialog title="新增" :visible.sync="formlistdatahide">
            <el-form ref="form" :model="formlistdata" label-width="80px">
                <el-form-item label="编号">
                    <el-input v-model=" formlistdata.id"></el-input>
                </el-form-item>
            </el-form>
             <el-form ref="form" :model="formlistdata" label-width="80px">
                <el-form-item label="分类">
                    <el-input v-model=" formlistdata.id"></el-input>
                </el-form-item>
            </el-form>
             <el-form ref="form" :model="formlistdata" label-width="80px">
                <el-form-item label="工作流">
                    <el-input v-model=" formlistdata.id"></el-input>
                </el-form-item>
            </el-form>
             <el-form ref="form" :model="formlistdata" label-width="80px">
                <el-form-item label="优先级">
                    <el-input v-model=" formlistdata.id"></el-input>
                </el-form-item>
            </el-form>
             <el-form ref="form" :model="formlistdata" label-width="80px">
                <el-form-item label="执行人">
                    <el-input v-model=" formlistdata.id"></el-input>
                </el-form-item>
            </el-form>
             <el-form ref="form" :model="formlistdata" label-width="80px">
                <el-form-item label="选择区域">
                    <el-input v-model=" formlistdata.id"></el-input>
                </el-form-item>
            </el-form>
            <el-form ref="form" :model="formlistdata" label-width="80px">
                <el-form-item label="内容">
                    <el-input v-model=" formlistdata.id"></el-input>
                </el-form-item>
            </el-form>
            <el-form ref="form" :model="formlistdata" label-width="80px">
                <el-form-item label="附件">
                    <el-input v-model=" formlistdata.id"></el-input>
                </el-form-item>
            </el-form>

             <div slot="footer" class="dialog-footer">
                <el-button @click="formlistdatahide = false">取 消</el-button>
                <el-button type="primary" @click="formlistdatahide = false">确 定</el-button>
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
         formInline: {
          user: '',
          region: ''
        },
        form:{
            name:''
        },
         currentPage4: 4,
         formlistdata:{
             id:''
         },
         formlistdatahide:false
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
        console.log(row.id);
        this.dialogTableVisible = true
      },
      onSubmit(){
           console.log('submit!');
      },
      listchange(row){
          console.log(row)
          this.formlistdatahide=true
      }
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
