<!--
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2022-01-04 14:56:25
 * @LastEditors: shenqiang
 * @LastEditTime: 2022-01-04 15:08:24
-->
<!--  -->
<template>
  <div class="banner-area" :style="{ backgroundColor: form.bgColor, marginTop: form.distance + 'px' }">
    <img src="../images/img-bg.png" alt="" />
  </div>
</template>

<script>
import cloneDeep from 'lodash.clonedeep'
export default {
  name: 'BannerComp',
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
<style scoped lang="less">
.banner-area {
  padding: 10px;
  width: 100%;
  img {
    width: 100%;
  }
}
</style>
