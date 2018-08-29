<template>
    <div>
        <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                 
                prop="date"
                label="编号"
                >
                </el-table-column>
                <el-table-column
                prop="name"
                label="分类"
                >
                </el-table-column>
                <el-table-column
                prop="province"
                label="工作流"
                >
                </el-table-column>
                <el-table-column
                prop="city"
                label="状态"
               >
                </el-table-column>
                <el-table-column
                prop="address"
                label="优先级"
                >
                </el-table-column>
                <el-table-column
                prop="zip"
                label="上一节点"
                >
                </el-table-column>
                <el-table-column
                prop="zip"
                label="当前部门"
                >
                </el-table-column>
                <el-table-column
                prop="zip"
                label="创建时间"
                >
                </el-table-column>
                <el-table-column
                prop="zip"
                label="创建人"
                >
                </el-table-column>
                <el-table-column
                label="操作"
                >
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small" >认领</el-button>
                    <el-button type="text" size="small">下载附件</el-button>
                </template>
                </el-table-column>
            </el-table>
      
         <div class="block">
            <span class="demonstration"></span>
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



          <el-dialog title="认领" :visible.sync="dialogTableVisible">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="认领人">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
            </el-form>
             <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>
<script>
export default {
    name:'allwork',
    data(){
        return{
             tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }],
          dialogTableVisible : false,
        form:{
            name:''
        },
         currentPage4: 4
        }
    },
    methods:{
         handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
       handleClick(row) {
        console.log(row);
        this.dialogTableVisible = true
      },
    }
}
</script>
