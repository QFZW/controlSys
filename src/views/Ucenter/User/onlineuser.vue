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
      </div>
    </div>
</template>

<script>
import {listOnlineUser} from '@/api/RoadLighting/userAdmin'
import '../../../utils/filter.js'
export default {
  name: 'organization',
  data () {
    return {
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
    },
    // 获取列表
    getListUser () {
      let that = this
      listOnlineUser().then(response => {
        that.userList = response.data
      }).catch(error => {
        console.log(error)
      })
    }
  },
  created () {
    this.getListUser()
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
