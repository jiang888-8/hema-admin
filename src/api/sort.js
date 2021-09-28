import request from '@/utils/request.js'

/**
 * 获取商品分类数据列表
 * @param {*} params { type?, pagenum?, pagesize? }
 * @returns promise
 */
export const getCategoriesList = params => {
  return request({
    url: 'categories',
    method: 'GET',
    params
  })
}

/**
 * 获取参数列表
 * @param {*} params { id, sel }
 * @returns promise
 */
export const getCategoriesAttributes = (attrId, sel) => {
  return request({
    url: 'categories/' + attrId + '/attributes',
    method: 'GET',
    params: sel
  })
}

/**
 * 添加动态参数或者静态属性
 * @param {*} attrId 分类 ID
 * @param {*} data { attr_name, attr_sel, attr_vals }
 * @returns promise
 */
export const setCategoriesAttributes = (attrId, data) => {
  return request({
    url: 'categories/' + attrId + '/attributes',
    method: 'POST',
    data
  })
}

/**
 * 根据 ID 查询参数
 * @param {*} id 分类 ID
 * @param {*} attrId 属性 ID
 * @param {*} params { attr_sel }
 * @returns promise
 */
export const queryParameters = (id, attrId, params) => {
  return request({
    url: 'categories/' + id + '/attributes/' + attrId,
    params
  })
}

/**
 * 编辑提交参数
 * @param {*} id 分类 ID
 * @param {*} attrId 属性 ID
 * @param {*} params { attr_sel, attr_name, attr_vals? }
 * @returns promise
 */
export const Parameters = (id, attrId, data) => {
  return request({
    url: 'categories/' + id + '/attributes/' + attrId,
    method: 'PUT',
    data
  })
}

/**
 * 删除参数
 * @param {*} id 分类 ID
 * @param {*} attrId 属性 ID
 * @returns promise
 */
export const delParameters = (id, attrId) => {
  return request({
    url: 'categories/' + id + '/attributes/' + attrId,
    method: 'DELETE'
  })
}
