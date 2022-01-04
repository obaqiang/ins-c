<!--
 * @Description: 搜索框组件
 * @Author: panwenda
 * @Date: 2021-11-11 17:19:07
 * @LastEditors: panwenda
 * @LastEditTime: 2021-11-29 14:31:46
-->

<template>
  <div class="search-input" :style="{ background: background, padding: `${verticalPadding}px 0` }">
    <a-input-search placeholder="请输入" />
  </div>
</template>

<script>
export default {
  name: 'SearchInput',
  components: {},
  computed: {},
  props: {
    background: {
      type: String,
      default: 'transparent'
    },

    verticalPadding: {
      type: Number,
      default: 0
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
  .search-input {
  }
</style>
