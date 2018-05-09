/*
 * @Author: Vincent
 * @Date: 2018-05-06 14:46:35
 * @Last Modified by: Vincent
 * @Last Modified time: 2018-05-09 15:43:13
 */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// core plugins
import Vue from 'vue'
import App from './App'
import router from './router'
import service from './utils/request'
// style
import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css

Vue.config.productionTip = false

Vue.use(ElementUI)

// 更佳优雅的引入
Object.defineProperty(Vue.prototype, '$HTTP', { value: service })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
