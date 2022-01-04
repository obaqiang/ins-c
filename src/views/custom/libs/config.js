/*
 * @Description: 组件配置文件
 * @Author: panwenda
 * @Date: 2021-11-11 15:22:10
 * @LastEditors: panwenda
 * @LastEditTime: 2021-11-17 11:07:06
 */

// 首页组件
export const homeComponents = [
  {
    config: {
      tag: 'search-input',
      tagIcon: 'search',
      label: '搜索框'
    },
    attr: {
      background: '',
      verticalPadding: 0
    }
  },
  {
    config: {
      tag: 'section-title',
      tagIcon: 'font-size',
      label: '标题'
    },
    attr: {
      background: '',
      verticalPadding: 0,
      text: '默认标题',
      fontColor: ''
    }
  },
  {
    config: {
      tag: 'classified-navigation',
      tagIcon: 'table',
      label: '分类导航'
    },
    attr: {
      background: '',
      verticalPadding: 0,
      text: '默认标题'
    }
  }
]

// 个人中心组件
export const mineComponents = [
  {
    config: {
      tag: 'search-input',
      tagIcon: 'search',
      label: '搜索框'
    },
    attr: {
      background: '',
      verticalPadding: 0
    }
  }
]
