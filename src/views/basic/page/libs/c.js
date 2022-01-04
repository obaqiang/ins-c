/*
 * @Descripttion:
 * @Author: shenqiang
 * @Date: 2021-12-29 10:15:00
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-31 10:29:44
 */
export const cComps = [
  {
    config: {
      tag: 'search-comp',
      editTag: 'edit-title',
      tagIcon: 'icon-biaoti',
      label: '标题',
      draggable: true
    },
    attr: {
      background: '',
      verticalPadding: 0
    }
  },
  {
    config: {
      tag: 'blank-comp',
      editTag: 'edit-blank',
      tagIcon: 'icon-fuzhukongbai',
      label: '辅助空白',
      draggable: true
    },
    attr: {
      color: '#F5F5F5',
      height: 20
    }
  },
  {
    config: {
      tag: 'guide-line-comp',
      editTag: 'edit-guide-line',
      tagIcon: 'icon-fuzhuxian',
      label: '辅助线',
      draggable: true
    },
    attr: {
      lineStyle: 1,
      color: '#F5F5F5',
      height: 20
    }
  },
  {
    config: {
      tag: 'rich-comp',
      editTag: 'edit-rich',
      tagIcon: 'icon-fuwenben',
      label: '富文本',
      draggable: true
    },
    attr: {
      height: 20
    }
  },
  {
    config: {
      tag: 'rich-comp',
      editTag: 'edit-video',
      tagIcon: 'icon-shipin',
      label: '视频',
      draggable: true
    },
    attr: {
      height: 20
    }
  }
]
