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
    redirect: '/gisservice/project',
    meta: { title: 'GIS地理信息系统', icon: '&#xe6c1;' },
    children: [{
      path: 'project',
      component: () => import('@/views/GisService/Project/index'),
      name: 'Project',
      meta: { title: '项目地理信息', icon: '' }
    },
    {
      path: 'lamp',
      // hidden: true,
      component: () => import('@/views/GisService/Lamp/index'),
      name: 'Lamp',
      meta: { title: '灯具地理信息', icon: '' }
    }]
  },
  // 事件报警系统
  {
    path: '/eventwarning',
    component: Layout,
    name: 'EventWarning',
    redirect: '/eventwarning/warning',
    meta: { title: '事件报警', icon: '&#xe6c1;' },
    children: [{
      path: 'warning',
      component: () => import('@/views/EventWarning/warning/index'),
      name: 'Warning',
      meta: { title: '事件报警', icon: '' }
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
    },
    {
      path: 'areaadmin',
      component: () => import('@/views/RoadLighting/AreaAdmin/index'),
      name: 'AreaAdmin',
      meta: { title: '区域管理', icon: '' }
    },
    {
      path: 'gisadmin',
      component: () => import('@/views/RoadLighting/GisAdmin/index'),
      name: 'GisAdmin',
      meta: { title: 'Gis管理', icon: '' }
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
  // 能耗分析
  {
    path: '/engery',
    component: Layout,
    name: 'Energy',
    redirect: '/energy/analyze',
    meta: { title: '能耗分析', icon: '&#xe6c1;' },
    children: [{
      path: 'analyze',
      component: () => import('@/views/Energy/EnergyAnalyze/index'),
      name: 'EnergyAnalyze',
      meta: { title: '能耗分析', icon: '' }
    },
    {
      path: 'energyMonitor',
      component: () => import('@/views/Energy/EnergyMonitor/index'),
      name: 'EnergyMonitor',
      meta: { title: '能耗监测', icon: '' }
    },
    {
      path: 'energyReport',
      component: () => import('@/views/Energy/EnergyReport/index'),
      name: 'EnergyReport',
      meta: { title: '能耗报表', icon: '' }
    },
    {
      path: 'terReport',
      component: () => import('@/views/Energy/TerReport/index'),
      name: 'TerReport',
      meta: { title: '终端报表', icon: '' }
    },
    {
      path: 'history',
      component: () => import('@/views/Energy/History/index'),
      name: 'History',
      meta: { title: '历史', icon: '' }
    },
    {
      path: 'lamp',
      // hidden: true,
      component: () => import('@/views/GisService/Lamp/index'),
      name: 'Lamp',
      meta: { title: '灯具地理信息', icon: '' }
    }]
  },
  // 用户管理
  {
    path: '/ucenter',
    component: Layout,
    name: 'Ucenter',
    redirect: '/ucenter/user',
    meta: { title: '用户中心', icon: '&#xe601;' },
    children: [{
      path: '/ucenter/user',
      component: () => import('@/views/Ucenter/index'),
      name: 'User',
      redirect: '/ucenter/user/index',
      meta: { title: '用户', icon: '' },
      children:[
      //{
      //   path: 'index',
      //   component: () => import('@/views/Ucenter/User/index'),
      //   name: 'userindex',
      //   meta: { title: '用户中心', icon: '' }
      // },
      {
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
        path: 'userlist',
        component: () => import('@/views/Ucenter/User/userList'),
        name: 'userList',
        meta: { title: '用户列表', icon: '' }
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
      // {
      //   path: 'systemusers',
      //   component: () => import('@/views/Ucenter/User/systemUsers'),
      //   name: 'systemUsers',
      //   meta: { title: '系统用户', icon: '' }
      // },
      // {
      //   path: 'organizationusers',
      //   component: () => import('@/views/Ucenter/User/organizationUsers'),
      //   name: 'organizationUsers',
      //   meta: { title: '机构用户', icon: '' }
      // }
    // ]
    },
    {
      path: 'dailyrecord',
      component: () => import('@/views/Ucenter/DailyRecord'),
      name: 'DailyRecord',
      meta: { title: '日志', icon: '' }
    }]
  },
  // 资产管理
  {
    path: '/assetadmin',
    component: Layout,
    name: 'AssetAdmin',
    redirect: '/AssetAdmin/index',
    meta: { title: '资产管理', icon: '&#xe668;' },
    children: [{
      path: 'index',
      component: () => import('@/views/AssetAdmin/index'),
      name: 'indexIndex',
      meta: { title: '资产管理首页', icon: '' }
    },{
      path: 'general',
      component: () => import('@/views/AssetAdmin/general/index'),
      name: 'generalIndex',
      meta: { title: '维修概况', icon: '' }
    },
    {
      path: 'manage',
      component: () => import('@/views/AssetAdmin/manage/index'),
      name: 'manageIndex',
      meta: { title: '维修管理', icon: '' }
    },
    {
      path: 'linkman',
      component: () => import('@/views/AssetAdmin/linkman/index'),
      name: 'linkmanIndex',
      meta: { title: '联系人管理', icon: '' }
    },{
      path: 'inventory',
      component: () => import('@/views/AssetAdmin/inventory/index'),
      name: 'inventoryIndex',
     
      meta: { title: '库存管理', icon: '' },
      // children:[
      //   {
      //     path: 'inventory/index',
      //     component: () => import('@/views/AssetAdmin/inventory/index'),
      //     name: 'inventoryIndex1',
      //     meta: { title: '资产申请', icon: '' }
          
      //   }
      // ]
    }]
  }
]
export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
