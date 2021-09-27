import request from '@/utils/request.js'

/**
 *获取列表
 * @param {} params
 * @returns
 */
export const goodCategList = params => {
  return request({
    url: 'categories',
    params
  })
}

/**
 * 添加分类
 * @param {*} data
 * @returns
 */
export const goodAddClass = data => {
  return request({
    url: 'categories',
    method: 'POST',
    data
  })
}

/**
 *
 * @param {删除} id
 * @returns
 */
export const goodDelete = id => {
  return request({
    url: 'categories/' + id,
    method: 'delete'
  })
}
