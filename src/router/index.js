import Vue from 'vue'
import Router from 'vue-router'

/* Layout */
import Layout from '@/views/Layout/Layout'

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
      path: 'OverView',
      component: () => import('@/views/ProjectAdmin/OverView/index'),
      name: 'Item2',
      meta: { title: '管理', icon: '' }
    },
    {
      path: 'GlobalRegion',
      component: () => import('@/views/ProjectAdmin/GlobalRegion/index'),
      name: 'GlobalRegion',
      meta: { title: '全球地区', icon: '' }
    }]
  },
  // 用户管理
  {
    path: '/ucenter',
    component: Layout,
    name: 'Ucenter',
    redirect: '/ucenter/user/organization',
    meta: { title: '用户中心', icon: '&#xe601;' },
    children: [{
      path: '/ucenter/user',
      component: () => import('@/views/Ucenter/index'),
      name: 'User',
      redirect: '/ucenter/user/organization',
      meta: { title: '用户', icon: '' },
      children: [{
        path: 'organization',
        component: () => import('@/views/Ucenter/User/organization'),
        name: 'Organization',
        meta: { title: '机构管理', icon: '' }
      },
      {
        path: 'department',
        component: () => import('@/views/Ucenter/User/department'),
        name: 'Department',
        meta: { title: '部门岗位', icon: '' }
      },
      {
        path: 'onlineuser',
        component: () => import('@/views/Ucenter/User/onlineuser'),
        name: 'OnlineUser',
        meta: { title: '在线用户', icon: '' }
      },
      {
        path: 'belong',
        component: () => import('@/views/Ucenter/User/belong'),
        name: 'Belong',
        meta: { title: '项目归属', icon: '' }
      }]
    }]
  }
]
export default new Router({
  mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
