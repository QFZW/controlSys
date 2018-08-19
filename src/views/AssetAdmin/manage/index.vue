<template>
    <div class="box">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="未提交" name="first"></el-tab-pane>
                <el-tab-pane label="已提交" name="second"></el-tab-pane>
            </el-tabs>
            <div style="display:flex;justify-content: space-between">
                <div class="search">
                <div>
                        <el-input v-model="input" placeholder="请输入内容"></el-input>
                </div>
                <div style="width:30px;"></div>
                <div class="dateChange">
                        <div>所属配电柜</div>
                        <div style="width:20px;"></div>
                            <el-select v-model="value" placeholder="请选择">
                                <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                                </el-option>
                            </el-select>
                    </div>
                </div>
                <div>
                      <el-button type="primary">查询</el-button>
                </div>
            </div>
            <div class="buttonList">
                <el-button type="primary" icon="el-icon-plus">增加</el-button>
                <el-button type="primary" plain icon="el-icon-delete">批量删除</el-button>
                <el-button type="primary" plain icon="el-icon-setting">设置</el-button>
                <el-button type="primary" plain icon="el-icon-check">提交</el-button>
            </div>
            <template>
                    <el-table
                        ref="multipleTable"
                        :data="tableData3"
                        tooltip-effect="dark"
                        style="width: 100%"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                        type="selection"
                        width="55">
                        </el-table-column>
                        <el-table-column
                        prop="department"
                        label="部门"
                        width="120">
                       
                        </el-table-column>
                        <el-table-column
                        prop="maskName"
                        label="联系人"
                        width="120">
                        </el-table-column>
                        <el-table-column
                        prop="phoneNumber"
                        label="联系电话"
                        show-overflow-tooltip>
                        </el-table-column>
                         <el-table-column
                        prop="address"
                        label="邮编"
                        show-overflow-tooltip>
                        </el-table-column>
                         <el-table-column
                        prop="place"
                        label="地址"
                        show-overflow-tooltip>
                        </el-table-column>
                         <el-table-column
                        prop="address"
                        label="备注"
                        show-overflow-tooltip>
                        </el-table-column>
                         <el-table-column
                        prop="gmtCreated"
                        label="编辑时间"
                        show-overflow-tooltip>
                        </el-table-column>
                       <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button
                            size="mini"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                            <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                        </el-table-column>
                    </el-table>
                </template>
    </div>
</template>
<script>
export default {
    name:'',
    data(){
        return{
             activeName: 'second',
              options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
        input:''
        }
    },
      methods: {
      handleClick(tab, event) {
        console.log(tab.label);

      }
    }
}
</script>
<style scoped>
.box{
    width: 98%;
    margin: 0 auto;
 
    height: auto;
}
.search{
    display: flex;
    width: 50%;
    margin-top: 20px;
 
}
.dateChange{
    display: flex;
    line-height: 40px;
}
.buttonList{
    margin-top: 20px;
    margin-bottom: 20px;
    padding-top: 10px;
    border-top: solid 1px #ccc
}
</style>

