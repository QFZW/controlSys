<template>
    <div class="box">
        <p>我的平均响应时间{{date}}分钟</p>
        <div class="buttonlist">
            <div>
                <p><i class="el-icon-service"></i></p>
                <p>我的工单：{{mywork}}</p>
            </div>
            <div>
                <p><i class="el-icon-refresh"></i></p>
                <p>待认领工单{{mywork}}</p>
            </div>
            <div>
                <p><i class="el-icon-time"></i></p>
                <p>处理中工单{{mywork}}</p>
            </div>
            <div @click="Newworklist">
                <p><i class="el-icon-circle-plus-outline"></i></p>
                <p>新增工单</p>
            </div>
        </div>
        <div style="clear:both"></div>
        <div class="center">
              <el-tabs v-model="activeName" @tab-click="tabchange">
                <el-tab-pane label="所有工单" name="first"></el-tab-pane>
                <el-tab-pane label="我的工单" name="second"></el-tab-pane>
                <el-tab-pane label="待认领工单" name="third"></el-tab-pane>
                <el-tab-pane label="处理中工单" name="fourth"></el-tab-pane>
            </el-tabs>

            <!--   表格组件  -->
           <div>
        <el-table v-if="tabledataShow"
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
                <el-table-column
              
                label="操作"
                >
                <template slot-scope="scope">
                   
                    <el-button type="text" @click="handleClick(scope.row)" size="small">下载附件</el-button>
                </template>
                </el-table-column>
            </el-table>
 
        <el-table  v-if="tabledataShow2"
                :data="tableData2"
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
                <el-table-column
                label="操作"
                width="120"
                >
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small" >认领</el-button>
                    <el-button type="text" @click="handleClick(scope.row)" size="small">下载附件</el-button>
                </template>
                </el-table-column>
            </el-table>


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
        </div>


    <!--   弹出框   -->
      

        <el-dialog title="新增" :visible.sync="formdatahide">
            <el-form ref="form" :model="formdata" label-width="80px">
                <el-form-item label="编号">
                    <el-input v-model=" formdata.serialNumber"></el-input>
                </el-form-item>
            </el-form>
             <el-form ref="form" :model="formdata" label-width="80px">
                <el-form-item label="分类">
                    <el-input v-model=" formdata.classify"></el-input>
                </el-form-item>
            </el-form>
             <el-form ref="form" :model="formdata" label-width="80px">
                <el-form-item label="工作流">
                    <el-input v-model=" formdata.nnlightctlWorkflowerId"></el-input>
                </el-form-item>
            </el-form>
             <el-form ref="form" :model="formdata" label-width="80px">
                <el-form-item label="优先级">
                    <el-input v-model=" formdata.priority"></el-input>
                </el-form-item>
            </el-form>
             <el-form ref="form" :model="formdata" label-width="80px">
                <el-form-item label="执行人">
                    <el-input v-model=" formdata.nnlightctlMaskerId"></el-input>
                </el-form-item>
            </el-form>
             <el-form ref="form" :model="formdata" label-width="80px">
                <el-form-item label="选择区域">
                    <el-input v-model=" formdata.nnlightctlRegionId"></el-input>
                </el-form-item>
            </el-form>
            <el-form ref="form" :model="formdata" label-width="80px">
                <el-form-item label="地址">
                    <el-input v-model=" formdata.address"></el-input>
                </el-form-item>
            </el-form>
            <el-form ref="form" :model="formdata" label-width="80px">
                <el-form-item label="内容">
                    <el-input v-model=" formdata.content"></el-input>
                </el-form-item>
            </el-form>
            <el-form ref="form" :model="formdata" label-width="80px">
                <el-form-item label="附件">
                    <el-input v-model=" formdata.attachFilePath"></el-input>
                </el-form-item>
            </el-form>

             <div slot="footer" class="dialog-footer">
                <el-button @click="formdatahide = false">取 消</el-button>
                <el-button type="primary" @click="addWork">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import Allwork from './allwork.vue'
import Listwork from './listwork.vue'
import {countWorkOrderState,addWordOrder,listWorkOrder,changeTime} from '@/api/AssetAdmin.js'
export default {
    name:'',
    data(){
        return{
            date:'1.45',
            mywork:'22',
            activeName:'first',
        formdatahide:false,
        tablelist:true,
        formdata:{
            serialNumber:'',
            classify:'',
            nnlightctlWorkflowerId:'',
            priority:'',
            nnlightctlRegionId:'',
            address:'',
            nnlightctlMaskerId:'',
            content:'',
            attachFilePath:''
        }, tableData: [],
        tableData2:[],
          dialogTableVisible : false,
        form:{
            name:''
        },
        tabledataShow:true,
        tabledataShow2:false
         
        }
    },methods:{
        Newworklist:function(){
            this.formdatahide=true
        },
        tabchange(tab, event) {
            if(tab.name=='first'){
                this.tabledataShow=true  
            }else if(tab.name=='second') {
                 this.tabledataShow=false
                  this.tabledataShow2=true 
                  listWorkOrder().then(res=>{
                    for(var i=0;i<res.data.length;i++){
                        res.data[i].gmtCreated=changeTime(res.data[i].gmtCreated)
                        res.data[i].gmtUpdated=changeTime(res.data[i].gmtUpdated)
                    }
                    this.tableData2=res.data
                
                })   
        }else if(tab.name=='third'){
             this.tabledataShow=true
              this.tabledataShow2=false  
             listWorkOrder(1).then(res=>{
                    for(var i=0;i<res.data.length;i++){
                        res.data[i].gmtCreated=changeTime(res.data[i].gmtCreated)
                        res.data[i].gmtUpdated=changeTime(res.data[i].gmtUpdated)
                    }
                    this.tableData=res.data
                
            })   
        }else if(tab.name=='fourth'){
             this.tabledataShow=true
              this.tabledataShow2=false  
             listWorkOrder(2).then(res=>{
                    for(var i=0;i<res.data.length;i++){
                        res.data[i].gmtCreated=changeTime(res.data[i].gmtCreated)
                        res.data[i].gmtUpdated=changeTime(res.data[i].gmtUpdated)
                    }
                    this.tableData=res.data
                
            })   
        }
      },
      
      addWork(){
          addWordOrder(this.formdata.serialNumber,this.formdata.classify,this.formdata.nnlightctlWorkflowerId,this.formdata.priority,this.formdata.nnlightctlRegionId,this.formdata.address,this.formdata.nnlightctlMaskerId,this.formdata.content,this.formdata.attachFilePath).then(res=>{
              console.log(res.data)
               this.formdatahide = false
            listWorkOrder().then(res=>{
            for(var i=0;i<res.data.length;i++){
                  res.data[i].gmtCreated=changeTime(res.data[i].gmtCreated)
                   res.data[i].gmtUpdated=changeTime(res.data[i].gmtUpdated)
                    res.data[i].workCreated=changeTime(res.data[i].workCreated)
              }
            this.tableData=res.data
            })
          })
         
      },
        handleClick(row) {
        console.log(row);
        this.dialogTableVisible = true
      },
     
    },
    components:{
        Allwork,
        Listwork
    },
    created(){
        // countWorkOrderState().then(res=>{
        //     console.log(res.data)
        // })
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
<style scoped>
    .box{
        margin: 0 auto;
        width: 98%;
    }
    .box >p{
        line-height: 40px;
        font-size: 12px;
    }
    .buttonlist >div{
        float: left;
        width: 150px;
        height: 80px;
        border: solid 1px blue;
        margin-right: 20px;
    }
    .buttonlist p{
        text-align: center;
        font-size: 14px;
    }
    .buttonlist >div p:nth-child(1){
        margin-top: 20px;
        margin-bottom: 10px;
        font-size: 16px;
    }
    .center{
        margin-top: 20px;
    }
</style>
