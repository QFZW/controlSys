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
        <el-button @click="editElectricity()" type="primary">批量编辑</el-button>
        <el-button @click="parameterFun()">参数</el-button>
        <el-button>电表地址</el-button>
        <el-button @click="synchronizationFun()">同步</el-button>
        <el-button @click="InitializationFun()">初始化电费</el-button>
      </div>
      <div class="data-list">
        <el-table
          ref="multipleTable"
          :data="ElectricMeterList"
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
            label="控制柜"
            width="100">
          </el-table-column>
            <el-table-column
            prop="projectName"
            label="集中器"
            width="100">
          </el-table-column>
          <el-table-column
            prop="countryName"
            label="状态"
            width="100">
          </el-table-column>
          <el-table-column
            prop="provinceName"
            label="连接模式"
            width="100">
          </el-table-column>
          <el-table-column
            prop="cityName"
            label="服务器地址"
            width="100">
          </el-table-column>
          <el-table-column
            label="端口"
            width="100">
          </el-table-column>
          <el-table-column
            prop=""
            label="满载功率（W）"
            width="120">
          </el-table-column>
          <el-table-column
            prop="latitude"
            label="运行模式">
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
    <!-- 批量编辑 -->
    <el-dialog title="批量编辑"
      :visible.sync="editElectricityShow" :close-on-click-modal='false' :close-on-press-escape='false' center
      :before-close="handleCloseDialog">
        <el-form ref="form" label-width="110px">
          <el-form-item label="电压倍率" required>
            <el-input class="width350" v-model="newElectricity.projectName"></el-input>
            <p class="input-tishi">连接到电表的电压互感器倍率</p>
          </el-form-item>
          <el-form-item label="电流倍率" required>
            <el-input class="width350" v-model="newElectricity.latitude"></el-input>
            <p class="input-tishi">连接到电表的电流互感器倍率</p>
          </el-form-item>
          <el-form-item label="电费单价" required>
            <el-input class="width350" v-model="newElectricity.longitude"></el-input>
            <p class="input-tishi">用于电费的急速按</p>
          </el-form-item>
          <el-form-item label="初始有功电能" required>
            <el-input class="width350" v-model="newElectricity.latitude"></el-input>
            <p class="input-tishi">(KWh)将在统计时把此数据增加到电表有功电能内</p>
          </el-form-item>
          <el-form-item label="初始无功电能" required>
            <el-input class="width350" v-model="newElectricity.longitude"></el-input>
            <p class="input-tishi">(KWh)将在统计时把此数据增加到电表无功电能内</p>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="newElectricity.state">自动查询(开灯或关灯后自动查询电表数据)</el-checkbox>
            <el-checkbox v-model="newElectricity.state1">数据统计(此电表数据将用于能耗报表统计)</el-checkbox>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="editElectricityShow = false">取 消</el-button>
          <el-button type="primary" @click="onSubmit">确 定</el-button>
        </div>
    </el-dialog>
    <!-- 参数 -->
    <el-dialog
      title="参数"
      :visible.sync="parameterShow"
      center>
      <div class="adjusted-tk-center">
        <div class="waring-text">
          <i class="el-icon-warning"></i>
          <div class="waring-center">
            <p class="text1">确定要执行查询操作吗？（共有在线集中器1台）</p>
            <p class="huise-text2">注意：执行查询后当前配置数据将会被查询结果代替</p>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="parameterShow = false">取 消</el-button>
        <el-button type="primary" @click="parameterShow = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 同步 -->
    <el-dialog
      title="同步"
      :visible.sync="synchronizationShow"
      center>
      <div class="adjusted-tk-center">
        <div class="waring-text border-bottom">
          <i class="el-icon-warning"></i>
          <div class="waring-center">
            <p class="text1">确定要同步参数到集中器吗？（共有在线集中器1台）</p>
            <p class="huise-text2">注意：下发完成后需要重启集中器才能使配置生效</p>
          </div>
        </div>
        <div class="check-text paddingtop15">
          <el-checkbox v-model="tbChecked">服务器地址和端口不可用时禁止同步</el-checkbox>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="synchronizationShow = false">取 消</el-button>
        <el-button type="primary" @click="synchronizationShow = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 初始化电费 -->
    <el-dialog
      title="初始化电费"
      :visible.sync="InitializationShow"
      center>
      <div class="initialization-tk">
        <p class="p1">电能历史记录时间:2017:10:12-11111</p>
        <div class="tk-top clearfix">
          <a class="f-l"><i class="iconfont ">&#xe648;</i>增加时段</a>
          <a class="f-l danger-a"><i class="iconfont">&#xe632;</i>删除时段</a>
          <div class="rmb-select f-r">
            货币单位
            <el-select  placeholder="请选择">
              <!-- <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option> -->
            </el-select>
          </div>
        </div>
        <div class="data-list">
          <el-table
            ref="multipleTable"
            :data="ElectricMeterList"
            style="width: 100%"
            header-row-class-name="datalist-header"
            @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="40">
            </el-table-column>
            <el-table-column
              label="行号"
              width="50">
            </el-table-column>
            <el-table-column
              prop="provinceName"
              label="开始时间"
              width="110">
            </el-table-column>
            <el-table-column
              prop="cityName"
              label="结束时间"
              width="110">
            </el-table-column>
            <el-table-column
              label="单价"
              width="70">
            </el-table-column>
            <el-table-column
              prop=""
              label="累计">
            </el-table-column>
          </el-table>
        </div>
        <p class="p2">合计电费:11100</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="InitializationShow = false">取 消</el-button>
        <el-button type="primary" @click="InitializationShow = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ElectricMeter',
  data () {
    return {
      pageNumber: 1,
      pageSize: 100,
      multipleSelection: [],
      currentPage: 1,
      ElectricMeterList: [],
      newElectricity: {},
      editElectricityShow: false,
      parameterShow: false,
      synchronizationShow: false,
      InitializationShow: false,
      tbChecked: false
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
    editElectricity () {
      this.editElectricityShow = true
    },
    deleteRow () {
    },
    editRow () {
    },
    onSubmit () {
    },
    // 参数
    parameterFun () {
      this.parameterShow = true
    },
    // 同步
    synchronizationFun () {
      this.synchronizationShow = true
    },
    InitializationFun () {
      this.InitializationShow = true
    },
    // 弹窗关闭时将数据清空
    handleCloseDialog (done) {
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
.el-dialog__footer{
  padding-top: 20px
}
.el-form-item__content{
  line-height: normal
}
.el-checkbox+.el-checkbox{
  margin-left: 0;
  margin-top: 10px;
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
.adjusted-tk-center{
  padding:0 20px;
  .el-radio+.el-radio{
    margin-left: 0;
    margin-bottom: 10px;
  }
  .center{
    text-align: center;
  }
}
.border-bottom{
  padding-bottom:15px;
  border-bottom: 1px solid #e5e5e5;
}
.waring-text{
  padding-left: 20px;
  position: relative;
  font-size:16px;
  i{
    position: absolute;
    left:0;
    top:5px;
    color:#66b1ff
  }
  .huise-text2{
    font-size:14px;
    color:#95989a;
    margin-top: 10px;
  }
}
.paddingtop15{
  padding-top: 15px;
}
.check-text{
  .el-checkbox+.el-checkbox{
    margin-left: 0;
    margin-top: 5px;
  }
}
.input-tishi{
  margin-top: 5px;
  font-size:12px;
  color: #95989a;
}
.initialization-tk{
  .el-table__body{
    width: 100%;
  }
  .p1{
    font-size:12px;
    color:#67c23a
  }
  .p2{
    margin-top: 10px;
    font-size:12px;
    color:#67c23a
  }
  .tk-top{
    margin-top: 10px;
    a{
      display: inline-block;
      padding-right: 12px;
      font-size: 14px;
      line-height: 40px;
      color: #5789fa;
      font-weight: normal;
    }
    .rmb-select{
      width:240px;
      .el-select{
        width:160px
      }
    }
  }
  .data-list{
    margin-top: 10px;
  }
}
</style>
