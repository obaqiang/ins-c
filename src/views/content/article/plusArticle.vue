<!--
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-11-25 10:39:56
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-31 15:10:48
-->
<template>
  <!-- hidden PageHeaderWrapper title demo -->
  <div>
    <a-card :bordered="false">
      <a-form-model
        ref="ruleForm"
        :model="form"
        layout="vertical"
        :rules="rules"
        :wrapper-col="{ span: 12 }"
        class="sq-form"
      >
        <a-form-model-item label="文章标题" prop="title" v-if="form.platformId">
          <a-input disabled v-model="form.title"></a-input>
        </a-form-model-item>
        <a-form-model-item label="副标题" prop="subtitle">
          <a-input v-model="form.subtitle" placeholder="请输入第三方平台名称" />
        </a-form-model-item>
        <a-form-model-item label="文章封面" prop="appId">
          <UploadImg />
        </a-form-model-item>
      </a-form-model>
    </a-card>
    <div class="bot-area">
      <a-button class="sp-btn">返回</a-button>
      <a-button type="primary" style="margin: 0 24px 0 16px" class="sp-btn">添加</a-button>
    </div>
  </div>
</template>

<script>
import UploadImg from '@/components/upload/UploadImg'
export default {
  name: 'PlusArticle',
  data() {
    return {
      form: {}
    }
  },
  components: {
    UploadImg
  },
  methods: {
    // handler
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    }
  }
}
</script>
<style scoped></style>
