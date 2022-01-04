/*
 * @Descripttion:
 * @Author: shenqiang
 * @Date: 2021-12-18 16:19:16
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-21 17:11:50
 */
import request from '@/utils/request'
import { apiTagList } from '../api-tag-list.js'
/**
 * @description:查询列表
 * @params {*}
 * @return {*}
 * @param {*} data
 */
export function getPlatFormList(data) {
  return request({
    url: `${apiTagList.wechatTag}/wx-open-platform/list`,
    method: 'get',
    params: data
  })
}
/**
 * @description: 删除
 * @params {*}
 * @return {*}
 * @param {*} platformId
 */
export function deletePlatFormList(platformId) {
  return request({
    url: `${apiTagList.wechatTag}/wx-open-platform/${platformId}`,
    method: 'delete'
  })
}
/**
 * @description: 编辑
 * @params {*}
 * @return {*}
 * @param {*} platformId
 */
export function editPlatFormList(platformId, data) {
  return request({
    url: `${apiTagList.wechatTag}/wx-open-platform/${platformId}`,
    method: 'put',
    data: data
  })
}
/**
 * @description: 添加
 * @params {*}
 * @return {*}
 * @param {*} platformId
 */
export function plusPlatFormList(data) {
  return request({
    url: `${apiTagList.wechatTag}/wx-open-platform`,
    method: 'post',
    data: data
  })
}

/**
 * @description: 第三方平台升级
 * @params {*}
 * @return {*}
 * @param {*} data
 */
export function upgradeThird(thirdPartyAppId) {
  return request({
    url: `${apiTagList.wechatTag}/wx-template-version/codeUpgrade/${thirdPartyAppId}`,
    method: 'post'
  })
}
