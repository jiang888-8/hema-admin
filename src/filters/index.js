import Vue from 'vue'
import * as filters from './filters'

// keys()方法拿到的只是名字的数组，没有方法
Object.keys(filters).forEach(item => {
  Vue.filter(item, filters[item])
})
