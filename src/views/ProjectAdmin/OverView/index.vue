<template>
    <div class="system-container">
      <div class="system-top clearfix">
        <div class="item-block f-l">
          <span class="title">地点</span><el-input  placeholder="请输入内容"></el-input>
        </div>
        <div class="item-block f-l">
          <span class="title">名称</span><el-input  placeholder="请输入内容"></el-input>
        </div>
        <!-- <div class="item-block f-l">
          <span class="title">类型</span><el-input  placeholder="请输入内容"></el-input>
        </div> -->
        <div class="btn-block f-r">
          <el-button type="primary">查询</el-button>
          <!-- <el-button>重置</el-button> -->
        </div>
      </div>
      <div class="system-center">
        <div class="operation-bar">
          <el-button @click="addProject()" type="primary">增加</el-button>
          <el-button @click="importData()">导入</el-button>
          <el-button @click="exportData()">导出</el-button>
          <el-button @click="deleteRow(2)">删除</el-button>
        </div>
        <div class="data-list">
          <el-table
            ref="multipleTable"
            :data="projectList"
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
              label="编码"
              width="50">
            </el-table-column>
             <el-table-column
              prop="projectName"
              label="名称"
              width="200">
            </el-table-column>
            <el-table-column
              prop="countryName"
              label="国家"
              width="80">
            </el-table-column>
            <el-table-column
              prop="provinceName"
              label="省份"
              width="80">
            </el-table-column>
            <el-table-column
              prop="cityName"
              label="城市"
              width="80">
            </el-table-column>
            <el-table-column
              label="类型"
              width="120">
              <template slot-scope="scope">
                <span v-if="scope.row.type==1">
                  道路照明系统
                </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="longitude"
              label="经度"
              width="60">
            </el-table-column>
            <el-table-column
              prop="latitude"
              label="纬度"
              width="60">
            </el-table-column>
            <el-table-column
              prop="mem"
              label="备注"
              width="200">
            </el-table-column>
            <el-table-column
              label="状态">
              <template slot-scope="scope">
                <span v-if="scope.row.state">
                  已启用
                </span>
                <span v-else>
                  未开启
                </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="lights"
              label="灯具">
            </el-table-column>
            <el-table-column
              prop="eleboxs"
              label="配电柜">
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
      <!-- 弹窗 -->
      <el-dialog title="新建项目"
       :visible.sync="dialogFormVisible" :close-on-click-modal='false' :close-on-press-escape='false' center
       :before-close="handleCloseDialog">
        <el-form ref="form" label-width="50px">
          <el-form-item label="国家" required>
            <el-select class="width350" v-model="newProject.countryCode">
              <el-option
                v-for="(item , index) in countryList"
                :key="index"
                :label="item.countryName"
                :value="item.countryCode">
              </el-option>
            </el-select>
            <span class="add-city-span"><i class="iconfont">&#xe648;</i>添加</span>
          </el-form-item>
          <el-form-item label="省份" required>
            <el-select class="width350" v-model="newProject.provinceCode">
              <el-option
                v-for="(item , index) in provinceList"
                :key="index"
                :label="item.provinceName"
                :value="item.provinceCode">
              </el-option>
            </el-select>
            <span class="add-city-span"><i class="iconfont">&#xe648;</i>添加</span>
          </el-form-item>
          <el-form-item label="城市" required>
            <el-select class="width350" v-model="newProject.cityCode">
              <el-option
                v-for="(item , index) in cityList"
                :key="index"
                :label="item.cityName"
                :value="item.cityCode">
              </el-option>
            </el-select>
            <span class="add-city-span"><i class="iconfont">&#xe648;</i>添加</span>
          </el-form-item>
          <el-form-item label="类型" required>
            <el-select class="width350" v-model="newProject.type">
              <el-option
                v-for="(item , index) in typeList"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="名称" required>
            <el-input class="width350" v-model="newProject.projectName"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="newProject.mem">
            </el-input>
          </el-form-item>
          <el-form-item>
              <el-checkbox v-model="newProject.state">启用</el-checkbox>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="onSubmit">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 修改项目 -->
      <el-dialog title="修改项目"
       :visible.sync="dialogFormVisibleEdit" :close-on-click-modal='false' :close-on-press-escape='false' center
       :before-close="handleCloseDialog">
        <el-form ref="form" label-width="50px">
          <el-form-item label="国家" required>
            <span class="text">{{newProject.countryName}}</span>
          </el-form-item>
          <el-form-item label="省份" required>
            <span class="text">{{newProject.provinceName}}</span>
          </el-form-item>
          <el-form-item label="城市" required>
            <span class="text">{{newProject.cityName}}</span>
          </el-form-item>
          <el-form-item label="类型" required>
            <span class="text" v-if="newProject.type == 1">道路照明系统</span>
          </el-form-item>
          <el-form-item label="名称" required>
            <el-input class="width350" v-model="newProject.projectName"></el-input>
          </el-form-item>
          <el-form-item label="纬度" required>
            <el-input class="width350" v-model="newProject.latitude"></el-input>
          </el-form-item>
          <el-form-item label="经度" required>
            <el-input class="width350" v-model="newProject.longitude"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4}"
              placeholder="请输入内容"
              v-model="newProject.mem">
            </el-input>
          </el-form-item>
          <el-form-item>
              <el-checkbox v-model="newProject.state">启用</el-checkbox>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
          <el-button type="primary" @click="onEditSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import { listProject, DelectProject, addProject, updateProject, getProject, listCountry, listProvince, listCity } from '@/api/project'
export default {
  name: 'OverView',
  data () {
    return {
      projectList: [],
      pageNumber: 1,
      pageSize: 100,
      multipleSelection: [],
      currentPage: 1,
      newProject: {
        countryCode: '',
        provinceCode: '',
        cityCode: '',
        type: 1,
        projectName: '',
        mem: '',
        state: true
      },
      dialogFormVisible: false,
      dialogFormVisibleEdit: false,
      countryList: [],
      provinceList: [],
      cityList: [],
      typeList: [{
        value: 1,
        label: '道路照明系统'
      }],
      editIndex: 0
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleCurrentChange (val) {
      this.pageNumber = val
      this.getListProject()
    },
    getListProject () {
      let that = this
      listProject(that.pageNumber, that.pageSize).then(response => {
        that.projectList = response.data
        console.log(response)
      }).catch(error => {
        console.log(error)
      })
    },
    // 获取单个项目用以编辑
    getProject (codeNumber) {
      return new Promise((resolve, reject) => {
        getProject(codeNumber).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 编辑
    editRow (e) {
      this.editIndex = e
      getProject(this.projectList[e].codeNumber).then(res => {
        this.newProject = res[0]
        if (this.newProject.state === 1) {
          this.newProject.state = true
        } else {
          this.newProject.state = false
        }
        this.dialogFormVisibleEdit = true
      })
    },
    addProject () {
      this.dialogFormVisible = true
    },
    // 删除
    deleteRow (type, e) {
      let _array = []
      if (type === 1) {
        _array.push(this.projectList[e].id)
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
        DelectProject(_array).then(response => {
          // that.projectList.splice(e, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
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
    // 数据导出
    exportData () {
    },
    // 数据导入
    importData () {
    },
    onSubmit () {
      if (this.newProject.state) {
        this.newProject.state = 1
      } else {
        this.newProject.state = 0
      }
      addProject(this.newProject).then(response => {
        this.$message({
          type: 'success',
          message: '添加成功!'
        })
        this.getListProject()
        this.dialogFormVisible = false
        this.handleCloseDialog()
      }).catch(error => {
        console.log(error)
      })
    },
    onEditSubmit () {
      if (this.newProject.state) {
        this.newProject.state = 1
      } else {
        this.newProject.state = 0
      }
      updateProject(this.newProject).then(response => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
        this.projectList[this.editIndex] = this.newProject
        this.dialogFormVisibleEdit = false
        this.handleCloseDialog()
      }).catch(error => {
        console.log(error)
      })
    },
    // 弹窗关闭时将数据清空
    handleCloseDialog (done) {
      this.newProject = {
        countryName: '',
        provinceName: '',
        cityName: '',
        type: 1,
        projectName: '',
        mem: '',
        state: 1
      }
      done()
    },
    // 获取国家等一系列数据
    getListCountry () {
      let that = this
      listCountry(that.pageNumber, that.pageSize).then(response => {
        that.countryList = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    getListProvince () {
      let that = this
      listProvince(that.pageNumber, that.pageSize).then(response => {
        that.provinceList = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    getListCity () {
      let that = this
      listCity(that.pageNumber, that.pageSize).then(response => {
        that.cityList = response.data
      }).catch(error => {
        console.log(error)
      })
    }
  },
  created () {
    this.getListProject()
    this.getListCountry()
    this.getListProvince()
    this.getListCity()
  },
  destroyed () {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .el-button--primary{
    background: #5789fa;
  }
  .el-dialog{
    width: 500px;
    margin-top: 10vh !important;
  }
  .el-dialog__title{
    font-size:20px
  }
  .el-dialog__body{
    padding: 20px 20px 0 20px !important;
  }
  .el-form-item{
    margin-bottom: 10px;
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  .add-city-span{
    color:#5789fa;
    display: inline-block;
    padding-left: 5px;
    i{
      font-size: 14px;
      padding-right: 3px;
    }
  }
</style>
