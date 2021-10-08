import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'
import './Element'

import '@/filters'
import TreeTable from 'vue-table-with-tree-grid'

Vue.component('tree-table', TreeTable)

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
