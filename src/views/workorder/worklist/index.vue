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
            <allwork v-if="tablelist"></allwork>
            <listwork v-else='tablelist'></listwork>
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
        },
         
        }
    },methods:{
        Newworklist:function(){
            this.formdatahide=true
        },
        tabchange(tab, event) {
            if(tab.name=='first'){
                this.tablelist=true
            }else{
                this.tablelist=false
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
              }
            this.tableData=res.data
        })
          })
         
      }
     
    },
    components:{
        Allwork,
        Listwork
    },
    created(){
        countWorkOrderState().then(res=>{
            console.log(res.data)
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
