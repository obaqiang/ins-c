/*
 * @Descripttion:
 * @Author: shenqiang
 * @Date: 2021-09-16 13:47:49
 * @LastEditors: shenqiang
 * @LastEditTime: 2022-01-04 10:04:23
 */
// with polyfills
import './public-path'
import 'core-js/stable'
import 'regenerator-runtime/runtime'

import Vue from 'vue'
import App from './App.vue'
import childRouter from './router'
import store from './store/'
import i18n from './locales'
import { VueAxios } from './utils/request'
import ProLayout, { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
// import themePluginConfig from '../config/themePluginConfig'
import VueAwesomeSwiper from 'vue-awesome-swiper'

// mock
// WARNING: `mockjs` NOT SUPPORT `IE` PLEASE DO NOT USE IN `production` ENV.
// import './mock'

import antBootstrap from './core/bootstrap'
import './core/lazy_use' // use lazy load components
import './permission' // permission control
import './utils/filter' // global filter
import './global.less' // global style
// import './styles/globalc.less' // global style changed (suit for ui)
import actions from './actions/index'
import { buildDirective, buildPer } from '@onecoffee/coffeedirective'
import vcolorpicker from 'vcolorpicker'

import buildIcon from '@onecoffee/coffeeicon'
import { Icon } from 'ant-design-vue'

Vue.use(vcolorpicker)
Vue.config.productionTip = false
buildIcon(Icon, Vue)
buildDirective(Vue)
buildPer(Vue, store)
// mount axios to `Vue.$http` and `this.$http`
Vue.use(VueAxios)
Vue.use(VueAwesomeSwiper)
// use pro-layout components
Vue.component('pro-layout', ProLayout)
Vue.component('page-container', PageHeaderWrapper)
Vue.component('page-header-wrapper', PageHeaderWrapper)

// window.umi_plugin_ant_themeVar = themePluginConfig.theme

let router = null
let instance = null
function render(props = {}) {
  const { container } = props
  router = childRouter
  instance = new Vue({
    router,
    store,
    i18n,
    created: antBootstrap,
    render: (h) => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}
// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render()
}
export async function bootstrap() {
  console.log('[vue] vue app bootstraped')
}
export async function mount(props) {
  console.log('[vue] props from main framework', props)
  // 注入actions实例
  actions.setActions(props)
  render(props)
}
export async function unmount() {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
  router = null
}
