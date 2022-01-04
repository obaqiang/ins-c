/*
 * @Description: 公共接口
 * @Author: panwenda
 * @Date: 2021-12-29 14:26:47
 * @LastEditors: panwenda
 * @LastEditTime: 2021-12-31 14:49:39
 */

import request from '@/utils/request'
import { apiTagList } from '../api-tag-list.js'

/**
 * @description 获取小程序渠道列表
 */
export function getMiniProgramList (companyId) {
  return request({
    url: `${apiTagList.wechatTag}/programs/${companyId}`,
    method: 'get'
  })
}
