/*
 * @Author: Ouber23
 * @Date: 2018-08-14 04:49:28
 * @LastEditors: Ouber23
 * @LastEditTime: 2018-08-14 04:54:59
 */
<template>
  <div id="EleboxWarning">
    <div id="searchForm">
      
    </div>
    <div id="dataTable">
      <div class="operator">

      </div>
      <el-table
        :data="tableData"
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="state"
          label="状态"
          width="80">
        </el-table-column>
        <el-table-column
          prop="level"
          label="等级"
          width="80">
        </el-table-column>
        <el-table-column
          prop="elebox"
          label="控制柜/区域"
          width="120">
        </el-table-column>
        <el-table-column
          prop="source"
          label="来自"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          width="80">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="waringtime"
          label="报警/解除时间">
        </el-table-column>
        <el-table-column
          prop="message"
          label="消息">
        </el-table-column>
        <el-table-column
          prop="times"
          label="次数">
        </el-table-column>
      </el-table>
      <div class="pagelist-block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage3"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="39">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
// import Vue from 'vue'
// import { listElebox } from '@/api/GisService/lamp'
// import { getLighting } from '@/api/RoadLighting/deploy'
import '../../../utils/filter.js'
export default {
  name: 'Elebox',
  data () {
    return {
      formInline: {
        elebox: '',
        states: '',
        level: '',
        uid: ''
      },
      tableData: [{
        state: '良好',
        level: '三级警报',
        elexbox: '控制柜一/上海市普陀区金沙江路 1518 弄',
        source: '上海xxxx',
        name: 'XXX警报',
        type: '普通灯警报',
        waringtime: '2016-05-02',
        message: '事件报警',
        times: '3'
      },
      {
        state: '良好',
        level: '三级警报',
        elexbox: '控制柜一/上海市普陀区金沙江路 1518 弄',
        source: '上海xxxx',
        name: 'XXX警报',
        type: '普通灯警报',
        waringtime: '2016-05-02',
        message: '事件报警',
        times: '3'
      },
      {
        state: '良好',
        level: '三级警报',
        elexbox: '控制柜一/上海市普陀区金沙江路 1518 弄',
        source: '上海xxxx',
        name: 'XXX警报',
        type: '普通灯警报',
        waringtime: '2016-05-02',
        message: '事件报警',
        times: '3'
      },
      {
        state: '良好',
        level: '三级警报',
        elexbox: '控制柜一/上海市普陀区金沙江路 1518 弄',
        source: '上海xxxx',
        name: 'XXX警报',
        type: '普通灯警报',
        waringtime: '2016-05-02',
        message: '事件报警',
        times: '3'
      }],
      currentPage3: 5,
    }
  },
  computed: {
  },
  methods: {
    onSubmit () {
      console.log('submit!');
    },
    onResume () {
      console.log('resume')
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // currentPage3 () {
    //   return 1
    // },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  created () {
    // let that = this
  }
}
</script>

<style lang="scss" scoped>
  #searchForm {
    padding-left: 32px;
    padding-top: 10px;
  }
  #dataTable {
    padding-left: 32px;
    padding-top: 10px;
    padding-right: 32px;
  }
</style>
