<template>
    <div class="box">
        <div class="buttonList">
            <div @click="show=true">
                <p>{{pullData}}</p>
                <p>入库申请</p>
            </div>
            <div @click="show=false">
                 <p>{{pushData}}</p>
                 <p>出库申请</p>
            </div>
        </div>
        <div class="table">
        <template v-if="show">
            <el-table
                :data="tableData2"
                style="width: 100%"
                :row-class-name="tableRowClassName">
                <el-table-column
                prop="gmtCreated"
                label="创建日期"
                >
                </el-table-column>
                <el-table-column
                prop="gmtUpdated"
                label="修改日期"
                >
                </el-table-column>
                <el-table-column
                prop="id"
                label="ID">
                </el-table-column>
                <el-table-column
                prop="nnlightctlPropertyClassifyCatalogId"
                label="入库资产分类目录">
                </el-table-column>
                <el-table-column
                prop="nnlightctlRepertoryId"
                label="入库仓库">
                </el-table-column>
                <el-table-column
                prop="nnlightctlSupplier"
                label="供应商">
                </el-table-column>
                <el-table-column
                prop="nnlightctlUserApplyId"
                label="入库申请人">
                </el-table-column>
                <el-table-column
                prop="propertyCount"
                label="入库数量">
                </el-table-column>
                <el-table-column
                prop="propertyName"
                label="入库资产名称">
                </el-table-column>
                <el-table-column
                prop="propertyUid"
                label="资产编码">
                </el-table-column>
                <el-table-column
                prop="serialnumber"
                label="入库记录单">
                </el-table-column>
            </el-table>
        </template>


        <template v-else="show">
            <el-table
                :data="tableData3"
                style="width: 100%"
                :row-class-name="tableRowClassName">
                <el-table-column
                prop="gmtCreated"
                label="创建日期"
                >
                </el-table-column>
                <el-table-column
                prop="gmtUpdated"
                label="修改日期"
                >
                </el-table-column>
                <el-table-column
                prop="id"
                label="ID">
                </el-table-column>
                <el-table-column
                prop="applyState"
                label="申请状态">
                </el-table-column>
                <el-table-column
                prop="nnlightctlPropertyId"
                label="入库仓库">
                </el-table-column>
                <el-table-column
                prop="nnlightctlUserId"
                label="入库申请人">
                </el-table-column>
                <el-table-column
                prop="refuseReason"
                label="不通过原因">
                </el-table-column>
                <el-table-column
                prop="serialnumber"
                label="出库记录单">
                </el-table-column>
            </el-table>
        </template>
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
import {countApplyInRepertory,countApplyOutRepertory,listApplyInRepertory,listApplyOutRepertory,changeTime} from '@/api/AssetAdmin.js'
export default {
    name:'',
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex === 1) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      },
       handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    },
    data() {
      return {
         currentPage4: 4,
        tableData2: [{
                gmtCreated:'创建日期',
                gmtUpdated:'修改日期',
                id:4,
                nnlightctlPropertyClassifyCatalogId:'入库资产分类目录',
                nnlightctlRepertoryId:'入库仓库',
                nnlightctlRepertoryInReasonId:'入库原因',
                nnlightctlSupplier:'供应商',
                nnlightctlUserApplyId:'入库申请人',
                propertyCount:'入库数量',
                propertyName:'入库资产名称',
                propertyUid:'资产唯一编码',
                serialnumber:'入库记录单'
        }],

          tableData3: [{
                applyState:'申请状态',
                gmtCreated:'创建时间',
                gmtUpdated:'修改时间',
                id:'ID',
                nnlightctlPropertyId:'入库仓库',
                nnlightctlUserId:'入库申请人',
                refuseReason:'不通过原因',
                serialnumber:'出库记录单号',
        }],
        pullData:'',
        pushData:'',
        show:true,
        hide:false
      }
    },created(){
        countApplyInRepertory().then(res=>{
          this.pullData=res.data[0]
        })
        countApplyOutRepertory().then(res=>{
          this.pushData=res.data[0]
        })
        listApplyInRepertory().then(res=>{
            console.log(res.data)
        })

        listApplyInRepertory().then(res=>{
             for(var i=0;i<res.data.length;i++){
                res.data[i].gmtCreated=changeTime(res.data[i].gmtCreated)
                res.data[i].gmtUpdated=changeTime(res.data[i].gmtUpdated)
                res.data[i].translateDate=changeTime(res.data[i].translateDate)
            }
            this.tableData2=res.data
        })
        listApplyOutRepertory().then(res=>{
             for(var i=0;i<res.data.length;i++){
                res.data[i].gmtCreated=changeTime(res.data[i].gmtCreated)
                res.data[i].gmtUpdated=changeTime(res.data[i].gmtUpdated)
                res.data[i].translateDate=changeTime(res.data[i].translateDate)
                if(res.data[i].applyState==1){
                    res.data[i].applyState='待审批'
                }else if(res.data[i].applyState==0){
                    res.data[i].applyState='申请中'
                }else if(res.data[i].applyState==2){
                    res.data[i].applyState='不通过'
                }else if(res.data[i].applyState==3){
                    res.data[i].applyState='待入库'
                }else if(res.data[i].applyState==4){
                    res.data[i].applyState='已入库'
                }
            }
            this.tableData3=res.data
        })
    }
  
}
</script>

<style scoped>
.el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
        .buttonList{
            display: flex;
            margin-top: 20px;
        }
        .buttonList div{
            height: 100px;
            width: 180px;
            border-radius: 5px;
            background: #409EFF;  
            margin-right: 20px;
        }
        .buttonList >div >p{
            margin-left: 30px;
            line-height: 24px;
            color: #fff
        }
        .buttonList >div >p:nth-child(1){
            margin-top: 25px;
            font-size: 20px;
        }
        .box{
            width: 98%;
            margin: 0 auto;
        }
        .table{
            margin-top: 20px;
        }
</style>
