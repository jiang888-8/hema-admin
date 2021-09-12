import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: 'https://www.liulongbin.top:8888/api/private/v1/'
})

// 请求拦截器
request.interceptors.request.use(config => {
  // console.log(config)
  if (store.state.user) {
    // 配置请求头
    config.headers.Authorization = 'Bearer ' + store.state.user.token
  }
  return config
})

// 响应拦截器
request.interceptors.response.use(res => {
  return res.data
})
export default request
