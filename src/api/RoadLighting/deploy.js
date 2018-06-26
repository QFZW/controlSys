import request from '@/utils/request'
/**
 * 添加控制柜
 * @export
 * @param {any} deviceList
 * @param {any} count
 * @returns
 */
export function addEleBox (deviceList, count) {
  return request({
    url: '/api/roadlighting/addelebox',
    method: 'post',
    data: {
      deviceList,
      count
    }
  })
}
/**
 * 编辑控制柜
 * @export
 * @param {any} obj
 * @returns
 */
export function updateEleBox (obj) {
  return request({
    url: '/api/roadlighting/updateelebox',
    method: 'post',
    data: obj
  })
}
/**
 * 编辑控制柜设备
 * @export
 * @param {any} id
 * @param {any} deleteModelIdList
 * @param {any} addModelIdList
 * @returns
 */
export function updateEleboxDevice (id, deleteModelIdList, addModelIdList) {
  return request({
    url: '/api/roadlighting/updateEleboxDevice',
    method: 'post',
    data: {
      id,
      deleteModelIdList,
      addModelIdList
    }
  })
}
/**
 * 回路拆分
 * @export
 * @param {any} beSplitId
 * @param {any} splitModelLoopList
 * @returns
 */
export function modelLoopSplite (beSplitId, splitModelLoopList) {
  return request({
    url: '/api/roadlighting/splitmodelloop',
    method: 'post',
    data: {
      beSplitId,
      splitModelLoopList
    }
  })
}
/**
 * 删除控制柜
 * @export
 * @param {any} eleboxIdList
 * @returns
 */
export function deleteElebox (eleboxIdList) {
  return request({
    url: '/api/roadlighting/deleteelebox',
    method: 'post',
    data: {
      eleboxIdList
    }
  })
}
/**
 * 分页显示控制柜信息
 * @export
 * @param {any} pageNumber
 * @param {any} pageSize
 * @returns
 */
export function listElebox (pageNumber, pageSize) {
  return request({
    url: '/api/roadlighting/listelebox',
    method: 'get',
    params: {
      pageNumber,
      pageSize
    }
  })
}
/**
 * 分页获取某一控制柜下全部模块
 * @export
 * @param {any} eleboxId
 * @param {any} pageNumber
 * @param {any} pageSize
 * @returns
 */
export function listEleboxModel (eleboxId, pageNumber, pageSize) {
  return request({
    url: '/api/roadlighting/listmodel',
    method: 'get',
    params: {
      eleboxId,
      pageNumber,
      pageSize
    }
  })
}
/**
 * 获取某一模块下全部回路
 * @export
 * @param {any} modelId
 * @returns
 */
export function listModelLoop (modelId) {
  return request({
    url: '/api/roadlighting/listmodelloop',
    method: 'get',
    params: {
      modelId
    }
  })
}
/**
 * 添加设备
 * @export
 * @param {any} obj
 * @returns
 */
export function addEleboxModel (obj) {
  return request({
    url: '/api/roadlighting/addeleboxmodel',
    method: 'post',
    data: {
      obj
    }
  })
}
/**
 * 修改设备
 * 修改设备不允许修改设备回路
 * @export
 * @param {any} obj
 * @returns
 */
export function updateEleboxModel (obj) {
  return request({
    url: '/api/roadlighting/updateeleboxmodel',
    method: 'post',
    data: {
      obj
    }
  })
}
/**
 * 修改添加回路
 * @export
 * @param {any} obj
 * @returns
 */
export function addOrUpdateModelLoop (obj) {
  return request({
    url: '/api/roadlighting/addorupdatemodelloop',
    method: 'post',
    data: {
      obj
    }
  })
}
// 灯具页面相关接口
export function listLighting (pageNumber, pageSize, eleboxId, notBe) {
  return request({
    url: '/api/roadlighting/listLighting',
    method: 'get',
    params: {
      pageNumber,
      pageSize,
      eleboxId,
      notBe
    }
  })
}
/**
 * 删除灯具
 * @export
 * @param {any} deleteLightIdList
 * @returns
 */
export function deleteLighting (deleteLightIdList) {
  return request({
    url: '/api/roadlighting/deleteLighting',
    method: 'post',
    data: {
      deleteLightIdList
    }
  })
}
// 通过id获取单个灯具信息
export function getLighting (id) {
  return request({
    url: '/api/roadlighting/getLighting',
    method: 'post',
    params: {
      id
    }
  })
}
/**
 * 添加编辑灯具
 * @export
 * @param {any} obj
 * @returns obj
 */
export function addOrUpdateLighting (obj) {
  return request({
    url: '/api/roadlighting/addOrUpdateLighting',
    method: 'post',
    data: obj
  })
}
/**
 * 批量添加灯具
 * @export
 * @param {any} addLightings
 * @returns obj
 */
export function addLighting (addLightings) {
  return request({
    url: '/api/roadlighting/batchAddLighting',
    method: 'post',
    data: {
      addLightings
    }
  })
}
// 批量编辑灯具所属控制柜
export function updateLightBeElebox (lightIdList, beEleboxId) {
  return request({
    url: '/api/roadlighting/updateLightBeElebox',
    method: 'post',
    data: {
      lightIdList,
      beEleboxId
    }
  })
}
// 获取区域列表相关接口
export function listArea (pageNumber, pageSize) {
  return request({
    url: '/api/roadlighting/listArea',
    method: 'get',
    params: {
      pageNumber,
      pageSize
    }
  })
}
/**
 * 添加编辑区域
 * @export
 * @param {any} obj
 * @returns obj
 */
export function addOrUpdateArea (obj) {
  return request({
    url: '/api/roadlighting/addOrUpdateArea',
    method: 'post',
    data: obj
  })
}
/**
 * 删除区域
 * @export
 * @param {any} areaIdList
 * @returns
 */
export function deleteArea (areaIdList) {
  return request({
    url: '/api/roadlighting/deleteArea',
    method: 'post',
    data: {
      areaIdList
    }
  })
}
/**
 * 获取GIS列表相关接口
 * @export
 * @param {any} pageNumber
 * @param {any} pageSize
 * @param {any} type  0 - 删除灯具GIS； 1 - 删除控制柜GIS
 * @returns
 */
export function listGIS (pageNumber, pageSize, type) {
  return request({
    url: '/api/roadlighting/listGIS',
    method: 'get',
    params: {
      pageNumber,
      pageSize,
      type
    }
  })
}
/**
 * 添加编辑GIS
 * @export
 * @param {any} obj
 * @returns obj
 */
export function addOrUpdateGIS (obj) {
  return request({
    url: '/api/roadlighting/addOrUpdateGIS',
    method: 'post',
    data: obj
  })
}
/**
 * 删除配电柜或者灯具的GIS信息
 * @export
 * @param {any} gisIDList
 * @param {any} type  0 - 删除灯具GIS； 1 - 删除控制柜GIS
 * @returns
 */
export function deleteGIS (gisIDList, type) {
  return request({
    url: '/api/roadlighting/deleteGIS',
    method: 'post',
    data: {
      gisIDList,
      type
    }
  })
}
/**
 * 控制柜的批量导出
 * @export
 * @param {any} eleboxIdList
 * @returns
 */
export function exportElebox (eleboxIdList) {
  return request({
    url: '/api/roadlighting/exportElebox',
    method: 'post',
    data: {
      eleboxIdList
    }
  })
}
/**
 * 灯具的批量导出
 * @export
 * @param {any} lightIdList
 * @returns
 */
export function exportLighting (lightIdList) {
  return request({
    url: '/api/roadlighting/exportLighting',
    method: 'post',
    data: {
      lightIdList
    }
  })
}
/**
 * 获取指定回路的所有灯具
 * @export
 * @param {any} id
 * @returns array
 */
export function getLoopLight (id) {
  return request({
    url: '/api/roadlighting/getLoopLight',
    method: 'get',
    params: {
      id
    }
  })
}
/**
 * 更新灯具所属控制柜和所属回路
 * @export
 * @param {any} lightIdList 变更所属控制柜的灯具id的数组
 * beEleboxId 控制柜id
 * modelLoopId 回路id
 * @returns 成功或者失败
 */
export function updateLightBeEleboxBeLoop (lightIdList, beEleboxId, modelLoopId) {
  return request({
    url: '/api/roadlighting/updateLightBeEleboxBeLoop',
    method: 'post',
    data: {
      lightIdList,
      beEleboxId,
      modelLoopId
    }
  })
}

/**
 *解除控制柜与灯具的所属关系
 * @export
 * @param {*} beEleboxId 控制柜id
 * @param {*} lightIdList 灯具的id集合
 * @returns
 */
export function unbindLightBeElebox (beEleboxId, lightIdList) {
  return request({
    url: '/api/roadlighting/unbindLightBeElebox',
    method: 'post',
    data: {
      lightIdList,
      beEleboxId
    }
  })
}
