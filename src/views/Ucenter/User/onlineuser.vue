<template>
  <div class="system-container">
      <div class="system-top clearfix">
        <el-input placeholder="请输入内容" class="input-with-select">
        </el-input>
        <el-button slot="append" type="primary"  icon="el-icon-search"></el-button>
      </div>
      <div class="system-center">
        <div class="data-list">
          <el-table
            ref="multipleTable"
            :data="userList"
            tooltip-effect="dark"
            style="width: 100%"
            header-row-class-name="datalist-header">
            <el-table-column
              fixed
              prop="codeNumber"
              label="账号"
              width="100">
            </el-table-column>
             <el-table-column
              prop="projectName"
              label="名称"
              width="100">
            </el-table-column>
            <el-table-column
              prop="countryName"
              label="机构"
              width="100">
            </el-table-column>
            <el-table-column
              prop="provinceName"
              label="部门岗位"
              width="100">
            </el-table-column>
            <el-table-column
              prop="cityName"
              label="权限"
              width="100">
            </el-table-column>
            <el-table-column
              label="状态"
              width="100">
            </el-table-column>
            <el-table-column
              prop="longitude"
              label="登陆地点">
            </el-table-column>
          </el-table>
        </div>
        <div class="pagelist-block">
          <el-pagination
            @size-change="handleSizeChange"
            background
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="allTotal">
          </el-pagination>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'organization',
  data () {
    return {
      pageNumber: 1,
      pageSize: 10,
      currentPage: 1,
      allTotal: null,
      userList: []
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.pageNumber = val
      // 翻页请求
    },
    handleSizeChange (val) {
      this.pageSize = val
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
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  .input-with-select{
    width: 285px;
  }
</style>
