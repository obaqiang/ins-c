<!--
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-12-30 13:44:57
 * @LastEditors: shenqiang
 * @LastEditTime: 2022-01-04 14:41:24
-->
<!--  -->
<template>
  <div class="tour-bl">
    <div class="tour-text">
      <span :style="{ color: form.color }">{{ form.title }}</span>
      <coffee-icon type="icon-jiantouyou1"></coffee-icon>
    </div>
    <img class="tour-img" src="../images/img-bg.png" alt="" />
  </div>
</template>

<script>
import cloneDeep from 'lodash.clonedeep'
export default {
  name: 'TourComp',
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
<style scoped>
.tour-text {
  color: #333;
  font-size: 20px;
  height: 50px;
  font-weight: 500;
  display: flex;
  align-items: center;
  padding-left: 10px;
}
.tour-img {
  width: 100%;
}
</style>
