<template>
  <div class="system-container">
      <div class="system-top clearfix">
        <div class="item-block f-l">
          <span class="title">目录</span><el-input  placeholder="请输入内容"></el-input>
        </div>
        <div class="item-block f-l">
          <span class="title">名称</span><el-input  placeholder="请输入内容"></el-input>
        </div>
        <div class="btn-block f-r">
          <el-button type="primary">查询</el-button>
        </div>
      </div>
      <div class="system-center">
        <div class="operation-bar">
          <el-button @click="addUser()" type="primary">增加</el-button>
          <el-button @click="deleteRow(2)">删除</el-button>
        </div>
        <div class="data-list">
          <el-table
            ref="multipleTable"
            :data="userList"
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
              label="目录"
              width="100">
            </el-table-column>
             <el-table-column
              prop="projectName"
              label="名称"
              width="100">
            </el-table-column>
            <el-table-column
              prop="countryName"
              label="联系人"
              width="100">
            </el-table-column>
            <el-table-column
              prop="provinceName"
              label="电话"
              width="100">
            </el-table-column>
            <el-table-column
              prop="cityName"
              label="传真"
              width="100">
            </el-table-column>
            <el-table-column
              label="邮件"
              width="100">
            </el-table-column>
            <el-table-column
              prop="longitude"
              label="地址"
              width="100">
            </el-table-column>
            <el-table-column
              prop="latitude"
              label="邮编"
              width="80">
            </el-table-column>
            <el-table-column
              prop="mem"
              label="创建时间"
              width="150">
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
      <!-- 修改 增加用户 -->
      <el-dialog title="添加用户"
       :visible.sync="userDialog" :close-on-click-modal='false' :close-on-press-escape='false' center
       :before-close="handleCloseDialog">
        <el-form ref="form" label-width="50px">
          <el-form-item label="国家" required>
            <span class="text">{{newUser.countryName}}</span>
          </el-form-item>
          <el-form-item label="省份" required>
            <span class="text">{{newUser.provinceName}}</span>
          </el-form-item>
          <el-form-item label="城市" required>
            <span class="text">{{newUser.cityName}}</span>
          </el-form-item>
          <el-form-item label="类型" required>
            <span class="text" v-if="newUser.type == 1">道路照明系统</span>
          </el-form-item>
          <el-form-item label="名称" required>
            <el-input class="width350" v-model="newUser.projectName"></el-input>
          </el-form-item>
          <el-form-item label="纬度" required>
            <el-input class="width350" v-model="newUser.latitude"></el-input>
          </el-form-item>
          <el-form-item label="经度" required>
            <el-input class="width350" v-model="newUser.longitude"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="newUser.mem">
            </el-input>
          </el-form-item>
          <el-form-item>
              <el-checkbox v-model="newUser.state">启用</el-checkbox>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="userDialog = false">取 消</el-button>
          <el-button type="primary" @click="onSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'organization',
  data () {
    return {
      pageNumber: 1,
      pageSize: 100,
      multipleSelection: [],
      currentPage: 1,
      userList: [],
      newUser: {},
      userDialog: false
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
    addUser () {
    },
    deleteRow () {
    },
    editRow () {
    },
    onSubmit () {
    },
    // 弹窗关闭时将数据清空
    handleCloseDialog (done) {
      this.newUser = {}
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
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
