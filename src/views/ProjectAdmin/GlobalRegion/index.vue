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
              <a class="f-r danger-a"><i class="iconfont">&#xe632;</i>删除</a>
              <a class="f-r"  @click="addNewObj(0)"><i class="iconfont ">&#xe648;</i>添加</a>
            </div>
            <el-table
              ref="countryMultipleTable"
              :data="listCountry"
              tooltip-effect="dark"
              style="width: 100%"
              height="300px"
              header-row-class-name="datalist-header"
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                width="40">
              </el-table-column>
              <el-table-column
                prop="codeNumber"
                label="序号"
                width="50">
              </el-table-column>
              <el-table-column
                prop="countryName"
                label="国家">
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
          <div class="data-block">
            <div class="data-block-title">
              省份
              <a class="f-r danger-a"><i class="iconfont">&#xe632;</i>删除</a>
              <a class="f-r"  @click="addNewObj(1)"><i class="iconfont ">&#xe648;</i>添加</a>
            </div>
            <el-table
              ref="provinceMultipleTable"
              :data="listProvince"
              tooltip-effect="dark"
              style="width: 100%"
              height="300px"
              header-row-class-name="datalist-header"
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                width="40">
              </el-table-column>
              <el-table-column
                prop="codeNumber"
                label="序号"
                width="50">
              </el-table-column>
              <el-table-column
                prop="provinceName"
                label="省份">
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
        </div>
        <div class="region-block clearfix">
          <div class="data-block">
            <div class="data-block-title">
              城市
              <a class="f-r danger-a"><i class="iconfont">&#xe632;</i>删除</a>
              <a class="f-r" @click="addNewObj(2)"><i class="iconfont ">&#xe648;</i>添加</a>
            </div>
            <el-table
              ref="cityyMultipleTable"
              :data="listCity"
              tooltip-effect="dark"
              style="width: 100%"
              height="300px"
              header-row-class-name="datalist-header"
              @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                width="40">
              </el-table-column>
              <el-table-column
                prop="codeNumber"
                label="序号"
                width="50">
              </el-table-column>
              <el-table-column
                prop="cityName"
                label="城市">
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
        </div>
      </div>
      <!-- 弹窗 -->
      <el-dialog :title="'添加'+dialogTitle[dialogType]"
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
import { listCountry, listProvince, listCity, addOrUpdateCountry, addOrUpdateProvince, addOrUpdateCity } from '@/api/project'
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
      dialogType: 0,
      addObj: {
      }
    }
  },
  methods: {
    handleSelectionChange (val) {
    },
    getListCountry () {
      let that = this
      listCountry(that.pageNumber, that.pageSize).then(response => {
        that.listCountry = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    getListProvince () {
      let that = this
      listProvince(that.pageNumber, that.pageSize).then(response => {
        that.listProvince = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    getListCity () {
      let that = this
      listCity(that.pageNumber, that.pageSize).then(response => {
        that.listCity = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    editRow () {
    },
    deleteRow () {
    },
    addNewObj (type) {
      this.dialogType = type
      this.addNewObjShow = true
    },
    // 提交
    onSubmit () {
      let _obj = {}
      if (this.dialogType === 0) {
        // 提交国家
        _obj.countryName = this.addObj.name
        _obj.codeNumber = this.addObj.code
        _obj.mem = this.addObj.mem
        addOrUpdateCountry(_obj).then(response => {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.getListCountry()
          this.addNewObjShow = false
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
            message: '添加成功!'
          })
          this.getListProvince()
          this.addNewObjShow = false
        }).catch(error => {
          console.log(error)
        })
      } else if (this.dialogType === 2) {
        // 提交城市
        _obj.cityName = this.addObj.name
        _obj.codeNumber = this.addObj.code
        _obj.mem = this.addObj.mem
        addOrUpdateCity(_obj).then(response => {
          this.$message({
            type: 'success',
            message: '添加成功!'
          })
          this.getListCity()
          this.addNewObjShow = false
        }).catch(error => {
          console.log(error)
        })
      }
    },
    // 弹窗关闭时将数据清空
    handleCloseDialog (done) {
      this.addObj = {
        name: ' ',
        code: ' ',
        mem: ''
      }
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
