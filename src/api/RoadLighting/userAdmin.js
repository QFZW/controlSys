import request from '@/utils/request'
/**
 * 机构管理
 */
/**
 * 机构的新增和修改
 * @export
 * @param {any} obj
 * @returns 成功或者失败。
 */
export function addOrUpdateInstitution (obj) {
  return request({
    url: '/api/institution/addOrUpdateInstitution',
    method: 'post',
    data: obj
  })
}
/**
 * 按搜索条件分页获取机构集合
 * @export
 * @param {any} pageNumber
 * @param {any} pageSize
 * @returns data
 */
export function listInstitution (pageNumber, pageSize) {
  return request({
    url: '/api/institution/listInsitution',
    method: 'get',
    params: {
      pageNumber,
      pageSize
    }
  })
}
/**
 * 通过id获取单个机构信息
 * @export
 * @param {any} id
 * @returns data
 */
export function getInstitution (id) {
  return request({
    url: '/api/institution/getInstitution',
    method: 'get',
    params: {
      id
    }
  })
}
/**
 * 删除机构
 * @export
 * @param {any} institutionIds 要删除的机构id的集合
 * @returns 成功或者失败。
 */
export function deleteInstitution (institutionIds) {
  return request({
    url: '/api/institution/deleteInstitution',
    method: 'post',
    data: {
      institutionIds
    }
  })
}
/**
 * 部门管理
 */
/**
 * 新增或者修改部门
 * @export
 * @param {any} obj
 * @returns data
 */
export function addOrUpdateDepartment (obj) {
  return request({
    url: '/api/department/addOrUpdateDepartment',
    method: 'post',
    data: obj
  })
}
/**
 * 通过搜索条件分页获取全部部门信息
 * @export
 * @param {any} pageNumber
 * @param {any} pageSize
 * @returns data
 */
export function listDepartment (pageNumber, pageSize) {
  return request({
    url: '/api/department/listDepartment',
    method: 'get',
    params: {
      pageNumber,
      pageSize
    }
  })
}
/**
 * 通过id获取单个部门信息
 * @export
 * @param {any} id
 * @returns data
 */
export function getDepartment (id) {
  return request({
    url: '/api/department/getDepartment',
    method: 'get',
    params: {
      id
    }
  })
}
/**
 * 删除部门
 * @export
 * @param {any} institutionIds 要删除的部门id的集合
 * @returns 成功或者失败。
 */
export function deleteDepartment (departmentIds) {
  return request({
    url: '/api/department/deleteDepartment',
    method: 'post',
    data: {
      departmentIds
    }
  })
}
/**
 * 用户管理
 */
/**
 * 新增或者修改用户信息
 * @export
 * @param {any} obj
 * @returns data
 */
export function addOrUpdateUser (obj) {
  return request({
    url: '/api/user/addOrUpdateUser',
    method: 'post',
    data: obj
  })
}
/**
 * 通过搜索条件分页获取用户信息
 * @export
 * @param {any} pageNumber
 * @param {any} pageSize
 * @returns data
 */
export function listUser (pageNumber, pageSize, userType) {
  return request({
    url: '/api/user/listUser',
    method: 'get',
    params: {
      pageNumber,
      pageSize,
      userType
    }
  })
}
/**
 * 通过用户id获取单个用户信息
 * @export
 * @param {any} id
 * @returns data
 */
export function getUser (id) {
  return request({
    url: '/api/user/getUser',
    method: 'get',
    params: {
      id
    }
  })
}
/**
 * 通过id删除用户信息
 * @export
 * @param {any} userIds 要删除的用户id的集合
 * @returns 成功或者失败。
 */
export function deleteUser (userIds) {
  return request({
    url: '/api/user/deleteUser',
    method: 'post',
    data: {
      userIds
    }
  })
}
/**
 * 更改用户密码
 * @export
 * @param {any} id 用户id
 * @param {any} newPwd 新密码 obj包括id 和 newPwd
 * @returns 成功或者失败。
 */
export function updateUserPwd (obj) {
  return request({
    url: '/api/user/updateUserPwd',
    method: 'post',
    data: obj
  })
}
/**
 * 返回所有在线用户（不分页）
 * @export
 * @returns 成功或者失败。
 */
export function listOnlineUser () {
  return request({
    url: '/api/user/listOnlineUser',
    method: 'get',
    params: {}
  })
}
/**
 * 返回日志
 * @export
 * @returns list
 */
export function listUserOpLog (obj) {
  return request({
    url: '/api/user/listUserOpLog',
    method: 'get',
    params: obj
  })
}
