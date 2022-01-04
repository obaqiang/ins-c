/*
 * @Descripttion:
 * @Author: shenqiang
 * @Date: 2021-12-14 11:34:41
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-22 11:26:40
 */
import request from '@/utils/request'
import { apiTagList } from '../api-tag-list'
/**
 * @description: 获取文章列表
 * @params {*}
 * @return {*}
 * @param {*} data
 */
export function getArticleList(data) {
  return request({
    url: `${apiTagList.wechatTag}/articles`,
    method: 'get',
    params: data
  })
}
