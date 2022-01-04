<!--
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-11-19 11:48:26
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-11-19 14:42:30
-->
<!--  -->
<template>
  <div class="">
    <CoffeeQuery>
      <div slot="visible">123</div>
      <div slot="hidden">222</div>
      <div slot="always-show">
        <a-button @click="() => (this.queryParam = {})">重置</a-button>
        <a-button style="margin-left: 16px" type="primary" @click="$refs.table.refresh(true)">查询</a-button>
      </div>
    </CoffeeQuery>
    <div class="btn-area">
      <a-button @click="() => (this.queryParam = {})">重置</a-button>
      <a-button @click="() => (this.queryParam = {})">重置</a-button>
      <a-button @click="() => (this.queryParam = {})">重置</a-button>
    </div>
  </div>
</template>

<script>
import CoffeeQuery from '@onecoffee/coffeequery'
export default {
  name: '',
  components: {
    CoffeeQuery
  },
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
.btn-area {
  padding: 12px 0;
}
</style>
