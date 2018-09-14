import request from '@/utils/request'

export function login (username, password) {
  return request({
    url: '/api/login/Login',
    method: 'post',
    params: {
      loginName: username,
      pwd: password
    }
  })
}

export function getInfo (token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function register (username, password) {
  return request({
    url: '/api/login/register',
    method: 'post',
    params: {
      loginName: username,
      pwd: password
    }
  })
}
export function logout () {
  return request({
    url: '/api/login/Logout',
    method: 'post'
  })
}
