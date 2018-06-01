import request from '@/utils/request'
/**
 * 获取gis列表
 * @export
 * @param {any} pageNumber
 * @param {any} pageSize
 * @returns obj
 */
export function listGIS (pageNumber, pageSize) {
  return request({
    url: '/api/roadlighting/listGIS',
    method: 'get',
    params: {
      pageNumber,
      pageSize
    }
  })
}
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
    data: {
      obj
    }
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
 * @param {any} id
 * @param {any} pageNumber
 * @param {any} pageSize
 * @returns
 */
export function listEleboxModel (id, pageNumber, pageSize) {
  return request({
    url: '/api/roadlighting/listmodel',
    method: 'get',
    params: {
      id,
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
