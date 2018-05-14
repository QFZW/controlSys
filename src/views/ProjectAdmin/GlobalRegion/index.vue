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
              <a class="f-r danger-a"><i class="iconfont ">&#xe648;</i>删除</a>
              <a class="f-r"><i class="iconfont">&#xe632;</i>添加</a>
            </div>
            <el-table
              ref="countryMultipleTable"
              :data="listCountry"
              tooltip-effect="dark"
              style="width: 100%"
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
              <a class="f-r danger-a"><i class="iconfont ">&#xe648;</i>删除</a>
              <a class="f-r"><i class="iconfont">&#xe632;</i>添加</a>
            </div>
            <el-table
              ref="provinceMultipleTable"
              :data="listProvince"
              tooltip-effect="dark"
              style="width: 100%"
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
              <a class="f-r danger-a"><i class="iconfont ">&#xe648;</i>删除</a>
              <a class="f-r"><i class="iconfont">&#xe632;</i>添加</a>
            </div>
            <el-table
              ref="cityyMultipleTable"
              :data="listCity"
              tooltip-effect="dark"
              style="width: 100%"
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
    </div>
</template>

<script>
import { listCountry, listProvince, listCity } from '@/api/project'
export default {
  name: 'GlobalRegion',
  data () {
    return {
      listCountry: [],
      listProvince: [],
      listCity: [],
      countryMultipleTable: [],
      provinceMultipleTable: [],
      cityyMultipleTable: []
    }
  },
  methods: {
    getListCountry () {
      let that = this
      listCountry(that.pageNumber, that.pageSize).then(response => {
        that.listCountry = response.data
      }).catch(error => {
        console(error)
      })
    },
    getListProvince () {
      let that = this
      listProvince(that.pageNumber, that.pageSize).then(response => {
        that.listProvince = response.data
      }).catch(error => {
        console(error)
      })
    },
    getListCity () {
      let that = this
      listCity(that.pageNumber, that.pageSize).then(response => {
        that.listCity = response.data
      }).catch(error => {
        console(error)
      })
    },
    editRow () {
    },
    deleteRow () {
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
  .el-button--primary{
    background: #5789fa;
  }
  .el-dialog{
    width: 500px;
    margin-top: 10vh !important;
  }
  .el-dialog__body{
    padding: 20px 20px 0 20px !important;
  }
  .el-form-item{
    margin-bottom: 15px;
  }
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
