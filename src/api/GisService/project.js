/*
 * @Author: Vincent
 * @Date: 2018-06-29 23:26:40
 * @Last Modified by: Vincent
 * @Last Modified time: 2018-06-29 23:44:41
 * @Desc: 项目管理相关接口
 */
import request from '@/utils/request'

/**
 * 根据分页显示项目
 * @export
 * @param {*} pageNumber
 * @param {*} pageSize
 * @returns
 */
export function listProject (pageNumber, pageSize) {
  return request({
    url: '/api/project/listproject',
    method: 'post',
    params: {
      pageNumber,
      pageSize
    }
  })
}
