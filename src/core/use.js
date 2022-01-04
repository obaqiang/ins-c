/*
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-11-16 19:25:15
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-14 14:41:38
 */
import Vue from 'vue'

// base library
import Antd from 'ant-design-vue'
import Viser from 'viser-vue'
import VueCropper from 'vue-cropper'
import 'ant-design-vue/dist/antd.less'

// ext library
import VueClipboard from 'vue-clipboard2'
// import MultiTab from '@/components/MultiTab'
// import MultiTab from '@onecoffee/coffeemultitab'
import MultiTab from '@/components/CoffeeMultiTab'
import PageLoading from '@/components/PageLoading'
import PermissionHelper from '@/core/permission/permission'
// import '@/components/use'
import './directives/action'
VueClipboard.config.autoSetContainer = true

Vue.use(Antd)
Vue.use(Viser)
Vue.use(MultiTab)
Vue.use(PageLoading)
Vue.use(VueClipboard)
Vue.use(PermissionHelper)
Vue.use(VueCropper)

process.env.NODE_ENV !== 'production' && console.warn('[antd-pro] WARNING: Antd now use fulled imported.')
