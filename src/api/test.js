/*
 * @Descripttion:
 * @Author: shenqiang
 * @Date: 2021-11-25 11:52:48
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-11-27 15:35:01
 */
import request from '@/utils/request'
export function getTestData(data) {
  return request({
    url: '/test/testData',
    method: 'get',
    params: data
  })
}
export function getTestList(data) {
  return request({
    url: '/test/testList',
    method: 'get',
    params: data
  })
}

export function getThirdTable(data) {
  return request({
    url: '/test/thirdTableData',
    method: 'post',
    data: data
  })
}

export function getArticleTable(data) {
  return request({
    url: '/test/articleTableData',
    method: 'post',
    data: data
  })
}

export function multipleTableData(data) {
  return request({
    url: '/test/multipleTableData',
    method: 'post',
    data: data
  })
}
