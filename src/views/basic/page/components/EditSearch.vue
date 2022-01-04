<!--
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-12-31 13:37:01
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-31 14:10:29
-->
<!--  -->
<template>
  <div>
    <div class="edit-title">搜索栏</div>
    <a-form-model class="my-form">
      <a-form-model-item label="样式选择">
        <a-radio-group v-model="form.editStyle">
          <img style="width: 100%" src="../images/weixin-bg1.png" alt="" />
          <a-radio :value="1">选项1</a-radio>
          <img style="width: 100%" src="../images/weixin-bg1.png" alt="" />
          <a-radio :value="2">选项2</a-radio>
          <img style="width: 100%" src="../images/weixin-bg1.png" alt="" />
          <a-radio :value="3">选项3</a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="背景颜色">
        <CoffeeColorPicker :pickColor.sync="form.bgColor" />
        <div class="tip-text">不设置即为透明</div>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import CoffeeColorPicker from '@/components/CoffeeColorPicker'
export default {
  name: 'EditSearch',
  components: { CoffeeColorPicker },
  data() {
    return {
      form: {
        // editStyle: 1,
        // bgColor: ''
      }
    }
  },
  computed: {},
  watch: {},
  methods: {},
  created() {
    this.form = this.$attrs
  },
  mounted() {}
}
</script>
<style scoped></style>
