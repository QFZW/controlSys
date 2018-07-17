/*
 * @Author: Vincent
 * @Date: 2018-06-05 22:53:01
 * @Last Modified by: Vincent
 * @Last Modified time: 2018-07-01 14:52:01
 */

import request from '@/utils/request'

/**
 * 1、获取项目下全部控制柜
 * @export
 * @param {*} projectId 项目id
 * @returns
 */
export function listElebox (projectId, pageNumber, pageSize) {
  return request({
    url: '/api/gis/listElebox',
    method: 'get',
    params: {
      pageNumber,
      pageSize,
      projectId
    }
  })
}

/**
 * 2、获取项目下全部灯具
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
 * 3、按条件获取分页的灯具分组数据
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
 * 4、按灯具id新增灯具分组
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
 * 5、按灯具UID新增灯具分组
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
 * 6、按灯具分组组合更大分组形式新增灯具分组
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
 * 7、新增修改任务开关
 * @export
 * @param {*} obj {id, switchName, startTime, endTime, isLighton, isUsebeam, period, lightPercent}
 * @returns
 */
export function addOrUpdateSwitchTask (obj) {
  return request({
    url: '/api/switchTask/addOrUpdateSwitchTask',
    method: 'get',
    params: obj
  })
}

/**
 * 8、按搜索条件分页显示任务开关
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
 * 9、通过id值获取单个任务开关
 * @export
 * @param {*} pageNumber
 * @param {*} pageSize
 * @returns
 */
export function getSimpleSwitchTask (id) {
  return request({
    url: '/api/switchTask/getSimpleSwitchTask',
    method: 'get',
    params: id
  })
}

/**
 * 10、删除任务开关
 * @export
 * @param {*} switchTaskIds
 * @returns
 */
export function deleteSwitchTask (switchTaskIds) {
  return request({
    url: '/api/switchTask/deleteSwitchTask',
    method: 'get',
    params: switchTaskIds
  })
}

/**
 * 11、新增、修改场景模式
 * @export
 * @param {*} obj {id, sceneName,sceneDesc,lightingGroupIds, switchTaskIds}
 * @returns
 */
export function addOrUpdateScene (obj) {
  return request({
    url: '/api/scene/addOrUpdateScene',
    method: 'get',
    params: obj
  })
}

/**
 * 12、按搜索条件获取分页的场景模式数据
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

/**
 * 13、通过ID获取单个场景模式
 * @export
 * @param {*} id
 * @returns
 */
export function getScene (id) {
  return request({
    url: '/api/scene/getScene',
    method: 'get',
    params: id
  })
}

/**
 * 14、删除场景模式
 * @export
 * @param {List} sceneIds
 * @returns
 */
export function deleteScene (sceneIds) {
  return request({
    url: '/api/scene/deleteScene',
    method: 'get',
    params: sceneIds
  })
}

/**
 * 15、新增、修改快捷场景映射
 * @export
 * @param {*} sceneIds {id, shotcutName, nnlightctlSceneId}
 * @returns
 */
export function addOrUpdateSceneShotcut (obj) {
  return request({
    url: '/api/scene/addOrUpdateSceneShotcut',
    method: 'get',
    params: obj
  })
}

/**
 * 16、删除快捷场景映射
 * @export
 * @param {*} sceneShotcutIds {}
 * @returns
 */
export function deleteSceneShotcut (sceneShotcutIds) {
  return request({
    url: '/api/scene/deleteSceneShotcut',
    method: 'get',
    params: sceneShotcutIds
  })
}

/**
 * 17、获取控制柜下全部回路信息
 * @export
 * @param {*}
 * @returns
 */
export function listEleboxLoop (eleboxId) {
  return request({
    url: '/api/roadlighting/listEleboxLoop',
    method: 'get',
    params: {
      eleboxId
    }
  })
}

/**
 * 18、获取控指定项目指定回路下的灯具信息
 * @export
 * @param {*}
 * @returns
 */
export function listLoopLighting (projectId, loopId) {
  return request({
    url: '/api/gis/listLoopLighting',
    method: 'get',
    params: {
      projectId,
      loopId
    }
  })
}

/**
 * 19、调节灯具亮度信息
 * @export
 * @param {*}
 * @returns
 */
export function commandLightAdjust (lightPercent) {
  return request({
    url: '/api/command/sendLightAdjustCommand',
    method: 'get',
    params: {
      lightPercent
    }
  })
}
