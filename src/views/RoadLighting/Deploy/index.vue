<template>
  <div class="system-container">
    <el-tabs v-model="activeName" @tab-click="tabHandleClick">
      <el-tab-pane label="控制柜模式" name="cabinet">
        <div class="system-top clearfix">
          <div class="item-block f-l">
            <span class="title">控制柜</span><el-input  placeholder="请输入"></el-input>
          </div>
          <div class="item-block f-l">
            <span class="title">名称</span><el-input  placeholder="请输入"></el-input>
          </div>
          <div class="btn-block f-r">
            <el-button type="primary">查询</el-button>
          </div>
        </div>
        <div class="system-center">
          <div class="operation-bar">
            <el-button icon='el-icon-plus' @click="addCabinet()" type="primary">增加</el-button>
            <el-button icon='el-icon-upload2'>导入</el-button>
            <el-dropdown trigger="click" placement='bottom-start' @command="handleEdit">
              <el-button icon='el-icon-edit'>批量编辑</el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1">设置区域</el-dropdown-item>
                <el-dropdown-item command="2">设置控制柜型号</el-dropdown-item>
                <el-dropdown-item command="3">设置地图图标</el-dropdown-item>
                <el-dropdown-item command="4">设置启用/停用</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button icon='el-icon-delete' @click="deleteRow(2)">批量删除</el-button>
          </div>
          <div class="data-list">
            <el-table
              ref="multipleTable"
              :data="cabinetList"
              tooltip-effect="dark"
              style="width: 100%"
              header-row-class-name="datalist-header"
              @selection-change="handleSelectionChange">
              <el-table-column fixed type="selection" width="40"></el-table-column>
              <el-table-column fixed prop="codeNumber" label="区域" width="100"></el-table-column>
              <el-table-column prop="projectName" label="启用" width="100"></el-table-column>
              <el-table-column prop="countryName" label="校验" width="120"></el-table-column>
              <el-table-column prop="provinceName" label="控制柜" width="120"></el-table-column>
              <el-table-column prop="cityName" label="地图地标" width="120"></el-table-column>
              <el-table-column label="集中器" width="120"></el-table-column>
              <el-table-column prop="" label="位置编号" width="120"></el-table-column>
              <el-table-column prop="latitude" label="附加信息"></el-table-column>
              <el-table-column fixed="right" label="操作" width="120">
                <!-- 240 -->
                <template slot-scope="scope">
                  <!-- <el-button
                    type="text"
                    size="small">
                    管理灯具
                  </el-button>
                  <el-button
                    type="text"
                    size="small">
                    回路拆分
                  </el-button> -->
                  <el-button
                    @click.native.prevent="editCabinet()"
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
      </el-tab-pane>
      <el-tab-pane label="灯具模式" name="lighting">
        <div class="system-top clearfix">
          <div class="item-block f-l">
            <span class="title">灯杆</span><el-input  placeholder="请输入"></el-input>
          </div>
          <div class="item-block f-l">
            <span class="title">灯头号</span><el-input  placeholder="请输入"></el-input>
          </div>
          <div class="btn-block f-r">
            <el-button type="primary">查询</el-button>
          </div>
        </div>
        <div class="system-center">
          <div class="operation-bar">
            <el-button icon='el-icon-plus' @click="addLamp()" type="primary">增加</el-button>
            <el-dropdown trigger="click" placement='bottom-start' @command="handleEdit">
              <el-button icon='el-icon-edit'>批量编辑</el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1">设置区域</el-dropdown-item>
                <el-dropdown-item command="2">设置控制柜型号</el-dropdown-item>
                <el-dropdown-item command="3">设置地图图标</el-dropdown-item>
                <el-dropdown-item command="4">设置启用/停用</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-button icon='el-icon-delete' @click="deleteRow(2)">批量删除</el-button>
          </div>
          <div class="data-list">
            <el-table
              ref="multipleTable"
              :data="cabinetList"
              tooltip-effect="dark"
              style="width: 100%"
              header-row-class-name="datalist-header"
              @selection-change="handleSelectionChange">
              <el-table-column fixed type="selection" width="40"></el-table-column>
              <el-table-column fixed prop="codeNumber" label="灯具编码" width="100"></el-table-column>
              <el-table-column prop="projectName" label="启用" width="100"></el-table-column>
              <el-table-column prop="countryName" label="校验生产日期" width="140"></el-table-column>
              <el-table-column prop="provinceName" label="安装日期" width="100"></el-table-column>
              <el-table-column prop="countryName" label="灯杆" width="100"></el-table-column>
              <el-table-column prop="provinceName" label="灯头号" width="100"></el-table-column>
              <el-table-column prop="countryName" label="灯具型号" width="100"></el-table-column>
              <el-table-column prop="provinceName" label="灯具GIS信息" width="140"></el-table-column>
              <el-table-column prop="countryName" label="资产编号" width="100"></el-table-column>
              <el-table-column prop="provinceName" label="光衰" width="100"></el-table-column>
              <el-table-column prop="provinceName" label="最大使用时间（年）" width="160"></el-table-column>
              <el-table-column fixed="right" label="操作" width="120">
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
      </el-tab-pane>
    </el-tabs>
    <!-- 新增控制柜 -->
    <el-dialog title="新增控制柜" width="590px"
      :visible.sync="cabinetDialog" :close-on-click-modal='false' :close-on-press-escape='false' center
      :before-close="handleCloseDialog">
      <el-form ref="form" label-width="100px">
        <el-form-item label="控制柜数量">
          <el-input value=5 style="width:70px"></el-input>
        </el-form-item>
      </el-form>
      <div class="cabinet-list">
        <div class="operate-block clearfix">
          <a class="f-l" @click="addDevice()"><i class="iconfont ">&#xe648;</i>添加设备</a>
          <a class="f-l"><i class="iconfont">&#xe632;</i>删除</a>
        </div>
        <el-table
          ref="multipleTable"
          :data="cabinetList"
          tooltip-effect="dark"
          style="width: 100%"
          header-row-class-name="datalist-header"
          @selection-change="handleSelectionChange">
          <el-table-column fixed type="selection" width="40"></el-table-column>
          <el-table-column fixed prop="codeNumber" label="行号" width=""></el-table-column>
          <el-table-column prop="projectName" label="名称" width="140"></el-table-column>
          <el-table-column prop="countryName" label="类型" width="140"></el-table-column>
          <el-table-column prop="provinceName" label="型号" width="140"></el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cabinetDialog = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增设备 -->
    <el-dialog title="新增设备" width="1200px"
      :visible.sync="deviceAddDialog"  center>
      <el-form ref="form" label-width="100px">
        <el-form-item label="控制柜数量">
          <el-input value=5 style="width:70px"></el-input>
        </el-form-item>
      </el-form>
      <div class="add-device clearfix">
        <div class="device-info">
          <el-form ref="form" label-width="150px" size='small'>
            <el-form-item label="名称" required>
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="类型" required>
              <el-select style="width: 100%">
                <!-- <el-option
                  v-for="(item , index) in cityList"
                  :key="index"
                  :label="item.cityName"
                  :value="item.id">
                </el-option> -->
              </el-select>
            </el-form-item>
            <el-form-item label="唯一编码" required>
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="额定功率" required>
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="额定电流" required>
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="额定电压" required>
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="空气开关选型" required>
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="接触器选型" required>
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="回路数量" required>
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="所属相序" required>
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="回路继电器额定电流" required>
              <el-input></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="loop-info">
          <div class="operate-block clearfix">
            <a class="f-l" @click="addLoop()"><i class="iconfont ">&#xe648;</i>添加回路</a>
            <a class="f-l"><i class="iconfont">&#xe632;</i>删除</a>
          </div>
          <el-table
            ref="multipleTable"
            :data="cabinetList"
            tooltip-effect="dark"
            style="width: 100%"
            header-row-class-name="datalist-header"
            @selection-change="handleSelectionChange">
            <el-table-column fixed type="selection" width="40"></el-table-column>
            <el-table-column fixed prop="codeNumber" label="行号" width=""></el-table-column>
            <el-table-column prop="projectName" label="名称" width="140"></el-table-column>
            <el-table-column prop="countryName" label="类型" width="140"></el-table-column>
            <el-table-column prop="provinceName" label="型号" width="140"></el-table-column>
          </el-table>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deviceAddDialog = false">取 消</el-button>
        <el-button @click="deviceAddDialog = false" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加回路 -->
    <el-dialog title="添加回路" width="560px"
      :visible.sync="addLoopDialog" :close-on-click-modal='false' :close-on-press-escape='false' center
      :before-close="handleCloseDialog">
      <el-form ref="form" label-width="120px" size='small'>
        <el-form-item label="回路编号" required>
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="回路电压" required>
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="回路电流" required>
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="回路灯具数量" required>
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="回路状态" required>
          <el-input></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addLoopDialog = false">取 消</el-button>
        <el-button @click="addLoopDialog = false" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 增加灯具 -->
    <el-dialog title="增加灯具" width="630px"
      :visible.sync="addLampDialog" :close-on-click-modal='false' :close-on-press-escape='false' center
      :before-close="handleCloseDialog">
      <el-form ref="form" class="lamp-form" label-width="140px" size='small'>
        <el-form-item label="灯具编码" required>
          <el-input class="input-wrap"></el-input>
        </el-form-item>
        <el-form-item label="生产日期" required>
          <el-input class="input-wrap"></el-input>
        </el-form-item>
        <el-form-item label="安装日期" required>
          <el-input class="input-wrap"></el-input>
        </el-form-item>
        <el-form-item label="灯杆" required>
          <el-input class="input-wrap"></el-input>
        </el-form-item>
        <el-form-item label="灯头号" required>
          <el-input class="input-wrap"></el-input>
        </el-form-item>
        <el-form-item label="灯头号" required>
          <el-input class="input-wrap"></el-input>
        </el-form-item>
        <el-form-item label="灯具型号" required>
          <el-input class="input-wrap"></el-input>
        </el-form-item>
        <el-form-item label="灯具GIS信息" required>
          <el-input class="input-wrap"></el-input>
        </el-form-item>
        <el-form-item label="资产编号" required>
          <el-input class="input-wrap"></el-input>
        </el-form-item>
        <el-form-item label="光衰" required>
          <el-input class="input-wrap"></el-input>
        </el-form-item>
        <el-form-item label="灯具最大使用时间" required>
          <el-input style="width:120px"></el-input>
          <span>年</span>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            class="input-wrap"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addLampDialog = false">取 消</el-button>
        <el-button @click="addLampDialog = false" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑控制柜 -->
    <el-dialog title="编辑控制柜" width="617px"
      :visible.sync="editCabinetDialog" :close-on-click-modal='false' :close-on-press-escape='false' center
      :before-close="handleCloseDialog">
      <el-form ref="form" class="lamp-form" label-width="140px" size='small'>
        <el-form-item label="控制柜uid" required>
          <el-input class="input-wrap"></el-input>
        </el-form-item>
        <el-form-item label="控制柜唯一编码" required>
          <el-input class="input-wrap"></el-input>
        </el-form-item>
        <el-form-item label="配电柜生产日期" required>
          <el-input class="input-wrap"></el-input>
        </el-form-item>
        <el-form-item label="纬度" required>
          <el-input class="input-wrap"></el-input>
        </el-form-item>
        <el-form-item label="经度" required>
          <el-input class="input-wrap"></el-input>
        </el-form-item>
        <el-form-item label="配电柜使用日期" required>
          <el-input class="input-wrap"></el-input>
        </el-form-item>
        <el-form-item label="额定电压" required>
          <el-input class="input-wrap"></el-input>
        </el-form-item>
        <el-form-item label="额定电流" required>
          <el-input class="input-wrap"></el-input>
        </el-form-item>
        <el-form-item label="额定功率" required>
          <el-input class="input-wrap"></el-input>
        </el-form-item>
        <el-form-item label="最大使用时间" required>
          <el-input style="width:120px"></el-input>
          <span>年</span>
        </el-form-item>
        <el-form-item label="spd描述" required>
          <el-input class="input-wrap"></el-input>
        </el-form-item>
        <el-form-item label="主进线开关型号" required>
          <el-select class="input-wrap">
            <!-- <el-option
              v-for="(item , index) in cityList"
              :key="index"
              :label="item.cityName"
              :value="item.id">
            </el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="控制柜GIS" required>
          <el-select class="input-wrap">
            <!-- <el-option
              v-for="(item , index) in cityList"
              :key="index"
              :label="item.cityName"
              :value="item.id">
            </el-option> -->
          </el-select>
        </el-form-item>
        <el-form-item label="控制柜区域" required>
          <el-input class="input-wrap"></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            class="input-wrap"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
          >
          </el-input>
        </el-form-item>
        <el-form-item label="">
          <el-radio-group>
            <el-radio label="启用"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editCabinetDialog = false">取 消</el-button>
        <el-button @click="editCabinetDialog = false" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 设置区域 -->
    <el-dialog
      title="提示"
      :visible.sync="showAeraDialog"
      width="560px"
      center>
      <span>请选择所在区域</span>
      <div class="area-dialog-content">
        <el-input
          placeholder="输入关键字进行搜索"
          v-model="filterText">
        </el-input>
        <el-tree
          class="area-tree"
          :data="data2"
          :props="defaultProps"
          default-expand-all
          :filter-node-method="filterNode"
          ref="tree2">
        </el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showAeraDialog = false">取 消</el-button>
        <el-button type="primary" @click="showAeraDialog = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 设置控制柜型号 -->
    <el-dialog
      title="设置控制柜型号"
      :visible.sync="showModelDialog"
      width="560px"
      center>
      <div class="model-select-dialog">
        <span>控制柜型号</span>
        <el-select placeholder="请选择" class="select-wrap">
          <!-- <el-option
            v-for="item in cities"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            <span style="float: left">{{ item.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
          </el-option> -->
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showModelDialog = false">取 消</el-button>
        <el-button type="primary" @click="showModelDialog = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 设置地图图标 -->
    <el-dialog
      title="设置地图图标"
      :visible.sync="showMapDialog"
      width="560px"
      center>
      <div class="mapicon-dialog">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          class="icon-uploader"
          list-type="picture-card"
          :limit="1">
          <i class="el-icon-plus"></i>
        </el-upload>
        <p>支持jpg/png/gif格式</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showMapDialog = false">取 消</el-button>
        <el-button type="primary" @click="showMapDialog = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 设置启用/停用 -->
    <el-dialog
      title="设置启停"
      :visible.sync="showUserableDialog"
      width="410px"
      center>
      <div class="useable-select-dialog">
        <el-radio class="select-item" v-model="userable" label="1">启用</el-radio>
        <el-radio class="select-item" v-model="userable" label="2">停用</el-radio>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showUserableDialog = false">取 消</el-button>
        <el-button type="primary" @click="showUserableDialog = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'Deploy',
  watch: {
    filterText (val) {
      this.$refs.tree2.filter(val)
    }
  },
  data () {
    return {
      filterText: '',
      data2: [{
        id: 1,
        label: '杭州',
        children: [{
          id: 4,
          label: 'ABCDG区域'
        },
        {
          id: 4,
          label: '文一西路'
        },
        {
          id: 4,
          label: '西湖'
        },
        {
          id: 4,
          label: '余杭'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      activeName: 'cabinet',
      pageNumber: 1,
      pageSize: 100,
      multipleSelection: [],
      currentPage: 1,
      cabinetList: [{ }],
      newCabinet: {},
      cabinetDialog: false,
      deviceAddDialog: false,
      addLoopDialog: false,
      showAeraDialog: false,
      showModelDialog: false,
      showMapDialog: false,
      showUserableDialog: false,
      addLampDialog: false,
      editCabinetDialog: false,
      userable: '1' // 是否启用
    }
  },
  methods: {
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
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
    handleCloseDialog (done) {
      // 弹窗关闭时将数据清空
      this.newUser = {}
      done()
    },
    handleEdit (command) {
      switch (command) {
        case '1':
          this.showAeraDialog = true
          break
        case '2':
          this.showModelDialog = true
          break
        case '3':
          this.showMapDialog = true
          break
        case '4':
          this.showUserableDialog = true
          break
        default:
          break
      }
    },
    addDevice () {
      // 添加设备
      this.deviceAddDialog = true
    },
    addLoop () {
      // 添加回路
      this.addLoopDialog = true
    },
    addLamp () {
      // 添加灯具
      this.addLampDialog = true
    },
    editCabinet () {
      this.editCabinetDialog = true
    }
  }
}
</script>

<style lang="scss">
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
<style lang="scss" scoped>
.system-container{
  .system-top{
    .item-block{
        padding: 0 30px 0 55px;
    }
  }
}
.area-dialog-content{
  min-height: 200px;
}
.area-tree{
  margin-top: 20px;
}
.model-select-dialog{
  width:450px;
  margin: 20px auto 40px;
  .select-wrap{
    width: 360px;
  }
}
.useable-select-dialog{
  margin: 10px 0 20px;
  text-align:center;
  .select-item{
    margin: 0 30px;
  }
}
.mapicon-dialog{
  text-align: center;
  .el-upload--picture-card{
    height: 100px;
    width: 100px;
  }
  .el-upload {
    height: 100px;
    width: 100px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
}
// 新增控制柜
.cabinet-list{
  margin: 0 auto;
  width:530px;
  padding:20px;
  box-sizing:100%;
  border:1px solid #dedede;
}
.operate-block{
  height: 40px;
  line-height: 40px;
  font-size:16px;
  font-weight: bold;
  a{
    display: inline-block;
    font-size:14px;
    color:#5789fa;
    font-weight: normal;
    margin-right: 15px;
    i{
      font-size:14px;
      font-weight: normal;
      padding-right: 5px;
    }
  }
}
// 添加设备
.add-device{
  .device-info{
    padding:20px;
    margin-left: 8px;
    float: left;
    width: 560px;
    height: 580px;
    border:1px solid #dedede;
    box-sizing:border-box;
  }
  .loop-info{
    padding:20px;
    margin-left: 20px;
    float: left;
    width: 560px;
    height: 580px;
    border:1px solid #dedede;
  }
}
.lamp-form{
  .input-wrap{
    width: 360px;
  }
}
</style>
