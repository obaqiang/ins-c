/*
 * @Description: 社群管理
 * @Author: panwenda
 * @Date: 2021-12-28 09:45:35
 * @LastEditors: panwenda
 * @LastEditTime: 2021-12-28 09:50:48
 */

export default {
  namespaced: true,
  state: {
    groupViewInfo: {} // 需要查看群信息
  },
  mutations: {
    /**
     * 设置需要查看群信息
     */
    SET_GROUP_VIEW_INFO: (state, info) => {
      state.groupViewInfo = info
    }
  }
}
