<!--
 * @Description: 标题组件
 * @Author: panwenda
 * @Date: 2021-11-12 10:13:48
 * @LastEditors: panwenda
 * @LastEditTime: 2021-11-29 14:31:35
-->

<template>
  <div class="section-title" :style="{ background: background, color: fontColor, padding: `${verticalPadding}px 0` }">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'SectionTitle',
  components: {},
  computed: {},
  props: {
    background: {
      type: String,
      default: ''
    },

    verticalPadding: {
      type: Number,
      default: 0
    },

    text: {
      type: String,
      default: ''
    },

    fontColor: {
      type: String,
      default: ''
    }
  },
  data () {
    return {}
  },
  watch: {},
  methods: {}
}
</script>

<style lang="less" scoped>
  .section-title {
  }
</style>
