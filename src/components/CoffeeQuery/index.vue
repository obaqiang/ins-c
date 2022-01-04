<!--
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-11-19 13:42:25
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-11-20 11:07:53
-->
<!--  -->
<template>
  <a-card :bordered="false">
    <slot name="visible"></slot>
    <slot v-if="advanced" name="hidden"></slot>
    <div class="btn-area">
      <slot name="always-show"></slot>
      <a @click="toggleAdvanced" style="margin-left: 16px" v-if="showToggle">
        {{ advanced ? '收起' : '展开' }}
        <a-icon :type="advanced ? 'up' : 'down'" />
      </a>
    </div>
  </a-card>
</template>

<script>
export default {
  props: {
    showToggle: false
  },
  name: 'CoffeeQuery',
  components: {},
  data() {
    return {
      // 高级搜索 展开/关闭
      advanced: false
    }
  },
  computed: {},
  watch: {},
  methods: {
    toggleAdvanced() {
      this.advanced = !this.advanced
    }
  },
  created() {},
  mounted() {}
}
</script>
<style scoped>
.btn-area {
  overflow: hidden;
  float: right;
  display: flex;
  align-items: center;
}
</style>
