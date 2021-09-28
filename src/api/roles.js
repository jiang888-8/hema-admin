import request from '@/utils/request.js'

/**
 *
 * @returns 获取角色列表数据
 */
export const getRolerList = () => {
  return request({
    url: 'roles'
  })
}

/**
 *
 * @returns 获取权限列表数据
 */
export const getTreeList = (type) => {
  return request({
    url: 'rights/' + type
  })
}

/**
 *
 * @returns  删除角色指定权限
 */
export const DeleteRoler = (roleId, rightId) => {
  return request({
    url: 'roles/' + roleId + '/rights/' + rightId,
    method: 'delete'
  })
}

/**
 *
 * @returns  添加角色
 */
export const addRolerList = (data) => {
  return request({
    url: 'roles',
    method: 'POST',
    data
  })
}

/**
 * 设置权限
 * @param {} roleId
 * @param {*} data
 * @returns
 */
export const RoleAuthorization = (roleId, data) => {
  return request({
    url: 'roles/' + roleId + '/rights',
    method: 'POST',
    data
  })
}

/**
 *  删除角色
 * @param {*} Id
 * @returns
 */
export const DeleteRolerAll = (Id) => {
  return request({
    url: 'roles/' + Id,
    method: 'delete'
  })
}
