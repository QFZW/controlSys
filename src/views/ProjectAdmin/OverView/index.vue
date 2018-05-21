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
              width="180">
            </el-table-column>
             <el-table-column
              prop="projectName"
              label="名称"
              width="200">
            </el-table-column>
            <el-table-column
              prop="contryName"
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
              width="100">
            </el-table-column>
            <el-table-column
              prop="latitude"
              label="纬度"
              width="100">
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
      <!-- 弹窗 -->
      <el-dialog title="新建项目"
       :visible.sync="dialogFormVisible" :close-on-click-modal='false' :close-on-press-escape='false' center
       :before-close="handleCloseDialog">
        <el-form ref="projectForm" :model="newProject" :rules="addProjectrules" label-width="50px">
          <el-form-item label="国家" required prop="nnlightctlProjectCountryId">
            <el-select class="width350" v-model="newProject.nnlightctlProjectCountryId">
              <el-option
                v-for="(item , index) in countryList"
                :key="index"
                :label="item.countryName"
                :value="item.id">
              </el-option>
            </el-select>
            <span class="add-city-span" @click="addNewObj(0)"><i class="iconfont">&#xe648;</i>添加</span>
          </el-form-item>
          <el-form-item label="省份" required prop="nnlightctlProjectProvinceId">
            <el-select class="width350" v-model="newProject.nnlightctlProjectProvinceId">
              <el-option
                v-for="(item , index) in provinceList"
                :key="index"
                :label="item.provinceName"
                :value="item.id">
              </el-option>
            </el-select>
            <span class="add-city-span" @click="addNewObj(1)"><i class="iconfont">&#xe648;</i>添加</span>
          </el-form-item>
          <el-form-item label="城市" required prop="nnlightctlProjectCityId">
            <el-select class="width350" v-model="newProject.nnlightctlProjectCityId">
              <el-option
                v-for="(item , index) in cityList"
                :key="index"
                :label="item.cityName"
                :value="item.id">
              </el-option>
            </el-select>
            <span class="add-city-span" @click="addNewObj(2)"><i class="iconfont">&#xe648;</i>添加</span>
          </el-form-item>
          <el-form-item label="类型" required prop="type">
            <el-select class="width350" v-model="newProject.type">
              <el-option
                v-for="(item , index) in typeList"
                :key="index"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="编码" required prop="projectCode">
            <el-input class="width350" v-model="newProject.projectCode"></el-input>
          </el-form-item>
          <el-form-item label="名称" required prop="projectName">
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
          <el-button type="primary" @click="goRules('projectForm')">确 定</el-button>
        </div>

        <!-- 增加国家等弹窗 -->
        <el-dialog :title="'添加'+dialogTitle[dialogType]"
          :visible.sync="addNewObjShow" :close-on-click-modal='false' :close-on-press-escape='false' center
          append-to-body
          :before-close="handleCloseAddCity">
          <el-form ref="rulesform" :model="addObj" :rules="addCityrules" label-width="50px">
          <el-form-item :label="dialogTitle[dialogType]" prop="name" required>
            <el-input v-model="addObj.name" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="编码" prop="code" required>
            <el-input v-model="addObj.code" placeholder="请输入内容"></el-input>
          </el-form-item>
          <div v-if="dialogType == 2">
            <el-form-item label="经度" prop="longitude" required>
              <el-input v-model="addObj.longitude" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="纬度" prop="latitude" required>
              <el-input v-model="addObj.latitude" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="时区" prop="timeZone" required>
              <el-input v-model="addObj.timeZone" placeholder="请输入内容"></el-input>
            </el-form-item>
          </div>
          <el-form-item label="备注">
            <el-input type="textarea" v-model="addObj.mem" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addNewObjShow = false">取 消</el-button>
            <el-button type="primary" @click="goCityRules('rulesform')">确 定</el-button>
          </div>
        </el-dialog>
      </el-dialog>
      <!-- 修改项目 -->
      <el-dialog title="修改项目"
       :visible.sync="dialogFormVisibleEdit" :close-on-click-modal='false' :close-on-press-escape='false' center
       :before-close="handleCloseDialog1">
        <el-form ref="editProjectForm" :model="newProject" :rules="addProjectrules"  label-width="50px">
          <el-form-item label="国家" required>
            <!-- <span class="text">{{newProject.countryName}}</span> -->
            <el-select class="width350" v-model="newProject.nnlightctlProjectCountryId" disabled>
              <el-option
                v-for="(item , index) in countryList"
                :key="index"
                :label="item.countryName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="省份" required>
            <!-- <span class="text">{{newProject.provinceName}}</span> -->
            <el-select class="width350" v-model="newProject.nnlightctlProjectProvinceId" disabled>
              <el-option
                v-for="(item , index) in provinceList"
                :key="index"
                :label="item.provinceName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="城市" required>
            <!-- <span class="text">{{newProject.cityName}}</span> -->
            <el-select class="width350" v-model="newProject.nnlightctlProjectCityId" disabled>
              <el-option
                v-for="(item , index) in cityList"
                :key="index"
                :label="item.cityName"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类型" required>
            <span class="text" v-if="newProject.ctype==1">道路照明系统</span>
          </el-form-item>
          <el-form-item label="编码" required prop="codeNumber">
            <el-input class="width350" v-model="newProject.codeNumber" disabled></el-input>
          </el-form-item>
          <el-form-item label="名称" required prop="projectName">
            <el-input class="width350" v-model="newProject.projectName"></el-input>
          </el-form-item>
          <el-form-item label="纬度">
            <el-input class="width350" v-model="newProject.latitude"></el-input>
          </el-form-item>
          <el-form-item label="经度">
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
          <el-button type="primary" @click="goEditRules('editProjectForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import { listProject, DelectProject, addProject, updateProject, getProject, listCountry, listProvince, listCity, addOrUpdateCountry, addOrUpdateProvince, addOrUpdateCity } from '@/api/project'
export default {
  name: 'OverView',
  data () {
    return {
      projectList: [],
      pageNumber: 1,
      pageSize: 10,
      multipleSelection: [],
      currentPage: 1,
      newProject: {
        nnlightctlProjectCountryId: null,
        nnlightctlProjectProvinceId: null,
        nnlightctlProjectCityId: null,
        type: 1,
        projectName: null,
        projectCode: null,
        mem: null,
        state: true
      },
      addProjectrules: {
        nnlightctlProjectCountryId: [
          { required: true, message: '选择不得为空', trigger: 'blur' }
        ],
        nnlightctlProjectProvinceId: [
          { required: true, message: '选择不得为空', trigger: 'blur' }
        ],
        nnlightctlProjectCityId: [
          { required: true, message: '选择不得为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '选择不得为空', trigger: 'change' }
        ],
        projectName: [
          { required: true, message: '填写内容不得为空', trigger: 'blur' }
        ],
        projectCode: [
          { required: true, message: '填写内容不得为空', trigger: 'blur' }
        ]
        // latitude: [
        //   { required: true, message: '填写内容不得为空', trigger: 'change' }
        // ],
        // longitude: [
        //   { required: true, message: '填写内容不得为空', trigger: 'blur' }
        // ],
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
      editIndex: 0,
      allTotal: 0,
      addNewObjShow: false, // 控制添加国家等弹框
      dialogTitle: ['国家', '省份', '城市'],
      dialogType: 0,
      addObj: {
        name: null,
        code: null,
        mem: null,
        longitude: null,
        latitude: null,
        timeZone: null
      },
      addCityrules: {
        name: [
          { required: true, message: '填写内容不得为空', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '填写内容不得为空', trigger: 'blur' }
        ],
        mem: [
          { required: true, message: '填写内容不得为空', trigger: 'blur' }
        ],
        longitude: [
          { required: true, message: '填写内容不得为空', trigger: 'blur' }
        ],
        latitude: [
          { required: true, message: '填写内容不得为空', trigger: 'blur' }
        ],
        timeZone: [
          { required: true, message: '填写内容不得为空', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getListProject()
    },
    handleCurrentChange (val) {
      this.pageNumber = val
      this.getListProject()
    },
    getListProject () {
      let that = this
      listProject(that.pageNumber, that.pageSize).then(response => {
        that.projectList = response.data
        if (that.projectList.length > 0) {
          this.allTotal = response.total
        } else {
          this.allTotal = 0
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 获取单个项目用以编辑
    // getProject (codeNumber) {
    //   return new Promise((resolve, reject) => {
    //     getProject(codeNumber).then(response => {
    //       resolve(response.data[0])
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
    // 编辑
    editRow (e) {
      this.editIndex = e
      getProject(this.projectList[e].codeNumber).then(res => {
        this.newProject = res.data[0]
        console.log(res)
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
          this.getListProject()
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
    goRules (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.onSubmit()
        } else {
          console.log('error submit!!')
        }
      })
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
    goEditRules (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.onEditSubmit()
        } else {
          console.log('error submit!!')
        }
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
        this.getListProject()
        this.dialogFormVisibleEdit = false
        this.handleCloseDialog1()
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
      this.$refs['projectForm'].resetFields()
      done()
    },
    handleCloseDialog1 (done) {
      this.newProject = {
        countryName: '',
        provinceName: '',
        cityName: '',
        type: 1,
        projectName: '',
        mem: '',
        state: 1
      }
      this.$refs['editProjectForm'].resetFields()
      done()
    },
    // 获取国家等一系列数据
    getListCountry () {
      let that = this
      listCountry().then(response => {
        that.countryList = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    getListProvince () {
      let that = this
      listProvince().then(response => {
        that.provinceList = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    getListCity () {
      let that = this
      listCity().then(response => {
        that.cityList = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    addNewObj (type) {
      this.dialogType = type
      this.addNewObjShow = true
    },
    goCityRules (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.onSubmitCity()
        } else {
          console.log('error submit!!')
        }
      })
    },
    onSubmitCity () {
      let _obj = {}
      if (this.dialogType === 0) {
        // 提交国家
        _obj.countryName = this.addObj.name
        _obj.codeNumber = this.addObj.code
        _obj.mem = this.addObj.mem
        addOrUpdateCountry(_obj).then(response => {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.getListCountry()
          this.addNewObjShow = false
          this.handleCloseAddCity()
        }).catch(error => {
          console.log(error)
        })
      } else if (this.dialogType === 1) {
        // 提交省份
        _obj.provinceName = this.addObj.name
        _obj.codeNumber = this.addObj.code
        _obj.mem = this.addObj.mem
        addOrUpdateProvince(_obj).then(response => {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.getListProvince()
          this.addNewObjShow = false
          this.handleCloseAddCity()
        }).catch(error => {
          console.log(error)
        })
      } else if (this.dialogType === 2) {
        // 提交城市
        _obj.cityName = this.addObj.name
        _obj.codeNumber = this.addObj.code
        _obj.longitude = this.addObj.longitude
        _obj.latitude = this.addObj.latitude
        _obj.timeZone = this.addObj.timeZone
        _obj.mem = this.addObj.mem
        addOrUpdateCity(_obj).then(response => {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
          this.getListCity()
          this.addNewObjShow = false
          this.handleCloseAddCity()
        }).catch(error => {
          console.log(error)
        })
      }
    },
    handleCloseAddCity (done) {
      this.addObj = {
        name: null,
        code: null,
        mem: null,
        longitude: null,
        latitude: null,
        timeZone: null
      }
      this.$refs['rulesform'].resetFields()
      done()
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
    margin-bottom: 20px;
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
