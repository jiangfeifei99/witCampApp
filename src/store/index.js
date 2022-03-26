import Vue from 'vue'
import Vuex from 'vuex'
import userinfo from './modules/userinfo'
import home from './modules/home'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
      userinfo,
      home,
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
})
