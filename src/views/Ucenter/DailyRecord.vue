<template>
  <div class="system-container">
      <div class="system-top clearfix">
        <!-- <div class="item-block f-l">
          <span class="title">项目</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div> -->
        <div class="item-block f-l">
          <span class="title">类型</span>
          <el-select v-model="searchObj.operationType" placeholder="请选择">
            <!-- <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option> -->
          </el-select>
        </div>
        <!-- <div class="item-block f-l">
          <span class="title">包含</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div> -->
        <div class="item-block f-l">
          <span class="title">日期</span>
          <el-date-picker
            style="width:350px"
            v-model="selectTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
        <div class="item-block f-l">
          <span class="title">内容</span><el-input v-model="searchObj.content" placeholder="请输入内容" ></el-input>
        </div>
        
        <div class="btn-block f-r">
          <el-button @click="goSearch" type="primary">查询</el-button>
        </div>
      </div>
      <div class="system-center">
        <div class="data-list">
          <el-table
            ref="multipleTable"
            :data="List"
            tooltip-effect="dark"
            style="width: 100%"
            header-row-class-name="datalist-header">
             <el-table-column
              prop="loginName"
              fixed="left"
              label="账号"
              width="100">
            </el-table-column>
            <el-table-column
              prop="userName"
              label="用户"
              width="100">
            </el-table-column>
            <el-table-column
              prop="operationDesc"
              label="执行操作">
            </el-table-column>
            <!-- <el-table-column
              prop="mem"
              label="描述">
            </el-table-column> -->
            <el-table-column
              label="操作时间"
              width="200">
              <template slot-scope="scope">
                {{scope.row.operationTime|timeFormat1}}
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
    </div>
</template>

<script>
import {listUserOpLog} from '@/api/RoadLighting/userAdmin'
import '../../utils/filter.js'
export default {
  name: 'DailyRecord',
  data () {
    return {
      pageNumber: 1,
      pageSize: 10,
      currentPage: 1,
      allTotal: null,
      List: [],
      selectTime: null,
      searchObj: {
        content: '',
        operationType: '',
      }
    }
  },
  methods: {
    handleCurrentChange (val) {
      this.pageNumber = val
      this.getList()
      // 翻页请求
    },
    handleSizeChange (val) {
      this.pageSize = val
      this.getList()
    },
    selectTimeFun () {
      if (this.selectTime !== null) {
        this.searchObj.startDate = new Date(this.selectTime[0]).toString()
        this.searchObj.endDate = new Date(this.selectTime[1]).toString()
        console.log(this.searchObj)
      }
    },
    goSearch () {
      this.getList()
    },
    getList () {
      let that = this
      this.selectTimeFun()
      this.searchObj.pageNumber = this.pageNumber
      this.searchObj.pageSize = this.pageSize
      listUserOpLog(this.searchObj).then(response => {
        that.List = response.data
        if (that.List.length > 0) {
          this.allTotal = response.total
        } else {
          this.allTotal = 0
        }
      }).catch(error => {
        console.log(error)
      })
    }
  },
  created () {
    this.getList()
  },
  destroyed () {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
/* reset element-ui css */
  .el-date-editor .el-range-separator{
    width: 10%
  }
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  .input-with-select{
    width: 285px;
  }
  .system-container .system-top .item-block{
    width: initial;
  }
</style>
