<template>
  <div class="system-container">
    <el-tabs v-model="activeName" @tab-click="tabHandleClick">
      <el-tab-pane label="控制柜模式" name="cabinet">
        <div class="system-top clearfix">
        <div class="item-block f-l">
          <span class="title">控制柜</span><el-input  placeholder="请输入内容"></el-input>
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
          <el-button @click="addCabinet()" type="primary">增加</el-button>
          <el-button>管理控制柜灯具</el-button>
          <el-button>批量编辑</el-button>
          <el-button @click="deleteRow(2)">批量删除</el-button>
        </div>
        <div class="data-list">
          <el-table
            ref="multipleTable"
            :data="cabinetList"
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
              label="区域"
              width="100">
            </el-table-column>
             <el-table-column
              prop="projectName"
              label="启用"
              width="100">
            </el-table-column>
            <el-table-column
              prop="countryName"
              label="校验"
              width="100">
            </el-table-column>
            <el-table-column
              prop="provinceName"
              label="控制柜"
              width="100">
            </el-table-column>
            <el-table-column
              prop="cityName"
              label="地图地标"
              width="100">
            </el-table-column>
            <el-table-column
              label="集中器"
              width="100">
            </el-table-column>
            <el-table-column
              prop=""
              label="位置编号"
              width="100">
            </el-table-column>
            <el-table-column
              prop="latitude"
              label="附加信息">
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
        <!-- 修改 增加控制柜-->
        <el-dialog title="添加控制柜"
        :visible.sync="cabinetDialog" :close-on-click-modal='false' :close-on-press-escape='false' center
        :before-close="handleCloseDialog">
          <el-form ref="form" label-width="50px">
            <el-form-item label="区域" required>
              <span class="text">{{newCabinet.countryName}}</span>
            </el-form-item>
            <el-form-item label="启用" required>
              <span class="text">{{newCabinet.provinceName}}</span>
            </el-form-item>
            <el-form-item label="校验" required>
              <span class="text">{{newCabinet.cityName}}</span>
            </el-form-item>
            <el-form-item label="控制柜" required>
              <span class="text" v-if="newCabinet.type == 1">道路照明系统</span>
            </el-form-item>
            <el-form-item label="地图图标" required>
              <el-input class="width350" v-model="newCabinet.projectName"></el-input>
            </el-form-item>
            <el-form-item label="纬度" required>
              <el-input class="width350" v-model="newCabinet.latitude"></el-input>
            </el-form-item>
            <el-form-item label="经度" required>
              <el-input class="width350" v-model="newCabinet.longitude"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 4}"
                placeholder="请输入内容"
                v-model="newCabinet.mem">
              </el-input>
            </el-form-item>
            <el-form-item>
                <el-checkbox v-model="newCabinet.state">启用</el-checkbox>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="userDialog = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit">确 定</el-button>
          </div>
        </el-dialog>
      </el-tab-pane>
      <el-tab-pane label="灯具模式" name="lighting">灯具模式</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: 'organization',
  data () {
    return {
      activeName: 'cabinet',
      pageNumber: 1,
      pageSize: 100,
      multipleSelection: [],
      currentPage: 1,
      cabinetList: [],
      newCabinet: {},
      cabinetDialog: false
    }
  },
  methods: {
    tabHandleClick (tab, event) {
      console.log(tab, event)
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    handleCurrentChange (val) {
      this.pageNumber = val
      // 翻页请求
    },
    addCabinet () {
      this.cabinetDialog = true
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
