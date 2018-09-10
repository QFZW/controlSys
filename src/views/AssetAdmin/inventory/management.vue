<template>
    <div class="box">
            <div class="seach_top">
                <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
           <div class="addData">
                <div><el-button type="primary"  @click="dialogFormVisible = true" icon="el-icon-plus">增加</el-button></div>
                <div><el-button plain icon="el-icon-delete" @click="alldelte">批量删除</el-button></div>
            </div>
            <el-dialog title="添加仓库" :visible.sync="dialogFormVisible">
            <el-form :model="form" style="margin:0 auto" ref="form">
                <el-form-item label="仓库UID" :label-width="formLabelWidth">
                <el-input v-model="form.uid" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="仓库名称" :label-width="formLabelWidth">
                <el-input v-model="form.repertoryName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="仓库地址" :label-width="formLabelWidth">
                <el-input v-model="form.repertoryAddress" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="仓库电话" :label-width="formLabelWidth">
                <el-input v-model="form.repertoryPhone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮编" :label-width="formLabelWidth">
                <el-input v-model="form.repertoryZipCode" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="管理员" :label-width="formLabelWidth">
                <el-input v-model="form.nnlightctlUserId" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary"  @click="linkmanAdd('form')">确 定</el-button>
            </div>
            </el-dialog>


            <el-dialog title="编辑仓库" :visible.sync="dialogFormVisible2">
            <el-form :model="form" style="margin:0 auto" ref="form">
                <el-form-item label="仓库UID" :label-width="formLabelWidth">
                <el-input v-model="form.uid" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="仓库名称" :label-width="formLabelWidth">
                <el-input v-model="form.repertoryName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="仓库地址" :label-width="formLabelWidth">
                <el-input v-model="form.repertoryAddress" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="仓库电话" :label-width="formLabelWidth">
                <el-input v-model="form.repertoryPhone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮编" :label-width="formLabelWidth">
                <el-input v-model="form.repertoryZipCode" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="管理员" :label-width="formLabelWidth">
                <el-input v-model="form.nnlightctlUserId" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                <el-button type="primary"  @click="linkmanContact('form')">确 定</el-button>
            </div>
            </el-dialog>
            <div class="table">
                <template>
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
                        prop="uid"
                        label="仓库UID"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="repertoryName"
                        label="仓库名称"
                        show-overflow-tooltip>
                        </el-table-column>
                         <el-table-column
                        prop="repertoryAddress"
                        label="仓库地址"
                        show-overflow-tooltip>
                        </el-table-column>
                         <el-table-column
                        prop="repertoryPhone"
                        label="仓库电话"
                        show-overflow-tooltip>
                        </el-table-column>
                         <el-table-column
                        prop="repertoryZipCode"
                        label="邮编"
                        show-overflow-tooltip>
                        </el-table-column>
                         <el-table-column
                        prop="nnlightctlUserId"
                        label="管理员"
                        show-overflow-tooltip>
                        </el-table-column>
                       <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                </template>
                 <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
                    </el-pagination>
            </div>
    </div>
</template>
<script>
import {addOrUpdateRepertory,listRepertory,deleteRepertory,getRepertory,conOrUpdateRepertory} from '@/api/AssetAdmin.js'
export default {
    name:'linkman',
    data(){
        return {
            input5:'',
            currentPage:1,
              dialogTableVisible: false,
        dialogFormVisible: false,
        dialogFormVisible2:false,
        form: {
          uid:'',
          repertoryName:'',
          repertoryAddress:'',
          repertoryPhone:'',
          repertoryZipCode:'',
          nnlightctlUserId:''
        },
        formLabelWidth: '120px',
             tableData3: [],
        }
    },created(){
       listRepertory().then(res=>{
        this.tableData3=res.data
      })
    },
    methods:{
         handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleEdit(index, row) {
        console.log(index, row);
        this.dialogFormVisible2=true
        getRepertory(row.id).then(res=>{
          this.form=res.data[0]
        })

      },
      handleDelete(index, row) {
        console.log(index, row);
         var  a=[]
            a.push(row.id)
        var that=this
        deleteRepertory(a).then(res=>{
             that.$message({
                    type:'success',
                    message:'删除成功'
                })
            listRepertory().then(res=>{
                that.tableData3=res.data
            })
        })

      },
      linkmanContact(formName){
        var that=this
          this.$refs[formName].validate((valid) => {
          if (valid) {
            
            conOrUpdateRepertory(that.form.id,that.form.uid,that.form.repertoryName,that.form.repertoryAddress,that.form.repertoryPhone,that.form.repertoryZipCode,that.form.nnlightctlUserId).then(res=>{
                that.$message({
                    type:'success',
                    message:'添加成功'
                })
                this.dialogFormVisible2 = false
                // that.tableData3.push(that.form)
                listRepertory().then(res=>{
                  that.tableData3=res.data
                })
            })
          } else {
           
            return false;
          }
        });
      },
      alldelte(){
            var that=this
            var a=[]
            for(var i=0; i<this.multipleSelection.length;i++){
                a.push(this.multipleSelection[i].id)
            }
           deleteRepertory(a).then(res=>{
             that.$message({
                    type:'success',
                    message:'删除成功'
                })
            listRepertory().then(res=>{
                that.tableData3=res.data
            })
        })
        }, 
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      linkmanAdd(formName){
        //   console.log(this.form)
        var that=this
          this.$refs[formName].validate((valid) => {
          if (valid) {
            
            addOrUpdateRepertory(that.form.uid,that.form.repertoryName,that.form.repertoryAddress,that.form.repertoryPhone,that.form.repertoryZipCode,that.form.nnlightctlUserId).then(res=>{
                that.$message({
                    type:'success',
                    message:'添加成功'
                })
                this.dialogFormVisible = false
                // that.tableData3.push(that.form)
                listRepertory().then(res=>{
                  that.tableData3=res.data
                })
            })
          } else {
           
            return false;
          }
        });
      }
    }
}
</script>
<style scoped>
    .box{
        width: 98%;
        margin: 0 auto;
    }
    .seach_top{
        width: 300px;
        margin-top: 20px;
    }
    .addData{
        display: flex;
        margin-top: 20px;
        width: 250px;
        justify-content: space-around;
    }
  
    .table{
        margin-top: 20px;
    }
</style>
