/*
 * @Author: Vincent
 * @Date: 2018-06-05 22:53:01
 * @Last Modified by: Vincent
 * @Last Modified time: 2018-06-11 01:03:24
 */

import request from '@/utils/request'

/**
 * 获取项目下全部控制柜
 * @export
 * @param {*} projectId 项目id
 * @returns
 */
export function listElebox (projectId) {
  return request({
    url: '/api/gis/listElebox',
    method: 'get',
    params: {
      projectId
    }
  })
}

/**
 * 获取项目下全部灯具
 * @export
 * @param {*} projectId 项目id
 * @returns
 */
export function listLighting (projectId) {
  return request({
    url: '/api/gis/listLighting',
    method: 'get',
    params: {
      projectId
    }
  })
}

/**
 * 按条件获取分页的灯具分组数据
 * @export
 * @param {*} pageNumber 当前第几页，从第1页开始
 * @param {*} pageSize 每页的大小
 * @returns
 */
export function listLightGroup (pageNumber, pageSize) {
  return request({
    url: '/api/lightGroup/listLightGroup',
    method: 'get',
    params: {
      pageNumber,
      pageSize
    }
  })
}

/**
 * 按灯具id新增灯具分组
 * @export
 * @param {*} cGroupName 灯具分组名称
 * @param {*} mem 备注
 * @param {*} lightIds 要添加到分组中的灯具的ID值的集合
 * @returns
 */
export function createLightGroupByLightIds (cGroupName, mem, lightIds) {
  return request({
    url: '/api/lightGroup/createLightGroupByLightIds',
    method: 'get',
    params: {
      cGroupName,
      mem,
      lightIds
    }
  })
}

/**
 * 按灯具UID新增灯具分组
 * @export
 * @param {*} cGroupName 灯具分组名称
 * @param {*} mem 备注
 * @param {*} lightUIDs 要添加到分组中的灯具的UID集合
 * @returns
 */
export function createLightGroupByLightUIDs (cGroupName, mem, lightUIDs) {
  return request({
    url: '/api/lightGroup/createLightGroupByLightUIDs',
    method: 'get',
    params: {
      cGroupName,
      mem,
      lightUIDs
    }
  })
}

/**
 * 按灯具分组组合更大分组形式新增灯具分组
 * @export
 * @param {*} cGroupName 灯具分组名称
 * @param {*} mem 备注
 * @param {*} lightGroupIds 要添加到分组中的灯具分组的UD集合
 * @returns
 */
export function createLightGroupByLightGroup (cGroupName, mem, lightGroupIds) {
  return request({
    url: '/api/lightGroup/createLightGroupByLightGroup',
    method: 'get',
    params: {
      cGroupName,
      mem,
      lightGroupIds
    }
  })
}

/**
 * 按搜索条件分页显示任务开关
 * @export
 * @param {*} pageNumber
 * @param {*} pageSize
 * @returns
 */
export function listSwitchTask (pageNumber, pageSize) {
  return request({
    url: '/api/switchTask/listSwitchTask',
    method: 'get',
    params: {
      pageNumber,
      pageSize
    }
  })
}

/**
 * 按搜索条件获取分页的场景模式数据
 * @export
 * @param {*} pageNumber
 * @param {*} pageSize
 * @returns
 */
export function listScene (pageNumber, pageSize) {
  return request({
    url: '/api/scene/listScene',
    method: 'get',
    params: {
      pageNumber,
      pageSize
    }
  })
}
