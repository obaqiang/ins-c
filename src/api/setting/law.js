/*
 * @Descripttion: 法律文案
 * @Author: shenqiang
 * @Date: 2021-12-14 15:12:38
 * @LastEditors: panwenda
 * @LastEditTime: 2021-12-31 14:49:54
 */
import request from '@/utils/request'
import { apiTagList } from '../api-tag-list.js'

/**
 * @description 获取法律文案列表
 */
export function getLawList (data) {
  return request({
    url: `${apiTagList.wechatTag}/legal-configs`,
    method: 'get',
    params: data
  })
}

/**
 * @description 更新法律文案配置
 */
export function updateLawConfig (id, data) {
  return request({
    url: `${apiTagList.wechatTag}/legal-configs/${id}`,
    method: 'put',
    data: data
  })
}
