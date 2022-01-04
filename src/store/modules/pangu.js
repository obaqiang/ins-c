/*
 * @Descripttion:
 * @Author: shenqiang
 * @Date: 2021-12-13 10:22:36
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-13 15:52:14
 */
// import { getBaseUserInfo } from '@/api/user'

const panguUser = {
  state: {
    pgInfo: {}
  },
  mutations: {
    SET_PGINFO: (state, info) => {
      state.pgInfo = info
      console.log('设置之后的pageInfo', state.pgInfo)
    }
  },
  actions: {}
}
export default panguUser
