<!--
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-12-25 11:04:47
 * @LastEditors: shenqiang
 * @LastEditTime: 2022-01-04 14:49:28
-->
<!--  -->
<template>
  <div class="">
    <img style="width: 100%" src="../images/img-bg.png" alt="" />
  </div>
</template>

<script>
import cloneDeep from 'lodash.clonedeep'
export default {
  name: 'QuickPayComp',
  components: {},
  data() {
    return {}
  },
  computed: {
    form() {
      return cloneDeep(this.$attrs)
    }
  },
  watch: {},
  methods: {},
  created() {},
  mounted() {}
}
</script>
<style scoped></style>
