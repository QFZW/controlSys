
/*
 * @Author: Vincent
 * @Date: 2018-05-13 12:37:54
 * @Last Modified by: Vincent
 * @Last Modified time: 2018-07-01 14:19:17
 */

<template>
  <div class='map-wrap'>
    <el-amap vid='amapDemo' :center="center" :zooms="zooms" :plugin='plugin'>
      <el-amap-marker v-for="(marker, index) in markers" :key="index" :template='marker.template' :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable" :vid="index"></el-amap-marker>
    </el-amap>
    <div class='search-wrap'>
      <el-select v-model="selectProject" filterable placeholder="请输入内容">
        <el-option
          v-for="item in projects"
          :key="item.id"
          :label="item.projectName"
          :value="item.id">
        </el-option>
      </el-select>
      <el-button type='primary' icon='el-icon-search' @click="setCurrentProject"></el-button>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import VueAMap from 'vue-amap'
import { listProject } from '@/api/GisService/project'
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
      zooms: '14',
      markers: [],
      center: [108.59996, 32.197646],
      plugin: [{
        pName: 'MapType',
        defaultType: 0
      },
      {
        pName: 'ToolBar',
        position: 'RB',
        liteStyle: true,
        locate: true,
        noIpLocate: true
      }],
      projects: [],
      selectProject: ''
    }
  },
  methods: {
    loadProjectList () {
      let that = this
      let marks = []
      listProject().then(res => {
        console.log(res.data)
        let projectList = res.data
        projectList.forEach(element => {
          let _data = {
            position: [element.longitude, element.latitude],
            events: {
              click: () => {
                this.$router.push({path: '/gisservice/lamp', query: { projectId: element.id }})
              }
            },
            visible: true,
            draggable: false,
            template: `
              <el-tooltip placement="bottom-start">
                <div slot="content">经度：${element.longitude}<br/>纬度：${element.latitude}</div>
                <div class="project-mark">
                  <span class="project-name">${element.projectName}</span>
                  <i class="iconfont">&#xe638;</i>
                </div>
              </el-tooltip>
            `
          }
          marks.push(_data)
        })
        that.projects = projectList
        that.markers = marks
      })
    },
    setCurrentProject () {
      let pid = this.selectProject
      if (pid) {
        this.$router.push('/gisservice/lamp')
      } else {
        this.$message({
          message: '请选择一个项目',
          type: 'warning'
        })
      }
    }
  },
  created () {
    this.loadProjectList()
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
</style>
<style lang="scss">
.project-mark {
  position: relative;
  width: 40px;
  height: 40px;
  .iconfont{
    color: #5789FA;
    font-size: 38px;
  }
  .project-name {
    position: absolute;
    display: inline-block;
    padding: 4px 10px;
    top: -25px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    background: #15A4FA;
    border-radius: 5px;
    color: #ffffff;
  }
}
</style>
