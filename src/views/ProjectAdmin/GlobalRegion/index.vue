<template>
    <div class="project-container">
      <div class="region-title">
        全球统计数据
      </div>
      <div>
        <div class="region-block region-block1 clearfix">
          <div class="data-block">
            <div class="data-block-title">
              国家
              <!-- <a class="f-r danger-a"><i class="iconfont">&#xe632;</i>删除</a> -->
              <a class="f-r"  @click="addNewObj(0)"><i class="iconfont ">&#xe648;</i>添加</a>
            </div>
            <el-table
              ref="countryMultipleTable"
              :data="listCountry"
              tooltip-effect="dark"
              style="width: 100%"
              height="300px"
              header-row-class-name="datalist-header">
              <!-- <el-table-column
                type="selection"
                width="40">
              </el-table-column> -->
              <el-table-column
                prop="codeNumber"
                label="序号"
                width="100">
              </el-table-column>
              <el-table-column
                prop="countryName"
                label="国家"
                width="120">
              </el-table-column>
              <el-table-column
                prop="mem"
                label="备注">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="80">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="editRow(scope.$index,0)"
                    type="text"
                    size="small">
                    编辑
                  </el-button>
                  <!-- <el-button
                    class="danger-text-btn"
                    @click.native.prevent="deleteRow(1, scope.$index)"
                    type="text"
                    size="small">
                    删除
                  </el-button> -->
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="data-block">
            <div class="data-block-title">
              省份
              <!-- <a class="f-r danger-a"><i class="iconfont">&#xe632;</i>删除</a> -->
              <a class="f-r"  @click="addNewObj(1)"><i class="iconfont ">&#xe648;</i>添加</a>
            </div>
            <el-table
              ref="provinceMultipleTable"
              :data="listProvince"
              tooltip-effect="dark"
              style="width: 100%"
              height="300px"
              header-row-class-name="datalist-header">
              <!-- <el-table-column
                type="selection"
                width="100">
              </el-table-column> -->
              <el-table-column
                prop="codeNumber"
                label="序号"
                width="100">
              </el-table-column>
              <el-table-column
                prop="provinceName"
                label="省份"
                width="120">
              </el-table-column>
              <el-table-column
                prop="mem"
                label="备注">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="80">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="editRow(scope.$index,1)"
                    type="text"
                    size="small">
                    编辑
                  </el-button>
                  <!-- <el-button
                    class="danger-text-btn"
                    @click.native.prevent="deleteRow(1, scope.$index)"
                    type="text"
                    size="small">
                    删除
                  </el-button> -->
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="region-block clearfix">
          <div class="data-block">
            <div class="data-block-title">
              城市
              <!-- <a class="f-r danger-a"><i class="iconfont">&#xe632;</i>删除</a> -->
              <a class="f-r" @click="addNewObj(2)"><i class="iconfont ">&#xe648;</i>添加</a>
            </div>
            <el-table
              ref="cityyMultipleTable"
              :data="listCity"
              tooltip-effect="dark"
              style="width: 100%"
              height="300px"
              header-row-class-name="datalist-header">
              <!-- <el-table-column
                type="selection"
                width="40">
              </el-table-column> -->
              <el-table-column
                prop="codeNumber"
                label="序号"
                width="100">
              </el-table-column>
              <el-table-column
                prop="cityName"
                label="城市"
                width="120">
              </el-table-column>
              <el-table-column
                prop="longitude "
                label="经度"
                width="80">
              </el-table-column>
              <el-table-column
                prop="latitude"
                label="纬度"
                width="80">
              </el-table-column>
              <el-table-column
                prop="timeZone "
                label="时区"
                width="80">
              </el-table-column>
              <el-table-column
                prop="mem"
                label="备注">
              </el-table-column>
              <el-table-column
                fixed="right"
                label="操作"
                width="120">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="editRow(scope.$index,2)"
                    type="text"
                    size="small">
                    编辑
                  </el-button>
                  <!-- <el-button
                    class="danger-text-btn"
                    @click.native.prevent="deleteRow(1, scope.$index)"
                    type="text"
                    size="small">
                    删除
                  </el-button> -->
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <!-- 弹窗 -->
      <el-dialog :title="dialogText[textType]+dialogTitle[dialogType]"
       :visible.sync="addNewObjShow" :close-on-click-modal='false' :close-on-press-escape='false' center
       :before-close="handleCloseDialog">
        <el-form ref="form" label-width="50px">
          <el-form-item :label="dialogTitle[dialogType]" required>
            <el-input v-model="addObj.name" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item label="编码" required>
            <el-input v-model="addObj.code" placeholder="请输入内容"></el-input>
          </el-form-item>
          <div v-if="dialogType == 2">
            <el-form-item label="经度" required>
              <el-input v-model="addObj.longitude" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="纬度" required>
              <el-input v-model="addObj.latitude" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="时区" required>
              <el-input v-model="addObj.timeZone" placeholder="请输入内容"></el-input>
            </el-form-item>
          </div>
          <el-form-item label="备注" required>
            <el-input v-model="addObj.mem" placeholder="请输入内容"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addNewObjShow = false">取 消</el-button>
          <el-button type="primary" @click="onSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
import { listCountry, listProvince, listCity, addOrUpdateCountry, addOrUpdateProvince, addOrUpdateCity, getOneCountry, getOneProvince, getOneCity } from '@/api/project'
export default {
  name: 'GlobalRegion',
  data () {
    return {
      listCountry: [],
      listProvince: [],
      listCity: [],
      countryMultipleTable: [],
      provinceMultipleTable: [],
      cityyMultipleTable: [],
      addNewObjShow: false, // 控制弹窗
      dialogTitle: ['国家', '省份', '城市'],
      dialogText: ['添加', '修改'], // 添加修改
      textType: 0, // 添加为0修改为1
      dialogType: 0,
      addObj: {
      }
    }
  },
  methods: {
    getListCountry () {
      let that = this
      listCountry().then(response => {
        that.listCountry = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    getListProvince () {
      let that = this
      listProvince().then(response => {
        that.listProvince = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    getListCity () {
      let that = this
      listCity().then(response => {
        that.listCity = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    editRow (index, type) {
      this.textType = 1
      this.dialogType = type
      if (type === 0) {
        // 修改国家
        getOneCountry(this.listCountry[index].codeNumber).then(response => {
          // this.addObj = response.data[0]
          this.addObj.name = response.data[0].countryName
          this.addObj.code = response.data[0].codeNumber
          this.addObj.mem = response.data[0].mem
          this.addNewObjShow = true
        }).catch(error => {
          console.log(error)
        })
      } else if (type === 1) {
        // 修改省份
        getOneProvince(this.listProvince[index].codeNumber).then(response => {
          // this.addObj = response.data[0]
          this.addObj.name = response.data[0].provinceName
          this.addObj.code = response.data[0].codeNumber
          this.addObj.mem = response.data[0].mem
          this.addNewObjShow = true
        }).catch(error => {
          console.log(error)
        })
      } else if (type === 2) {
        // 修改城市
        getOneCity(this.listCity[index].codeNumber).then(response => {
          // this.addObj = response.data[0]
          this.addObj.name = response.data[0].cityName
          this.addObj.code = response.data[0].codeNumber
          this.addObj.mem = response.data[0].mem
          this.addObj.longitude = response.data[0].longitude
          this.addObj.latitude = response.data[0].latitude
          this.addObj.timeZone = response.data[0].timeZone
          this.addNewObjShow = true
        }).catch(error => {
          console.log(error)
        })
      }
    },
    deleteRow () {
    },
    addNewObj (type) {
      this.dialogType = type
      this.textType = 0
      this.addNewObjShow = true
    },
    // 提交
    onSubmit () {
      let _obj = {}
      let _text
      if (this.textType === 0) {
        _text = '添加成功'
      } else {
        _text = '修改成功'
      }
      if (this.dialogType === 0) {
        // 提交国家
        _obj.countryName = this.addObj.name
        _obj.codeNumber = this.addObj.code
        _obj.mem = this.addObj.mem
        addOrUpdateCountry(_obj).then(response => {
          this.$message({
            type: 'success',
            message: _text
          })
          this.getListCountry()
          this.addNewObjShow = false
          this.handleCloseDialog()
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
            message: _text
          })
          this.getListProvince()
          this.addNewObjShow = false
          this.handleCloseDialog()
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
            message: _text
          })
          this.getListCity()
          this.addNewObjShow = false
          this.handleCloseDialog()
        }).catch(error => {
          console.log(error)
        })
      }
    },
    // 弹窗关闭时将数据清空
    handleCloseDialog (done) {
      this.addObj = {}
      done()
    }
  },
  created () {
    this.getListCountry()
    this.getListProvince()
    this.getListCity()
  },
  destroyed () {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  .project-container{
    min-width: 950px;
    padding: 30px 40px;
    background: #fff;
  }
  .el-pager .active{
    background: #5789fa !important;
  }
  .width350{
    width: 350px;
  }
  .region-title{
    font-size:18px;
    font-weight: bold;
    color:#333;
  }
  .region-block{
    margin-top: 40px;
    .data-block{
      box-sizing:border-box;
      box-shadow: 0 0 5px rgba(0,0,0,0.2);
      .data-block-title{
        height: 60px;
        line-height: 60px;
        padding: 0 12px;
        font-size:16px;
        font-weight: bold;
        a{
          display: inline-block;
          padding-left: 12px;
          font-size:14px;
          color:#5789fa;
          font-weight: normal;
          i{
            font-size:14px;
            font-weight: normal;
            padding-right: 5px;
          }
        }
        .danger-a{
          color:#f56c6c;
        }
      }
    }
  }
  .region-block1{
    .data-block{
      float: left;
      width: 48%;
      &:last-child{
        float: right;
      }
    }
  }
</style>
