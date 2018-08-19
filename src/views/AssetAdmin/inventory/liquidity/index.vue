<template>
    <div class="box">
            <div class="topNav">
                 <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="供应商" name="first"></el-tab-pane>
                    <el-tab-pane label="资产分类" name="second"></el-tab-pane>
                    <el-tab-pane label="入库原因" name="third"></el-tab-pane>
                    <el-tab-pane label="出库原因" name="fourth"></el-tab-pane>
                </el-tabs>
            </div>
            <div class="seache">
                
                <div><div>111</div><div><el-input v-model="input" placeholder="请输入内容"></el-input></div></div>
                <div><el-button type="primary">查询</el-button></div>
            </div>
            <div class="button_list">
                <div><el-button type="primary" icon="el-icon-plus" @click="formlistdatahide=true">增加</el-button></div>
                <div><el-button plain icon="el-icon-delete">批量删除</el-button></div>
            </div>

            <div class="table">
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
                    prop="name"
                    label="区域"
                    >
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="一级分类">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="二级分类">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="资产名称">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="资产类目编号">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="资产数量">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="故障时间">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="创建时间">
                    </el-table-column>
                    <el-table-column
                    prop="address"
                    label="创建人">
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
            </div>
             <div class="block">
              
                <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
                </el-pagination>
            </div>


            <el-dialog title="新增" :visible.sync="formlistdatahide">
            <el-form ref="form" :model="formlistdata" label-width="80px">
                <el-form-item label="区域">
                    <el-input v-model=" formlistdata.id"></el-input>
                </el-form-item>
            </el-form>
             <el-form ref="form" :model="formlistdata" label-width="80px">
                <el-form-item label="一级分类">
                    <el-input v-model=" formlistdata.id"></el-input>
                </el-form-item>
            </el-form>
             <el-form ref="form" :model="formlistdata" label-width="80px">
                <el-form-item label="二级分类">
                    <el-input v-model=" formlistdata.id"></el-input>
                </el-form-item>
            </el-form>
             <el-form ref="form" :model="formlistdata" label-width="80px">
                <el-form-item label="资产名称">
                    <el-input v-model=" formlistdata.id"></el-input>
                </el-form-item>
            </el-form>
             <el-form ref="form" :model="formlistdata" label-width="80px">
                <el-form-item label="资产类目编号">
                    <el-input v-model=" formlistdata.id"></el-input>
                </el-form-item>
            </el-form>
             <el-form ref="form" :model="formlistdata" label-width="80px">
                <el-form-item label="资产数量">
                    <el-input v-model=" formlistdata.id"></el-input>
                </el-form-item>
            </el-form>
            <el-form ref="form" :model="formlistdata" label-width="80px">
                <el-form-item label="故障时间">
                    <el-input v-model=" formlistdata.id"></el-input>
                </el-form-item>
            </el-form>
            <el-form ref="form" :model="formlistdata" label-width="80px">
                <el-form-item label="创建时间">
                    <el-input v-model=" formlistdata.id"></el-input>
                </el-form-item>
            </el-form>
             <el-form ref="form" :model="formlistdata" label-width="80px">
                <el-form-item label="创建人">
                    <el-input v-model=" formlistdata.id"></el-input>
                </el-form-item>
            </el-form>
             <div slot="footer" class="dialog-footer">
                <el-button @click="formlistdatahide = false">取 消</el-button>
                <el-button type="primary" @click="formlistdatahide = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
export default {
    name:'',
    data(){
        return{
              activeName: 'second',
              currentPage4:4,
               input: '',
               tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: [],
        formlistdatahide:false,
        formlistdata:{
            id:''
        }
        }

    },
     methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
       handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

       handleEdit(index, row) {
        console.log(index, row);
        this.formlistdatahide=true
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
    }
}
</script>



<style scoped>
    .box{
        width: 98%;
        margin: 0 auto;
    }
    .topNav{
        margin-top: 20px;
    }
    .table{
        margin-top: 20px;
    }
    .seache,.button_list{
        margin-top: 20px;
        display: flex;
        justify-content: space-between
    }
    .seache >div:nth-child(1) {
        display: flex;
        line-height: 40px;
        width: 300px;
        justify-content: space-around
    }
    .button_list{
        justify-content:space-around;
        margin-top: 20px;
        width: 280px;

    }
    .block{
        background: #fff;
        margin-top: 20px;
    }
</style>
