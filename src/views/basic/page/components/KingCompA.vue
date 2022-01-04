<!--
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-12-24 10:06:43
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-24 10:40:32
-->
<!--  -->
<template>
  <div class="area-a">
    <div class="a-bl">
      <img src="../images/king-icon.png" class="icon-a" />
      <div class="text-a">周边游</div>
    </div>
    <div class="a-bl">
      <img src="../images/king-icon.png" class="icon-a" />
      <div class="text-a">周边游</div>
    </div>
    <div class="a-bl">
      <img src="../images/king-icon.png" class="icon-a" />
      <div class="text-a">周边游</div>
    </div>
    <div class="a-bl">
      <img src="../images/king-icon.png" class="icon-a" />
      <div class="text-a">周边游</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KingCompA',
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
.area-a {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 5px 0;
}
.a-bl {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.icon-a {
  width: 65px;
  height: 65px;
}
.text-a {
  color: #333333;
  font-size: 13px;
  font-weight: 500;
}
</style>
