<template>
  <div class="system-container">
      <div class="system-top clearfix">
        <el-input placeholder="请输入内容" class="input-with-select">
        </el-input>
        <el-button slot="append" type="primary"  icon="el-icon-search"></el-button>
        <!-- <div class="btn-block f-r">
          <el-button type="primary">查询</el-button>
        </div> -->
      </div>
      <div class="system-center">
        <div class="operation-bar">
          <el-button @click="addNewObject()" type="primary">增加</el-button>
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
              prop="projectName"
              fixed="left"
              label="名称"
              width="100">
            </el-table-column>
            <el-table-column
              label="机构"
              width="100">
            </el-table-column>
            <el-table-column
              prop="longitude"
              label="上级部门"
              width="100">
            </el-table-column>
            <el-table-column
              prop="latitude"
              label="备注"
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
      <!-- 修改 增加机构 -->
      <el-dialog title="添加/修改机构"
       :visible.sync="addDialog" :close-on-click-modal='false' :close-on-press-escape='false' center
       :before-close="handleCloseDialog">
        <el-form ref="form" label-width="80px">
          <el-form-item label="名称" required>
            <el-input class="width350" v-model="newObject.projectName"></el-input>
          </el-form-item>
          <el-form-item label="机构" required>
            <el-input class="width350" v-model="newObject.projectName"></el-input>
          </el-form-item>
          <el-form-item label="上级部门" required>
            <el-input class="width350" v-model="newObject.projectName"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="newObject.mem">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addDialog = false">取 消</el-button>
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
      pageSize: 10,
      multipleSelection: [],
      currentPage: 1,
      allTotal: null,
      userList: [],
      newObject: {},
      addDialog: false,
      passwordDialog: false
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
    handleSizeChange (val) {
      this.pageSize = val
    },
    addNewObject () {
      this.addDialog = true
    },
    editPassword () {
      this.passwordDialog = true
    },
    deleteRow () {
    },
    editRow () {
    },
    onSubmit () {
    },
    // 弹窗关闭时将数据清空
    handleCloseDialog (done) {
      this.newObject = {}
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
  .input-with-select{
    width: 285px;
  }
</style>
