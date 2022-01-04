<!--
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-12-25 11:32:57
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-25 11:54:50
-->
<!--  -->
<template>
  <div :style="{ background: color, height: height + 'px' }">辅助空白</div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 0
    }
  },
  name: 'BlankComp',
  components: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {}
}
</script>
<style scoped></style>
