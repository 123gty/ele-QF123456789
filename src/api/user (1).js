import request from '@/utils/axios'

// 用户登录
export function logIn (data) {
  return request({
    url: '/static/mock/login.json',
    method: 'GET',
    data
  })
}
