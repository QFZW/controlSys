<template>
  <div class="system-container">
    <el-tabs v-model="activeName" @tab-click="tabHandleClick">
      <el-tab-pane label="控制柜模式" name="cabinet">
        <div class="system-top clearfix">
          <div class="item-block f-l">
            <span class="title">控制柜</span><el-input  placeholder="请输入"></el-input>
          </div>
          <div class="item-block f-l">
            <span class="title">名称</span><el-input  placeholder="请输入"></el-input>
          </div>
          <div class="btn-block f-r">
            <el-button type="primary">查询</el-button>
          </div>
        </div>
        <div class="system-center">
          <div class="operation-bar">
            <el-button icon='el-icon-plus' @click="addCabinet()" type="primary">增加</el-button>
            <el-upload
              class="upload-demo"
              :show-file-list = 'false'
              action = "http://47.105.38.215:8080/nnlightctl/api/roadlighting/importElebox"
              :on-success="uploadElBoxSuccess"
              :on-error="uploadElBoxError"
              name="batchEleboxFile">
              <el-button icon='el-icon-upload2'>导入</el-button>
            </el-upload>
            <el-button icon='el-icon-download' @click="downloadEleBox">导出</el-button>
            <el-dropdown trigger="click" placement='bottom-start' @command="handleElboxEdit">
              <el-button icon='el-icon-edit'>批量设置</el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1">设置区域</el-dropdown-item>
                <el-dropdown-item command="3">设置地图图标</el-dropdown-item>
                <!-- <el-dropdown-item command="4">设置启用/停用</el-dropdown-item> -->
              </el-dropdown-menu>
            </el-dropdown>
            <el-button icon='el-icon-delete' @click="deleteEleboxRow(2)">批量删除</el-button>
          </div>
          <div class="data-list">
            <el-table
              ref="multipleTable"
              :data="eleboxList"
              tooltip-effect="dark"
              style="width: 100%"
              header-row-class-name="datalist-header"
              @selection-change="handleSelectionChangeBox">
              <el-table-column fixed type="selection" width="40"></el-table-column>
              <el-table-column fixed prop="codeNumber" label="区域" width="100"></el-table-column>
              <el-table-column label="安装日期" width="100">
                <template slot-scope="scope">
                  {{scope.row.useDate|timeFormat}}
                </template>
              </el-table-column>
              <el-table-column prop="ratedVoltage" label="额定电压" width="120"></el-table-column>
              <el-table-column prop="ratedElectricty" label="额定电流" width="120"></el-table-column>
              <el-table-column prop="powerRating" label="额定功率" width="120"></el-table-column>
              <el-table-column prop="mainSwitch" label="主控制开关" width="120"></el-table-column>
              <el-table-column prop="spd" label="spd" width="120"></el-table-column>
              <el-table-column prop="latitude" label="纬度"></el-table-column>
              <el-table-column prop="longitude" label="经度"></el-table-column>
              <el-table-column fixed="right" label="操作" width="240">
                <!-- 240 -->
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="manageLamp(scope.row.id)"
                    type="text"
                    size="small">
                    管理灯具
                  </el-button>
                  <el-button
                    type="text"
                    @click.native.prevent="loopSplitFun(scope.row.id)"
                    size="small">
                    回路拆分
                  </el-button>
                  <el-button
                    @click.native.prevent="editCabinet(scope.$index)"
                    type="text"
                    size="small">
                    编辑
                  </el-button>
                  <el-button
                    class="danger-text-btn"
                    @click.native.prevent="deleteEleboxRow(1, scope.$index)"
                    type="text"
                    size="small">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagelist-block">
            <el-pagination
              @size-change="handleSizeChangeBox"
              background
              @current-change="handleCurrentChangeBox"
              :current-page="boxCurrentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="boxPageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="allEleboxTotal">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="灯具模式" name="lighting">
        <div class="system-top clearfix">
          <div class="item-block f-l">
            <span class="title">灯杆</span><el-input  placeholder="请输入"></el-input>
          </div>
          <div class="item-block f-l">
            <span class="title">灯头号</span><el-input  placeholder="请输入"></el-input>
          </div>
          <div class="btn-block f-r">
            <el-button type="primary">查询</el-button>
          </div>
        </div>
        <div class="system-center">
          <div class="operation-bar">
            <el-button icon='el-icon-plus' @click="addLamp()" type="primary">增加</el-button>
            <el-button icon='el-icon-plus' @click="addLampAll()" type="primary">批量增加</el-button>
            <el-upload
              class="upload-demo"
              :show-file-list = 'false'
              action = "http://47.105.38.215:8080/nnlightctl/api/roadlighting/importLighting"
              :on-success="uploadLightSuccess"
              :on-error="uploadLightError"
              name="batchImportLightingFile">
              <el-button icon='el-icon-upload2'>导入</el-button>
            </el-upload>
            <el-button icon='el-icon-download' @click="downloadLight">导出</el-button>
            <el-dropdown trigger="click" placement='bottom-start' @command="handleLightEdit">
              <el-button icon='el-icon-edit'>批量设置</el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="1">设置区域</el-dropdown-item>
                <el-dropdown-item command="2">设置所属控制柜</el-dropdown-item>
                <el-dropdown-item command="3">设置地图图标</el-dropdown-item>
                <!-- <el-dropdown-item command="4">设置启用/停用</el-dropdown-item> -->
              </el-dropdown-menu>
            </el-dropdown>
            <el-button icon='el-icon-delete' @click="deleteLightRow(2)">批量删除</el-button>
          </div>
          <div class="data-list">
            <el-table
              ref="lightListTable"
              :data="lightingList"
              tooltip-effect="dark"
              style="width: 100%"
              header-row-class-name="datalist-header"
              @selection-change="handleSelectionChangeLight">
              <el-table-column fixed type="selection" width="40"></el-table-column>
              <el-table-column fixed prop="uid" label="UID" width="100"></el-table-column>
              <el-table-column label="使用日期" width="140">
                <template slot-scope="scope">
                  {{scope.row.gmtCreated|timeFormat}}
                </template>
              </el-table-column>
              <el-table-column prop="lamphead" label="灯头号" width="100"></el-table-column>
              <el-table-column prop="lamppost" label="灯杆" width="100"></el-table-column>
              <el-table-column prop="decay" label="光衰" width="100"></el-table-column>
              <el-table-column prop="maxUseTime" label="最大使用时间（年）" width="160"></el-table-column>
              <el-table-column prop="mem" label="备注"></el-table-column>
              <!-- <el-table-column prop="provinceName" label="灯具GIS信息" width="140"></el-table-column>
              <el-table-column prop="countryName" label="资产编号" width="100"></el-table-column> -->
              <el-table-column fixed="right" label="操作" width="120">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="editLightRow(scope.$index)"
                    type="text"
                    size="small">
                    编辑
                  </el-button>
                  <el-button
                    class="danger-text-btn"
                    @click.native.prevent="deleteLightRow(1, scope.$index)"
                    type="text"
                    size="small">
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="pagelist-block">
            <el-pagination
              @size-change="handleSizeChangeLight"
              background
              @current-change="handleCurrentChangeLight"
              :current-page="lightCurrentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="lightPageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="allLightTotal">
            </el-pagination>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 新增控制柜 -->
    <el-dialog title="新增控制柜" width="590px"
      :visible.sync="cabinetDialog" :close-on-click-modal='false' :close-on-press-escape='false' center
      :before-close="handleCloseAddNewElbox">
      <el-form ref="elboxCountForm" label-width="100px">
        <el-form-item label="控制柜数量">
          <el-input v-model="ElboxCount" style="width:70px"></el-input>
        </el-form-item>
      </el-form>
      <div class="cabinet-list">
        <div class="operate-block clearfix">
          <a class="f-l" @click="addDevice()"><i class="iconfont ">&#xe648;</i>添加设备</a>
          <!-- <a class="f-l"><i class="iconfont">&#xe632;</i>删除</a> -->
        </div>
        <el-table
          ref="multipleTable"
          :data="deviceList"
          tooltip-effect="dark"
          style="width: 100%"
          header-row-class-name="datalist-header">
          <el-table-column fixed prop="uid" label="唯一编码" width="100"></el-table-column>
          <el-table-column prop="modelName" label="名称" width="140"></el-table-column>
          <el-table-column prop="powerRating" label="额定功率" width="80"></el-table-column>
          <el-table-column prop="electricRating" label="额定电流" width="80"></el-table-column>
          <el-table-column prop="voltageRating" label="额定电压" width="80"></el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="editModel(scope.$index)"
                type="text"
                size="small">
                编辑
              </el-button>
              <el-button
                class="danger-text-btn"
                @click.native.prevent="deleteModel(scope.$index)"
                type="text"
                size="small">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cabinetDialog = false">取 消</el-button>
        <el-button type="primary" @click="onNewElboxSubmit()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加设备 -->
    <el-dialog title="添加设备" width="1200px"
      :visible.sync="deviceAddDialog"  center>
      <el-form ref="form" label-width="100px">
        <el-form-item label="设备数量">
          <el-input  v-model="EleboxModelCount" style="width:70px" :disabled="disabled"></el-input>
        </el-form-item>
      </el-form>
      <div class="add-device clearfix">
        <div class="device-info">
          <el-form label-width="150px" ref="addNewEleboxModelForm" :model="newEleboxModel" :rules="addNewEleboxModel" size='small'>
            <el-form-item label="名称" required prop="modelName">
              <el-input v-model="newEleboxModel.modelName"></el-input>
            </el-form-item>
            <el-form-item label="类型" required>
              <el-input  value="模块" disabled></el-input>
              <!-- <el-select style="width: 100%">
                <el-option
                  v-for="(item , index) in cityList"
                  :key="index"
                  :label="item.cityName"
                  :value="item.id">
                </el-option>
              </el-select> -->
            </el-form-item>
            <el-form-item label="唯一编码" required prop="uid">
              <el-input  v-model="newEleboxModel.uid"></el-input>
            </el-form-item>
            <el-form-item label="额定功率" required prop="powerRating">
              <el-input v-model="newEleboxModel.powerRating"></el-input>
            </el-form-item>
            <el-form-item label="额定电流" required prop="electricRating">
              <el-input v-model="newEleboxModel.electricRating"></el-input>
            </el-form-item>
            <el-form-item label="额定电压" required prop="voltageRating">
              <el-input v-model="newEleboxModel.voltageRating"></el-input>
            </el-form-item>
            <el-form-item label="空气开关选型" required prop="airSwitchType">
              <el-input v-model="newEleboxModel.airSwitchType"></el-input>
            </el-form-item>
            <el-form-item label="接触器选型" required prop="contactorType">
              <el-input v-model="newEleboxModel.contactorType"></el-input>
            </el-form-item>
            <el-form-item label="回路数量" required prop="loopCount">
              <el-input v-model="newEleboxModel.loopCount"></el-input>
            </el-form-item>
            <el-form-item label="所属相序">
              <el-input v-model="newEleboxModel.ac"></el-input>
            </el-form-item>
            <el-form-item label="回路继电器额定电流" required prop="loopElectricity">
              <el-input v-model="newEleboxModel.loopElectricity"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="loop-info">
          <div class="operate-block clearfix">
            <a class="f-l" @click="addLoop()"><i class="iconfont ">&#xe648;</i>添加回路</a>
            <!-- <a class="f-l"><i class="iconfont">&#xe632;</i>删除</a> -->
          </div>
          <el-table
            ref="multipleTable"
            :data="modelLoopList"
            tooltip-effect="dark"
            style="width: 100%"
            header-row-class-name="datalist-header">
            <el-table-column fixed prop="loopCode" label="编号" width="120"></el-table-column>
            <el-table-column prop="voltage" label="电压" width="100"></el-table-column>
            <el-table-column prop="electricity" label="电流" width="100"></el-table-column>
            <el-table-column prop="lightCount" label="灯具数量" width="100"></el-table-column>
            <!-- <el-table-column prop="state" label="状态" width="100"></el-table-column> -->
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
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="deviceAddDialog = false">取 消</el-button>
        <el-button @click="goRules('addNewEleboxModelForm')" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加回路 -->
    <el-dialog title="添加回路" width="560px"
      :visible.sync="addLoopDialog" :close-on-click-modal='false' :close-on-press-escape='false' center
      :before-close="handleCloseAddNewModelLoop">
      <el-form ref="addNewModelLoopForm" label-width="120px" :model="newModelLoop" :rules="addNewModelLoopRules"  size='small'>
        <el-form-item label="回路编号" required prop="loopCode">
          <el-input v-model="newModelLoop.loopCode"></el-input>
        </el-form-item>
        <el-form-item label="回路电压" required prop="voltage">
          <el-input v-model="newModelLoop.voltage"></el-input>
        </el-form-item>
        <el-form-item label="回路电流" required prop="electricity">
          <el-input v-model="newModelLoop.electricity"></el-input>
        </el-form-item>
        <el-form-item label="回路灯具数量" required prop="lightCount">
          <el-input v-model="newModelLoop.lightCount"></el-input>
        </el-form-item>
        <!-- <el-form-item label="回路状态" required prop="state">
          <el-input v-model="newModelLoop.state"></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addLoopDialog = false">取 消</el-button>
        <el-button @click="goRules('addNewModelLoopForm')" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 批量增加灯具 -->
    <el-dialog title="批量增加灯具" width="630px"
      :visible.sync="addMoreLampDialog" :close-on-click-modal='false' :close-on-press-escape='false' center
      :before-close="handleCloseAddMoreNewLight">
      <div class="uid-dgh-item clearfix">
        <div class="item-block f-l" style="width:220px">
          <span class="title">灯具UID</span><el-input style="width:120px" v-model="MoreLampObj.uid" placeholder="请输入"></el-input>
        </div>
        <div class="item-block f-l">
          <span class="title">数量</span><el-input v-model="MoreLampObj.uidNum"  placeholder="请输入"></el-input>
        </div>
        <div class="item-block f-l" style="width:160px">
          <span class="title">每次递增</span><el-input v-model="MoreLampObj.num"  placeholder="请输入"></el-input>
        </div>
      </div>
      <!-- <div class="uid-dgh-item">
        <div class="item-block f-l">
          <span class="title">灯杆号</span><el-input  placeholder="请输入"></el-input>
        </div>
        <div class="item-block f-l">
          <span class="title">批量数量</span><el-input  placeholder="请输入"></el-input>
        </div>
        <div class="item-block f-l">
          <span class="title">每次递增</span><el-input  placeholder="请输入"></el-input>
        </div>
      </div> -->
      <el-form ref="addNewMoreLightForm" class="lamp-form" :model="newMoreLight" :rules="addNewLightRules" label-width="140px" size='small'>
        <el-form-item label="生产日期" required prop="manufacture">
          <el-date-picker
            v-model="newMoreLight.manufacture "
            type="date"
            class="input-wrap"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="安装日期" required prop="useDate">
          <el-date-picker
            v-model="newMoreLight.useDate "
            type="date"
            class="input-wrap"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="灯杆" required prop="lamppost">
          <el-input v-model="newMoreLight.lamppost" class="input-wrap"></el-input>
        </el-form-item>
        <el-form-item  label="灯头号" required prop="lamphead">
          <el-input v-model="newMoreLight.lamphead" class="input-wrap"></el-input>
        </el-form-item>
        <el-form-item label="灯具型号" required prop="nnlightctlLightingModelId">
          <el-select class="input-wrap" v-model="newMoreLight.nnlightctlLightingModelId" placeholder="请选择">
            <el-option
              v-for="item in listLightModel"
              :key="item.id"
              :label="item.mem"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="灯具GIS信息" required prop="nnlightctlLightingGisId">
          <el-select class="input-wrap" v-model="newMoreLight.nnlightctlLightingGisId" placeholder="请选择">
            <el-option
              v-for="item in gisAllList"
              :key="item.id"
              :label="item.mem"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="资产编号" required prop="propertySerialNumber">
          <el-input v-model="newMoreLight.propertySerialNumber" class="input-wrap"></el-input>
        </el-form-item>
        <el-form-item label="光衰" required prop="decay">
          <el-input v-model="newMoreLight.decay" class="input-wrap"></el-input>
        </el-form-item>
        <el-form-item label="灯具最大使用时间" required prop="maxUseTime">
          <el-input v-model="newMoreLight.maxUseTime" style="width:120px"></el-input>
          <span>年</span>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            class="input-wrap"
            type="textarea"
            v-model="newMoreLight.mem"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addMoreLampDialog = false">取 消</el-button>
        <el-button @click="goRules('addNewMoreLightForm')" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 增加灯具 -->
    <el-dialog :title="addTypeText[addType]+'灯具'" width="630px"
      :visible.sync="addLampDialog" :close-on-click-modal='false' :close-on-press-escape='false' center
      :before-close="handleCloseAddNewLight">
      <el-form ref="addNewLightForm" class="lamp-form" :model="newLight" :rules="addNewLightRules" label-width="140px" size='small'>
        <el-form-item label="灯具编码" required prop="uid">
          <el-input v-model="newLight.uid" class="input-wrap"></el-input>
        </el-form-item>
        <el-form-item label="生产日期" required prop="manufacture">
          <el-date-picker
            v-model="newLight.manufacture "
            type="date"
            class="input-wrap"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="安装日期" required prop="useDate">
          <el-date-picker
            v-model="newLight.useDate "
            type="date"
            class="input-wrap"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="灯杆" required prop="lamppost">
          <el-input v-model="newLight.lamppost" class="input-wrap"></el-input>
        </el-form-item>
        <el-form-item  label="灯头号" required prop="lamphead">
          <el-input v-model="newLight.lamphead" class="input-wrap"></el-input>
        </el-form-item>
        <el-form-item label="灯具型号" required prop="nnlightctlLightingModelId">
          <el-select class="input-wrap" v-model="newLight.nnlightctlLightingModelId" placeholder="请选择">
            <el-option
              v-for="item in listLightModel"
              :key="item.id"
              :label="item.mem"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="灯具GIS信息" required prop="nnlightctlLightingGisId">
          <el-select class="input-wrap" v-model="newLight.nnlightctlLightingGisId" placeholder="请选择">
            <el-option
              v-for="item in gisAllList"
              :key="item.id"
              :label="item.mem"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="资产编号" required prop="propertySerialNumber">
          <el-input v-model="newLight.propertySerialNumber" class="input-wrap"></el-input>
        </el-form-item>
        <el-form-item label="光衰" required prop="decay">
          <el-input v-model="newLight.decay" class="input-wrap"></el-input>
        </el-form-item>
        <el-form-item label="灯具最大使用时间" required prop="maxUseTime">
          <el-input v-model="newLight.maxUseTime" style="width:120px"></el-input>
          <span>年</span>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            class="input-wrap"
            type="textarea"
            v-model="newLight.mem"
            :autosize="{ minRows: 2, maxRows: 4}"
            placeholder="请输入内容"
          >
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addLampDialog = false">取 消</el-button>
        <el-button @click="goRules('addNewLightForm')" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 管理灯具 -->
    <el-dialog title="管理灯具" width="1200px"
      :visible.sync="manageLanmpDialog" center>
      <div class="manage-lamp">
        <div class="operation-bar">
          <el-button icon='el-icon-plus' @click="insertLamp()" type="primary">批量增加</el-button>
          <!-- <el-button icon='el-icon-edit'>批量编辑</el-button> -->
          <el-button icon='el-icon-delete'  @click="unbindLightBeElebox(2)">批量删除</el-button>
        </div>
        <el-table
          ref="multipleTable"
          :data="lightingList"
          tooltip-effect="dark"
          style="width: 100%"
          header-row-class-name="datalist-header"
          @selection-change="handleSelectionChangeLight">
          <el-table-column fixed type="selection" width="40"></el-table-column>
          <el-table-column fixed prop="uid" label="UID" width="100"></el-table-column>
          <el-table-column label="使用日期" width="140">
            <template slot-scope="scope">
              {{scope.row.gmtCreated|timeFormat}}
            </template>
          </el-table-column>
          <el-table-column prop="lamphead" label="灯头号" width="100"></el-table-column>
          <el-table-column prop="lamppost" label="灯杆" width="100"></el-table-column>
          <el-table-column prop="decay" label="光衰" width="100"></el-table-column>
          <el-table-column prop="maxUseTime" label="最大使用时间（年）" width="160"></el-table-column>
          <el-table-column prop="mem" label="备注"></el-table-column>
          <el-table-column fixed="right" label="操作" width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="editLightRow(scope.$index)"
                type="text"
                size="small">
                编辑
              </el-button>
              <el-button
                class="danger-text-btn"
                @click.native.prevent="unbindLightBeElebox(1, scope.$index)"
                type="text"
                size="small">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagelist-block">
          <el-pagination
            @size-change="handleSizeChangeLight"
            background
            @current-change="handleCurrentChangeLight"
            :current-page="lightCurrentPage"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="lightPageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="allLightTotal">
          </el-pagination>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="manageLanmpDialog = false">取 消</el-button>
        <el-button @click="manageLanmpDialog = false" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增灯具 -->
    <el-dialog title="增加灯具" width="1200px"
      :visible.sync="insertLanmpDialog" center>
      <div class="insert-lamp clearfix">
        <div class="select-wrap">
          <p class="p-title">可选择</p>
          <div class="operate-block clearfix">
            <a class="f-l" @click="addLamp()"><i class="iconfont ">&#xe648;</i>添加</a>
            <a class="f-l" @click="addLampAll()"><i class="iconfont ">&#xe648;</i>批量添加</a>
            <el-upload
              class="upload-demo"
              :show-file-list = 'false'
              action = "http://47.105.38.215:8080/nnlightctl/api/roadlighting/importLighting"
              :on-success="uploadLightSuccess"
              :on-error="uploadLightError"
              name="batchImportLightingFile">
              <a class="f-l" href="javascript:;"><i class="iconfont">&#xe605;</i>导入</a>
            </el-upload>
          </div>
          <el-table
            ref="lightTableOfLoof"
            :data="lightingList"
            tooltip-effect="dark"
            height="300"
            style="width: 100%"
            header-row-class-name="datalist-header"
            @selection-change="handleSelectionChangeLight">
            <el-table-column type="selection" width="30"></el-table-column>
            <el-table-column fixed prop="uid" label="UID" width="60"></el-table-column>
            <el-table-column prop="lamphead" label="灯头号" width="100"></el-table-column>
            <el-table-column prop="lamppost" label="灯杆" width="100"></el-table-column>
            <el-table-column prop="decay" label="光衰" width="100"></el-table-column>
            <el-table-column prop="mem" label="备注"></el-table-column>
            <!-- <el-table-column fixed="right" label="操作" width="60">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="editLightRow(scope.$index)"
                  type="text"
                  size="small">
                  编辑
                </el-button>
                <el-button
                  class="danger-text-btn"
                  @click.native.prevent="deleteLightRow(1, scope.$index)"
                  type="text"
                  size="small">
                  删除
                </el-button>
              </template>
            </el-table-column> -->
          </el-table>
          <!-- <div class="pagelist-block">
            <el-pagination
              @size-change="handleSizeChangeLight"
              background
              @current-change="handleCurrentChangeLight"
              :current-page="lightCurrentPage"
              :page-sizes="[10, 20, 50, 100]"
              :page-size="lightPageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="allLightTotal">
            </el-pagination>
          </div> -->
        </div>
        <div class="controll-wrap">
          <div class="controll-btn" @click="goLeftLoop">
            <el-button size='small' icon="el-icon-arrow-left"></el-button>
          </div>
          <div class="controll-btn" @click="goRightLoop">
            <el-button size='small' icon="el-icon-arrow-right"></el-button>
          </div>
        </div>
        <div class="select-wrap">
          <p class="p-title">已选择</p>
          <p class="p-title-add">添加到：</p>
          <!-- <div class="operate-block clearfix">
            <a class="f-l"><i class="iconfont">&#xe632;</i>删除</a>
          </div> -->
          <el-form :inline="true" class="demo-form-inline">
            <el-form-item required label="模块">
              <el-select v-model="selectEleboxModelId" placeholder="模块">
                <el-option
                  v-for="item in listEleboxModel"
                  :key="item.id"
                  :label="item.modelName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item required label="回路">
              <el-select v-model="selectModelLoopId" placeholder="回路">
                <el-option
                  v-for="item in listModelLoop"
                  :key="item.id"
                  :label="item.loopCode"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-table
            v-if="thisLoopList"
            ref="multipleTable"
            :data="thisLoopList"
            tooltip-effect="dark"
            height="270"
            style="width: 100%"
            header-row-class-name="datalist-header"
            @selection-change="handleSelectionThisLoopList">
            <el-table-column type="selection" width="30"></el-table-column>
            <el-table-column fixed prop="uid" label="UID" width="60"></el-table-column>
            <el-table-column prop="lamphead" label="灯头号" width="100"></el-table-column>
            <el-table-column prop="lamppost" label="灯杆" width="100"></el-table-column>
            <el-table-column prop="decay" label="光衰" width="100"></el-table-column>
            <el-table-column prop="mem" label="备注"></el-table-column>
            <!-- <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button
                  @click.native.prevent="editRow(scope.$index)"
                  type="text"
                  size="small">
                  编辑
                </el-button>
                <el-button
                  class="danger-text-btn"
                  @click.native.prevent="deleteLightOfLoop(1, scope.$index)"
                  type="text"
                  size="small">
                  删除
                </el-button>
              </template>
            </el-table-column> -->
          </el-table>
        </div>
      </div>
      <div class="">
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="insertLanmpDialog = false">取 消</el-button>
        <el-button @click="updateLightBeEleboxBeLoop()" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑控制柜 -->
    <el-dialog title="编辑控制柜" width="617px"
      :visible.sync="editCabinetDialog" :close-on-click-modal='false' :close-on-press-escape='false' center
      :before-close="handleCloseEditCabinetDialog">
      <el-form ref="editCabinetForm" class="lamp-form" :model="newElebox" :rules="editNewEleboxRules" label-width="140px" size='small'>
        <el-form-item label="控制柜uid" required prop="uid">
          <el-input class="input-wrap" v-model="newElebox.uid"></el-input>
        </el-form-item>
        <el-form-item label="控制柜唯一编码" required prop="codeNumber">
          <el-input class="input-wrap" v-model="newElebox.codeNumber"></el-input>
        </el-form-item>
        <el-form-item label="配电柜生产日期" required prop="manufacture">
          <el-date-picker
            v-model="newElebox.manufacture"
            type="date"
            class="input-wrap"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="经度" required prop="longitude">
          <el-input class="input-wrap" v-model="newElebox.longitude"></el-input>
        </el-form-item>
        <el-form-item label="纬度" required prop="latitude">
          <el-input class="input-wrap" v-model="newElebox.latitude"></el-input>
        </el-form-item>
        <el-form-item label="配电柜使用日期" required prop="useDate">
          <el-date-picker
            v-model="newElebox.useDate"
            type="date"
            class="input-wrap"
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="额定电压" required prop="ratedVoltage">
          <el-input class="input-wrap" v-model="newElebox.ratedVoltage"></el-input>
        </el-form-item>
        <el-form-item label="额定电流" required prop="ratedElectricty">
          <el-input class="input-wrap" v-model="newElebox.ratedElectricty"></el-input>
        </el-form-item>
        <el-form-item label="额定功率" required prop="powerRating">
          <el-input class="input-wrap" v-model="newElebox.powerRating"></el-input>
        </el-form-item>
        <el-form-item label="最大使用时间" required prop="maxUseTime">
          <el-input style="width:120px" v-model="newElebox.maxUseTime"></el-input>
          <span>年</span>
        </el-form-item>
        <el-form-item label="spd描述" required prop="spd">
          <el-input class="input-wrap" v-model="newElebox.spd"></el-input>
        </el-form-item>
        <el-form-item label="主进线开关型号" required prop="mainSwitch">
          <el-input class="input-wrap" v-model="newElebox.mainSwitch"></el-input>
        </el-form-item>
        <el-form-item label="所属项目" required prop="nnlightctlProjectId">
          <el-select class="input-wrap" v-model="newElebox.nnlightctlProjectId">
            <el-option
              v-for="item in allProjectList"
              :key="item.id"
              :label="item.mem"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="控制柜GIS" required prop="nnlightctlEleboxGisId">
          <el-select class="input-wrap" v-model="newElebox.nnlightctlEleboxGisId">
            <el-option
              v-for="item in gisAllList"
              :key="item.id"
              :label="item.mem"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="控制柜区域" required prop="nnlightctlRegionId">
          <el-select class="input-wrap" v-model="newElebox.nnlightctlRegionId">
            <el-option
              v-for="item in listArea"
              :key="item.id"
              :label="item.areaName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editCabinetDialog = false">取 消</el-button>
        <el-button @click="goRules('editCabinetForm')" type="primary">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 设置区域 -->
    <el-dialog title="提示"
      :visible.sync="showAeraDialog"
      width="560px"
      center>
      <span>请选择所在区域</span>
      <div class="area-dialog-content">
        <el-input
          placeholder="输入关键字进行搜索"
          v-model="filterText">
        </el-input>
        <el-tree
          class="area-tree"
          :data="data2"
          :props="defaultProps"
          default-expand-all
          :filter-node-method="filterNode"
          ref="tree2">
        </el-tree>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showAeraDialog = false">取 消</el-button>
        <el-button type="primary" @click="showAeraDialog = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 设置控制柜型号 -->
    <el-dialog
      title="设置控制柜型号"
      :visible.sync="showModelDialog"
      width="560px"
      center>
      <div class="model-select-dialog">
        <span>控制柜型号</span>
        <el-select placeholder="请选择" class="select-wrap">
          <!-- <el-option
            v-for="item in cities"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            <span style="float: left">{{ item.label }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
          </el-option> -->
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showModelDialog = false">取 消</el-button>
        <el-button type="primary" @click="showModelDialog = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 设置地图图标 -->
    <el-dialog
      title="设置地图图标"
      :visible.sync="showMapDialog"
      width="560px"
      center>
      <div class="mapicon-dialog">
        <el-upload
          action="https://jsonplaceholder.typicode.com/posts/"
          class="icon-uploader"
          list-type="picture-card"
          :limit="1">
          <i class="el-icon-plus"></i>
        </el-upload>
        <p>支持jpg/png/gif格式</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showMapDialog = false">取 消</el-button>
        <el-button type="primary" @click="showMapDialog = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 设置所属控制柜 -->
    <el-dialog
      title="设置所属控制柜"
      :visible.sync="setLightBoxDialog"
      width="560px"
      center>
      <div class="model-select-dialog">
        <span>所属控制柜</span>
        <el-select placeholder="请选择" class="select-wrap" v-model="selectEleboxId">
          <el-option
            v-for="item in allEleboxList"
            :key="item.id"
            :label="item.codeNumber"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="setLightBoxDialog = false">取 消</el-button>
        <el-button type="primary" @click="setLightBox()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 设置启用/停用 -->
    <el-dialog
      title="设置启停"
      :visible.sync="showUserableDialog"
      width="410px"
      center>
      <div class="useable-select-dialog">
        <el-radio class="select-item" v-model="userable" label="1">启用</el-radio>
        <el-radio class="select-item" v-model="userable" label="2">停用</el-radio>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showUserableDialog = false">取 消</el-button>
        <el-button type="primary" @click="showUserableDialog = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 回路拆分 -->
    <el-dialog
      title="回路拆分"
      :visible.sync="loopSplitDialog"
      width="700px"
      center>
      <div class="modeloop-split">
        <p class="title">请选择模块下的回路进行拆分</p>
        <div class="modeloop-split-center clearfix">
          <div class="split-center-left clearfix">
            <div class="title clearfix">
              <div class="item">模块</div>
              <div class="item" style="float:right">回路</div>
            </div>
            <div class="center-left-item">
              <p  v-for="(item, index) in listEleboxModel" :class="selectEleboxModelId==item.id?'activep':''" @click="selectEleboxModel(item.id)" v-bind:key="index">{{item.modelName}}</p>
            </div>
            <div class="center-left-item" style="float:right">
              <p  v-for="(item, index) in listModelLoop" v-bind:key="index" :class="selectModelLoopId==item.id?'activep':''" @click="selectModelLoop(item.id)">{{item.loopCode}}</p>
            </div>
          </div>
          <div class="split-center-right">
            <p class="title clearfix">
              拆分后的回路
              <a class="add-loop-split" @click="splitAddNewLoop()"><i class="iconfont ">&#xe648;</i>添加回路</a>
            </p>
            <div class="center-right-item">
              <el-table
                ref="multipleTable"
                :data="splitNewLoopList"
                tooltip-effect="dark"
                style="width: 100%"
                header-row-class-name="datalist-header">
                <el-table-column fixed prop="loopCode" label="编号" width="120"></el-table-column>
                <el-table-column prop="voltage" label="电压" width="100"></el-table-column>
                <el-table-column prop="electricity" label="电流" width="100"></el-table-column>
                <el-table-column prop="lightCount" label="灯具数量" width="100"></el-table-column>
                <el-table-column fixed="right" label="操作" width="60">
                    <template slot-scope="scope">
                      <el-button
                        class="danger-text-btn"
                        @click.native.prevent="deleteSplitModelLoop(scope.$index)"
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
      <span slot="footer" class="dialog-footer">
        <el-button @click="loopSplitDialog = false">取 消</el-button>
        <el-button type="primary" @click="subAllSplitLoop()">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加回路 -->
    <el-dialog title="添加回路" width="560px"
      :visible.sync="addSplitLoopDialog" :close-on-click-modal='false' :close-on-press-escape='false' center
      :before-close="handleCloseAddNewModelLoop">
      <el-form ref="addNewModelLoopForm" label-width="120px" :model="newModelLoop" :rules="addNewModelLoopRules"  size='small'>
        <el-form-item label="回路编号" required prop="loopCode">
          <el-input v-model="newModelLoop.loopCode"></el-input>
        </el-form-item>
        <el-form-item label="回路电压" required prop="voltage">
          <el-input v-model="newModelLoop.voltage"></el-input>
        </el-form-item>
        <el-form-item label="回路电流" required prop="electricity">
          <el-input v-model="newModelLoop.electricity"></el-input>
        </el-form-item>
        <el-form-item label="回路灯具数量" required prop="lightCount">
          <el-input v-model="newModelLoop.lightCount"></el-input>
        </el-form-item>
        <!-- <el-form-item label="回路状态" required prop="state">
          <el-input v-model="newModelLoop.state"></el-input>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addSplitLoopDialog = false">取 消</el-button>
        <el-button @click="subSplitLoop()" type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
import qs from 'qs'
import { listGIS, listElebox, deleteElebox, addEleBox, updateEleBox, listEleboxModel, listModelLoop, modelLoopSplite, listLighting, getLighting, addLighting, deleteLighting, addOrUpdateLighting, updateLightBeElebox, listArea, getLoopLight, updateLightBeEleboxBeLoop, unbindLightBeElebox, listProject } from '@/api/RoadLighting/deploy'
import { listLightModel } from '@/api/RoadLighting/EquipmentType'
import '../../../utils/filter.js'
export default {
  name: 'Deploy',
  data () {
    return {
      filterText: '',
      data2: [{
        id: 1,
        label: '杭州',
        children: [{
          id: 4,
          label: 'ABCDG区域'
        },
        {
          id: 4,
          label: '文一西路'
        },
        {
          id: 4,
          label: '西湖'
        },
        {
          id: 4,
          label: '余杭'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      activeName: 'cabinet',
      cabinetList: [{ }],
      newCabinet: {},
      cabinetDialog: false,
      deviceAddDialog: false,
      addLoopDialog: false,
      showAeraDialog: false,
      showModelDialog: false,
      setLightBoxDialog: false,
      showMapDialog: false,
      showUserableDialog: false,
      addLampDialog: false,
      addMoreLampDialog: false,
      editCabinetDialog: false,
      manageLanmpDialog: false,
      insertLanmpDialog: false,
      userable: '1', // 是否启用
      editIndex: null, // 专门用来存放编辑时的Index，每次编辑完之后必须清空
      gisAllList: [], // gis所有列表
      listLightModel: [], // 所有灯具类型列表
      listArea: [], // 区域列表
      eleboxList: [],
      allEleboxList: [], // 所有控制柜列表
      allProjectList: [], // 所有项目
      newElebox: [],
      boxPageNumber: 1,
      boxPageSize: 10,
      boxMultipleSelection: [],
      boxCurrentPage: 1,
      allEleboxTotal: 0,
      ElboxCount: null, // 添加控制柜的控制柜个数
      // 设备
      deviceList: [], // 设备列表
      EleboxModelCount: null, // 设备个数
      disabled: false, // 编辑时无法设置个数
      newEleboxModel: {},
      addNewEleboxModel: {
        modelName: [
          { required: true, message: '填写内容不得为空', trigger: 'blur' }
        ],
        uid: [
          { required: true, message: '选择内容不得为空', trigger: 'blur' }
        ],
        electricRating: [
          { required: true, message: '填写内容不得为空', trigger: 'blur' }
        ],
        powerRating: [
          { required: true, message: '填写内容不得为空', trigger: 'blur' }
        ],
        voltageRating: [
          { required: true, message: '填写内容不得为空', trigger: 'blur' }
        ],
        airSwitchType: [
          { required: true, message: '填写内容不得为空', trigger: 'blur' }
        ],
        contactorType: [
          { required: true, message: '填写内容不得为空', trigger: 'blur' }
        ],
        loopCount: [
          { required: true, message: '填写内容不得为空', trigger: 'blur' }
        ],
        ac: [
          { required: true, message: '填写内容不得为空', trigger: 'blur' }
        ],
        loopElectricity: [
          { required: true, message: '填写内容不得为空', trigger: 'blur' }
        ]
      },
      // 回路
      modelLoopList: [],
      newModelLoop: {},
      lightingList: [],
      lightPageNumber: 1,
      lightPageSize: 10,
      lightMultipleSelection: [],
      lightCurrentPage: 1,
      allLightTotal: 0,
      newLight: {
      },
      newMoreLight: {},
      eleboxId: null,
      notBe: 1,
      editNewEleboxRules: {
        uid: [
          { required: true, message: '填写内容不得为空', trigger: 'blur' }
        ],
        codeNumber: [
          { required: true, message: '填写内容不得为空', trigger: 'blur' }
        ],
        manufacture: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        longitude: [
          { required: true, message: '填写内容不得为空', trigger: 'blur' }
        ],
        latitude: [
          { required: true, message: '填写内容不得为空', trigger: 'blur' }
        ],
        useDate: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        ratedVoltage: [
          { required: true, message: '选择内容不得为空', trigger: 'change' }
        ],
        ratedElectricty: [
          { required: true, message: '填写内容不得为空', trigger: 'blur' }
        ],
        powerRating: [
          { required: true, message: '填写内容不得为空', trigger: 'blur' }
        ],
        maxUseTime: [
          { required: true, message: '填写内容不得为空', trigger: 'blur' }
        ],
        spd: [
          { required: true, message: '填写内容不得为空', trigger: 'blur' }
        ],
        mainSwitch: [
          { required: true, message: '填写内容不得为空', trigger: 'blur' }
        ],
        nnlightctlEleboxGisId: [
          { required: true, message: '选择内容不得为空', trigger: 'blur' }
        ],
        nnlightctlRegionId: [
          { required: true, message: '选择内容不得为空', trigger: 'blur' }
        ],
        nnlightctlProjectId: [
          { required: true, message: '选择内容不得为空', trigger: 'blur' }
        ]
      },
      addNewLightRules: {
        uid: [
          { required: true, message: '填写内容不得为空', trigger: 'blur' }
        ],
        manufacture: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        useDate: [
          { required: true, message: '请选择日期', trigger: 'change' }
        ],
        lamppost: [
          { required: true, message: '填写内容不得为空', trigger: 'blur' }
        ],
        lamphead: [
          { required: true, message: '填写内容不得为空', trigger: 'blur' }
        ],
        nnlightctlLightingModelId: [
          { required: true, message: '选择内容不得为空', trigger: 'change' }
        ],
        nnlightctlLightingGisId: [
          { required: true, message: '选择内容不得为空', trigger: 'blur' }
        ],
        propertySerialNumber: [
          { required: true, message: '填写内容不得为空', trigger: 'blur' }
        ],
        // decay: [
        //   { required: true, message: '填写内容不得为空', trigger: 'blur' }
        // ],
        maxUseTime: [
          { required: true, message: '填写内容不得为空', trigger: 'blur' }
        ]
      },
      addNewModelLoopRules: {
        loopCode: [
          { required: true, message: '填写内容不得为空', trigger: 'blur' }
        ],
        voltage: [
          { required: true, message: '选择内容不得为空', trigger: 'blur' }
        ],
        electricity: [
          { required: true, message: '填写内容不得为空', trigger: 'blur' }
        ],
        lightCount: [
          { required: true, message: '填写内容不得为空', trigger: 'blur' }
        ]
      },
      selectEleboxId: '',
      //  //
      eleboxIdBeifen: null,
      lightPageNumberBeifen: null,
      lightPageSizeBeifen: null,
      // 回路拆分
      loopSplitDialog: false,
      addSplitLoopDialog: false,
      // 管理模块，获取单个控制柜下所有模块
      listEleboxModel: [],
      listModelLoop: [],
      selectEleboxModelId: null,
      selectModelLoopId: null,
      // 存放拆分回路
      splitNewLoopList: [],
      // 灯具批量
      MoreLampObj: {
        uid: null,
        uidNum: 1,
        num: 1
      },
      //  一个备用的id 作为承载某些需要二次使用id的容器
      useIdAfterTime: null,
      // 获取指定回路的全部灯具，存储在当前数组
      thisLoopList: [],
      addTypeText: ['增加', '编辑'],
      addType: 0,
      thisLoopListSelection: []
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree2.filter(val)
    },
    activeName: function (val, oldVal) {
      this.lightMultipleSelection = []
      this.lightPageNumber = 1
      this.lightPageSize = 10
      this.eleboxId = null
      this.notBe = 1
      if (val === 'lighting') {
        this.getListLighting()
      } else {
      }
    },
    insertLanmpDialog: function (val, oldVal) {
      if (val === true) {
        this.eleboxIdBeifen = this.eleboxId
        this.lightPageNumberBeifen = this.lightPageNumber
        this.lightPageSizeBeifen = this.lightPageSize
        this.lightPageNumber = null
        this.lightPageSize = null
        this.eleboxId = null
        this.notBe = 1
        this.getListLighting()
        this.getListEleboxModel(this.eleboxIdBeifen)
      } else {
        this.selectModelLoopId = null
        this.selectEleboxModelId = null
        this.lightPageNumber = this.lightPageNumberBeifen
        this.lightPageSize = this.lightPageSizeBeifen
        this.eleboxId = this.eleboxIdBeifen
        this.notBe = 0
        this.getListLighting()
        this.eleboxIdBeifen = null
        this.lightPageNumberBeifen = null
        this.lightPageSizeBeifen = null
      }
    },
    selectEleboxModelId: function (val, oldVal) {
      if (val) {
        this.selectModelLoopId = null
        this.getListModelLoop(val)
      }
    },
    selectModelLoopId: function (val, oldVal) {
      if (val) {
        this.getLoopLight(val)
      }
    }
  },
  methods: {
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    tabHandleClick (tab, event) {
      console.log(tab, event)
    },
    handleSelectionChangeBox (val) {
      this.boxMultipleSelection = val
    },
    handleSelectionChangeLight (val) {
      this.lightMultipleSelection = val
    },
    handleSelectionThisLoopList (val) {
      console.log(val)
      this.thisLoopListSelection = val
    },
    // 控制柜翻页相关
    handleSizeChangeBox (val) {
      this.boxPageSize = val
      this.getListElebox()
    },
    handleCurrentChangeBox (val) {
      this.boxPageNumber = val
      this.getListElebox()
    },
    // 灯具翻页相关
    handleSizeChangeLight (val) {
      this.lightPageSize = val
      this.getListLighting()
    },
    handleCurrentChangeLight (val) {
      this.lightPageNumber = val
      this.getListLighting()
    },
    addCabinet () {
      this.cabinetDialog = true
    },
    deleteRow () {
    },
    editRow () {
    },
    onSubmit () {
    },
    handleCloseDialog (done) {
      // 弹窗关闭时将数据清空
      this.newUser = {}
      done()
    },
    // 控制柜批量管理
    handleElboxEdit (command) {
      let _array = []
      if (this.boxMultipleSelection.length > 0) {
        this.boxMultipleSelection.forEach(selectedItem => {
          // 取出所有待删除选项id
          _array.push(selectedItem.id)
        })
      } else {
        this.$message({
          message: '请勾选需要处理的数据',
          type: 'warning'
        })
        return false
      }
      switch (command) {
        case '1':
          this.showAeraDialog = true
          break
        case '2':
          this.showModelDialog = true
          break
        case '3':
          this.showMapDialog = true
          break
        case '4':
          this.showUserableDialog = true
          break
        default:
          break
      }
    },
    // 灯具批量编辑
    handleLightEdit (command) {
      let _array = []
      if (this.lightMultipleSelection.length > 0) {
        this.lightMultipleSelection.forEach(selectedItem => {
          // 取出所有待删除选项id
          _array.push(selectedItem.id)
        })
      } else {
        this.$message({
          message: '请勾选需要处理的数据',
          type: 'warning'
        })
        return false
      }
      switch (command) {
        case '1':
          this.showAeraDialog = true
          break
        case '2':
          this.setLightBoxDialog = true
          break
        case '3':
          this.showMapDialog = true
          break
        case '4':
          this.showUserableDialog = true
          break
        default:
          break
      }
    },
    // 添加设备
    addDevice () {
      this.deviceAddDialog = true
    },
    // 添加回路
    addLoop () {
      this.addLoopDialog = true
    },
    // 回路拆分
    loopSplitFun (e) {
      console.log(e)
      this.getListEleboxModel(e)
      this.loopSplitDialog = true
    },
    // 添加灯具
    addLamp () {
      this.addType = 0
      this.addLampDialog = true
    },
    addLampAll () {
      this.addMoreLampDialog = true
    },
    editCabinet (e) {
      this.newElebox = Object.assign({}, this.eleboxList[e])
      this.editCabinetDialog = true
    },
    // 批量添加灯具
    insertLamp () {
      this.insertLanmpDialog = true
    },
    // 管理灯具
    manageLamp (e) {
      this.eleboxId = e
      this.notBe = 0
      this.lightPageNumber = 1
      this.lightPageSize = 10
      this.getListLighting()
      this.manageLanmpDialog = true
    },
    // 获取GIS列表
    getListGIS () {
      let that = this
      listGIS().then(response => {
        that.gisAllList = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    // 获取灯具类型列表
    getListLightModel () {
      let that = this
      listLightModel().then(response => {
        that.listLightModel = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    getListArea () {
      let that = this
      listArea().then(response => {
        that.listArea = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    // 获取所有项目列表
    getAllProjectList () {
      let that = this
      listProject().then((res) => {
        if (res.data) {
          that.allProjectList = res.data
        }
      })
    },
    // 获取控制柜相关信息
    getListElebox () {
      let that = this
      listElebox(that.boxPageNumber, that.boxPageSize).then(response => {
        that.eleboxList = response.data
        console.log('控制柜信息', response.data)
        if (that.eleboxList.length > 0) {
          this.allEleboxTotal = response.total
        } else {
          this.allEleboxTotal = 0
        }
      }).catch(error => {
        console.log(error)
      })
    },
    // 获取控制柜相关信息
    getAllListElebox () {
      let that = this
      listElebox().then(response => {
        that.allEleboxList = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    // 删除控制柜
    deleteEleboxRow (type, e) {
      let _array = []
      if (type === 1) {
        _array.push(this.eleboxList[e].id)
      } else {
        if (this.boxMultipleSelection.length > 0) {
          this.boxMultipleSelection.forEach(selectedItem => {
            // 取出所有待删除选项id
            _array.push(selectedItem.id)
          })
        } else {
          this.$message({
            message: '请勾选需要删除的数据',
            type: 'warning'
          })
          return false
        }
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteElebox(_array).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getListElebox()
          this.getAllListElebox()
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 新建控制柜
    onNewElboxSubmit () {
      if (this.deviceList.length < 1) {
        this.$message({
          type: 'error',
          message: '请添加设备'
        })
        return false
      }
      addEleBox(this.deviceList, this.ElboxCount).then(response => {
        this.$message({
          type: 'success',
          message: '添加成功'
        })
        this.getListElebox()
        this.cabinetDialog = false
        this.$refs['elboxCountForm'].resetFields()
        this.deviceList = []
        this.ElboxCount = null
      }).catch(error => {
        console.log(error)
      })
    },
    // 编辑控制柜
    onEditNewEleboxSubmit () {
      this.newElebox.useDate = new Date(this.newElebox.useDate).toString()
      this.newElebox.manufacture = new Date(this.newElebox.manufacture).toString()
      updateEleBox(this.newElebox).then(response => {
        this.$message({
          type: 'success',
          message: '编辑成功'
        })
        this.getListElebox()
        this.getAllProjectList()
        this.editCabinetDialog = false
        this.$refs['editCabinetForm'].resetFields()
        this.newElebox = {}
      }).catch(error => {
        console.log(error)
      })
    },
    // 新建设备
    onNewEleboxModelSubmit () {
      this.newEleboxModel.modelLoopList = this.modelLoopList
      let _obj = Object.assign({}, this.newEleboxModel)
      if (this.editIndex !== null) {
        this.deviceList.splice(this.editIndex, 1, _obj)
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        this.disabled = false
        this.editIndex = null
      } else {
        if (this.EleboxModelCount > 1) {
          for (let i = 0; i < this.EleboxModelCount; i++) {
            this.deviceList.push(_obj)
          }
        } else {
          this.deviceList.push(_obj)
        }
        this.$message({
          type: 'success',
          message: '添加成功'
        })
      }
      this.deviceAddDialog = false
      this.$refs['addNewEleboxModelForm'].resetFields()
      this.newEleboxModel = {}
      this.modelLoopList = []
      this.EleboxModelCount = null
    },
    editModel (e) {
      this.editIndex = e
      this.newEleboxModel = this.deviceList[e]
      this.modelLoopList = this.newEleboxModel.modelLoopList || []
      this.deviceAddDialog = true
      this.disabled = true
    },
    // 删除设备模块
    deleteModel (e) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deviceList.splice(e, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 新建回路
    onNewModelLoopSubmit () {
      let _obj = Object.assign({}, this.newModelLoop)
      if (this.editIndex !== null) {
        // 如果存在editIndex则是编辑状态
        this.modelLoopList.splice(this.editIndex, 1, _obj)
        this.$message({
          type: 'success',
          message: '修改成功'
        })
        this.editIndex = null
      } else {
        this.modelLoopList.push(_obj)
        this.newEleboxModel.loopCount = this.modelLoopList.length
        this.$message({
          type: 'success',
          message: '添加成功'
        })
      }
      this.addLoopDialog = false
      this.$refs['addNewModelLoopForm'].resetFields()
      this.newModelLoop = {}
    },
    editModelLoop (e) {
      this.editIndex = e
      this.newModelLoop = Object.assign({}, this.modelLoopList[e])
      this.addLoopDialog = true
    },
    deleteModelLoop (e) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.modelLoopList.splice(e, 1)
        this.newEleboxModel.loopCount = this.modelLoopList.length
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    /*
    *  灯具区域
    */
    // 获取灯具列表
    getListLighting () {
      let that = this
      // add by liupeng
      that.eleboxId = null
      that.notBe = null
      listLighting(that.lightPageNumber, that.lightPageSize, that.eleboxId, that.notBe).then(response => {
        that.lightingList = response.data
        if (that.lightingList.length > 0) {
          this.allLightTotal = response.total
        } else {
          this.allLightTotal = 0
        }
      }).catch(error => {
        console.log(error)
      })
    },
    editLightRow (e) {
      this.addType = 1
      this.editIndex = e
      getLighting(this.lightingList[e].id).then(res => {
        this.newLight = res.data[0]
        this.addLampDialog = true
      })
    },
    // 删除灯具
    deleteLightRow (type, e) {
      let _array = []
      if (type === 1) {
        _array.push(this.lightingList[e].id)
      } else {
        if (this.lightMultipleSelection.length > 0) {
          this.lightMultipleSelection.forEach(selectedItem => {
            // 取出所有待删除选项id
            _array.push(selectedItem.id)
          })
        } else {
          this.$message({
            message: '请勾选需要删除的数据',
            type: 'warning'
          })
          return false
        }
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteLighting(_array).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getListLighting()
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 新建、修改灯具
    onNewLightSubmit () {
      console.log(this.newLight.useDate)
      this.newLight.useDate = new Date(this.newLight.useDate).toString()
      this.newLight.manufacture = new Date(this.newLight.manufacture).toString()
      addOrUpdateLighting(this.newLight).then(response => {
        if (this.editIndex) {
          this.$message({
            type: 'success',
            message: '编辑成功'
          })
        } else {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
        }
        this.getListLighting()
        this.addLampDialog = false
        this.$refs['addNewLightForm'].resetFields()
        this.newLight = {}
        this.editIndex = null
      }).catch(error => {
        console.log(error)
      })
    },
    // 批量添加灯具
    onNewMoreLightSubmit () {
      if (this.MoreLampObj.uid === null) {
        this.$message({
          type: 'error',
          message: '请填写Uid'
        })
        return false
      }
      if (this.MoreLampObj.uidNum === null) {
        this.$message({
          type: 'error',
          message: '请填写数量'
        })
        return false
      }
      if (this.MoreLampObj.num === null) {
        this.$message({
          type: 'error',
          message: '请每次递增间隔'
        })
        return false
      }
      let _uid = parseInt(this.MoreLampObj.uid)
      let List = []
      for (var i = 0; i < this.MoreLampObj.uidNum; i++) {
        let obj = Object.assign({}, this.newMoreLight)
        obj.uid = _uid
        obj.uid = obj.uid.toString()
        obj.useDate = new Date(obj.useDate).toString()
        obj.manufacture = new Date(obj.manufacture).toString()
        _uid = _uid + this.MoreLampObj.num
        // obj = JSON.stringify(obj)
        List.push(obj)
      }
      console.log(List)
      addLighting(List).then(response => {
        if (this.editIndex) {
          this.$message({
            type: 'success',
            message: '编辑成功'
          })
        } else {
          this.$message({
            type: 'success',
            message: '添加成功'
          })
        }
        this.getListLighting()
        this.addMoreLampDialog = false
        this.$refs['addNewMoreLightForm'].resetFields()
        this.newMoreLight = {}
      }).catch(error => {
        console.log(error)
      })
    },
    // 设置灯具所属控制柜
    setLightBox () {
      let _array = []
      if (this.lightMultipleSelection.length > 0) {
        this.lightMultipleSelection.forEach(selectedItem => {
          // 取出所有待设置选项id
          _array.push(selectedItem.id)
        })
      } else {
        this.$message({
          message: '请勾选需要设置的数据',
          type: 'warning'
        })
        return false
      }
      updateLightBeElebox(_array, this.selectEleboxId).then(response => {
        this.selectEleboxId = ''
        this.$message({
          message: '所属控制柜更改成功',
          type: 'success'
        })
        this.lightMultipleSelection = []
        this.$refs.lightListTable.clearSelection()
        this.setLightBoxDialog = false
        this.getListLighting()
      }).catch(error => {
        console.log(error)
      })
    },
    goRules (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (formName === 'addNewLightForm') {
            this.onNewLightSubmit()
          } else if (formName === 'addNewModelLoopForm') {
            this.onNewModelLoopSubmit()
          } else if (formName === 'addNewEleboxModelForm') {
            this.onNewEleboxModelSubmit()
          } else if (formName === 'editCabinetForm') {
            this.onEditNewEleboxSubmit()
          } else if (formName === 'addNewMoreLightForm') {
            this.onNewMoreLightSubmit()
          }
        } else {
          console.log('error submit!!')
        }
      })
    },
    handleCloseEditCabinetDialog (done) {
      // 弹窗关闭时将数据清空
      this.$refs['editCabinetForm'].resetFields()
      this.newElebox = {}
      done()
    },
    handleCloseAddNewElbox (done) {
      // 弹窗关闭时将数据清空
      this.$refs['elboxCountForm'].resetFields()
      this.deviceList = []
      this.ElboxCount = null
      done()
    },
    handleCloseAddNewModelLoop (done) {
      // 弹窗关闭时将数据清空
      this.$refs['addNewModelLoopForm'].resetFields()
      this.newModelLoop = {}
      done()
    },
    handleCloseAddNewLight (done) {
      // 弹窗关闭时将数据清空
      this.$refs['addNewLightForm'].resetFields()
      this.newLight = {}
      done()
    },
    handleCloseAddMoreNewLight (done) {
      this.$refs['addNewMoreLightForm'].resetFields()
      this.newMoreLight = {}
      done()
    },
    /**
      回路拆分
    */
    /**
    获取指定控制柜下的所有模块
    */
    getListEleboxModel (eleboxId) {
      let that = this
      listEleboxModel(eleboxId).then(response => {
        that.listEleboxModel = response.data
        console.log(that.listEleboxModel)
      }).catch(error => {
        console.log(error)
      })
    },
    selectEleboxModel (e) {
      this.selectEleboxModelId = e
      // this.getListModelLoop(e)
    },
    getListModelLoop (e) {
      this.useIdAfterTime = e //  一个备用的id，在提交成功后刷新数据使用
      listModelLoop(e).then(response => {
        this.listModelLoop = response.data
      }).catch(error => {
        console.log(error)
      })
    },
    selectModelLoop (e) {
      this.selectModelLoopId = e
      // 点击触发这个事件之后，出现右侧的添加回路
    },
    splitAddNewLoop () {
      this.addSplitLoopDialog = true
    },
    subSplitLoop () {
      let _obj = Object.assign({}, this.newModelLoop)
      this.splitNewLoopList.push(_obj)
      this.addSplitLoopDialog = false
      this.$refs['addNewModelLoopForm'].resetFields()
      this.newModelLoop = {}
    },
    deleteSplitModelLoop (e) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.splitNewLoopList.splice(e, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 提交回路修改
    subAllSplitLoop () {
      console.log(this.splitNewLoopList)
      modelLoopSplite(this.selectModelLoopId, this.splitNewLoopList).then(response => {
        console.log(response)
        this.splitNewLoopList = []
        this.getListModelLoop(this.useIdAfterTime)
      }).catch(error => {
        console.log(error)
      })
    },
    // 批量上传控制柜
    uploadElBoxSuccess () {
      this.$message({
        type: 'success',
        message: '上传成功'
      })
      this.getListElebox()
    },
    uploadElBoxError (error) {
      console.log(error)
    },
    // 导出控制柜
    downloadEleBox () {
      let _array = []
      if (this.boxMultipleSelection.length > 0) {
        this.boxMultipleSelection.forEach(selectedItem => {
          _array.push(selectedItem.id)
        })
      } else {
        this.$message({
          message: '请勾选需要导出的数据',
          type: 'warning'
        })
        return false
      }
      let params = {
        lightIdList: _array
      }
      params = qs.stringify(params, { allowDots: true })
      let url = 'http://47.105.38.215:8080/nnlightctl/api/roadlighting/exportElebox'
      axios.post(url, params, {ContentType: 'application/x-www-form-urlencoded', responseType: 'arraybuffer'}).then((res) => {
        let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'})
        let objectUrl = URL.createObjectURL(blob)
        window.location.href = objectUrl
        this.boxMultipleSelection = []
      }).catch(function (res) {
      })
    },
    uploadLightSuccess () {
      this.$message({
        type: 'success',
        message: '上传成功'
      })
      this.getListLighting()
    },
    uploadLightError (error) {
      console.log(error)
    },
    // 导出灯具
    downloadLight () {
      let _array = []
      if (this.lightMultipleSelection.length > 0) {
        this.lightMultipleSelection.forEach(selectedItem => {
          _array.push(selectedItem.id)
        })
      } else {
        this.$message({
          message: '请勾选需要导出的数据',
          type: 'warning'
        })
        return false
      }
      let params = {
        lightIdList: _array
      }
      params = qs.stringify(params, { allowDots: true })
      let url = 'http://47.105.38.215:8080/nnlightctl/api/roadlighting/exportLighting'
      axios.post(url, params, {ContentType: 'application/x-www-form-urlencoded', responseType: 'arraybuffer'}).then((res) => {
        let blob = new Blob([res.data], {type: 'application/vnd.ms-excel'})
        let objectUrl = URL.createObjectURL(blob)
        window.location.href = objectUrl
        this.lightMultipleSelection = []
      }).catch(function (res) {
      })
    },
    getLoopLight (e) {
      getLoopLight(e).then(res => {
        this.thisLoopList = res.data
      })
    },
    goLeftLoop () {
      console.log(this.thisLoopListSelection)
      if (this.selectEleboxModelId && this.selectModelLoopId) {
        for (var i = 0; i < this.thisLoopListSelection.length; i++) {
          for (var j = 0; j < this.thisLoopList.length; j++) {
            if (this.thisLoopListSelection[i].id === this.thisLoopList[j].id) {
              this.thisLoopList.splice(j, 1)
            }
          }
        }
        this.lightingList = this.lightingList.concat(this.thisLoopListSelection)
        // this.$refs.lightTableOfLoof.clearSelection()
      } else {
        this.$message({
          message: '请选择模块、回路',
          type: 'warning'
        })
      }
    },
    goRightLoop () {
      if (this.selectEleboxModelId && this.selectModelLoopId) {
        for (var i = 0; i < this.lightMultipleSelection.length; i++) {
          for (var j = 0; j < this.lightingList.length; j++) {
            if (this.lightMultipleSelection[i].id === this.lightingList[j].id) {
              this.lightingList.splice(j, 1)
            }
          }
        }
        this.thisLoopList = this.thisLoopList.concat(this.lightMultipleSelection)
        this.$refs.lightTableOfLoof.clearSelection()
      } else {
        this.$message({
          message: '请选择模块、回路',
          type: 'warning'
        })
      }
    },
    updateLightBeEleboxBeLoop () {
      let _array = []
      if (this.thisLoopList.length < 1) {
        this.$message({
          message: '请勾选数据',
          type: 'warning'
        })
        return false
      }
      this.thisLoopList.forEach(selectedItem => {
        // 取出所有待设置选项id
        _array.push(selectedItem.id)
      })
      updateLightBeEleboxBeLoop(_array, this.eleboxIdBeifen, this.selectModelLoopId).then(response => {
        this.insertLanmpDialog = false
        this.thisLoopList = []
      }).catch(error => {
        console.log(error)
      })
    },
    deleteLightOfLoop (e) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.thisLoopList.splice(e, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 接触灯具和控制柜的联系
    unbindLightBeElebox (type, e) {
      let _array = []
      if (type === 1) {
        _array.push(this.lightingList[e].id)
      } else {
        if (this.lightMultipleSelection.length > 0) {
          this.lightMultipleSelection.forEach(selectedItem => {
            // 取出所有待解除选项id
            _array.push(selectedItem.id)
          })
        } else {
          this.$message({
            message: '请勾选需要删除的数据',
            type: 'warning'
          })
          return false
        }
      }
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        unbindLightBeElebox(this.eleboxId, _array).then(response => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getListLighting()
        }).catch(error => {
          console.log(error)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  created () {
    this.getListGIS()
    this.getListLightModel()
    this.getListElebox()
    this.getAllListElebox()
    this.getListLighting()
    this.getListArea()
    this.getAllProjectList()
  }
}
</script>

<style lang="scss">
/* reset element-ui css */
.el-tabs__nav-scroll{
  padding: 0 40px;
}
.el-tabs__header{
  margin-bottom: 0
}
.el-tabs__item{
  height: 70px;
  line-height: 70px;
  font-size: 16px
}
.uid-dgh-item{
  .el-input__inner {
      height: 32px;
      line-height: 32px;
  }
}
.el-form--inline{
  .el-form-item__content{
    width: 160px
  }
}
.upload-demo{
  display: inline-block;
}
</style>
<style lang="scss" scoped>
.activep{
  background: #e5e5e5;
  line-height: 28px;
  height: 28px;
  padding:0 5px;
}
.system-container{
  .system-top{
    .item-block{
        padding: 0 30px 0 55px;
    }
  }
}
.area-dialog-content{
  min-height: 200px;
}
.area-tree{
  margin-top: 20px;
}
.model-select-dialog{
  width:450px;
  margin: 20px auto 40px;
  .select-wrap{
    width: 360px;
  }
}
.useable-select-dialog{
  margin: 10px 0 20px;
  text-align:center;
  .select-item{
    margin: 0 30px;
  }
}
.mapicon-dialog{
  text-align: center;
  .el-upload--picture-card{
    height: 100px;
    width: 100px;
  }
  .el-upload {
    height: 100px;
    width: 100px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
}
// 新增控制柜
.cabinet-list{
  margin: 0 auto;
  width:530px;
  padding:20px;
  box-sizing:100%;
  border:1px solid #dedede;
}
.operate-block{
  height: 40px;
  line-height: 40px;
  font-size:16px;
  font-weight: bold;
  a{
    display: inline-block;
    font-size:14px;
    color:#5789fa;
    font-weight: normal;
    margin-right: 15px;
    i{
      font-size:14px;
      font-weight: normal;
      padding-right: 5px;
    }
  }
}
// 添加设备
.add-device{
  .device-info{
    padding:20px;
    margin-left: 8px;
    float: left;
    width: 560px;
    height: 580px;
    border:1px solid #dedede;
    box-sizing:border-box;
  }
  .loop-info{
    padding:20px;
    margin-left: 20px;
    float: left;
    width: 560px;
    height: 580px;
    border:1px solid #dedede;
  }
}
.lamp-form{
  .input-wrap{
    width: 360px;
  }
}
.insert-lamp{
  .select-wrap{
    padding:20px;
    float: left;
    width: 540px;
    height: 450px;
    border:1px solid #dedede;
    box-sizing:border-box;
  }
  .controll-wrap{
    padding-top: 150px;
    float: left;
    width: 80px;
    height: 450px;
    text-align: center;
    .controll-btn {
      margin: 20px 0;
    }
  }
}
// 管理灯具
.manage-lamp{
  .operation-bar{
    margin-bottom: 20px;
  }
}
.p-title{
  font-size:16px;
  color:#333
}
.p-title-add{
  color:#909399;
  font-size:14px;
  margin-top: 5px;
}
// 回路拆分
.modeloop-split{
  width: 100%;
  .title{
    font-size:16px;
    margin-bottom: 10px;
  }
  .modeloop-split-center{
    .split-center-left{
      float: left;
      width: 280px;
      .title{
        width: 100%;
        height: 24px;
        .item{
          float:left;
          width:130px;
          height: 16px;
          text-align: left;
        }
      }
      .center-left-item{
        padding: 10px 5px;
        border:1px solid #e5e5e5;
        overflow-y: auto;
        float: left;
        width:130px;
        height: 400px;
      }
    }
    .split-center-right{
      float: right;
      width: 360px;
      // overflow-y: scroll;
      .add-loop-split{
        color:#5789fa;
        float: right;
      }
      .title{
        font-size:16px;
        height: 24px;
      }
      .center-right-item{
        padding: 10px;
        border:1px solid #e5e5e5;
        height: 400px;
      }
    }
  }
}
.uid-dgh-item{
  margin-bottom: 15px;
  .el-input__inner {
      height: 32px;
      line-height: 32px;
  }
  .item-block{
    width:150px;
    .el-input{
      width: 80px;
    }
    .title{
      color: #606266;
      font-weight: 700;
      padding-right: 10px;
      &::before{
        content: "*";
        color: #f56c6c;
        margin-right: 4px;
      }
    }
  }

}
</style>
