/*
 * @Description: 法律文案
 * @Author: panwenda
 * @Date: 2021-12-28 09:45:35
 * @LastEditors: panwenda
 * @LastEditTime: 2021-12-29 14:15:44
 */

export default {
  namespaced: true,
  state: {
    lawConfigureInfo: {} // 需要配置的法律文案信息
  },
  mutations: {
    /**
     * 设置需要配置的法律文案信息
     */
     SET_LAW_CONFIGURE_INFO: (state, info) => {
      state.lawConfigureInfo = info
    }
  }
}
