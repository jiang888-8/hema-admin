import request from '@/utils/request.js'
export const getorderList = params => {
  return request({
    url: '/orders',
    method: 'GET',
    params
  })
}
export const Rules = type => {
  return request({
    url: 'rights/' + type,
    method: 'GET'

  })
}
export const userFrom = () => {
  return request({
    url: 'reports/type/1',
    method: 'GET'
  })
}
