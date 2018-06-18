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
            :data="listInstitution"
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
              prop="institutionName"
              fixed="left"
              label="机构名称"
              width="100">
            </el-table-column>
            <el-table-column
              label="最高级别机构"
              width="120">
              <template slot-scope="scope">
                <span v-if="scope.row.institutionLevel==0">是</span>
              </template>
            </el-table-column>
            <el-table-column
              label="创建时间"
              width="100">
              <template slot-scope="scope">
                {{scope.row.gmtCreated|timeFormat}}
              </template>
            </el-table-column>
            <el-table-column
              label="修改时间"
              width="100">
              <template slot-scope="scope">
                {{scope.row.gmtUpdated|timeFormat}}
              </template>
            </el-table-column>
            <el-table-column
              prop="addr"
              label="机构地址">
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
      <el-dialog :title="addTypeText[addType]+'机构'"
       :visible.sync="addDialog" :close-on-click-modal='false' :close-on-press-escape='false' center
       :before-close="handleCloseDialog">
        <el-form ref="addNewForm" label-width="120px" :model="newObject" :rules="addNewRules" >
          <el-form-item label="机构名称" prop="institutionName" required>
            <el-input v-model="newObject.institutionName"></el-input>
          </el-form-item>
          <el-form-item label="父机构">
            <el-select  v-model="newObject.nnlightctlInstitutionIdParent">
              <el-option
                v-for="(item , index) in listAllInstitution"
                :key="index"
                :label="item.institutionName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否是最高级别" required>
            <el-radio-group v-model="newObject.institutionLevel">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="机构地址">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="newObject.addr">
            </el-input>
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
import {addOrUpdateInstitution, listInstitution, getInstitution, deleteInstitution} from '@/api/RoadLighting/userAdmin'
import '../../../utils/filter.js'
export default {
  name: 'organization',
  data () {
    return {
      addTypeText: ['添加', '修改'],
      addType: 0,
      pageNumber: 1,
      pageSize: 10,
      multipleSelection: [],
      currentPage: 1,
      allTotal: null,
      newObject: {},
      addDialog: false,
      listInstitution: [],
      listAllInstitution: [],
      addNewRules: {
        institutionName: [
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
      this.pageNumber = val
      this.getListInstitution()
      // 翻页请求
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getListInstitution()
    },
    addNewObject () {
      this.addType = 0
      this.addDialog = true
    },
    onSubmit () {
      this.addOrUpdateInstitution()
    },
    // 弹窗关闭时将数据清空
    handleCloseDialog (done) {
      this.newObject = {}
      this.$refs['addNewForm'].resetFields()
      done()
    },
    addOrUpdateInstitution () {
      if (this.newObject.institutionLevel === '是') {
        this.newObject.institutionLevel = 0
      } else {
        this.newObject.institutionLevel = 1
      }
      addOrUpdateInstitution(this.newObject).then(response => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.getListInstitution()
        this.addDialog = false
        this.newObject = {}
        this.$refs['addNewForm'].resetFields()
      }).catch(error => {
        console.log(error)
      })
    },
    // 获取列表
    getListInstitution () {
      let that = this
      listInstitution(that.pageNumber, that.pageSize).then(response => {
        that.listInstitution = response.data
        if (that.listInstitution.length > 0) {
          this.allTotal = response.total
        } else {
          this.allTotal = 0
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 获取不翻页列表
    getAllListInstitution () {
      let that = this
      listInstitution().then(response => {
        that.listAllInstitution = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    // 获取单个机构信息进行修改
    editRow (e) {
      this.addType = 1
      let that = this
      getInstitution(this.listInstitution[e].id).then(response => {
        if (response.data[0].institutionLevel === 0) {
          response.data[0].institutionLevel = '是'
        } else {
          response.data[0].institutionLevel = '否'
        }
        that.newObject = response.data[0]
        this.addDialog = true
      }).catch(error => {
        console.log(error)
      })
    },
    // 删除
    deleteRow (type, e) {
      let _array = []
      if (type === 1) {
        _array.push(this.listInstitution[e].id)
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
          return false
        }
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteInstitution(_array).then(response => {
          // that.projectList.splice(e, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getListInstitution()
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  created () {
    this.getListInstitution()
    this.getAllListInstitution()
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
