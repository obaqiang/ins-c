/*
 * @Description: 社群管理
 * @Author: panwenda
 * @Date: 2021-12-25 10:33:21
 * @LastEditors: panwenda
 * @LastEditTime: 2021-12-30 16:40:39
 */

import request from '@/utils/request'
import { apiTagList } from '../api-tag-list.js'

/**
 * @description 获取群列表
 */
export function getGroupList (data) {
  return request({
    url: `${apiTagList.wechatTag}/qy-groups`,
    method: 'get',
    params: data
  })
}

/**
 * @description 增加群
 */
export function addGroup (data) {
  return request({
    url: `${apiTagList.wechatTag}/qy-groups`,
    method: 'post',
    data: data
  })
}

/**
 * @description 删除群
 */
export function deleteGroup (id) {
  return request({
    url: `${apiTagList.wechatTag}/qy-groups/${id}`,
    method: 'delete'
  })
}

/**
 * @description 获取群成员
 */
export function getGroupMember (chatId) {
  return request({
    url: `${apiTagList.wechatTag}/qy-groups/member/${chatId}`,
    method: 'get'
  })
}

/**
 * @description 获取进群联系人列表
 */
export function getGroupContactList () {
  return request({
    url: `${apiTagList.wechatTag}/qy-group-contacts`,
    method: 'get'
  })
}

/**
 * @description 编辑进群联系人信息
 */
 export function editContactInfo (id, data) {
  return request({
    url: `${apiTagList.wechatTag}/qy-group-contacts/${id}`,
    method: 'put',
    data: data
  })
}

/**
 * @description 获取部门列表
 */
export function getDepartmentList (id) {
  return request({
    url: `${apiTagList.wechatTag}/qy-groups/department/${id}`,
    method: 'get'
  })
}

/**
 * @description 获取人员列表
 */
export function getUserList (departmentId) {
  return request({
    url: `${apiTagList.wechatTag}/qy-groups/user/${departmentId}`,
    method: 'get'
  })
}

/**
 * @description 获取企业微信配置
 */
export function getWechatConfig () {
  return request({
    url: `${apiTagList.wechatTag}/dct-qy-wechat-secret`,
    method: 'get'
  })
}

/**
 * @description 更新企业微信配置
 */
export function updateWechatConfig (data) {
  return request({
    url: `${apiTagList.wechatTag}/dct-qy-wechat-secret`,
    method: 'put',
    data: data
  })
}
