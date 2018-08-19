import request from '@/utils/request'
export function listMasker () {
  return request({
    url: '/api/propertyManager/listMasker',
    method: 'post',
    data: {
    }
  })
}
export function listDeviceRepaireStatistic (startDate,endDate) {
    return request({
      url: '/api/propertyManager/listMasker',
      method: 'post',
      data: {
        startDate,
        endDate
      }
    })
  }