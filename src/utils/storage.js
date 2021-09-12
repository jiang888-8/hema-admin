// 对localStorage进行二次封装

// 获取本地数据
export const getItem = key => {
  const data = localStorage.getItem(key)
  try {
    // JSON字符串
    return JSON.parse(data)
  } catch (err) {
    // 普通字符串
    return data
  }
}

// 保存本地数据
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(key, value)
}

// 删除本地数据
export const removeItem = key => {
  localStorage.removeItem(key)
}
