import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import tab from './modules/tab'
import user from './modules/user'
import dict from './modules/dict'

// default router permission control
import permission from './modules/permission'

// dynamic router permission control (Experimental)
// import permission from './modules/async-router'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    tab,
    user,
    permission,
    dict
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})
