/*
 * @Descripttion:
 * @Author: shenqiang
 * @Date: 2021-12-22 17:36:55
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-31 11:09:07
 */
export const botComps = [
  {
    config: {
      tag: 'bottom-comp',
      editTag: 'edit-bottom',
      tagIcon: 'icon-dibudaohang',
      label: '底部导航',
      draggable: false
    },
    attr: {
      bgColor: '#ffffff',
      unselectedTextColor: '#333333',
      selectedTextColor: '#0057F0',
      indexData: {
        title: '首页图标',
        status: true,
        sort: 0,
        defaultImg: '',
        imgStyle: '',
        aImg: '',
        bImg: ''
      },
      purData: {
        title: '目的地图标',
        status: false,
        sort: 1,
        defaultImg: '',
        imgStyle: '',
        aImg: '',
        bImg: ''
      },
      disData: {
        title: '发现图标',
        status: false,
        sort: 2,
        defaultImg: '',
        imgStyle: '',
        aImg: '',
        bImg: ''
      },
      myData: {
        title: '我的图标',
        status: false,
        sort: 3,
        defaultImg: '',
        imgStyle: '',
        aImg: '',
        bImg: ''
      },
      selfData: {
        title: '自定义图标',
        status: false,
        sort: 4,
        defaultImg: '',
        imgStyle: '',
        aImg: '',
        bImg: ''
      }
    }
  }
]
