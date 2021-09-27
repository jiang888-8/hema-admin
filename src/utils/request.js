import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'

const request = axios.create({
  baseURL: 'https://www.liulongbin.top:8888/api/private/v1/'
})

// 请求拦截器
request.interceptors.request.use(config => {
  // console.log(config)
  if (store.state.user) {
    // 配置请求头
    config.headers.Authorization = store.state.user
  }
  return config
})

// 响应拦截器
request.interceptors.response.use(res => {
  if (res.data.meta.status === 200 || res.data.meta.status === 201) {
    Message.success(res.data.meta.msg)
  } else {
    Message.error(res.data.meta.msg)
  }
  return res.data
})
export default request
