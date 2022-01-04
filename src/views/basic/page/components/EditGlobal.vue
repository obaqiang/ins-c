<!--
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-12-25 11:33:24
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-29 11:31:18
-->
<!--  -->
<template>
  <div class="wrapper">
    <div class="edit-title">全局风格</div>
    <a-form-model class="my-form" :model="form" :rules="rules" layout="vertical" :wrapper-col="{ span: 24 }">
      <a-form-model-item>
        <!-- <CoffeeColorPicker :pickColor.sync="form.editColor" /> -->
        <div class="color-area">
          <div class="a-area">
            <div class="circle a-on" style="background: #0057f0"></div>
            <div class="text">梦幻蓝</div>
          </div>
          <div class="a-area b-on">
            <div class="circle" style="background: #0057f0"></div>
            <div class="text">梦幻蓝</div>
          </div>
          <div class="a-area c-on">
            <div class="circle" style="background: #0057f0"></div>
            <div class="text">梦幻蓝</div>
          </div>
          <div class="a-area d-on">
            <div class="circle" style="background: #0057f0"></div>
            <div class="text">梦幻蓝</div>
          </div>
        </div>
      </a-form-model-item>
      <a-form-model-item label="个人中心底部logo">
        <UploadImg />
        <div class="tip-text">建议尺寸 750x80，png格式</div>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { EventBus } from '@/utils/eventBus'
import UploadImg from '@/components/upload/UploadImg'
import CoffeeColorPicker from '@/components/CoffeeColorPicker'
export default {
  props: {},
  name: 'EditGlobal',
  components: {
    UploadImg,
    CoffeeColorPicker
  },
  data() {
    return {
      form: {
        logo: ''
      },
      rules: {}
    }
  },
  computed: {},
  watch: {},
  methods: {
    updateActiveItemAttr() {
      EventBus.$emit('changeAttr', {
        lineStyle: this.form.editLineStyle,
        color: this.form.editColor,
        height: this.form.editHeight
      })
    }
  },
  created() {},
  mounted() {}
}
</script>
<style scoped>
.color-area {
  display: flex;
  justify-content: space-around;
}
.a-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}
.circle {
  width: 64px;
  height: 64px;
  border-radius: 32px;
}
.text {
  font-size: 12px;
  margin-top: 10px;
}
.a-on {
  box-shadow: 0px 2px 7px 2px rgba(0, 87, 240, 0.4);
}
</style>
