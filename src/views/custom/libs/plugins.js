/*
 * @Description: 插件
 * @Author: panwenda
 * @Date: 2021-11-11 17:30:45
 * @LastEditors: panwenda
 * @LastEditTime: 2021-11-29 14:13:49
 */

const GlobalPlugin = {
  install (Vue, options) {
    /* --------------------------- 全局注册组件 --------------------------- */
    const componentsContext = require.context('../components', false, /.vue$/)
    componentsContext.keys().forEach(key => {
      const componentConfig = componentsContext(key).default
      Vue.component(componentConfig.name, componentConfig)
    })
  }
}

export default GlobalPlugin
