import request from '@/utils/request.js'

/**
 * 获取商品列表数据
 * @param {*} params {query(可选),pagenum,pagesize}
 * @returns promise
 */
export const getGoodsList = (params) => {
  return request({
    url: 'goods',
    method: 'GET',
    params
  })
}

/**
 * 根据id查询商品
 * @param {*} id 商品id
 * @returns promise
 */
export const getGoodSearch = (id) => {
  return request({
    url: 'goods/' + id,
    method: 'GET'
  })
}

/**
 * 添加商品
 * @param {*} data {goods_name,goods_cat,goods_price,goods_number,goods_weight,?goods_introduce,?pics,?attrs}
 * @returns promise
 */
export const addGoods = (data) => {
  return request({
    url: 'goods',
    method: 'post',
    data
  })
}

/**
 * 获取商品分类列表
 * @returns promise
 */
export const getSortList = () => {
  return request({
    url: 'categories',
    method: 'get'
  })
}

/**
 * 删除商品
 * @param {*} id 商品id
 * @returns promise
 */
export const removeGoods = (id) => {
  return request({
    url: 'goods/' + id,
    method: 'delete'
  })
}
