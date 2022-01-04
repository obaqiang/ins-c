/*
 * @Description: 组件渲染
 * @Author: panwenda
 * @Date: 2021-11-11 15:22:42
 * @LastEditors: shenqiang
 * @LastEditTime: 2022-01-04 11:30:02
 */

export default {
  props: {
    componentInfo: {
      type: Object,
      required: true
    }
  },
  methods: {},
  render(h) {
    console.log('渲染', this.componentInfo)
    return h(this.componentInfo.config.tag, {
      attrs: {
        ...this.componentInfo.attr
      },
      key: this.componentInfo.id
    })
  }
}
