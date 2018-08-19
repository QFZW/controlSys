<template>
    <div class="box">
        <div class="buttonList">
            <div>
                <p>55</p>
                <p>申请中</p>
            </div>
            <div>
                 <p>55</p>
                 <p>待审批</p>
            </div>
        </div>
        <div class="table">
        <template>
            <el-table
                :data="tableData2"
                style="width: 100%"
                :row-class-name="tableRowClassName">
                <el-table-column
                prop="date"
                label="行号"
                >
                </el-table-column>
                <el-table-column
                prop="name"
                label="资产目录"
                >
                </el-table-column>
                <el-table-column
                prop="address"
                label="资产名称">
                </el-table-column>
                <el-table-column
                prop="address"
                label="申请人">
                </el-table-column>
                <el-table-column
                prop="address"
                label="库存状态">
                </el-table-column>
                <el-table-column
                prop="address"
                label="数量">
                </el-table-column>
                <el-table-column
                prop="address"
                label="申请状态">
                </el-table-column>
                <el-table-column
                prop="address"
                label="出入库">
                </el-table-column>
                <el-table-column
                prop="address"
                label="原因">
                </el-table-column>
                <el-table-column
                prop="address"
                label="备注">
                </el-table-column>
                <el-table-column
                prop="address"
                label="审批人">
                </el-table-column>
                <el-table-column
                prop="address"
                label="创建时间">
                </el-table-column>
                <el-table-column
                prop="address"
                label="修改时间">
                </el-table-column>
                <el-table-column
                prop="address"
                label="所属库存">
                </el-table-column>
            </el-table>
        </template>
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
    </div>
</template>

<script>
export default {
  name: '',
  methods: {
    tableRowClassName ({row, rowIndex}) {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  },
  data () {
    return {
        currentPage4: 4,
      tableData2: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '123',
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '12313'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '123123',
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '123123'
      }]
    }
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
