/*
 * @Descripttion:
 * @Author: shenqiang
 * @Date: 2021-11-25 11:28:51
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-14 15:14:28
 */
import Mock from 'mockjs2'

// import { builder } from '../util'
const testData = {
  code: '0000',
  message: '处理成功',
  body: {
    a: 1,
    b: 2
  }
}
const testList = {
  code: '0000',
  message: '处理成功',
  body: {
    list: [
      {
        a: 1,
        b: 2
      }
    ],
    pageNum: 1,
    pageSize: 20,
    total: 30,
    totalPage: 3
  }
}
const tableData = []
for (let i = 0; i < 100; i++) {
  tableData.push({
    id: i,
    no: 'dsaddadsasdsadsa',
    name: '微信小程序1',
    appId: '12312312312'
  })
}
const multipleData = []
for (let i = 0; i < 100; i++) {
  multipleData.push({
    id: i,
    no: 'dsaddadsasdsadsa',
    name: '微信小程序1',
    type: 1,
    status: '12312312312',
    do: 1
  })
}
const thirdTableData = {
  code: '0000',
  message: '处理成功',
  body: {
    list: tableData,
    pageNum: 1,
    pageSize: 10,
    total: 100,
    totalPage: 10
  }
}

const articleData = []
for (let i = 0; i < 100; i++) {
  articleData.push({
    id: i,
    no: 'dsaddadsasdsadsa',
    name: '杭州',
    proNum: 1,
    status: 1,
    createTime: 123123123
  })
}
const articleTableData = {
  code: '0000',
  message: '处理成功',
  body: {
    list: articleData,
    pageNum: 1,
    pageSize: 10,
    total: 100,
    totalPage: 10
  }
}

const multipleTableData = {
  code: '0000',
  message: '处理成功',
  body: {
    list: multipleData,
    pageNum: 1,
    pageSize: 10,
    total: 100,
    totalPage: 10
  }
}
const articleList = {
  body: {
    list: [
      {
        appIds: [],
        code: '1',
        content: '',
        createTime: '123123',
        id: 0,
        productCount: 0,
        sort: 0,
        status: 1,
        subtitle: '',
        title: '文章标题',
        updateTime: '',
        viewCount: 0,
        visualViewCount: 0
      }
    ],
    pageNum: 0,
    pageSize: 0,
    total: 0,
    totalPage: 0
  },
  code: '',
  message: ''
}

const lawList = {
  body: {
    list: [
      {
        appIds: [],
        code: 0,
        companyId: 0,
        companyName: '',
        configName: '',
        createTime: '',
        creator: '',
        creatorId: 0,
        description: '',
        fileDetailUrl: '',
        id: 0,
        slCompanyId: 0,
        slCompanyName: '',
        updateName: '',
        updateTime: '',
        updaterId: 0
      }
    ],
    pageNum: 0,
    pageSize: 0,
    total: 0,
    totalPage: 0
  },
  code: '',
  message: ''
}

Mock.mock(/\/test\/testData/, 'get', testData)
Mock.mock(/\/test\/testList/, 'get', testList)

Mock.mock(/\/test\/thirdTableData/, 'post', thirdTableData)

Mock.mock(/\/test\/articleTableData/, 'post', articleTableData)
Mock.mock(/\/test\/multipleTableData/, 'post', multipleTableData)

Mock.mock(/\/test\/multipleTableData/, 'post', multipleTableData)

Mock.mock(/\/v1\/articles/, 'get', articleList)
Mock.mock(/\/v1\/legal-configs/, 'get', lawList)
