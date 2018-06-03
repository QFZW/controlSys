
/*
 * @Author: Vincent
 * @Date: 2018-05-13 12:37:54
 * @Last Modified by: Vincent
 * @Last Modified time: 2018-06-03 17:01:47
 */

<template>
  <div class='map-wrap'>
    <el-amap vid='amapDemo' :center="center" :plugin='plugin'>
    </el-amap>
    <!-- 搜索栏 -->
    <div class='search-wrap'>
      <el-autocomplete
        style='width:320px'
        v-model='state4'
        :fetch-suggestions='querySearchAsync'
        placeholder='请输入内容'
        @select='handleSelect'
      ></el-autocomplete>
      <el-button type='primary' icon='el-icon-search'></el-button>
    </div>
    <!-- 工具栏 -->
    <div class="lamp-tool">
        <a class="tool-li tool-li-1" href="javascript:;" @click="lampGroupDialog = true"><span>灯具<br />分组</span></a>
        <a class="tool-li tool-li-2" href="javascript:;" @click="taskSwitchDialog = true"><span>任务<br />开关</span></a>
        <a class="tool-li tool-li-3" href="javascript:;" @click="sceneDialog = true"><span>场景</span></a>
        <a class="tool-li tool-li-4" href="javascript:;" @click="ctrlBoxDialog = true"><span>控制</span></a>
        <a class="tool-li tool-li-5" href="javascript:;" @click="lampsDialog = true"><span>灯具</span></a>
    </div>
    <!-- 场景  ***start -->
    <el-dialog title="场景" :visible.sync="sceneDialog" width="540px" center>
      <div class="scene-dialog">
        <div class="operate">
          <el-button type="text" icon='el-icon-plus' @click="addSceneDialog = true">添加场景</el-button>
        </div>
        <el-table ref="multipleTable"
          :data="sceneList"
          tooltip-effect="dark"
          style="width: 100%"
          header-row-class-name="datalist-header"
          @selection-change="handleSelectionChange">>
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="name" label="场景名称"></el-table-column>
          <el-table-column prop="desc" label="场景描述"></el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="editModelLoop(scope.$index)"
                  type="text"
                  size="small">
                  编辑
                </el-button>
                <el-button
                  class="danger-text-btn"
                  @click.native.prevent="deleteModelLoop(scope.$index)"
                  type="text"
                  size="small">
                  删除
                </el-button>
              </template>
            </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sceneDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="sceneDialog = false" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加场景 -->
    <el-dialog title="添加场景" :visible.sync="addSceneDialog" width="1100px" center>
      <div class="scene-dialog">
        <div class="form-wrap">
          <el-form :model="addScene" :rules="addScenerRules" ref="addScene" label-width="100px">
            <el-form-item label="场景名称" prop="name">
              <el-input v-model="addScene.name" size='small' style="width:360px"></el-input>
            </el-form-item>
            <el-form-item label="场景描述" prop="desc">
              <el-input type="textarea" v-model="addScene.desc" placeholder="请输入" style="width:500px" size='small'></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="item-list">
          <el-row :gutter="20">
            <el-col :span="12">
              <div class="grid-content scene-item">
                <div class="title">灯具分组</div>
                <div class="operate">
                  <el-button type="text" icon='el-icon-plus' @click="selectlampGroupDialog = true">添加灯具分组</el-button>
                </div>
                <el-table ref="multipleTable"
                  :data="sceneList"
                  tooltip-effect="dark"
                  style="width: 100%"
                  height="300"
                  header-row-class-name="datalist-header"
                  @selection-change="handleSelectionChange">>
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column label="行号"></el-table-column>
                  <el-table-column prop="name" label="分组名称"></el-table-column>
                  <el-table-column prop="desc" label="描述"></el-table-column>
                  <el-table-column fixed="right" label="操作" width="120">
                      <template slot-scope="scope">
                        <el-button
                          class="danger-text-btn"
                          @click.native.prevent="deleteModelLoop(scope.$index)"
                          type="text"
                          size="small">
                          删除
                        </el-button>
                      </template>
                    </el-table-column>
                </el-table>
              </div>
            </el-col>
            <el-col :span="12">
              <div class="grid-content scene-item">
                <div class="title">任务开关</div>
                <div class="operate">
                  <el-button type="text" icon='el-icon-plus' @click="selectTaskSwitchDialog = true">添加任务开关</el-button>
                </div>
                <el-table ref="multipleTable"
                  :data="sceneList"
                  tooltip-effect="dark"
                  style="width: 100%"
                  height="300"
                  header-row-class-name="datalist-header"
                  @selection-change="handleSelectionChange">>
                  <el-table-column type="selection" width="55"></el-table-column>
                  <el-table-column label="行号"></el-table-column>
                  <el-table-column prop="name" label="任务名称"></el-table-column>
                  <el-table-column prop="desc" label="描述"></el-table-column>
                  <el-table-column fixed="right" label="操作" width="120">
                      <template slot-scope="scope">
                        <el-button
                          class="danger-text-btn"
                          @click.native.prevent="deleteModelLoop(scope.$index)"
                          type="text"
                          size="small">
                          删除
                        </el-button>
                      </template>
                    </el-table-column>
                </el-table>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addSceneDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="addSceneDialog = false" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 选择灯具分组 -->
    <el-dialog title="选择灯具分组" :visible.sync="selectlampGroupDialog" width="1000px" center>
      <div class="scene-dialog">
        <el-table ref="multipleTable"
          :data="sceneList"
          tooltip-effect="dark"
          style="width: 100%"
          height="340"
          header-row-class-name="datalist-header"
          @selection-change="handleSelectionChange">>
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="name" width="120" label="灯具分组名称"></el-table-column>
          <el-table-column prop="desc" label="分组描述"></el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="selectlampGroupDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="selectlampGroupDialog = false" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 选择任务开关 -->
    <el-dialog title="选择任务开关" :visible.sync="selectTaskSwitchDialog" width="1000px" center>
      <div class="scene-dialog">
        <el-table ref="multipleTable"
          :data="sceneList"
          tooltip-effect="dark"
          style="width: 100%"
          height="340"
          header-row-class-name="datalist-header"
          @selection-change="handleSelectionChange">>
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="name" width="120" label="任务开关名称"></el-table-column>
          <el-table-column prop="desc" label="描述"></el-table-column>
          <el-table-column label="开始时间"></el-table-column>
          <el-table-column label="结束时间"></el-table-column>
          <el-table-column label="启用光照计"></el-table-column>
          <el-table-column label="经度"></el-table-column>
          <el-table-column label="纬度"></el-table-column>
          <el-table-column label="调光控制"></el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="selectTaskSwitchDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="selectTaskSwitchDialog = false" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 场景  ***end-->
    <!-- 任务开关  ***start -->
    <el-dialog title="任务开关" :visible.sync="taskSwitchDialog" width="1000px" center>
      <div class="scene-dialog">
        <div class="operate">
          <el-button type="text" icon='el-icon-plus' @click="addTaskSwitchDialog = true">添加任务开关</el-button>
        </div>
        <el-table ref="multipleTable"
          :data="sceneList"
          tooltip-effect="dark"
          style="width: 100%"
          height="340px"
          header-row-class-name="datalist-header"
          @selection-change="handleSelectionChange">>
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="name" label="任务开关名称" width="140"></el-table-column>
          <el-table-column prop="desc" label="描述"></el-table-column>
          <el-table-column label="开始时间"></el-table-column>
          <el-table-column label="结束时间"></el-table-column>
          <el-table-column label="启用光照计"></el-table-column>
          <el-table-column label="经度"></el-table-column>
          <el-table-column label="纬度"></el-table-column>
          <el-table-column label="调光控制"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="editModelLoop(scope.$index)"
                  type="text"
                  size="small">
                  编辑
                </el-button>
                <el-button
                  class="danger-text-btn"
                  @click.native.prevent="deleteModelLoop(scope.$index)"
                  type="text"
                  size="small">
                  删除
                </el-button>
              </template>
            </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="taskSwitchDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="taskSwitchDialog = false" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加任务开关 -->
    <el-dialog title="添加任务开关" :visible.sync="addTaskSwitchDialog" width="700px" center>
      <div class="taskswitch-dialog">
        <div class="form-wrap">
          <el-form :model="addScene" ref="addScene" label-width="110px">
            <el-form-item label="任务开关名称" prop="name">
              <el-input v-model="addScene.name" size='small' required style="width:360px"></el-input>
            </el-form-item>
            <el-form-item label="描述" prop="desc">
              <el-input type="textarea" v-model="addScene.desc" placeholder="请输入" style="width:500px" size='small'></el-input>
            </el-form-item>
            <el-form-item label="定时设置">
              <el-date-picker
                v-model="value7"
                type="datetimerange"
                align="center"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                :default-time="['00:00:00', '00:00:00']">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="">
              <el-checkbox v-model="checked">是否启用光照计</el-checkbox>
            </el-form-item>
            <el-form-item label="">
              <el-checkbox v-model="checked">是否启用经纬度</el-checkbox>
              <span>经度</span>
              <el-input size='small' style="width:80px"></el-input>
              <span>纬度</span>
              <el-input size='small' style="width:80px"></el-input>
            </el-form-item>
            <el-form-item label="">
              <span>调光控制</span>
              <el-slider
                show-input
                show-input-controls='false'>
              </el-slider>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addTaskSwitchDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="addTaskSwitchDialog = false" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 任务开关  ***end -->
    <!-- 控制柜  ***start -->
    <el-dialog title="控制柜" :visible.sync="ctrlBoxDialog" width="1100px" center>
      <div class="ctrlbox-dialog">
        <el-table ref="multipleTable"
          :data="sceneList"
          tooltip-effect="dark"
          style="width: 100%"
          height="340"
          header-row-class-name="datalist-header"
          @selection-change="handleSelectionChange">>
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="同步"></el-table-column>
          <el-table-column label="控制柜"></el-table-column>
          <el-table-column label="UID"></el-table-column>
          <el-table-column label="状态"></el-table-column>
          <el-table-column label="KM11"></el-table-column>
          <el-table-column label="时间"></el-table-column>
          <el-table-column label="KM12"></el-table-column>
          <el-table-column label="时间"></el-table-column>
          <el-table-column label="KM13"></el-table-column>
          <el-table-column label="时间"></el-table-column>
        </el-table>
        <div class="pagelist-block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage3"
            :page-size="100"
            layout="total, prev, pager, next, jumper"
            :total="1000">
          </el-pagination>
        </div>
      </div>
      <div slot="footer" class="dialog-footer"></div>
    </el-dialog>
    <!-- 灯具 ***start -->
    <el-dialog title="灯具" :visible.sync="lampsDialog" width="1100px" center>
      <div class="ctrlbox-dialog">
        <el-table ref="multipleTable"
          :data="sceneList"
          tooltip-effect="dark"
          style="width: 100%"
          height="340"
          header-row-class-name="datalist-header"
          @selection-change="handleSelectionChange">>
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="同步"></el-table-column>
          <el-table-column label="灯具"></el-table-column>
          <el-table-column label="UID"></el-table-column>
          <el-table-column label="状态"></el-table-column>
          <el-table-column label="KM11"></el-table-column>
          <el-table-column label="时间"></el-table-column>
          <el-table-column label="KM12"></el-table-column>
          <el-table-column label="时间"></el-table-column>
          <el-table-column label="KM13"></el-table-column>
          <el-table-column label="时间"></el-table-column>
        </el-table>
        <div class="pagelist-block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage3"
            :page-size="100"
            layout="total, prev, pager, next, jumper"
            :total="1000">
          </el-pagination>
        </div>
      </div>
      <div slot="footer" class="dialog-footer"></div>
    </el-dialog>
    <!-- 灯具分组 ***start -->
    <el-dialog title="灯具分组" :visible.sync="lampGroupDialog" width="1000px" center>
      <div class="scene-dialog">
        <div class="operate">
          <el-button type="text" icon='el-icon-plus' @click="addLampGroupDialog = true">新建灯具分组</el-button>
        </div>
        <el-table ref="multipleTable"
          :data="sceneList"
          tooltip-effect="dark"
          style="width: 100%"
          height="340px"
          header-row-class-name="datalist-header"
          @selection-change="handleSelectionChange">>
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="name" label="灯具分组名称" width="140"></el-table-column>
          <el-table-column prop="desc" label="描述"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="editModelLoop(scope.$index)"
                  type="text"
                  size="small">
                  编辑
                </el-button>
                <el-button
                  class="danger-text-btn"
                  @click.native.prevent="deleteModelLoop(scope.$index)"
                  type="text"
                  size="small">
                  删除
                </el-button>
              </template>
            </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="lampGroupDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="lampGroupDialog = false" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 新建灯具分组 -->
    <el-dialog title="新建灯具分组" :visible.sync="addLampGroupDialog" width="1100px" center>
      <div class="lamp-group-dialog">
      <el-tabs v-model="activemode" @tab-click="handleClick">
        <el-tab-pane label="地图模式" name="mapMode">
          <div class="map-mode">
            <el-amap vid='amapDemo2' :center="center" :plugin='plugins'></el-amap>
          </div>
        </el-tab-pane>
        <el-tab-pane label="控制柜模式" name="ctrlBoxMode">
          <div class="transfer-wrap clearfix">
            <div class="select-wrap">
              <div class="title">可添加灯具列表</div>
              <el-table
                ref="multipleTable"
                :data="cabinetList"
                tooltip-effect="dark"
                style="width: 100%"
                header-row-class-name="datalist-header"
                @selection-change="handleSelectionChangeBox">
                <el-table-column type="selection" width="30"></el-table-column>
                <el-table-column label="UID" width="100"></el-table-column>
                <el-table-column label="灯杆" width="100"></el-table-column>
                <el-table-column label="灯头号"></el-table-column>
                <el-table-column label="经度" width="60"></el-table-column>
                <el-table-column label="纬度" width="60"></el-table-column>
              </el-table>
            </div>
            <div class="controll-wrap">
              <div class="controll-btn">
                <el-button size='small' icon="el-icon-arrow-left"></el-button>
              </div>
              <div class="controll-btn">
                <el-button size='small' icon="el-icon-arrow-right"></el-button>
              </div>
            </div>
            <div class="select-wrap">
              <div class="title">已添加灯具列表</div>
              <el-table
                ref="multipleTable"
                :data="cabinetList"
                tooltip-effect="dark"
                style="width: 100%"
                header-row-class-name="datalist-header"
                @selection-change="handleSelectionChangeBox">
                <el-table-column type="selection" width="30"></el-table-column>
                <el-table-column label="UID" width="100"></el-table-column>
                <el-table-column label="灯杆" width="100"></el-table-column>
                <el-table-column label="灯头号"></el-table-column>
                <el-table-column label="经度" width="60"></el-table-column>
                <el-table-column label="纬度" width="60"></el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="组组模式" name="groupMode">
           <div class="transfer-wrap clearfix">
            <div class="select-wrap">
              <div class="title">可添加灯具分组</div>
              <el-table
                ref="multipleTable"
                :data="cabinetList"
                tooltip-effect="dark"
                style="width: 100%"
                header-row-class-name="datalist-header"
                @selection-change="handleSelectionChangeBox">
                <el-table-column type="selection" width="30"></el-table-column>
                <el-table-column label="灯具分组名称" width="140"></el-table-column>
                <el-table-column label="描述"></el-table-column>
              </el-table>
            </div>
            <div class="controll-wrap">
              <div class="controll-btn">
                <el-button size='small' icon="el-icon-arrow-left"></el-button>
              </div>
              <div class="controll-btn">
                <el-button size='small' icon="el-icon-arrow-right"></el-button>
              </div>
            </div>
            <div class="select-wrap">
              <div class="title">已添加灯具分组</div>
              <el-table
                ref="multipleTable"
                :data="cabinetList"
                tooltip-effect="dark"
                style="width: 100%"
                header-row-class-name="datalist-header"
                @selection-change="handleSelectionChangeBox">
                <el-table-column type="selection" width="30"></el-table-column>
                <el-table-column label="灯具分组名称" width="140"></el-table-column>
                <el-table-column label="描述"></el-table-column>
              </el-table>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addLampGroupDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="addLampGroupDialog = false" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import VueAMap from 'vue-amap'
Vue.use(VueAMap)

// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德的key
  key: '40e435061433109f36b48cf4f2399859',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4'
})

export default {
  name: 'GisIndex',
  data () {
    return {
      center: [108.59996, 32.197646],
      plugin: [{
        pName: 'MapType',
        defaultType: 0,
        events: {
          init (instance) {
            console.log(instance)
          }
        }
      },
      {
        pName: 'ToolBar',
        position: 'RB',
        liteStyle: true,
        locate: true,
        events: {
          init (instance) {
            console.log(instance)
          }
        }
      }],
      plugin2: [{
        pName: 'MapType',
        defaultType: 0,
        events: {
          init (instance) {
            console.log(instance)
          }
        }
      }],
      sceneList: [{
        id: 1,
        name: 'aqw',
        desc: 'wqlwlqwl'
      }],
      addScene: {},
      restaurants: [],
      state4: '',
      timeout: null,
      sceneDialog: false,
      addSceneDialog: false,
      selectlampGroupDialog: false,
      selectTaskSwitchDialog: false,
      taskSwitchDialog: false,
      addTaskSwitchDialog: false,
      ctrlBoxDialog: false,
      lampsDialog: false,
      lampGroupDialog: false,
      addLampGroupDialog: false,
      activemode: 'mapMode',
      addScenerRules: {
        name: [
          { required: true, message: '请输入场景名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入场景描述', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loadAll () {
      return [
        { 'value': '路灯1', 'address': '长宁区新渔路144号' },
        { 'value': '控制柜12', 'address': '上海市长宁区淞虹路661号' },
        { 'value': '控制柜13', 'address': '上海市普陀区真北路988号创邑金沙谷6号楼113' },
        { 'value': '控制柜14', 'address': '天山西路438号' },
        { 'value': '控制柜15', 'address': '上海市长宁区金钟路968号1幢18号楼一层商铺18-101' },
        { 'value': '控制柜16', 'address': '上海市长宁区金钟路633号' },
        { 'value': '控制柜17', 'address': '上海市嘉定区曹安公路曹安路1685号' }
      ]
    },
    querySearchAsync (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },
    createStateFilter (queryString) {
      return (state) => {
        return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    handleSelect (item) {
      console.log(item)
    }
  },
  mounted () {
    this.restaurants = this.loadAll()
  }
}
</script>

<style lang='scss' scoped>
.map-wrap{
  position: absolute;
  top: 76px;
  right: 0;
  left: 200px;
  bottom: 0;
}
.search-wrap{
  position: absolute;
  top: 20px;
  left: 20px;
}
.lamp-tool{
  position: absolute;
  top: 80px;
  left: 20px;
  width: 60px;
  // border: 1px red solid;
  .tool-li{
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    height: 60px;
    width: 60px;
    border-radius: 5px;
    text-align: center;
    box-sizing: border-box;
    color: #333333;
    font-size: 16px;
    span{
      flex: 1;
    }
    &-1{
      background-color: rgba($color: #39DCBA, $alpha: .6);
      border: 2px #39DCBA solid;
    }
    &-2{
      background-color: rgba($color: #FF5372, $alpha: .6);
      border: 2px #FF5372 solid;
    }
    &-3{
      background-color: rgba($color: #00CEFF, $alpha: .6);
      border: 2px #00CEFF solid;
    }
    &-4{
      background-color: rgba($color: #B19EFF, $alpha: .6);
      border: 2px #B19EFF solid;
    }
    &-5{
      background-color: rgba($color: #FFCF7C, $alpha: .6);
      border: 2px #FFCF7C solid;
    }
  }
}
.scene-dialog{
  .form-wrap{
    border-bottom: 1px #dedede solid;
  }
  .item-list{
    margin-top: 20px;
    padding: 20px;
    border: 1px #dedede solid;
  }
  .scene-item{
    .title{
      font-weight: bold;
      padding-bottom: 10px;
      font-size: 16px;
      color: #101010;
    }
  }
}
.taskswitch-dialog{
  margin-bottom: 120px;
}
.lamp-group-dialog{
  height: 540px;
  .map-mode{
    height: 100%;
    width: 100%;
  }
  .el-tab-pane{
    height: 470px;
  }
}
.transfer-wrap{
  .select-wrap{
    padding:20px;
    float: left;
    width: 490px;
    height: 470px;
    border:1px solid #dedede;
    box-sizing:border-box;
  }
  .title{
    padding-bottom: 10px;
  }
  .controll-wrap{
    padding-top: 150px;
    float: left;
    width: 80px;
    height: 470px;
    text-align: center;
    .controll-btn {
      margin: 20px 0;
    }
  }
}
</style>
