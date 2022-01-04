/*
 * @Descripttion:
 * @Author: shenqiang
 * @Date: 2021-12-20 14:58:21
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-27 19:06:27
 */
import request from '@/utils/request'
import { apiTagList } from '../api-tag-list.js'
/**
 * @description: 查询
 * @params {*}
 * @return {*}
 * @param {*} data
 */
export function getList(data) {
  return request({
    url: `${apiTagList.wechatTag}/wx-mini-program-info/list`,
    method: 'get',
    params: data
  })
}

/**
 * @description: 接入小程序
 * @params {*}
 * @return {*}
 * @param {*} data
 */
export function plusMini(data) {
  return request({
    url: `${apiTagList.wechatTag}/wx-mini-program-info`,
    method: 'post',
    data: data
  })
}

/**
 * @description: 停用
 * @params {*}
 * @return {*}
 * @param {*} data
 */
export function pauseMini(id) {
  return request({
    url: `${apiTagList.wechatTag}/wx-mini-program-info/${id}`,
    method: 'delete'
  })
}

/**
 * @description: 编辑
 * @params {*}
 * @return {*}
 * @param {*} data
 */
export function editMini(id, data) {
  return request({
    url: `${apiTagList.wechatTag}/wx-mini-program-info/${id}`,
    method: 'put',
    data: data
  })
}
/**
 * @description: 获取app模板列表
 * @params {*}
 * @return {*}
 * @param {*} data
 */
export function getTem(data) {
  return request({
    url: `${apiTagList.wechatTag}/wx-template-version/getVersions`,
    method: 'get',
    params: data
  })
}
/**
 * @description: 获取历史版本
 * @params {*}
 * @return {*}
 * @param {*} data
 */
export function getHis(data) {
  return request({
    url: `${apiTagList.wechatTag}/wx-app-audit-info/getAuditInfoHistory`,
    method: 'get',
    params: data
  })
}
/**
 * @description: 代码模板自动升级
 * @params {*}
 * @return {*}
 * @param {*} thirdPartyAppId
 */
export function updateTemp(data) {
  return request({
    url: `${apiTagList.wechatTag}/wx-mini-program-info/codeUpgrade`,
    method: 'post',
    data: data
  })
}

/**
 * @description: 获取第三方平台appId和token
 * @params {*}
 * @return {*}
 * @param {*} data
 */
export function getAccessToken(appId) {
  return request({
    url: `${apiTagList.wechatTag}/wx-app-auth-message/getAccessToken/${appId}`,
    method: 'get'
  })
}
/**
 * @description: 授权
 * @params {*}
 * @return {*}
 * @param {*} thirdPartyAppId
 */
export function authApp(thirdPartyAppId) {
  return request({
    url: `${apiTagList.wechatTag}/wx-component-ticket/getAuthPage/${thirdPartyAppId}`,
    method: 'get',
    headers: {
      Host: 'http://mall.lyplus.cn',
      Origin: 'http://mall.lyplus.cn',
      Referer: 'http://mall.lyplus.cn'
    }
  })
}

/**
 * @description: 版本回退
 * @params {*}
 * @return {*}
 * @param {*} appId
 */
export function revertVersion(data) {
  return request({
    url: `${apiTagList.wechatTag}/wx-app-audit-info/revertCodeVersion`,
    method: 'get',
    params: data
  })
}
