/*
 * @Description: 专题配置
 * @Author: panwenda
 * @Date: 2021-12-22 16:00:00
 * @LastEditors: panwenda
 * @LastEditTime: 2021-12-31 14:50:00
 */

import request from '@/utils/request'
import { apiTagList } from '../api-tag-list.js'

/**
 * @description 获取专题列表
 */
export function getThemeList(data) {
  return request({
    url: `${apiTagList.wechatTag}/recommend-subjects`,
    method: 'get',
    params: data
  })
}

/**
 * @description 删除专题
 */
export function deleteTheme(id) {
  return request({
    url: `${apiTagList.wechatTag}/recommend-subjects/${id}`,
    method: 'delete'
  })
}
