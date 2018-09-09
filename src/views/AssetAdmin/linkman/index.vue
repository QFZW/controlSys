<template>
    <div class="box">
            <div class="seach_top">
                <el-input placeholder="请输入内容" v-model="input5" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <div class="addData">
                <div><el-button type="primary"  @click="dialogFormVisible = true,form.maskName=form.sex=form.age=form.phoneNumber=form.email=form.place=form.nnlightctlMaskerId=form.codeNumber=form.department=''" icon="el-icon-plus">增加</el-button></div>
                <div><el-button plain icon="el-icon-delete" @click="alldelte">批量删除</el-button></div>
            </div>
            <el-dialog title="添加联系人" :visible.sync="dialogFormVisible">
            <el-form :model="form" style="margin:0 auto" :rules="rules" ref="form" class="demo-ruleForm" >
                <el-form-item label="联系人" label-width="80px" prop="maskName">
                <el-input v-model="form.maskName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" label-width="80px" prop="sex">
                <el-input v-model="form.sex" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="年龄" label-width="80px" prop="age">
                <el-input v-model="form.age" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" label-width="80px">
                <el-input v-model="form.phoneNumber" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" label-width="80px" prop="email">
                <el-input v-model="form.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="职位" label-width="80px" prop="place">
                <el-input v-model="form.place" auto-complete="off"></el-input>
                </el-form-item>
                 <el-form-item label="直属上级" label-width="80px" prop="nnlightctlMaskerId">
                <el-input v-model="form.nnlightctlMaskerId" auto-complete="off"></el-input>
                </el-form-item>
                 <el-form-item label="编号" label-width="80px" prop="codeNumber">
                <el-input v-model="form.codeNumber" auto-complete="off"></el-input>
                </el-form-item>
                 <el-form-item label="部门" label-width="80px" prop="department">
                <el-input v-model="form.department" auto-complete="off"></el-input>
                </el-form-item>
               
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="linkmanAdd('form')">确 定</el-button>
            </div>
            </el-dialog>


              <el-dialog title="编辑联系人" :visible.sync="dialogFormVisible2">
            <el-form :model="Contact" style="margin:0 auto" :rules="rules" ref="Contact" class="demo-ruleForm" >
                <el-form-item label="联系人" label-width="80px" prop="maskName">
                <el-input v-model="Contact.maskName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" label-width="80px" prop="sex">
                <el-input v-model="Contact.sex" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="年龄" label-width="80px" prop="age">
                <el-input v-model="Contact.age" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" label-width="80px">
                <el-input v-model="Contact.phoneNumber" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" label-width="80px" prop="email">
                <el-input v-model="Contact.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="职位" label-width="80px" prop="place">
                <el-input v-model="Contact.place" auto-complete="off"></el-input>
                </el-form-item>
                 <el-form-item label="直属上级" label-width="80px" prop="nnlightctlMaskerId">
                <el-input v-model="Contact.nnlightctlMaskerId" auto-complete="off"></el-input>
                </el-form-item>
                 <el-form-item label="编号" label-width="80px" prop="codeNumber">
                <el-input v-model="Contact.codeNumber" auto-complete="off"></el-input>
                </el-form-item>
                 <el-form-item label="部门" label-width="80px" prop="department">
                <el-input v-model="Contact.department" auto-complete="off"></el-input>
                </el-form-item>
               
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="linkmanContact('Contact')">确 定</el-button>
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
                        prop="maskName"
                        label="联系人"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="sex"
                        label="性别"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="age"
                        label="年龄"
                        show-overflow-tooltip>
                        </el-table-column>
                         <el-table-column
                        prop="phoneNumber"
                        label="联系电话"
                        show-overflow-tooltip>
                        </el-table-column>
                         <el-table-column
                        prop="email"
                        label="邮箱"
                        show-overflow-tooltip>
                        </el-table-column>
                         <el-table-column
                        prop="place"
                        label="职位"
                        show-overflow-tooltip>
                        </el-table-column>
                         <el-table-column
                        prop="nnlightctlMaskerId"
                        label="直属上级"
                        show-overflow-tooltip>
                        </el-table-column>
                         <el-table-column
                        prop="codeNumber"
                        label="编号"
                        show-overflow-tooltip>
                        </el-table-column>
                         <el-table-column
                        prop="department"
                        label="部门"
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
import {listMasker,addOrUpdateMasker,isvalidPhone,getMasker,ConOrUpdateMasker,deleteMasker} from '@/api/AssetAdmin.js'
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
         maskName:'',
         sex:'',
         age:'',
         phoneNumber:'',
         email:'',
         place:'',
         nnlightctlMaskerId:'',
         codeNumber:'',
         department:''
        },
        Contact: {
         maskName:'',
         sex:'',
         age:'',
         phoneNumber:'',
         email:'',
         place:'',
         nnlightctlMaskerId:'',
         codeNumber:'',
         department:''
        },
        formLabelWidth: '120px',
        tableData3: [],
         rules: {
          maskName: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
           sex: [
            { required: true, message: '请输入性别', trigger: 'blur' },
          ],
           age: [
            { required: true, message: '年龄不能为空'}
           
          ],
           email: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
           { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
          
         }
        }
    },created(){
      var a=10
      var b=10
      listMasker().then(res=>{
        this.tableData3=res.data
      })
    }
    ,
    methods:{
        alldelte(){
            var that=this
            var a=[]
            for(var i=0; i<this.multipleSelection.length;i++){
                a.push(this.multipleSelection[i].id)
            }
            deleteMasker(a).then(res=>{
             that.$message({
                    type:'success',
                    message:'删除成功'
                })
            listMasker().then(res=>{
                that.tableData3=res.data
            })
        })
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        handleEdit(index, row) {
        // console.log(index, row.id,row);
        var that=this
            getMasker(row.id).then(res=>{
                that.Contact=res.data[0]
            })

        this.dialogFormVisible2=true
      },
      handleDelete(index, row) {
        // console.log(index, row);
        var  a=[]
            a.push(row.id)
        var that=this
        deleteMasker(a).then(res=>{
             that.$message({
                    type:'success',
                    message:'删除成功'
                })
            listMasker().then(res=>{
                that.tableData3=res.data
            })
        })


      }, handleSizeChange(val) {
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
            
            addOrUpdateMasker(that.form.maskName,that.form.sex,Number(that.form.age),Number(that.form.phoneNumber),that.form.email,that.form.place,that.form.nnlightctlMaskerId,that.form.codeNumber,that.form.department).then(res=>{
                that.$message({
                    type:'success',
                    message:'添加成功'
                })
                this.dialogFormVisible = false
                // that.tableData3.push(that.form)
                listMasker().then(res=>{
                    this.tableData3=res.data
                })
            })
          } else {
           
            return false;
          }
        });
      },
      linkmanContact(formName){
        //   console.log(this.Contact)
         var that=this
          this.$refs[formName].validate((valid) => {
          if (valid) {
            
            ConOrUpdateMasker(that.Contact.id,that.Contact.maskName,that.Contact.sex,that.Contact.age,that.Contact.phoneNumber,that.Contact.email,that.Contact.place,that.Contact.nnlightctlMaskerId,that.Contact.codeNumber,that.Contact.department).then(res=>{
                that.$message({
                    type:'success',
                    message:'修改成功'
                })
                this.dialogFormVisible2 = false
                // that.tableData3.push(that.form)
                listMasker().then(res=>{
                    this.tableData3=res.data
                })
            })
          } else {
           
            return false;
          }
        });
      },
       open3() {
        this.$prompt('请输入邮箱', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: '邮箱格式不正确'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的邮箱是: ' + value
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          });       
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
