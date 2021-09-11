import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }
Vue.use(ElementUI)
