/*
 * @Author: Ouber23
 * @Date: 2018-07-31 00:25:46
 * @LastEditors: Ouber23
 * @LastEditTime: 2018-07-31 00:27:14
 * @Description: 
 */
import request from '@/utils/request'
/**
 * 1、获取常规能耗统计数据
 * @export
 * @param {*}
 *
 * @returns
 */
export function getCommonEnergyStatistic () {
  return request({
    url: '/api/energyStatistic/getCommonEnergyStatistic',
    method: 'get',
    params: {
    }
  })
}

/**
 * 2、获取每月能耗统计数据
 * @export
 * @param {*}
 *
 * @returns
 */
export function listEnergyStatisticByDay (month) {
  return request({
    url: '/api/energyStatistic/listEnergyStatisticByDay',
    method: 'get',
    params: {
      month: month
    }
  })
}
