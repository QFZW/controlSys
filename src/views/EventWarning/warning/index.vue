/*
 * @Author: Ouber23
 * @Date: 2018-08-14 04:49:28
 * @LastEditors: Ouber23
 * @LastEditTime: 2018-08-14 04:54:59
 * @Description: 
 */

/*
 * @Author: Vincent
 * @Date: 2018-05-13 12:37:54
 * @Last Modified by: Vincent
 * @Last Modified time: 2018-07-02 00:55:19
 */

<template>
  <div id="eventwarning">
    <h1>事件报警</h1>
  </div>
</template>

<script>
import Vue from 'vue'
import { listElebox } from '@/api/GisService/lamp'
import { getLighting } from '@/api/RoadLighting/deploy'
import '../../../utils/filter.js'
export default {
  name: 'EventIndex',
  data () {
    return {
    }   
  },
  computed: {
      
  },
  methods: {
      
  },
  created () {
    let that = this
  }
}
</script>

<style lang="scss" scoped>

</style>
