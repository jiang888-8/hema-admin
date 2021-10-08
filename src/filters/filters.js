import dayjs from 'dayjs'
// 导入语言包
import 'dayjs/locale/zh-cn'
// 导入相对时间插件
import relativeTime from 'dayjs/plugin/relativeTime'

// 给dayjs集成方法
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

export const formatDate = (data) => {
  return dayjs().to(data)
}

export const formatDates = (data) => {
  const time = new Date(data * 1000)
  var year = time.getFullYear()
  var month = time.getMonth() + 1
  month = month < 10 ? '0' + month : month
  var date = time.getDate()
  date = date < 10 ? '0' + date : date
  var hour = time.getHours()
  hour = hour < 10 ? '0' + hour : hour
  var minute = time.getMinutes()
  minute = minute < 10 ? '0' + minute : minute
  var second = time.getSeconds()
  second = second < 10 ? '0' + second : second
  return year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
}

export const dataFormat = (originVal) => {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  // yyyy-mm-dd hh:mm:ss
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
}
