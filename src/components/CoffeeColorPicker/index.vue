<!--
 * @Descripttion: 颜色拾取器
 * @Author: shenqiang
 * @Date: 2021-12-24 11:43:03
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-24 19:35:17
-->
<!--  -->
<template>
  <div class="coffee-color-picker">
    <a-input v-model="color" style="text-align: right"></a-input>
    <colorPicker v-model="color" class="co-picker" />
  </div>
</template>

<script>
export default {
  props: {
    pickColor: {
      type: String,
      default: ''
    }
  },
  name: 'CoffeeColorPicker',
  components: {},
  data() {
    return {
      //   color: ''
    }
  },
  computed: {
    color: {
      get() {
        return this.pickColor
      },
      set(val) {
        return this.$emit('update:pickColor', val)
      }
    }
  },
  watch: {},
  methods: {
    changeColor() {}
  },
  created() {},
  mounted() {}
}
</script>
<style scoped>
.coffee-color-picker {
  display: flex;
  align-items: center;
  position: relative;
  /* background-color: red; */
}
.co-picker {
  position: absolute;
  left: 10px;
}
</style>
