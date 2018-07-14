
/*
 * @Author: Vincent
 * @Date: 2018-05-13 12:37:54
 * @Last Modified by: Vincent
 * @Last Modified time: 2018-07-02 00:55:19
 */

<template>
  <div class='map-wrap'>
    <el-amap vid='amapDemo' :zoom="zoom" :zooms="zooms" :center="center" :plugin='plugin'>
      <!-- 控制柜 -->
      <el-amap-marker v-for="(marker, index) in EleBoxMarks" :key="index + 'a'" :template='marker.template' :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable" :offset='[-20, -8]' :vid="index"></el-amap-marker>
      <!-- 灯具 -->
      <el-amap-marker v-for="(marker, index) in LightMarks" :key="index + 'b'" :template='marker.template' :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable" :offset='[-8, -10]' :vid="index" title="点击调节灯具信息"></el-amap-marker>
      <!-- 连线 -->
      <!-- <el-amap-polyline :editable="false"  v-for="(marker, index) in LightLine" :key="index"  :path="marker.path"></el-amap-polyline> -->
      <el-amap-polyline v-for="(marker, index) in LightLine" :key="index + 'c'"  :editable="marker.editable"  :path="marker.path" :events="marker.events" :strokeColor="marker.state === 1 ? '#17BEB0' : '#FF2851'"></el-amap-polyline>
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
    <!-- <el-tooltip :value='true' placement="bottom-start" effect="light">
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
    </el-tooltip> -->
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
    <div class="shortcut-key" @click="shortcutKeyDialog = true"><i class="iconfont">&#xe609;</i>快捷键</div>
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
              <el-time-picker
                is-range
                v-model="value5"
                range-separator="至"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                placeholder="选择时间范围">
              </el-time-picker>
              <!-- <el-date-picker
                v-model="value7"
                type="datetimerange"
                align="center"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                :default-time="['00:00:00', '00:00:00']">
              </el-date-picker> -->
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
          <el-table-column prop='latitude' label="纬度"></el-table-column>
          <el-table-column prop='longitude' label="经度"></el-table-column>
          <el-table-column prop='powerRating' label="额定功率"></el-table-column>
          <el-table-column prop='ratedElectricty' label="额定电流"></el-table-column>
          <el-table-column prop='ratedVoltage' label="额定电压"></el-table-column>
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
            :page-size="5"
            layout="total, prev, pager, next, jumper"
            :total="10">
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
        <el-table
          v-loading="loading.loadLampGroup"
          :data="lightGroupList"
          tooltip-effect="dark"
          style="width: 100%"
          height="340px"
          header-row-class-name="datalist-header">
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
        <div class="form-wrap">
          <el-form :model="addScene" ref="addScene" label-width="120px">
            <el-form-item label="灯具分组名称" required  prop="name">
              <el-input size='small' style="width:360px"></el-input>
            </el-form-item>
            <el-form-item label="描述" required prop="desc">
              <el-input type="textarea" placeholder="请输入" style="width:500px" size='small'></el-input>
            </el-form-item>
          </el-form>
        </div>
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
    <!-- 快捷键 -->
    <el-dialog title="设置快捷键" :visible.sync="shortcutKeyDialog" width="700px" center>
      <div class="shortcut-wrap">
        <el-row>
          <el-col :span="12">
            <div class="grid-content">
              <div class="select-wrap">
                <span>快捷键1</span>
                <el-select v-model="valuesation" placeholder="选择场景">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="select-wrap">
                <span>快捷键2</span>
                <el-select v-model="valuesation" placeholder="选择场景">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="select-wrap">
                <span>快捷键3</span>
                <el-select v-model="valuesation" placeholder="选择场景">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="select-wrap">
                <span>快捷键4</span>
                <el-select v-model="valuesation" placeholder="选择场景">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="grid-content">
              <div class="select-wrap">
                <span>快捷键1</span>
                <el-select v-model="valuesation" placeholder="选择场景">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="select-wrap">
                <span>快捷键2</span>
                <el-select v-model="valuesation" placeholder="选择场景">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="select-wrap">
                <span>快捷键3</span>
                <el-select v-model="valuesation" placeholder="选择场景">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="select-wrap">
                <span>快捷键4</span>
                <el-select v-model="valuesation" placeholder="选择场景">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="shortcutKeyDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="shortcutKeyDialog = false" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 灯具信息调节 -->
    <el-dialog title="灯具信息调节" :visible.sync="loghtInfoDialog" width="700px" center>
      <div class="lightinfo-wrap">
        <el-row>
          <el-col :span="12">
            <div class="info">
              灯具坐标：<span>经度：{{ this.lightData.longitude }}</span><span>纬度：{{ this.lightData.latitude }}</span>
            </div>
          </el-col>
          <el-col :span="12">光衰：<span>{{ this.lightData.decay }}年 </span></el-col>
        </el-row>
        <el-row style="margin: 20px 0">
          <el-col :span="12">
            <div class="light-wrap">
              <i class="iconfont">&#xe62b;</i>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="select-btn" v-for="(item, key, index) in brightness" v-bind:key="index">
              <div class="btn-wrap" v-bind:key="index">
                <el-button style="width:90px" :class="{active:item===selectitem}" size="medium" @click="active(item)">{{item}}</el-button>
              </div>
            </div>
          </el-col>
          <el-col :span="5">
            <!-- dqw -->
          </el-col>
        </el-row>
        <el-table
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          height="120px"
          header-row-class-name="datalist-header">
          <el-table-column prop="lamphead" label="灯具型号" width="140"></el-table-column>
          <el-table-column prop="propertySerialNumber" label="资产编号"></el-table-column>
          <el-table-column prop="lamppost" label="灯杆"></el-table-column>
          <el-table-column prop="manufacture" label="生产日期"></el-table-column>
          <el-table-column prop="useDate" label="使用日期" width="100"></el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="loghtInfoDialog = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleUpdateLightInof" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
import VueAMap from 'vue-amap'
import { listElebox, listLighting, listLightGroup, listSwitchTask, listScene } from '@/api/GisService/lamp'
import { getLighting, addOrUpdateGIS } from '@/api/RoadLighting/deploy'
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

export default {
  name: 'GisIndex',
  data () {
    return {
      // 控制柜图标示例
      EleBoxMarks: [],
      LightMarks: [],
      LightLine: '',
      value5: '',
      valuesation: '',
      options: [],
      checked: false,
      EleboxList: null,
      lightList: null,
      lightGroupList: null,
      plugins: '',
      selectitem: '80%',
      brightness: ['半开', '80%', '70%', '40%', '30%', '10%'],
      lightData: {
        decay: 20, // -- 光衰
        gmtCreated: 1527662927000,
        gmtUpdated: 1527662927000,
        longitude: '113.920400',
        latitude: '22.533800',
        id: 1,
        lamphead: 'LL650', // -- 灯头号
        lamppost: '5米长灯标', // -- 灯杆
        manufacture: 1526453346000, // -- 生产日期
        maxUseTime: 15, // -- 最大使用时间（年）
        mem: '测试灯具1', // -- 备注
        propertySerialNumber: 'P0092929', // -- 资产编号
        uid: '0010101010', // -- 灯具uid
        useDate: 1527662952000, // -- 使用日期
        brightness: '70%'
      },
      mockList: [{
        longitude: '113.920400',
        latitude: '22.533800',
        state: 1
      },
      {
        longitude: '113.940400',
        latitude: '22.522600',
        state: 1
      },
      {
        longitude: '113.940400',
        latitude: '22.511200',
        state: 0
      }], // mockdataA
      cabinetList: [],
      center: [113.939800, 32.197646],
      zoom: 14,
      zooms: [14, 18],
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
        noIpLocate: true,
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
      projectId: '',
      addScene: {},
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
      shortcutKeyDialog: false,
      loghtInfoDialog: false,
      activemode: 'mapMode',
      loading: {
        loadLampGroup: false
      },
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
  computed: {
    tableData: function () {
      return [
        {
          lamphead: this.lightData.lamphead,
          propertySerialNumber: this.lightData.propertySerialNumber,
          lamppost: this.lightData.lamppost,
          manufacture: this.lightData.manufacture,
          useDate: this.lightData.useDate
        }
      ]
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
    active (item) {
      this.selectitem = item
    },
    handleUpdateLightInof () {
      this.loghtInfoDialog = false
      let params = {
        id: this.lightData.id,
        longitude: this.lightData.longitude,
        latitude: this.lightData.latitude,
        mem: this.lightData.mem,
        type: 0
      }
      addOrUpdateGIS(params).then(res => {
        console.log(res)
        if (res.error === 0) {
          console.log('更新灯具信息成功')
        }
      }).catch((res) => {
        console.log(res)
      })
    },
    currentPage3 () {
      console.log('同步处理方法')
    },
    handleNodeClick () {
      console.log('handleNodeClick')
    },
    handleSizeChange () {
      console.log('处理尺寸变更')
    },
    handleCurrentChange () {
      console.log('处理尺寸变更')
    },
    handleClick () {
      console.log('处理点击事件')
    },
    handleSelectionChangeBox () {
      console.log('handleSelectionChangeBox')
    },
    querySearchAsync (queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 3000 * Math.random())
    },

    // 排除错误事件
    handleSelectionChange () {
      console.log('handlechange')
    },
    switchTaskList () {
      console.log('sdsds')
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
      that.loading.loadLampGroup = true
      that.lampGroupDialog = true
      listLightGroup(1, 10).then(res => {
        that.lightGroupList = res.data
        that.loading.loadLampGroup = false
      }).catch(() => {})
    },
    getLightList (projectId) {
      // 获取项目下全部灯具
      let that = this
      listLighting(projectId).then(res => {
        that.lightList = res.data
        that.lampsDialog = true
      }).catch(() => {})
    },
    getEleboxList (projectId) {
      // 获取项目下全部控制柜
      let that = this
      listElebox(projectId).then(res => {
        that.EleboxList = res.data
        that.ctrlBoxDialog = true
      }).catch(() => {})
    },
    getSwitchTaskList () {
      // 获取任务开关
      let that = this
      listSwitchTask(1, 10).then(res => {
        that.switchTaskList = res.data
        that.taskSwitchDialog = true
      }).catch(() => {})
    },
    getSceneList () {
      // 按搜索条件获取分页的场景模式数据
      let that = this
      listScene(1, 10).then(res => {
        that.sceneList = res.data
        that.sceneDialog = true
      }).catch(() => {})
    },
    editLightInfo (litghtid) {
      this.loghtInfoDialog = true
      // 获取灯具具体信息
      // let that = this
      console.log(getLighting)
      getLighting()
      // getLighting(litghtid).then(res => {
      //   console.log(res)
      //   // if (res.data) {
      //   //   that.lightData = res.data // 数据接口正常则使用数据接口数据，不正常显示默认数据
      //   // }
      //   // that.taskSwitchDialog = true
      // }).catch(() => {})
    },
    generalEleboxMarks (elebox) {
      // 生成控制柜地图标
      let that = this
      console.log('生成点')
      let eleboxMarks = []
      elebox.forEach(element => {
        let _data = {
          position: [element.longitude, element.latitude],
          events: {
            click: () => {
              that.$router.push('/gisservice/lamp')
            }
          },
          visible: true,
          draggable: false,
          template: `
            <div class="elebox-mark">
              <i class="iconfont">&#xe602;</i>
            </div>
          `
        }
        eleboxMarks.push(_data)
      })
      that.EleBoxMarks = eleboxMarks
    },
    generalLightMarks (lightList) {
      // 生成灯具地图标
      // console.log(lightList,22222)
      lightList = [{
        longitude: '113.920400',
        latitude: '22.533800',
        state: 1
      },
      {
        longitude: '113.940400',
        latitude: '22.522600',
        state: 1
      },
      {
        longitude: '113.940400',
        latitude: '22.511200',
        state: 1
      }]
      // 生成控制柜地图标
      let that = this
      let lightMarks = []
      lightList.forEach(element => {
        let _data = {
          position: [element.longitude, element.latitude],
          events: {
            click: () => {
              that.editLightInfo(element.id)
            }
          },
          visible: true,
          draggable: false,
          template: `
            <div class="light-mark">
              <i class="iconfont ${element.state === 1 ? '' : 'not-work'}">&#xe60b;</i>
            </div>
          `
        }
        lightMarks.push(_data)
      })
      that.LightMarks = lightMarks
    },
    generalLightLine (devices) {
      // 连线
      devices = [{
        path: [[this.mockList[0].longitude, this.mockList[0].latitude], [this.mockList[1].longitude, this.mockList[1].latitude]],
        events: {
          click (e) {
            console.log(e, '点击了连线')
          }
        },
        editable: false,
        state: 1
      },
      {
        path: [[this.mockList[1].longitude, this.mockList[1].latitude], [this.mockList[2].longitude, this.mockList[2].latitude]],
        events: {
          click (e) {
            console.log(e, '点击了连线')
          }
        },
        editable: false,
        state: 1
      },
      {
        path: [[113.940400, 22.512570], [113.940400, 22.511870]],
        events: {
          click (e) {
            console.log(e, '点击了连线')
          }
        },
        editable: false,
        state: 1
      },
      {
        path: [[113.940500, 22.513170], [113.939800, 22.512570]],
        events: {
          click (e) {
            console.log(e, '点击了连线')
          }
        },
        editable: false,
        state: 0
      }]
      // 生成控制柜地图标
      let that = this
      that.LightLine = devices
      console.log(that.LightLine)
    },
    setCenter (longitude, latitude) {
      // 经度 纬度
      this.center = [longitude, latitude]
    }
  },
  created () {
    let that = this
    let projectQuery = that.$router.history.current.query;
    that.projectId = projectQuery.projectId;
    // console.log(that.$router.history.current.query.projectId,222222222)
    // 初始化中心点坐标

    // 获取所有项目下面的控制柜
    listElebox(that.projectId).then(res => {
      console.log(res, '111111122222222')
      // console.log(22222);
      let eleList = res.data ? res.data : []
      that.EleboxList = res.data ? res.data : that.EleboxList
      // 获取项目下面所有灯具
      listLighting(projectId).then(res => {
        that.lightList = res.data
        that.generalLightMarks(that.lightList)
        that.lampsDialog = true
      }).catch(() => {})
      // that.setCenter(res.data[0].longitude, res.data[0].latitude)
      that.setCenter(113.939800, 22.511870) // 假数据假数据
      that.generalEleboxMarks(that.EleboxList)
      that.generalLightLine([])
    }).catch(() => {})
    that.getLightList(that.projectId)
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
.active {
  background: #5789fa;
  color: white;
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
  box-shadow: 2px 3px 4px 0 rgba($color: #CCCACA, $alpha: .5);
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
.shortcut-key{
  position: absolute;
  top: 15px;
  right: 230px;
  padding: 10px 15px;
  text-align: center;
  background: #ffffff;
  box-shadow: 2px 3px 4px 0 rgba($color: #CCCACA, $alpha: .5);
  font-size: 14px;
  cursor: pointer;
  .iconfont{
    position: relative;
    top: 1px;
    color: #999999;
    font-size: 20px;
    margin-right: 10px;
    vertical-align: middle;
  }
}
.shortcut-wrap{
  padding: 20px 20px;
  .grid-content{
    padding-left: 25px;
  }
  .select-wrap{
    span{
      margin-right: 5px;
      color: #333333;
    }
    padding-bottom: 10px;
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
  height: 580px;
  .el-form-item{
    margin-bottom: 15px;
  }
  .map-mode{
    height: 100%;
    width: 100%;
  }
  .el-tab-pane{
    height: 400px;
  }
}
.transfer-wrap{
  .select-wrap{
    padding:20px;
    float: left;
    width: 490px;
    height: 400px;
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
    height: 400px;
    text-align: center;
    .controll-btn {
      margin: 20px 0;
    }
  }
}
.lightinfo-wrap{
  .info{
    color: #FF947D;
    span{
      margin-right: 10px;
      color: #999999;
    }
  }
  .light-wrap{
    height: 290px;
    width: 320px;
    position: relative;
    border: 1px #EBEBEB solid;
    .iconfont{
      position: absolute;
      top: 130px;
      left: 70px;
      font-size: 180px;
      color: #F8E71C;
    }
  }
  .select-btn{
    margin-bottom: 0px;
  }
  .btn-wrap{
    padding-bottom: 15px;
  }
}
</style>
<style lang="scss">
.elebox-mark{
  .iconfont{
    color: #5789FA;
    font-size: 36px;
  }
}
.light-mark{
  .iconfont{
    color: #ffeb00;
    font-size: 16px;
    box-shadow: 0 0 4px 0 rgba(0,0,0,.4);
    border-radius: 50%;
    &.not-work{
      color: #DADAD6;
    }
  }
}
</style>
