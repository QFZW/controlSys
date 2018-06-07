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
        <el-button @click="addCabinet()" type="primary">增加灯具型号</el-button>
        <el-button @click="deleteRow(2)">删除</el-button>
      </div>
      <div class="data-list">
        <el-table
          ref="lightTypeTable"
          :data="LightList"
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
            prop="modelName"
            label="型号名称"
            width="100">
          </el-table-column>
          <el-table-column
            prop="ratedVoltage"
            label="额定电压"
            width="100">
          </el-table-column>
          <el-table-column
            prop="ratedElectric"
            label="额定电流"
            width="100">
          </el-table-column>
          <el-table-column
            prop="ratedPower"
            label="额定功率"
            width="120">
          </el-table-column>
          <el-table-column
            prop="ledCount"
            label="LED数量"
            width="120">
          </el-table-column>
          <el-table-column
            prop="mem"
            label="备注">
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作">
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
    <!-- 修改 增加灯具-->
    <el-dialog title="添加灯具类型"
    :visible.sync="addLightDialog" :close-on-click-modal='false' :close-on-press-escape='false' center
    :before-close="handleCloseDialog">
      <el-form ref="addEditLightTypeForm" :model="newLight" :rules="addNewLightRules" label-width="100px">
        <el-form-item label="型号名称" required prop="modelName">
          <el-input class="width350" v-model="newLight.modelName"></el-input>
        </el-form-item>
        <el-form-item label="额定电压" required prop="ratedVoltage">
          <el-input class="width350" v-model="newLight.ratedVoltage"></el-input>
        </el-form-item>
        <el-form-item label="额定电流" required prop="ratedElectric">
          <el-input class="width350" v-model="newLight.ratedElectric"></el-input>
        </el-form-item>
        <el-form-item label="额定功率" required prop="ratedPower">
          <el-input class="width350" v-model="newLight.ratedPower"></el-input>
        </el-form-item>
        <el-form-item label="LED数量" required prop="ledCount">
          <el-input class="width350" v-model="newLight.ledCount"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
            v-model="newLight.mem">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addLightDialog = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { listLightModel, deleteLightModel, addOrUpdateLightModel } from '@/api/RoadLighting/EquipmentType'
export default {
  name: 'LightType',
  data () {
    return {
      pageNumber: 1,
      pageSize: 10,
      multipleSelection: [],
      currentPage: 1,
      allTotal: null,
      LightList: [],
      addOrUpdateStatus: null,
      newLight: {},
      addLightDialog: false,
      addNewLightRules: {
        modelName: [
          { required: true, message: '填写内容不得为空', trigger: 'blur' }
        ],
        ratedVoltage: [
          { required: true, message: '填写内容不得为空', trigger: 'blur' }
        ],
        ratedElectric: [
          { required: true, message: '填写内容不得为空', trigger: 'blur' }
        ],
        ratedPower: [
          { required: true, message: '填写内容不得为空', trigger: 'blur' }
        ],
        ledCount: [
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
      this.getListLightModel()
      // 翻页请求
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getListLightModel()
    },
    getListLightModel () {
      let that = this
      listLightModel(that.pageNumber, that.pageSize).then(response => {
        that.LightList = response.data
        if (that.LightList.length > 0) {
          this.allTotal = response.total
        } else {
          this.allTotal = 0
        }
      }).catch(error => {
        console.log(error)
      })
    },
    addCabinet () {
      this.addLightDialog = true
      this.addOrUpdateStatus = 'add'
    },
    deleteRow (type, e) {
      let _array = []
      if (type === 1) {
        _array.push(this.LightList[e].id)
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
        deleteLightModel(_array).then(response => {
          // that.projectList.splice(e, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getListLightModel()
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
      this.addOrUpdateStatus = 'edit'
      this.newLight = this.LightList[e]
      this.addLightDialog = true
    },
    onSubmit () {
      let _text
      if (this.addOrUpdateStatus === 'add') {
        _text = '添加成功'
      } else {
        _text = '修改成功'
      }
      addOrUpdateLightModel(this.newLight).then(response => {
        this.$message({
          type: 'success',
          message: _text
        })
        this.getListLightModel()
        this.addLightDialog = false
        this.handleCloseDialog()
      }).catch(error => {
        console.log(error)
      })
    },
    // 弹窗关闭时将数据清空
    handleCloseDialog (done) {
      this.newLight = {}
      this.$refs['addEditLightTypeForm'].resetFields()
      done()
    }
  },
  created () {
    this.getListLightModel()
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
