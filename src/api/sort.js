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
