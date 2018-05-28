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
      </div>
      <div class="data-list">
        <el-table
          ref="multipleTable"
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
            prop="codeNumber"
            label="型号"
            width="100">
          </el-table-column>
            <el-table-column
            prop="projectName"
            label="类目编号"
            width="100">
          </el-table-column>
          <el-table-column
            prop="countryName"
            label="灯具类型"
            width="100">
          </el-table-column>
          <el-table-column
            prop="provinceName"
            label="灯具寿命"
            width="100">
          </el-table-column>
          <el-table-column
            prop="cityName"
            label="灯具功率"
            width="100">
          </el-table-column>
          <el-table-column
            label="额定电流"
            width="100">
          </el-table-column>
          <el-table-column
            prop=""
            label="额定电压"
            width="120">
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
          background
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="100"
          layout="total, prev, pager, next, jumper"
          :total="400">
        </el-pagination>
      </div>
    </div>
    <!-- 修改 增加灯具-->
    <el-dialog title="添加灯具"
    :visible.sync="addLightDialog" :close-on-click-modal='false' :close-on-press-escape='false' center
    :before-close="handleCloseDialog">
      <el-form ref="form" label-width="100px">
        <el-form-item label="型号" required>
          <el-input class="width350" v-model="newLight.projectName"></el-input>
        </el-form-item>
        <el-form-item label="类目编号">
          <el-input class="width350" v-model="newLight.projectName"></el-input>
        </el-form-item>
        <el-form-item label="灯具类型" required>
          <el-select class="width350" v-model="newLight.nnlightctlProjectCityId">
            <!-- <el-option
              v-for="(item , index) in cityList"
              :key="index"
              :label="item.cityName"
              :value="item.id">
            </el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="电源类型" required>
          <el-select class="width350" v-model="newLight.nnlightctlProjectCityId">
            <!-- <el-option
              v-for="(item , index) in cityList"
              :key="index"
              :label="item.cityName"
              :value="item.id">
            </el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="灯具寿命" required>
          <el-input class="width350" v-model="newLight.projectName"></el-input>
        </el-form-item>
        <el-form-item label="灯具功率" required>
          <el-input class="width350" v-model="newLight.latitude"></el-input>
        </el-form-item>
        <el-form-item label="额定电流" required>
          <el-input class="width350" v-model="newLight.longitude"></el-input>
        </el-form-item>
        <el-form-item label="额定电压" required>
          <el-input class="width350" v-model="newLight.longitude"></el-input>
        </el-form-item>
        <el-form-item label="亮灯颜色" required>
        </el-form-item>
        <el-form-item label="预览">
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
// import { listLightModel, deleteLightModel, addOrUpdateLightModel } from '@/api/RoadLighting/EquipmentType'
import { listLightModel } from '@/api/RoadLighting/EquipmentType'

export default {
  name: 'LightType',
  data () {
    return {
      pageNumber: 1,
      pageSize: 100,
      multipleSelection: [],
      currentPage: 1,
      allTotal: null,
      LightList: [],
      newLight: {},
      addLightDialog: false
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
    getListLightModel () {
      let that = this
      listLightModel(that.pageNumber, that.pageSize).then(response => {
        that.projectList = response.data
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
    },
    deleteRow () {
    },
    editRow () {
    },
    onSubmit () {
    },
    // 弹窗关闭时将数据清空
    handleCloseDialog (done) {
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
        padding: 0 30px 0 55px;
    }
  }
}
</style>
