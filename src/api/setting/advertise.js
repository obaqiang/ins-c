/*
 * @Description: 广告配置
 * @Author: panwenda
 * @Date: 2021-12-22 14:32:06
 * @LastEditors: panwenda
 * @LastEditTime: 2021-12-31 14:49:45
 */

import request from '@/utils/request'
import { apiTagList } from '../api-tag-list.js'

/**
 * @description 获取广告列表
 */
export function getAdvertiseList(data) {
  return request({
    url: `${apiTagList.wechatTag}/advertises`,
    method: 'get',
    params: data
  })
}

/**
 * @description 添加广告
 */
 export function addAdvertise(data) {
  return request({
    url: `${apiTagList.wechatTag}/advertises`,
    method: 'post',
    params: data
  })
}

/**
 * @description 删除广告
 */
 export function deleteAdvertise(id) {
  return request({
    url: `${apiTagList.wechatTag}/advertises/${id}`,
    method: 'delete'
  })
}
