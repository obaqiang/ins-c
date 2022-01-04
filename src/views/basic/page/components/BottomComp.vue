<!--
 * @Descripttion: 底部自定义导航
 * @Author: shenqiang
 * @Date: 2021-12-22 17:45:54
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-22 19:03:43
-->
<!--  -->
<template>
  <div class="comp-bot-area">
    <div class="bot-bl">
      <!-- <coffee-icon type="icon-shouye"></coffee-icon> -->
      <span>首页</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BottomComp',
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
<style scoped>
.comp-bot-area {
  display: flex;
  justify-content: space-around;
  position: absolute;
  bottom: 0;
}
.bot-bl {
  display: flex;
  flex-direction: column;
}
</style>
