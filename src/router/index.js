import Vue from 'vue'
import Router from 'vue-router'

/* Layout */
import Layout from '../views/layout/Layout'

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/',
    name: 'Index',
    component: () => import('@/views/index/index')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('@/views/login/index')
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
      component: () => import('@/views/Project/index'),
      name: 'index',
      meta: { title: '子菜单1', icon: '' }
    },
    {
      path: 'test',
      component: () => import('@/views/Project/index'),
      name: 'test',
      meta: { title: '子菜单1', icon: '' }
    }]
  },
  // 项目管理
  {
    path: '/project',
    component: Layout,
    name: 'Project',
    redirect: '/project/index',
    meta: { title: '项目管理', icon: '&#xe61d;' },
    children: [{
      path: 'index',
      component: () => import('@/views/Project/index'),
      name: 'Item1',
      meta: { title: '总览', icon: '' }
    },
    {
      path: 'test',
      component: () => import('@/views/Project/index'),
      name: 'Item2',
      meta: { title: '管理', icon: '' }
    }]
  }
]
export default new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
