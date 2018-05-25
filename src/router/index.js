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
    redirect: '/gisservice/index',
    meta: { title: 'GIS地理信息系统', icon: '&#xe6c1;' },
    children: [{
      path: 'index',
      component: () => import('@/views/GisService/index'),
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
  // 道路照明系统
  {
    path: '/roadlighting',
    component: Layout,
    name: 'RoadLighting',
    redirect: '/roadlighting/index',
    meta: { title: '道路照明系统', icon: '&#xe622;' },
    children: [{
      path: 'index',
      component: () => import('@/views/RoadLighting/Deploy/index'),
      name: 'index',
      meta: { title: '部署', icon: '' }
    },
    {
      path: '/roadlighting/debugging',
      component: () => import('@/views/RoadLighting/Debugging/index'),
      name: 'Debugging',
      redirect: '/roadlighting/debugging/index',
      meta: { title: '调试', icon: '' },
      children: [{
        path: 'index',
        component: () => import('@/views/RoadLighting/Debugging/Index/index'),
        name: 'DebuggingIndex',
        meta: { title: '设备调试', icon: '' }
      }, {
        path: 'electricmeter',
        component: () => import('@/views/RoadLighting/Debugging/ElectricMeter/index'),
        name: 'ElectricMeter',
        meta: { title: '电表', icon: '' }
      }, {
        path: 'digital',
        component: () => import('@/views/RoadLighting/Debugging/Digital/index'),
        name: 'Digital',
        meta: { title: '数字量输入', icon: '' }
      }]
    },
    {
      path: '/roadlighting/equipmenttype',
      component: () => import('@/views/RoadLighting/EquipmentType/index'),
      name: 'EquipmentType',
      redirect: '/roadlighting/equipmenttype/index',
      meta: { title: '设备型号', icon: '' },
      children: [{
        path: 'index',
        component: () => import('@/views/RoadLighting/EquipmentType/Index/index'),
        name: 'EquipmentTypeIndex',
        meta: { title: '型号总览', icon: '' }
      }, {
        path: 'lighttype',
        component: () => import('@/views/RoadLighting/EquipmentType/LightType/index'),
        name: 'LightType',
        meta: { title: '灯具型号', icon: '' }
      }]
    }]
  },
  // 项目管理
  {
    path: '/projectadmin',
    component: Layout,
    name: 'Project',
    redirect: '/projectadmin/index',
    meta: { title: '项目管理', icon: '&#xe61d;' },
    children: [{
      path: 'index',
      component: () => import('@/views/ProjectAdmin/Project/index'),
      name: 'Item1',
      meta: { title: '总览', icon: '' }
    },
    {
      path: 'overview',
      component: () => import('@/views/ProjectAdmin/OverView/index'),
      name: 'Item2',
      meta: { title: '管理', icon: '' }
    },
    {
      path: 'globalregion',
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
