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
        <el-button @click="adjustedPower()" type="primary">调整满载功率</el-button>
        <el-button @click="parameterFun()">参数</el-button>
        <el-button @click="telFun()">号码</el-button>
        <el-button @click="checkedTime()">查时</el-button>
        <el-button @click="synchronizationFun()">同步</el-button>
        <el-button @click="restartFun()">重启</el-button>
        <el-button @click="resetFun()">复位</el-button>
        <el-button @click="upgradeFun()">升级</el-button>
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
    <!-- 调整满载功率 -->
    <el-dialog
      title="调整满载功率"
      :visible.sync="adjustedPowerShow"
      center>
      <div class="adjusted-tk-center">
        <div class="center">
          <el-radio v-model="radio" label="1">使用灯具额定总功率作为满载功率（调整数量：1）</el-radio>
          <el-radio v-model="radio" label="2">查询并使用电表功率作为满载功率（在线数量：1）</el-radio>
        </div>
        <div class="waring-text">
          <i class="el-icon-warning"></i>此数据将用于后续的报表节能统计，请慎重修改。若使用电表功率请先在电表参数设置内选择用于“数据统计”的电表
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="adjustedPowerShow = false">取 消</el-button>
        <el-button type="primary" @click="adjustedPowerShow = false">确 定</el-button>
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
    <!-- 号码 -->
    <el-dialog
      title="号码"
      :visible.sync="telShow"
      center>
      <div class="adjusted-tk-center">
        <el-form :model="telForm" :rules="telrules" ref="telRuleForm" label-width="70px">
          <el-form-item label="手机号码" prop="tel">
            <el-input v-model="telForm.tel"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="waring-text">
              <i class="el-icon-warning"></i>
              <div class="waring-center">
                <p class="text1">请输入接收查询结果短信手机号码（共有在线集中器1台）</p>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="telShow = false">取 消</el-button>
        <el-button type="primary" @click="telShow = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 查时 -->
    <el-dialog
      title="查时"
      :visible.sync="checkedTimeShow"
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
        <el-button @click="checkedTimeShow = false">取 消</el-button>
        <el-button type="primary" @click="checkedTimeShow = false">确 定</el-button>
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
    <!-- 重启 -->
    <el-dialog
      title="重启"
      :visible.sync="restartShow"
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
        <el-button @click="restartShow = false">取 消</el-button>
        <el-button type="primary" @click="restartShow = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 复位 -->
    <el-dialog
      title="复位"
      :visible.sync="resetShow"
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
        <el-button @click="resetShow = false">取 消</el-button>
        <el-button type="primary" @click="resetShow = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 升级 -->
    <el-dialog
      title="升级"
      :visible.sync="upgradeShow"
      center>
      <div class="adjusted-tk-center">
        <el-form label-width="70px">
          <el-form-item label="升级文件" prop="tel">
            <el-button>上传<i class="el-icon-upload el-icon--right"></i></el-button>
            <p class="upgrade-tishi">请选择并上传集中器升级文件（.tra.z）</p>
          </el-form-item>
          <el-form-item>
            <div class="check-text">
              <el-checkbox v-model="tbChecked">传输失败之后自动续传直至完成</el-checkbox>
              <el-checkbox v-model="tbChecked">升级完成后自动重启集中器</el-checkbox>
              <el-checkbox v-model="tbChecked">重启集中器后自动查询版本和参数</el-checkbox>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="upgradeShow = false">取 消</el-button>
        <el-button type="primary" @click="upgradeShow = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Digital',
  data () {
    var validateTel = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号码不得为空'))
      }
      var reg = /^1[3|4|5|7|8][0-9]{9}$/ // 验证规则
      var flag = reg.test(value) // true
      if (!flag) {
        return callback(new Error('请输入正确的手机号码'))
      }
    }
    return {
      radio: null,
      pageNumber: 1,
      pageSize: 100,
      multipleSelection: [],
      currentPage: 1,
      ElectricMeterList: [],
      adjustedPowerShow: false,
      parameterShow: false,
      checkedTimeShow: false,
      synchronizationShow: false,
      tbChecked: true,
      restartShow: false,
      resetShow: false,
      telShow: false,
      telForm: {
        tel: null
      },
      telrules: {
        tel: [
          { validator: validateTel, trigger: 'blur' }
        ]
      },
      upgradeShow: false
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
    addCabinet () {
      this.cabinetDialog = true
    },
    deleteRow () {
    },
    editRow () {
    },
    onSubmit () {
    },
    // 调整满载功率
    adjustedPower () {
      this.adjustedPowerShow = true
    },
    // 参数
    parameterFun () {
      this.parameterShow = true
    },
    // 号码
    telFun () {
      this.telShow = true
    },
    // 查时
    checkedTime () {
      this.checkedTimeShow = true
    },
    // 同步
    synchronizationFun () {
      this.synchronizationShow = true
    },
    // 重启
    restartFun () {
      this.restartShow = true
    },
    // 复位
    resetFun () {
      this.restartShow = true
    },
    upgradeFun () {
      this.upgradeShow = true
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
.el-radio__label{
    font-size:16px;
}
.el-dialog__footer{
  padding-top: 20px
}
.el-form-item__content{
  line-height: normal
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
.upgrade-tishi{
  margin-top: 5px;
  font-size:12px;
  color: #95989a;
}
</style>
