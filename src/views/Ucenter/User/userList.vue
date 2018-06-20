<template>
  <div class="system-container">
      <div class="system-top clearfix">
        <span style="padding-right:10px">用户类型:</span>
        <el-select v-model="userType" placeholder="请选择">
          <el-option
            v-for="item in userTypeList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
        <!-- <el-input placeholder="请输入内容" class="input-with-select">
        </el-input> -->
        <!-- <el-button slot="append" type="primary" @click="goSearch()" icon="el-icon-search"></el-button> -->
        <!-- <div class="btn-block f-r">
          <el-button type="primary">查询</el-button>
        </div> -->
      </div>
      <div class="system-center">
        <div class="operation-bar">
          <el-button @click="addUser()" type="primary">增加</el-button>
          <!-- <el-button @click="editPassword()" >修改密码</el-button> -->
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
              label="编号"
              width="100">
            </el-table-column>
            <el-table-column
              fixed
              prop="userName"
              label="用户名"
              width="100">
            </el-table-column>
            <el-table-column
              label="用户类型"
              width="100">
              <template slot-scope="scope">
                {{userTypeList[scope.row.userType].name}}
              </template>
            </el-table-column>
            <el-table-column
              prop="loginName"
              label="登录名"
              width="100">
            </el-table-column>
            <!-- <el-table-column
              prop="loginPwd"
              label="密码"
              width="100">
            </el-table-column> -->
            <el-table-column
              prop="place"
              label="职位"
              width="100">
            </el-table-column>
            <el-table-column
              prop="phone"
              label="电话号码"
              width="120">
            </el-table-column>
            <el-table-column
              prop="email"
              label="电子邮箱"
              width="150">
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              width="180">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="editRow(scope.$index)"
                  type="text"
                  size="small">
                  编辑
                </el-button>
                <el-button
                  @click.native.prevent="editPassword(scope.$index)"
                  type="text"
                  size="small">
                  修改密码
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
      <!-- 修改 增加用户 -->
      <el-dialog :title="addTypeText[addType]+'添加用户'"
       :visible.sync="userDialog" :close-on-click-modal='false' :close-on-press-escape='false' center
       :before-close="handleCloseDialog">
        <el-form ref="addNewForm" label-width="120px">
          <el-form-item label="登录名" >
            <el-input class="width350" v-model="newUser.loginName"></el-input>
          </el-form-item>
          <el-form-item v-if="addType===0" label="密码" required>
            <el-input class="width350" v-model="newUser.loginPwd"></el-input>
          </el-form-item>
          <el-form-item label="是否记住用户" required>
            <el-radio-group v-model="newUser.isRemenberPwd">
              <el-radio label="是"></el-radio>
              <el-radio label="否"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="用户名" required>
            <el-input class="width350" v-model="newUser.userName"></el-input>
          </el-form-item>
          <el-form-item label="性别" required>
            <el-radio-group v-model="newUser.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="年龄" required>
            <el-input class="width350" v-model="newUser.age"></el-input>
          </el-form-item>
          <el-form-item label="电话号码" required>
            <el-input class="width350" v-model="newUser.phone"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" required>
            <el-input class="width350" v-model="newUser.email"></el-input>
          </el-form-item>
          <el-form-item label="职位" required>
            <el-input class="width350" v-model="newUser.place"></el-input>
          </el-form-item>
          <el-form-item label="编号" required>
            <el-input class="width350" v-model="newUser.codeNumber"></el-input>
          </el-form-item>
          <el-form-item label="用户类型" required>
            <el-select  v-model="newUser.userType">
              <el-option
                v-for="(item , index) in userTypeList"
                :key="index"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属部门" required prop="nnlightctlInstitutionIdBelong">
            <el-select  v-model="newUser.nnlightctlInstitutionIdBelong">
              <el-option
                v-for="(item , index) in listAllDepartment"
                :key="index"
                :label="item.departmentName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="userDialog = false">取 消</el-button>
          <el-button type="primary" @click="onSubmit">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 修改 密码 -->
      <el-dialog title="修改密码"
       :visible.sync="passwordDialog" :close-on-click-modal='false' :close-on-press-escape='false' center
       :before-close="handleClosePassDialog">
        <el-form ref="form" label-width="100px">
          <el-form-item label="新密码" required>
            <el-input class="width350" v-model="newPwd.newPwd"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="passwordDialog = false">取 消</el-button>
          <el-button type="primary" @click="onSubmitNewPass">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import {addOrUpdateUser, listUser, getUser, deleteUser, updateUserPwd, listDepartment} from '@/api/RoadLighting/userAdmin'
import '../../../utils/filter.js'
export default {
  name: 'organization',
  data () {
    return {
      addTypeText: ['添加', '修改'],
      addType: 0,
      userType: 0,
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
      ],
      pageNumber: 1,
      pageSize: 10,
      multipleSelection: [],
      currentPage: 1,
      allTotal: null,
      userList: [],
      newUser: {},
      userDialog: false,
      passwordDialog: false,
      listAllDepartment: [],
      newPwd: {}
    }
  },
  watch: {
    userType () {
      this.goSearch()
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleCurrentChange (val) {
      this.pageNumber = val
      this.getListUser()
      // 翻页请求
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getListUser()
    },
    goSearch () {
      this.pageNumber = 1
      this.pageSize = 10
      this.getListUser()
    },
    addUser () {
      this.addType = 0
      this.userDialog = true
    },
    editPassword (e) {
      this.newPwd.id = this.userList[e].id
      this.passwordDialog = true
    },
    onSubmit () {
      this.addOrUpdateUser()
    },
    // 弹窗关闭时将数据清空
    handleCloseDialog (done) {
      this.newUser = {}
      done()
    },
    // 获取部门不翻页列表
    getAllListDepartment () {
      let that = this
      listDepartment().then(response => {
        that.listAllDepartment = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    addOrUpdateUser () {
      if (this.newUser.isRemenberPwd === '是') {
        this.newUser.isRemenberPwd = 1
      } else {
        this.newUser.isRemenberPwd = 0
      }
      if (this.newUser.sex === '男') {
        this.newUser.sex = 1
      } else {
        this.newUser.sex = 0
      }
      addOrUpdateUser(this.newUser).then(response => {
        let _text = ''
        if (this.addType === 0) {
          _text = '添加成功!'
        } else {
          _text = '编辑成功!'
        }
        this.$message({
          type: 'success',
          message: _text
        })
        this.getListUser()
        this.userDialog = false
        this.newUser = {}
        this.$refs['addNewForm'].resetFields()
      }).catch(error => {
        console.log(error)
      })
    },
    // 获取列表
    getListUser () {
      let that = this
      listUser(that.pageNumber, that.pageSize, this.userType).then(response => {
        that.userList = response.data
        if (that.userList.length > 0) {
          this.allTotal = response.total
        } else {
          this.allTotal = 0
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 获取单个用户信息进行修改
    editRow (e) {
      this.addType = 1
      let that = this
      getUser(this.userList[e].id).then(response => {
        if (response.data[0].isRemenberPwd === 1) {
          response.data[0].isRemenberPwd = '是'
        } else {
          response.data[0].isRemenberPwd = '否'
        }
        if (response.data[0].sex === 1) {
          response.data[0].sex = '男'
        } else {
          response.data[0].sex = '女'
        }
        that.newUser = response.data[0]
        console.log(that.newUser)
        this.userDialog = true
      }).catch(error => {
        console.log(error)
      })
    },
    // 删除
    deleteRow (type, e) {
      let _array = []
      if (type === 1) {
        _array.push(this.userList[e].id)
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
        deleteUser(_array).then(response => {
          // that.projectList.splice(e, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getListUser()
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
    handleClosePassDialog (done) {
      this.newPwd = {}
      done()
    },
    onSubmitNewPass () {
      this.newPwd.newPwd = this.newPwd.newPwd.replace(/(^\s*)|(\s*$)/g, '')
      if (this.newPwd.newPwd === '' || this.newPwd.newPwd === null || this.newPwd.newPwd === undefined) {
        this.$message({
          type: 'error',
          message: '密码不得为空'
        })
        return false
      }
      updateUserPwd(this.newPwd).then(response => {
        this.$message({
          type: 'success',
          message: '编辑成功'
        })
        this.passwordDialog = false
        this.newPwd = {}
      }).catch(error => {
        console.log(error)
      })
    }
  },
  created () {
    this.getListUser()
    this.getAllListDepartment()
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
