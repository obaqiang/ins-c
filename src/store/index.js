/*
 * @Descripttion:
 * @Author: shenqiang
 * @Date: 2021-11-08 11:29:14
 * @LastEditors: panwenda
 * @LastEditTime: 2021-12-29 14:07:20
 */
import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'

// default router permission control
// import permission from './modules/permission'
import pangu from './modules/pangu'
import pgper from './modules/pgper'
import community from './modules/community'
import law from './modules/law'
// dynamic router permission control (Experimental)
// import permission from './modules/async-router'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    pgper,
    pangu,
    community,
    law
  },
  state: {},
  mutations: {},
  actions: {},
  getters
})
