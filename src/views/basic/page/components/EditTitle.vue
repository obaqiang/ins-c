<!--
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-12-29 10:48:54
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-29 11:02:41
-->
<!--  -->
<template>
  <div>
    <div class="edit-title">页面基础配置</div>
    <div>
      <a-form-model class="my-form">
        <a-form-model-item label="页面标题">
          <a-input
            placeholder="请输入标题"
            v-model="form.title"
            :addon-after="form.title.length + '/5'"
            :maxLength="5"
          />
        </a-form-model-item>
        <a-form-model-item label="标题颜色">
          <CoffeeColorPicker :pickColor.sync="form.titleColor" />
        </a-form-model-item>
        <a-form-model-item label="标题背景颜色">
          <CoffeeColorPicker :pickColor.sync="form.titleBgColor" />
        </a-form-model-item>
        <a-form-model-item label="页面背景颜色">
          <CoffeeColorPicker :pickColor.sync="form.pageBgColor" />
        </a-form-model-item>
        <a-form-model-item label="页面背景图">
            
          <UploadImg />
          <div class="tip-text">建议尺寸 750x270，大小不超过2M</div>
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import CoffeeColorPicker from '@/components/CoffeeColorPicker'
import UploadImg from '@/components/upload/UploadImg'
export default {
  name: 'EditTitle',
  components: {
    CoffeeColorPicker,
    UploadImg
  },
  data() {
    return {
      form: {
        title: '',
        titleColor: '',
        titleBgColor: '',
        pageBgColor: ''
      }
    }
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {}
}
</script>
<style scoped></style>
