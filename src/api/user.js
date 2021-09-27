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
/**
 * 获取用户数据列表
 * @param {*} params {query, pagenum,pagesize}
 * @returns promise
 */
export const getUserList = params => {
  return request({
    url: 'users',
    method: 'GET',
    params
  })
}
/**
 * 修改用户状态
 * @param {*} uId 用户id
 * @param {*} type 用户状态
 * @returns promise
 */
export const getUserState = (uId, type) => {
  return request({
    url: 'users/' + uId + '/state/' + type,
    method: 'PUT'
  })
}

/**
 * 修改用户
 * @param {*} data {username password email mobile}
 * @returns promise
 */
export const addUserInfo = data => {
  return request({
    url: 'users',
    method: 'POST',
    data
  })
}

/**
 * 删除用户某一项
 * @param {*} id 用户id
 * @returns promise
 */
export const delUserInfo = id => {
  return request({
    url: 'users/' + id,
    method: 'DELETE'
  })
}

/**
 * 根据id获取用户信息
 * @param {*} id 用户id
 * @returns promise
 */
export const getUserInfo = id => {
  return request({
    url: 'users/' + id,
    method: 'GET'
  })
}

/**
 * 编辑用户信息
 * @param {*} id 用户id
 * @param {*} data email mobile
 * @returns promise
 */
export const editUserInfo = (id, data) => {
  return request({
    url: 'users/' + id,
    method: 'PUT',
    data
  })
}

/**
 * 获取角色列表
 * @returns promise
 */
export const getRoleList = () => {
  return request({
    url: 'roles',
    method: 'GET'
  })
}
/**
 * 分配用户角色
 * @param {*} id 用户id
 * @param {*} data 角色id
 * @returns promise
 */
export const putUserRole = (id, data) => {
  return request({
    url: 'users/' + id + '/role',
    method: 'PUT',
    data: { rid: data }
  })
}
