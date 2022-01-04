/*
 * @Descripttion:
 * @Author: shenqiang
 * @Date: 2021-11-16 19:25:15
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-24 16:55:41
 */
import axios from 'axios'
// import store from '@/store'
import storage from 'store'
import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
import { ACCESS_TOKEN } from '@/store/mutation-types'
/**
 * @description: 接口返回体校验
 * @params {*}
 * @return {*}
 */
function checkRes(res, url) {
  const { code } = res
  if (!code) {
    notification.error({
      message: 'Forbidden',
      description: '接口返回不规范，code格式错误'
    })
  }
  const errCodeObj = {
    '0000': () => {
      return console.log('处理成功')
    },
    '0001': () => {
      return console.log('处理失败')
    },
    2000: () => {
      return console.log('抛出参数')
    },
    2001: () => {
      return console.log('无效参数')
    },
    2002: () => {
      return console.log('参数值错误')
    },
    2003: () => {
      return console.log('未知参数错')
    },
    3000: () => {
      return console.log('未登录')
    },
    3001: () => {
      return console.log('未授权操作')
    },
    3002: () => {
      return console.log('无效token')
    },
    3003: () => {
      return console.log('token错误')
    },
    4000: () => {
      return console.log('资源被占用')
    },
    4001: () => {
      return console.log('资源不足')
    },
    4002: () => {
      return console.log('资源不存在')
    },
    4003: () => {
      return console.log('没有资源权')
    },
    5000: () => {
      return console.log('系统内部异')
    },
    6000: () => {
      return console.log('外部调用异')
    }
  }
  errCodeObj[code] && errCodeObj[code]()
}
// 创建 axios 实例
const request = axios.create({
  // API 请求的默认前缀
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 6000 // 请求超时时间
})

// 异常拦截处理器
const errorHandler = (error) => {
  if (error.response) {
    // const data = error.response.data
    // 从 localstorage 获取 token
    // const token = storage.get(ACCESS_TOKEN)
    // if (error.response.status === 403) {
    //   notification.error({
    //     message: 'Forbidden',
    //     description: data.message
    //   })
    // }
    // if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
    //   notification.error({
    //     message: 'Unauthorized',
    //     description: 'Authorization verification failed'
    //   })
    //   if (token) {
    //     store.dispatch('Logout').then(() => {
    //       setTimeout(() => {
    //         window.location.reload()
    //       }, 1500)
    //     })
    //   }
    // }
  }
  return Promise.reject(error)
}

// request interceptor
request.interceptors.request.use((config) => {
  const token = storage.get(ACCESS_TOKEN)
  // 如果 token 存在
  // 让每个请求携带自定义 token 请根据实际情况自行修改
  if (token) {
    config.headers[ACCESS_TOKEN] = token
  }
  return config
}, errorHandler)

// const whitePermission = ['/user/info']
// response interceptor
request.interceptors.response.use((response) => {
  checkRes(response.data)
  // console.log(response)
  // const { url } = response.config
  // if (!whitePermission.includes(url)) {
  //   if (checkRes(response.data, url)) {
  //     return response.data
  //   } else {
  //     return false
  //   }
  // }
  console.log(response)
  // return response.data
  if (response.data.code === '0000') {
    return response.data
  } else {
    notification.error({
      message: 'Forbidden',
      description: response.data.message
    })
    return false
  }
}, errorHandler)

const installer = {
  vm: {},
  install(Vue) {
    Vue.use(VueAxios, request)
  }
}

export default request

export { installer as VueAxios, request as axios }
