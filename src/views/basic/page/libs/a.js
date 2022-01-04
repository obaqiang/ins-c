/*
 * @Descripttion:
 * @Author: shenqiang
 * @Date: 2021-12-29 10:14:52
 * @LastEditors: shenqiang
 * @LastEditTime: 2022-01-04 14:47:13
 */
export const aComps = [
  {
    config: {
      key: 'guide',
      tag: 'search-comp',
      editTag: 'edit-search',
      tagIcon: 'icon-chaxun',
      label: '搜索栏',
      draggable: true
    },
    attr: {
      editStyle: 1,
      bgColor: ''
    }
  },
  {
    config: {
      key: 'product',
      tag: 'search-comp',
      editTag: 'edit-product',
      tagIcon: 'icon-chanpinmokuai',
      label: '产品模块',
      draggable: true
    },
    attr: {
      editStyle: 1,
      titleColor: '#333333',
      bgColor: '#ffffff',
      distance: 0,
      dragArr: [{ id: 1, title: '', listStyle: 1, tags: [] }]
    }
  },
  {
    config: {
      key: 'themenav',
      tag: 'themenav-comp',
      editTag: 'edit-themenav',
      tagIcon: 'icon-zhutidaohang',
      label: '主题导航',
      draggable: true
    },
    attr: {
      title: '主题导航',
      editStyle: 4,
      bgColor: '#ffffff',
      titleColor: '#333333',
      distance: 0,
      dragArr: [
        {
          id: 1,
          imgUrl:
            'http://gateway.qa.lyplus.cn/lvyou-base/v1/file/download?fileId=94d4ff23653f4cc498faa55db72c4dca638223249443913728.png',
          title: '周边游',
          jumpType: 1,
          productTags: [],
          url: '',
          appId: '',
          appPath: ''
        },
        {
          id: 2,
          imgUrl:
            'http://gateway.qa.lyplus.cn/lvyou-base/v1/file/download?fileId=45af79a0ec7d44c18ee31da9eb77df38638223441224269824.png',
          title: '境内游',
          jumpType: 1,
          productTags: [],
          url: '',
          appId: '',
          appPath: ''
        },
        {
          id: 3,
          imgUrl:
            'http://gateway.qa.lyplus.cn/lvyou-base/v1/file/download?fileId=149d0fec128a43cb97ba408976084cdf638223619167617024.png',
          title: '酒景玩乐',
          jumpType: 1,
          productTags: [],
          url: '',
          appId: '',
          appPath: ''
        },
        {
          id: 4,
          imgUrl:
            'http://gateway.qa.lyplus.cn/lvyou-base/v1/file/download?fileId=98bbd5286dc04e0ea475236acff8aafc638223782183436288.png',
          title: '全球购',
          jumpType: 1,
          productTags: [],
          url: '',
          appId: '',
          appPath: ''
        }
      ]
    }
  },
  {
    config: {
      key: 'classnav',
      tag: 'classnav-comp',
      editTag: 'edit-themenav',
      tagIcon: 'icon-fenleidaohang',
      label: '分类导航',
      draggable: true
    },
    attr: {
      title: '分类导航',
      editStyle: 4,
      bgColor: '#ffffff',
      titleColor: '#333333',
      dragArr: [
        {
          id: 1,
          imgUrl:
            'http://gateway.qa.lyplus.cn/lvyou-base/v1/file/download?fileId=859b9177a3d240ac80be56ad67b30590638225670693978112.png',
          title: '跟团游',
          jumpType: 1,
          productTags: [],
          url: '',
          appId: '',
          appPath: ''
        },
        {
          id: 2,
          imgUrl:
            'http://gateway.qa.lyplus.cn/lvyou-base/v1/file/download?fileId=45af79a0ec7d44c18ee31da9eb77df38638223441224269824.png',
          title: '亲自游',
          jumpType: 1,
          productTags: [],
          url: '',
          appId: '',
          appPath: ''
        },
        {
          id: 3,
          imgUrl:
            'http://gateway.qa.lyplus.cn/lvyou-base/v1/file/download?fileId=149d0fec128a43cb97ba408976084cdf638223619167617024.png',
          title: '周末游',
          jumpType: 1,
          productTags: [],
          url: '',
          appId: '',
          appPath: ''
        },
        {
          id: 4,
          imgUrl:
            'http://gateway.qa.lyplus.cn/lvyou-base/v1/file/download?fileId=98bbd5286dc04e0ea475236acff8aafc638223782183436288.png',
          title: '人文历史',
          jumpType: 1,
          productTags: [],
          url: '',
          appId: '',
          appPath: ''
        },
        {
          id: 5,
          imgUrl:
            'http://gateway.qa.lyplus.cn/lvyou-base/v1/file/download?fileId=98bbd5286dc04e0ea475236acff8aafc638223782183436288.png',
          title: '休闲',
          jumpType: 1,
          productTags: [],
          url: '',
          appId: '',
          appPath: ''
        },
        {
          id: 6,
          imgUrl:
            'http://gateway.qa.lyplus.cn/lvyou-base/v1/file/download?fileId=98bbd5286dc04e0ea475236acff8aafc638223782183436288.png',
          title: '研学',
          jumpType: 1,
          productTags: [],
          url: '',
          appId: '',
          appPath: ''
        },
        {
          id: 7,
          imgUrl:
            'http://gateway.qa.lyplus.cn/lvyou-base/v1/file/download?fileId=98bbd5286dc04e0ea475236acff8aafc638223782183436288.png',
          title: '定制游',
          jumpType: 1,
          productTags: [],
          url: '',
          appId: '',
          appPath: ''
        },
        {
          id: 8,
          imgUrl:
            'http://gateway.qa.lyplus.cn/lvyou-base/v1/file/download?fileId=98bbd5286dc04e0ea475236acff8aafc638223782183436288.png',
          title: '养生',
          jumpType: 1,
          productTags: [],
          url: '',
          appId: '',
          appPath: ''
        }
      ]
    }
  },
  {
    config: {
      key: 'classnav',
      tag: 'tour-comp',
      editTag: 'edit-tour',
      tagIcon: 'icon-hangcheng',
      label: '行程',
      draggable: true
    },
    attr: {
      title: '行程',
      titleColor: '#333333'
    }
  },
  {
    config: {
      key: 'classnav',
      tag: 'quick-pay-comp',
      editTag: 'edit-tour',
      tagIcon: 'icon-kuaijiezhifu',
      label: '快捷支付',
      draggable: true
    },
    attr: {
      editStyle: 1,
      textColor: '#333333',
      distance: 0
    }
  }
]
