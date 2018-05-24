<template>
  <div class="system-container">
    <div class="system-top clearfix">
      <div class="item-block f-l">
        <span class="title">xxx</span><el-input  placeholder="请输入内容"></el-input>
      </div>
      <div class="item-block f-l">
        <span class="title">xx</span><el-input  placeholder="请输入内容"></el-input>
      </div>
      <div class="btn-block f-r">
        <el-button type="primary">查询</el-button>
      </div>
    </div>
    <div class="system-center">
      <div class="operation-bar">
        <el-button @click="addCabinet()" type="primary">调整满载功率</el-button>
        <el-button>参数</el-button>
        <el-button>号码</el-button>
        <el-button>查时</el-button>
        <el-button>同步</el-button>
        <el-button>重启</el-button>
        <el-button>复位</el-button>
        <el-button>升级</el-button>
      </div>
      <div class="data-list">
        <el-table
          ref="multipleTable"
          :data="ElectricMeterList"
          tooltip-effect="dark"
          style="width: 100%"
          header-row-class-name="datalist-header"
          @selection-change="handleSelectionChange">
          <el-table-column
            fixed
            type="selection"
            width="40">
          </el-table-column>
          <el-table-column
            fixed
            prop="codeNumber"
            label="控制柜"
            width="100">
          </el-table-column>
            <el-table-column
            prop="projectName"
            label="集中器"
            width="100">
          </el-table-column>
          <el-table-column
            prop="countryName"
            label="状态"
            width="100">
          </el-table-column>
          <el-table-column
            prop="provinceName"
            label="连接模式"
            width="100">
          </el-table-column>
          <el-table-column
            prop="cityName"
            label="服务器地址"
            width="100">
          </el-table-column>
          <el-table-column
            label="端口"
            width="100">
          </el-table-column>
          <el-table-column
            prop=""
            label="满载功率（W）"
            width="120">
          </el-table-column>
          <el-table-column
            prop="latitude"
            label="运行模式">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="editRow(scope.$index)"
                type="text"
                size="small">
                编辑
              </el-button>
              <el-button
                class="danger-text-btn"
                @click.native.prevent="deleteRow(1, scope.$index)"
                type="text"
                size="small">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pagelist-block">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="100"
          layout="total, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Digital',
  data () {
    return {
      pageNumber: 1,
      pageSize: 100,
      multipleSelection: [],
      currentPage: 1,
      ElectricMeterList: []
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleCurrentChange (val) {
      this.pageNumber = val
      // 翻页请求
    },
    addCabinet () {
      this.cabinetDialog = true
    },
    deleteRow () {
    },
    editRow () {
    },
    onSubmit () {
    },
    // 弹窗关闭时将数据清空
    handleCloseDialog (done) {
      done()
    }
  },
  created () {
  },
  destroyed () {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
/* reset element-ui css */
.el-tabs__nav-scroll{
  padding: 0 40px;
}
.el-tabs__header{
  margin-bottom: 0
}
.el-tabs__item{
  height: 70px;
  line-height: 70px;
  font-size: 16px
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.system-container{
  .system-top{
    .item-block{
        padding: 0 30px 0 55px;
    }
  }
}
</style>
