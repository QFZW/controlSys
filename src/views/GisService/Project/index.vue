
/*
 * @Author: Vincent
 * @Date: 2018-05-13 12:37:54
 * @Last Modified by: Vincent
 * @Last Modified time: 2018-06-03 17:09:03
 */

<template>
  <div class='map-wrap'>
    <el-amap vid='amapDemo' :center="center" :zooms="zooms" :plugin='plugin'>
    </el-amap>
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
      zooms: '14',
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
      restaurants: [],
      state4: '',
      timeout: null
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
</style>
