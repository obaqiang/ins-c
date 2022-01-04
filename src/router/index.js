/*
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-11-08 11:29:14
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-11-18 10:22:29
 */
import Vue from 'vue'
import Router from 'vue-router'
import { constantRouterMap } from '@/config/router.config'

// hack router push callback
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
  base: '/playmini/',
  mode: 'history',
  routes: constantRouterMap
})
