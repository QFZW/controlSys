import Vue from 'vue'
import Router from 'vue-router'

/* Layout */
import Layout from '../views/Layout/Layout'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/Index/index')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('@/views/Login/index')
  },
  // GIS地理信息系统
  {
    path: '/gisservice',
    component: Layout,
    name: 'Gisservice',
    redirect: '/project/index',
    meta: { title: 'GIS地理信息系统', icon: '&#xe6c1;' },
    children: [{
      path: 'index',
      component: () => import('@/views/ProjectAdmin/Project/index'),
      name: 'index',
      meta: { title: '子菜单1', icon: '' }
    },
    {
      path: 'test',
      component: () => import('@/views/ProjectAdmin/Project/index'),
      name: 'test',
      meta: { title: '子菜单1', icon: '' }
    }]
  },
  // 项目管理
  {
    path: '/ProjectAdmin',
    component: Layout,
    name: 'Project',
    redirect: '/ProjectAdmin/index',
    meta: { title: '项目管理', icon: '&#xe61d;' },
    children: [{
      path: 'index',
      component: () => import('@/views/ProjectAdmin/Project/index'),
      name: 'Item1',
      meta: { title: '总览', icon: '' }
    },
    {
      path: 'overView',
      component: () => import('@/views/ProjectAdmin/overView/index'),
      name: 'Item2',
      meta: { title: '管理', icon: '' }
    },
    {
      path: 'GlobalRegion',
      component: () => import('@/views/ProjectAdmin/GlobalRegion/index'),
      name: 'GlobalRegion',
      meta: { title: '全球地区', icon: '' }
    }]
  }
]
export default new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
