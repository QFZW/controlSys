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
              label="编码"
              width="100">
            </el-table-column>
             <el-table-column
              prop="loginName"
              label="登陆名"
              width="100">
            </el-table-column>
            <el-table-column
              prop="place"
              label="职位"
              width="100">
            </el-table-column>
            <el-table-column
              prop="provinceName"
              label="部门岗位"
              width="100">
            </el-table-column>
            <el-table-column
              label="性别"
              width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.userType===1">男</span>
                <span v-else>女</span>
              </template>
            </el-table-column>
            <el-table-column
              label="用户类型">
              <template slot-scope="scope">
                {{userTypeList[scope.row.userType].name}}
              </template>
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
      userList: [],
      userTypeList: [
        {
          id: 0,
          name: '超级管理员用户'
        },
        {
          id: 1,
          name: '机构管理员用户'
        },
        {
          id: 2,
          name: '部门用户'
        }
      ]
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
