import Vue from 'vue'
import Router from 'vue-router'
// 测试
import Index from '../views/index/index'

import Login from '../views/login/index'

import ProjectIndex from '../views/Project/index'

Vue.use(Router)

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [{
    path: '/',
    name: 'Index',
    component: Index
  }, {
    path: '/Login',
    name: 'Login',
    component: Login
  },
    // 项目管理
  {
    path: '/ProjectIndex',
    name: 'ProjectIndex',
    component: ProjectIndex
  }]
})
