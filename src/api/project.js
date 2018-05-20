import request from '@/utils/request'
/**
 * 获取项目列表
 * @export
 * @param {any} pageNumber
 * @param {any} pageSize
 * @returns obj
 */
export function listProject (pageNumber, pageSize) {
  return request({
    url: '/api/project/listproject',
    method: 'get',
    params: {
      pageNumber,
      pageSize
    }
  })
}
/**
 * 删除项目
 * @export
 * @param {any} idList
 * @returns obj
 */
export function DelectProject (idList) {
  return request({
    url: '/api/project/deleteproject',
    method: 'post',
    data: {
      idList
    }
  })
}
/**
 * 添加项目
 * @export
 * @param {any} project
 * @returns obj
 */
export function addProject (project) {
  return request({
    url: '/api/project/addproject',
    method: 'post',
    data: {
      project
    }
  })
}
/**
 * 获取单个项目,用以更新项目
 * @export
 * @param {any} codeNumber
 * @returns obj
 */
export function getProject (codeNumber) {
  return request({
    url: '/api/project/getproject',
    method: 'get',
    params: {
      codeNumber
    }
  })
}
/**
 * 更新项目
 * @export
 * @param {any} project
 * @returns obj
 */
export function updateProject (project) {
  return request({
    url: '/api/project/updateproject',
    method: 'post',
    data: {
      project
    }
  })
}
/**
 * 获取国家列表
 * @export
 * @param {any} pageNumber
 * @param {any} pageSize
 * @returns obj
 */
export function listCountry (pageNumber, pageSize) {
  return request({
    url: '/api/project/listcountry',
    method: 'get',
    params: {
      pageNumber,
      pageSize
    }
  })
}
/**
 * 获取省份列表
 * @export
 * @param {any} pageNumber
 * @param {any} pageSize
 * @returns obj
 */
export function listProvince (pageNumber, pageSize) {
  return request({
    url: '/api/project/listprovince',
    method: 'get',
    params: {
      pageNumber,
      pageSize
    }
  })
}
/**
 * 获取城市列表
 * @export
 * @param {any} pageNumber
 * @param {any} pageSize
 * @returns obj
 */
export function listCity (pageNumber, pageSize) {
  return request({
    url: '/api/project/listcity',
    method: 'get',
    params: {
      pageNumber,
      pageSize
    }
  })
}
/**
 * 添加/修改国家
 * @export
 * @param {any} obj
 * @returns obj
 */
export function addOrUpdateCountry (obj) {
  return request({
    url: '/api/project/addorupdatecountry',
    method: 'post',
    data: obj
  })
}
/**
 * 添加/修改省份
 * @export
 * @param {any} obj
 * @returns obj
 */
export function addOrUpdateProvince (obj) {
  return request({
    url: '/api/project/addorupdateProvince',
    method: 'post',
    data: obj
  })
}
/**
 * 添加/修改城市
 * @export
 * @param {any} obj
 * @returns obj
 */
export function addOrUpdateCity (obj) {
  return request({
    url: '/api/project/addorupdatecity',
    method: 'post',
    data: obj
  })
}
/**
 * 获取单个国家
 * @export
 * @param {any} codeNumber
 * @returns obj
 */
export function getOneCountry (codeNumber) {
  return request({
    url: '/api/project/getcountry',
    method: 'get',
    params: {
      codeNumber
    }
  })
}
/**
 * 获取单个省份
 * @export
 * @param {any} codeNumber
 * @returns codeNumber
 */
export function getOneProvince (codeNumber) {
  return request({
    url: '/api/project/getProvince',
    method: 'get',
    params: {
      codeNumber
    }
  })
}
/**
 * 获取单个城市
 * @export
 * @param {any} codeNumber
 * @returns codeNumber
 */
export function getOneCity (codeNumber) {
  return request({
    url: '/api/project/getcity',
    method: 'get',
    params: {
      codeNumber
    }
  })
}
