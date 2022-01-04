/*
 * @Descripttion:
 * @Author: shenqiang
 * @Date: 2021-12-24 10:52:51
 * @LastEditors: shenqiang
 * @LastEditTime: 2022-01-04 11:29:33
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
    return h(this.componentInfo.config.editTag, {
      attrs: {
        ...this.componentInfo.attr
      },
      props: {
        ...this.componentInfo.attr
      },
      key: this.componentInfo.id
    })
  }
}
