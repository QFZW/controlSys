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
        <el-button @click="addBlock()" type="primary">增加区域</el-button>
        <el-button @click="deleteRow(2)">删除</el-button>
      </div>
      <div class="data-list">
        <el-table
          ref="lightTypeTable"
          :data="List"
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
            prop="areaName"
            label="区域名称"
            width="200">
          </el-table-column>
          <el-table-column
            label="创建时间"
            width="150">
            <template slot-scope="scope">
              {{scope.row.gmtCreated|timeFormat}}
            </template>
          </el-table-column>
          <el-table-column
            label="修改时间"
            width="150">
            <template slot-scope="scope">
              {{scope.row.gmtUpdated|timeFormat}}
            </template>
          </el-table-column>
          <el-table-column
            prop="regionDesc"
            label="区域介绍">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            width="100">
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
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
          :total="allTotal">
        </el-pagination>
      </div>
    </div>
    <!-- 修改 增加区域-->
    <el-dialog :title="TITLE+'区域'"
    :visible.sync="addDialog" :close-on-click-modal='false' :close-on-press-escape='false' center
    :before-close="handleCloseDialog">
      <el-form ref="addEditForm" :model="newObject" :rules="addNewObjectRules" label-width="100px">
        <el-form-item label="区域名称" required prop="areaName">
          <el-input class="width350" v-model="newObject.areaName"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="newObject.regionDesc">
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
import { listArea, deleteArea, addOrUpdateArea } from '@/api/RoadLighting/deploy'
import '../../../utils/filter.js'
export default {
  name: 'AreaAdmin',
  data () {
    return {
      pageNumber: 1,
      pageSize: 10,
      multipleSelection: [],
      currentPage: 1,
      allTotal: null,
      TITLE: null,
      List: [],
      addOrUpdateStatus: null,
      newObject: {},
      addDialog: false,
      addNewObjectRules: {
        areaName: [
          { required: true, message: '填写内容不得为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleCurrentChange (val) {
      // 翻页请求
      this.pageNumber = val
      this.getList()
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getList()
    },
    getList () {
      let that = this
      listArea(that.pageNumber, that.pageSize).then(response => {
        that.List = response.data
        if (that.List.length > 0) {
          this.allTotal = response.total
        } else {
          this.allTotal = 0
        }
      }).catch(error => {
        console.log(error)
      })
    },
    addBlock () {
      this.TITLE = '添加'
      this.addDialog = true
      this.addOrUpdateStatus = 'add'
    },
    deleteRow (type, e) {
      let _array = []
      if (type === 1) {
        _array.push(this.List[e].id)
      } else {
        if (this.multipleSelection.length > 0) {
          this.multipleSelection.forEach(selectedItem => {
            // 取出所有待删除选项id
            _array.push(selectedItem.id)
          })
        } else {
          this.$message({
            message: '请勾选需要删除的数据',
            type: 'warning'
          })
        }
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArea(_array).then(response => {
          // that.projectList.splice(e, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getList()
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    editRow (e) {
      this.TITLE = '修改'
      this.addOrUpdateStatus = 'edit'
      this.newObject = Object.assign({}, this.List[e])
      this.addDialog = true
    },
    onSubmit () {
      this.$refs['addEditForm'].validate((valid) => {
        if (valid) {
          let _text
          if (this.addOrUpdateStatus === 'add') {
            _text = '添加成功'
          } else {
            _text = '修改成功'
          }
          addOrUpdateArea(this.newObject).then(response => {
            this.$message({
              type: 'success',
              message: _text
            })
            this.getList()
            this.addDialog = false
            this.handleCloseDialog()
          }).catch(error => {
            console.log(error)
          })
        } else {
          console.log('error submit!!')
        }
      })
    },
    // 弹窗关闭时将数据清空
    handleCloseDialog (done) {
      this.newObject = {}
      this.$refs['addEditForm'].resetFields()
      done()
    }
  },
  created () {
    this.getList()
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
        padding: 0px 30px 0px 55px;
    }
  }
}
</style>
