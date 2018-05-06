/*
 * @Author: Vincent
 * @Date: 2018-05-06 15:24:27
 * @Last Modified by: Vincent
 * @Last Modified time: 2018-05-06 16:49:19
 */

import axios from 'axios'
import {
  Message
} from 'element-ui'

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sent
  config.headers['X-Token'] = '' // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => response,
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  })

export default service
