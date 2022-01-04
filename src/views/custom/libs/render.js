/*
 * @Description: 组件渲染
 * @Author: panwenda
 * @Date: 2021-11-11 15:22:42
 * @LastEditors: panwenda
 * @LastEditTime: 2021-11-11 15:40:32
 */

export default {
  props: {
    componentInfo: {
      type: Object,
      required: true
    }
  },
  methods: {
  },
  render (h) {
    return h(this.componentInfo.config.tag, {
      attrs: {
        ...this.componentInfo.attr
      }
    })
  }
}
