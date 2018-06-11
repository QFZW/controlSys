
/*
 * @Author: Vincent
 * @Date: 2018-05-13 12:37:54
 * @Last Modified by: Vincent
 * @Last Modified time: 2018-06-11 09:53:08
 */

<template>
  <div class='map-wrap'>
    <el-amap vid='amapDemo' :center="center" :plugin='plugin'>
    </el-amap>
    <!-- 搜索栏 -->
    <!-- <div class='search-wrap'>
      <el-autocomplete
        style='width:320px'
        v-model='state4'
        :fetch-suggestions='querySearchAsync'
        placeholder='请输入内容'
        @select='handleSelect'
      ></el-autocomplete>
      <el-button type='primary' icon='el-icon-search'></el-button>
    </div> -->
    <el-tooltip :value='true' placement="bottom-start" effect="light">
      <div slot="content">
        <div class="select-device">
          <el-tabs type="card">
            <el-tab-pane label="控制柜">
              <el-tree
                :data="dataEleBox"
                :props="defaultProps"
                accordion
                @node-click="handleNodeClick">
              </el-tree>
            </el-tab-pane>
            <el-tab-pane label="区域">
              <el-tree
                :data="dataArea"
                :props="defaultProps"
                accordion
                @node-click="handleNodeClick">
              </el-tree>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="located-tool">
        <i class="iconfont">&#xe662;</i>
      </div>
    </el-tooltip>
    <!-- 工具栏 -->
    <div class="lamp-tool">
        <a class="tool-li tool-li-1" href="javascript:;" @click="getLightGroupList()"><span>灯具<br />分组</span></a>
        <a class="tool-li tool-li-2" href="javascript:;" @click="getSwitchTaskList()"><span>任务<br />开关</span></a>
        <a class="tool-li tool-li-3" href="javascript:;" @click="getSceneList()"><span>场景</span></a>
        <a class="tool-li tool-li-4" href="javascript:;" @click="getEleboxList()"><span>控制</span></a>
        <a class="tool-li tool-li-5" href="javascript:;" @click="getLightList()"><span>灯具</span></a>
    </div>
    <!-- 警告信息 -->
    <div class="sys-warnning" @click="sysWarnningDialog = true"><i class="iconfont">&#xe623;</i>警报信息</div>
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
          :data="switchTaskList"
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
          :data="EleboxList"
          tooltip-effect="dark"
          style="width: 100%"
          height="340"
          header-row-class-name="datalist-header"
          @selection-change="handleSelectionChange">>
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop='uid' label="UID"></el-table-column>
          <el-table-column prop='codeNumber' label="编码"></el-table-column>
          <el-table-column prop='mainSwitch' label="主进线开关"></el-table-column>
          <el-table-column prop='latitude' label="经度"></el-table-column>
          <el-table-column prop='longitude' label="纬度"></el-table-column>
          <el-table-column prop='powerRating' label="额定功率"></el-table-column>
          <el-table-column prop='ratedElectricty' label="额定电流"></el-table-column>
          <el-table-column prop='ratedVoltage' label="额定电压"></el-table-column>
          <!-- <el-table-column label="创建时间">
            <template slot-scope="scope" >
              {{scope.row.gmtCreated | timeFormat}}
            </template>
          </el-table-column>
          <el-table-column label="更新时间">
            <template slot-scope="scope">
              {{scope.row.gmtUpdated | timeFormat}}
            </template>
          </el-table-column> -->
          <el-table-column label="使用时间">
            <template slot-scope="scope">
              {{scope.row.useDate | timeFormat}}
            </template>
          </el-table-column>
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
          :data="lightList"
          tooltip-effect="dark"
          style="width: 100%"
          height="340"
          header-row-class-name="datalist-header"
          @selection-change="handleSelectionChange">>
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop='uid' label="UID"></el-table-column>
          <el-table-column prop='propertySerialNumber' label="资产编号"></el-table-column>
          <el-table-column prop='lamphead' label="灯头"></el-table-column>
          <el-table-column prop='lamppost' label="灯杆"></el-table-column>
          <el-table-column prop='decay' label="光衰"></el-table-column>
          <el-table-column prop='manufacture' label="生产日期"></el-table-column>
          <el-table-column label="使用时间">
            <template slot-scope="scope">
              {{scope.row.useDate | timeFormat}}
            </template>
          </el-table-column>
          <el-table-column prop='mem' label="备注"></el-table-column>
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
          :data="lightGroupList"
          tooltip-effect="dark"
          style="width: 100%"
          height="340px"
          header-row-class-name="datalist-header"
          @selection-change="handleSelectionChange">>
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="cGroupName" label="灯具分组名称" width="140"></el-table-column>
          <el-table-column prop="mem" label="描述"></el-table-column>
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
    <!-- 警告信息 -->
    <el-dialog title="警报信息" :visible.sync="sysWarnningDialog" width="780px" center>
      <div class="system-warning clearfix">
        <div class="info-classify">
          <h3>警报类型</h3>
          <el-tree
            :data="dataWarnClassify"
            :props="defaultProps"
            accordion
            @node-click="handleNodeClick">
          </el-tree>
        </div>
        <div class="info-list">
          <h3>警报列表</h3>
          <el-table ref="multipleTable"
          :data="EleboxList"
          tooltip-effect="dark"
          style="width: 100%"
          height="325"
          header-row-class-name="datalist-header"
          @selection-change="handleSelectionChange">>
          <el-table-column prop='uid' label="行号"></el-table-column>
          <el-table-column prop='codeNumber' label="电表警告"></el-table-column>
          <el-table-column prop='mainSwitch' label="集中器警告"></el-table-column>
          <el-table-column prop='latitude' label="开关警报"></el-table-column>
          <el-table-column prop='longitude' label="防盗警报"></el-table-column>
        </el-table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="sysWarnningDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="sysWarnningDialog = false" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import VueAMap from 'vue-amap'
import { listElebox, listLighting, listLightGroup, listSwitchTask, listScene } from '@/api/GisService/lamp'
import '../../../utils/filter.js'
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

// lazyAMapApiLoaderInstance.load().then(() => {
//   // your code ...
//   this.map = new AMap.Map('amapContainer', {
//     center: new AMap.LngLat(121.59996, 31.197646)
//   })
// })

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
      sysWarnningDialog: false,
      activemode: 'mapMode',
      addScenerRules: {
        name: [
          { required: true, message: '请输入场景名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '请输入场景描述', trigger: 'blur' }
        ]
      },
      // 控制柜
      dataEleBox: [{
        label: '控制柜1',
        children: [{
          label: '灯具1'
        },
        {
          label: '灯具1'
        }]
      },
      {
        label: '控制柜1',
        children: [{
          label: '灯具1'
        },
        {
          label: '灯具1'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      dataWarnClassify: [{
        label: '全部'
      },
      {
        label: '控制柜警报',
        children: [{
          label: '意外亮灯'
        },
        {
          label: '灭灯'
        }]
      },
      {
        label: '常规灯具警报',
        children: [{
          label: '灯具熄灭'
        },
        {
          label: '电源故障'
        }]
      },
      {
        label: '防盗警报',
        children: [{
          label: '指线缆被盗'
        },
        {
          label: '自定义报警'
        }]
      },
      {
        label: '太阳能警报',
        children: [{
          label: '节点丢失'
        },
        {
          label: '电池过放'
        }]
      },
      {
        label: '单灯控制器警报',
        children: [{
          label: '信号强弱报警'
        },
        {
          label: '离线报警'
        }]
      }]
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
    },
    getLightGroupList () {
      // 按条件获取分页的灯具分组数据
      let that = this
      listLightGroup(1, 10).then(res => {
        that.lightGroupList = res.data
        that.lampGroupDialog = true
      }).catch(error => {
        console.log(error)
      })
    },
    getLightList () {
      // 获取项目下全部灯具
      let that = this
      that.lampsDialog = true
      listLighting().then(res => {
        that.lightList = res.data
        console.log(res.data)
      }).catch(error => {
        console.log(error)
      })
    },
    getEleboxList () {
      // 获取项目下全部控制柜
      let that = this
      listElebox().then(res => {
        that.EleboxList = res.data
        that.ctrlBoxDialog = true
        console.log(res.data)
      }).catch(error => {
        console.log(error)
      })
    },
    getSwitchTaskList () {
      // 获取项目下全部控制柜
      let that = this
      listSwitchTask(1, 10).then(res => {
        that.switchTaskList = res.data
        that.taskSwitchDialog = true
        console.log(res.data)
      }).catch(error => {
        console.log(error)
      })
    },
    getSceneList () {
      // 按搜索条件获取分页的场景模式数据
      let that = this
      listScene(1, 10).then(res => {
        that.sceneList = res.data
        that.sceneDialog = true
        console.log(res.data)
      }).catch(error => {
        console.log(error)
      })
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
.located-tool{
  position: absolute;
  top: 20px;
  left: 100px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  width: 40px;
  cursor: pointer;
  .iconfont{
    color: #5789FA;
    font-size: 30px;
  }
}
.select-device{
  width: 184px;
  height: 320px;
  background: #ffffff;
}
.sys-warnning{
  position: absolute;
  top: 15px;
  right: 100px;
  padding: 10px 15px;
  text-align: center;
  background: #FAE58C;
  font-size: 14px;
  cursor: pointer;
  .iconfont{
    position: relative;
    top: -1px;
    color: #ff9b00;
    font-size: 20px;
    margin-right: 10px;
    vertical-align: middle;
  }
}
.system-warning{
  height: 400px;
  .info-classify{
    width: 210px;
    height: 390px;
    float: left;
    border: 1px #dedede solid;
    box-sizing: border-box;
    padding: 20px;
  }
  .info-list{
    float: left;
    width: 530px;
    height: 390px;
    border: 1px #dedede solid;
    box-sizing: border-box;
    padding: 15px;
  }
  h3{
    color: #101010;
    font-size: 14px;
    margin-bottom: 10px;
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
