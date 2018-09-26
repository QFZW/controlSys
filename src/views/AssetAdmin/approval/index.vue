<template>
    <div class="box">
         <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="待审批" name="0"></el-tab-pane>
                <el-tab-pane label="审批记录" name="1"></el-tab-pane>
        </el-tabs>
         <el-table
            :data="tableData"
            style="width: 100%"
            >
            <el-table-column
            fixed
            prop="applyState"
            label="状态"
            >
            </el-table-column>
            <el-table-column
            prop="gmtCreated"
            label="创建时间"
            >
            </el-table-column>
            <el-table-column
            prop="gmtUpdated"
            label="变更时间"
            >
            </el-table-column>
            <el-table-column
            prop="id"
            label="id"
            >
            </el-table-column>
            <el-table-column
            prop="inRepertoryDate"
            label="入库时间"
            >
            </el-table-column>
            <el-table-column
            prop="nnlightctlRepertoryId"
            label="入库ID"
            >
            </el-table-column>
             <el-table-column
            prop="nnlightctlPropertyClassifyCatalogId"
            label="入库资产分类目录"
            >
            </el-table-column>
             <el-table-column
            prop="nnlightctlRepertoryInReasonId"
            label="入库原因"
            >
            </el-table-column>
             <el-table-column
            prop="nnlightctlSupplier"
            label="供应商"
            >
            </el-table-column>
             <el-table-column
            prop="nnlightctlUserApplyId"
            label="入库申请"
            >
            </el-table-column>
             <el-table-column
            prop="propertyCount"
            label="入库数量"
            >
            </el-table-column>
             <el-table-column
            prop="propertyName"
            label="入库资产名称"
            >
            </el-table-column>
            <el-table-column
            prop="propertyUid"
            label="资产唯一编码"
            >
            </el-table-column>
            <el-table-column
            prop="serialnumber"
            label="入库记录单号"
            >
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="handleClickpull(scope.row)" type="text" size="small">通过</el-button>
                    <el-button type="text" size="small">驳回</el-button>
                </template>
                </el-table-column>
        </el-table>
    </div>
</template>
<script>
import {listApplyInApprovePending,listApplyInHistory,changeTime} from '@/api/AssetAdmin.js'

export default {
    name:'',
    data(){
        return{
            activeName:'0',
            tableData:[{
                "applyState": '1---申请状态（0-申请中；1-待审批；2-不通过；3-待入库；4-已入库）',
                "gmtCreated": '1531152000000,   ---创建日期',
                "gmtUpdated": '1531152000000,   ---修改日期',
                "id": 1,
                "inRepertoryDate": '1531152000000,   ---入库日期',
                "nnlightctlPropertyClassifyCatalogId": '1,   ---入库资产分类目录',
                "nnlightctlRepertoryId": '2,            ---入库仓库',
                "nnlightctlRepertoryInReasonId": '2,    --入库原因',
                "nnlightctlSupplier": '2,               ---供应商',
                "nnlightctlUserApplyId": '2,            ---入库申请',
                "propertyCount": '2,                ---入库数量',
                "propertyName": '"sdfsd",             ---入库资产名称',
                "propertyUid": '"sdf",              --资产唯一编码',
                "serialnumber": '"9527"            --入库记录单号'
            }]
        }
        
    },methods:{
         handleClick(tab, event){
             console.log(tab.name)
             if(tab.name==1){
                listApplyInHistory().then(res=>{
                     for(var i=0;i<res.data.length;i++){
                       res.data[i].gmtCreated=changeTime(res.data[i].gmtCreated)
                        res.data[i].gmtUpdated=changeTime(res.data[i].gmtUpdated)
                        res.data[i].inRepertoryDate=changeTime(res.data[i].inRepertoryDate)
                         if(res.data[i].applyState===0){
                            res.data[i].applyState='申请中'
                        }else if(res.data[i].applyState===1){
                            res.data[i].applyState='待审批'
                        }else if(res.data[i].applyState===2){
                            res.data[i].applyState='不通过'
                        }
                    }
                    this.tableData=res.data
                })
             }else{
                 listApplyInApprovePending().then(res=>{
                      for(var i=0;i<res.data.length;i++){
                       res.data[i].gmtCreated=changeTime(res.data[i].gmtCreated)
                        res.data[i].gmtUpdated=changeTime(res.data[i].gmtUpdated)
                        res.data[i].inRepertoryDate=changeTime(res.data[i].inRepertoryDate)
                         if(res.data[i].applyState===0){
                            res.data[i].applyState='申请中'
                        }else if(res.data[i].applyState===1){
                            res.data[i].applyState='待审批'
                        }else if(res.data[i].applyState===2){
                            res.data[i].applyState='不通过'
                        }
                    }
                    this.tableData=res.data
                })
             }
         },
         handleClickpull(row){
            console.log(row.id)
            
         }
    },created(){
        listApplyInApprovePending().then(res=>{
            for(var i=0;i<res.data.length;i++){
                res.data[i].gmtCreated=changeTime(res.data[i].gmtCreated)
                res.data[i].gmtUpdated=changeTime(res.data[i].gmtUpdated)
                res.data[i].inRepertoryDate=changeTime(res.data[i].inRepertoryDate)
                if(res.data[i].applyState===0){
                    res.data[i].applyState='申请中'
                }else if(res.data[i].applyState===1){
                    res.data[i].applyState='待审批'
                }else if(res.data[i].applyState===2){
                    res.data[i].applyState='不通过'
                }
            }
            this.tableData=res.data
        })
    }
}
</script>

<style scoped>
    .box{
        width: 98%;
        margin: 0 auto;
    }
</style>

