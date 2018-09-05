/*
 * @Author: Ouber23
 * @Date: 2018-08-14 04:49:28
 * @LastEditors: Ouber23
 * @LastEditTime: 2018-08-14 04:54:59
 */
<template>
  <div id="EleboxWarning">
    <div id="searchForm">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="控制柜">
          <el-select v-model="formInline.elebox" placeholder="控制柜">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="formInline.states" placeholder="状态">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>   
        <el-form-item label="等级">
          <el-select v-model="formInline.level" placeholder="等级">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="UID">
          <el-input v-model="formInline.uid" placeholder="uid"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onResume">重置</el-button>
        </el-form-item>
      </el-form>
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
          prop="alarmLevel"
          label="等级"
          width="80">
        </el-table-column>
        <el-table-column
          prop="codeNumber"
          label="控制柜/区域"
          width="120">
        </el-table-column>
        <el-table-column
          prop="alarmSource"
          label="来自"
          width="120">
        </el-table-column>
        <el-table-column
          prop="gmtCreated"
          :formatter="dateFormat"
          label="创建时间"
          width="150">
        </el-table-column>
        <el-table-column
          prop="gmtUpdated"
          :formatter="dateFormat"
          label="更新时间"
          width="150">
        </el-table-column>
        <el-table-column
          prop="ctype"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="nnlightctlAlarmConfigId"
          label="警報配置ID">
        </el-table-column>
        <el-table-column
          prop="alarmTime"
          :formatter="dateFormat"
          label="报警/解除时间">
        </el-table-column>
        <el-table-column
          prop="msg"
          label="消息">
        </el-table-column>
        <el-table-column
          prop="alarmCount"
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
import { getListAlarm } from '@/api/EventWarning/EventWarning'
import moment from 'moment';
import '../../../../utils/filter.js'
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
        alarmLevel: '三级警报',
        codeNumber: '控制柜一/上海市普陀区金沙江路 1518 弄',
        alarmSource: '上海xxxx',
        name: 'XXX警报',
        ctype: '普通灯警报',
        gmtCreated: 'e222323',
        gmtUpdated: '201-121',
        nnlightctlAlarmConfigId: '11',
        alarmTime: '2016-05-02',
        msg: '事件报警',
        alarmCount: '3'
      },
      {
        state: '良好',
        alarmLevel: '三级警报',
        codeNumber: '控制柜一/上海市普陀区金沙江路 1518 弄',
        alarmSource: '上海xxxx',
        name: 'XXX警报',
        ctype: '普通灯警报',
        gmtCreated: 'e222323',
        gmtUpdated: '201-121',
        nnlightctlAlarmConfigId: '11',
        alarmTime: '2016-05-02',
        msg: '事件报警',
        alarmCount: '3'
      },
      {
        state: '良好',
        alarmLevel: '三级警报',
        codeNumber: '控制柜一/上海市普陀区金沙江路 1518 弄',
        alarmSource: '上海xxxx',
        name: 'XXX警报',
        ctype: '普通灯警报',
        gmtCreated: 'e222323',
        gmtUpdated: '201-121',
        nnlightctlAlarmConfigId: '11',
        alarmTime: '2016-05-02',
        msg: '事件报警',
        alarmCount: '3'
      },
      {
        state: '良好',
        alarmLevel: '三级警报',
        codeNumber: '控制柜一/上海市普陀区金沙江路 1518 弄',
        alarmSource: '上海xxxx',
        name: 'XXX警报',
        ctype: '普通灯警报',
        gmtCreated: 'e222323',
        gmtUpdated: '201-121',
        nnlightctlAlarmConfigId: '11',
        alarmTime: '2016-05-02',
        msg: '事件报警',
        alarmCount: '3'
      }],
      currentPage3: 5,
    }
  },
  computed: {
  },
  methods: {
    getListAlarm(pageNumber, pageSize) {
      let that = this;
      getListAlarm(pageNumber, pageSize).then((res)=>{
        console.log(res, '初始化shuju');
        // 初始化表格
        that.tableData = res.data;
      })
    },
     //时间格式化
    dateFormat:function(row, column) {
      var date = row[column.property];
      if (date == undefined) {
        return "";
      }
        return moment(date).format("YYYY-MM-DD HH:mm:ss");
    },

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
    let that = this
    that.getListAlarm(1, 20)
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
