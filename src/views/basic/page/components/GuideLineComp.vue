<!--
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-12-24 10:49:35
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-25 10:55:35
-->
<!--  -->
<template>
  <div
    class="line"
    :style="{
      borderTopWidth: height + 'px',
      borderTopStyle: lineStyle == 1 ? 'dashed' : 'solid',
      borderTopColor: color
    }"
  ></div>
</template>

<script>
export default {
  props: {
    lineStyle: {
      type: Number,
      default: 1
    },
    color: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 0
    }
  },
  name: 'GuideLineComp',
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
