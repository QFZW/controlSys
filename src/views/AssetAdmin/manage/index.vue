<template>
    <div class="box">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="未提交" name="0"></el-tab-pane>
                <el-tab-pane label="已提交" name="1"></el-tab-pane>
            </el-tabs>
            <div style="display:flex;justify-content: space-between">
                <div class="search">
                <div>
                        <el-input v-model="input" placeholder="请输入内容"></el-input>
                </div>
                <div style="width:30px;"></div>
                <div class="dateChange">
                        <div>所属配电柜</div>
                        <div style="width:20px;"></div>
                            <el-select v-model="value" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                    </div>
                </div>
                <div>
                      <el-button type="primary">查询</el-button>
                </div>
            </div>
            <div class="buttonList">
                <el-button type="primary" icon="el-icon-plus" @click="dialogFormVisible = true">增加</el-button>
                <el-button type="primary" plain icon="el-icon-delete" @click="alldelte">批量删除</el-button>
                <el-button type="primary" plain icon="el-icon-setting">设置</el-button>
                <el-button type="primary" plain icon="el-icon-check" @click="updatacommitRepairRecord">提交</el-button>
            </div>
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
                        prop="propertyName"
                        label="资产名称"
                        width="120">
                       
                        </el-table-column>
                        <el-table-column
                        prop="propertyCount"
                        label="资产数量"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="faultDate"
                        label="故障日期"
                        show-overflow-tooltip>
                        </el-table-column>
                         <el-table-column
                        prop="createDate"
                        label="创建日期"
                        show-overflow-tooltip>
                        </el-table-column>
                         <el-table-column
                        prop="nnlightctlUserId"
                        label="创建人"
                        show-overflow-tooltip>
                        </el-table-column>
                         <el-table-column
                        prop="isCommit"
                        label="状态"
                        show-overflow-tooltip>
                        </el-table-column>
                         <el-table-column
                        prop="nnlightctlEleboxId"
                        label="所属控制柜"
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

                <!--    添加   -->
                 <el-dialog title="添加资产" :visible.sync="dialogFormVisible">
            <el-form :model="form" style="margin:0 auto" :rules="rules" ref="form" class="demo-ruleForm" >
                <el-form-item label="资产名称" label-width="100px" prop="propertyName">
                <el-input v-model="form.propertyName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="资产数量" label-width="100px" prop="propertyCount">
                <el-input v-model="form.propertyCount" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="故障日期" label-width="100px" prop="faultDate">
                <el-date-picker
                    v-model="form.faultDate"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="创建日期" label-width="100px" prop="createDate">
               
                <el-date-picker
                    v-model="form.createDate"
                    type="date"
                    placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
               
                <el-form-item label="创建人" label-width="100px" prop="nnlightctlUserId">
                <el-input v-model="form.nnlightctlUserId" auto-complete="off"></el-input>
                </el-form-item>
                 <el-form-item label="资产目录" label-width="100px" prop="nnlightctlPropertyClassifyCatalogId">
                <el-input v-model="form.nnlightctlPropertyClassifyCatalogId" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="状态" label-width="100px" prop="isCommit">
                

                <el-select v-model="form.isCommit" placeholder="请选择" auto-complete="off">
                    <el-option
                    v-for="item in isCommit"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                </el-form-item>
                 <el-form-item label="所属控制柜" label-width="100px" prop="nnlightctlEleboxId">
                <el-input v-model="form.nnlightctlEleboxId" auto-complete="off"></el-input>
                </el-form-item>
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="linkmanAdd('form')">确 定</el-button>
            </div>
            </el-dialog>
    </div>
</template>
<script>
import {listRepairRecord,addOrUpdateRepairRecord,deleteRepairRecord,changeTime,commitRepairRecord,getRepairRecord} from '@/api/AssetAdmin.js'
export default {
    name:'',
    data(){
        return{
             activeName: 0,
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
        isCommit:[{
            value:0,
            label:'未提交'
        },{
            value:'1',
            label:'已提交'
        }],
        value: '',
        input:'',
        tableData3:[
            ],
        dialogFormVisible:false,
         form: {
             nnlightctlEleboxId:'',
             nnlightctlPropertyClassifyCatalogId:'',
             propertyName:'',
             propertyCount:'',
             faultDate:'',
             createDate:'',
             nnlightctlUserId:'',
             isCommit:''
        },
        rules: {
          propertyName: [
            { required: true, message: '请输入名称', trigger: 'blur' },
            { min: 2, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
         }
    }
    },
    created(){
        listRepairRecord(this.activeName).then(res=>{
              for(var i=0;i<res.data.length;i++){
                res.data[i].faultDate=changeTime(res.data[i].faultDate)
                res.data[i].createDate=changeTime(res.data[i].createDate)
               if(res.data[i].isCommit===0){
                            res.data[i].isCommit='未提交'
                        }else{
                            res.data[i].isCommit='已提交'
                        }
            }
             this.tableData3=res.data   
        })
    },
      methods: {
      handleClick(tab, event) {
        console.log(tab.name);
        this.activeName=tab.name
        var that=this
         listRepairRecord(tab.name).then(res=>{
               for(var i=0;i<res.data.length;i++){
                res.data[i].faultDate=changeTime(res.data[i].faultDate)
                res.data[i].createDate=changeTime(res.data[i].createDate)
               if(res.data[i].isCommit===0){
                            res.data[i].isCommit='未提交'
                        }else{
                            res.data[i].isCommit='已提交'
                        }
            }
                this.tableData3=res.data
        })
      },
      handleEdit(index,row){
          console.log(row.id)
          getRepairRecord(row.id).then(res=>{
              console.log(res.data)
          })
      },
      handleDelete(index,row){
         var  a=[]
        a.push(row.id)
        console.log(a)
        var that=this
        deleteRepairRecord(a).then(res=>{
             that.$message({
                    type:'success',
                    message:'删除成功'
                })
           listRepairRecord(this.activeName).then(res=>{
                 for(var i=0;i<res.data.length;i++){
                res.data[i].faultDate=changeTime(res.data[i].faultDate)
                res.data[i].createDate=changeTime(res.data[i].createDate)
               if(res.data[i].isCommit===0){
                            res.data[i].isCommit='未提交'
                        }else{
                            res.data[i].isCommit='已提交'
                        }
            }
             this.tableData3=res.data   
        })
        })
      },
      handleSelectionChange(val) {
            this.multipleSelection = val;
        },
      alldelte(){
            var that=this
            var a=[]
            for(var i=0; i<this.multipleSelection.length;i++){
                a.push(this.multipleSelection[i].id)
            }
           deleteRepairRecord(a).then(res=>{
             that.$message({
                    type:'success',
                    message:'删除成功'
                })
           listRepairRecord(this.activeName).then(res=>{
                 for(var i=0;i<res.data.length;i++){
                res.data[i].faultDate=changeTime(res.data[i].faultDate)
                res.data[i].createDate=changeTime(res.data[i].createDate)
               if(res.data[i].isCommit===0){
                            res.data[i].isCommit='未提交'
                        }else{
                            res.data[i].isCommit='已提交'
                        }
            }
             this.tableData3=res.data   
        })
        })
        }, updatacommitRepairRecord(){
            var that=this
            var a=new Array()
            for(var i=0; i<this.multipleSelection.length;i++){
                a.push(this.multipleSelection[i].id)
            }
            console.log(a)
           commitRepairRecord(a).then(res=>{
             that.$message({
                    type:'success',
                    message:'提交成功'
                })
           listRepairRecord(this.activeName).then(res=>{
                 for(var i=0;i<res.data.length;i++){
                res.data[i].faultDate=changeTime(res.data[i].faultDate)
                res.data[i].createDate=changeTime(res.data[i].createDate)
               if(res.data[i].isCommit===0){
                            res.data[i].isCommit='未提交'
                        }else{
                            res.data[i].isCommit='已提交'
                        }
            }
             that.tableData3=res.data   
        })
        })
        },
     
      linkmanAdd(formName){
        //   console.log(this.form)
        var that=this
        var faultDate
        var createDate
        var d = new Date(that.form.faultDate); 
        var c=new Date(that.form.createDate) 
         faultDate=d.getFullYear() + '/' + (d.getMonth() + 1) + '/' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
         createDate=c.getFullYear() + '/' + (c.getMonth() + 1) + '/' + c.getDate() + ' ' + c.getHours() + ':' + c.getMinutes() + ':' + c.getSeconds();
         console.log(faultDate)
          this.$refs[formName].validate((valid) => {
          if (valid) {
            addOrUpdateRepairRecord(that.form.nnlightctlEleboxId,that.form.nnlightctlPropertyClassifyCatalogId,that.form.propertyName,that.form.propertyCount,faultDate,createDate,that.form.nnlightctlUserId,Number(that.form.isCommit)).then(res=>{
                that.$message({
                    type:'success',
                    message:'添加成功'
                })
                this.dialogFormVisible = false
                // that.tableData3.push(that.form)
               listRepairRecord().then(res=>{

                    for(var i=0;i<res.data.length;i++){
                        res.data[i].faultDate=changeTime(res.data[i].faultDate)
                        res.data[i].createDate=changeTime(res.data[i].createDate)
                        if(res.data[i].isCommit===0){
                            res.data[i].isCommit='未提交'
                        }else{
                            res.data[i].isCommit='已提交'
                        }
                    }
                    this.tableData3=res.data   
                })
            })
          } else {
           
            return false;
          }
        });
      },
    }
}
</script>
<style scoped>
.box{
    width: 98%;
    margin: 0 auto;
 
    height: auto;
}
.search{
    display: flex;
    width: 50%;
    margin-top: 20px;
 
}
.dateChange{
    display: flex;
    line-height: 40px;
}
.buttonList{
    margin-top: 20px;
    margin-bottom: 20px;
    padding-top: 10px;
    border-top: solid 1px #ccc
}
</style>

