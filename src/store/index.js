import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage.js'

Vue.use(Vuex)

const htglToken = 'HTGL-TOKEN'

export default new Vuex.Store({
  state: {
    user: getItem(htglToken)
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
      setItem(htglToken, payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
