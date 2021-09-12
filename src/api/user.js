import request from '@/utils/request.js'

/**
 * 登录验证接口
 * @param {*} data {username,password}
 * @returns promise
 */
export const loginCheck = (data) => {
  return request({
    url: 'login',
    method: 'POST',
    data
  })
}
