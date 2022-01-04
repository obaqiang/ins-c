<!--
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-12-01 10:07:48
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-01 10:47:07
-->
<!--  -->
<template>
  <div class="">
    <a-card :bordered="false" title="修改配置">
      <a-form @submit="handleSubmitA" :form="form">
        <a-form-item
          label="编号"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <p>123213123123</p>
        </a-form-item>
        <a-form-item
          label="微信第三方平台AppId"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <a-radio-group v-model="value" @change="onChange">
            <a-radio :style="radioStyle" :value="1"> Option A </a-radio>
            <a-radio :style="radioStyle" :value="2"> Option B </a-radio>
            <a-radio :style="radioStyle" :value="3"> Option C </a-radio>
            <a-radio :style="radioStyle" :value="4">
              More...
              <a-input v-if="value === 4" :style="{ width: 100, marginLeft: 10 }" />
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          label="小程序名称"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <a-input></a-input>
        </a-form-item>
      </a-form>
    </a-card>
    <a-card :bordered="false" title="支付配置">
      <a-form @submit="handleSubmitB" :form="form">
        <a-form-item
          label="编号"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <p>123213123123</p>
        </a-form-item>
        <a-form-item
          label="微信第三方平台AppId"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <a-radio-group v-model="value" @change="onChange">
            <a-radio :style="radioStyle" :value="1"> Option A </a-radio>
            <a-radio :style="radioStyle" :value="2"> Option B </a-radio>
            <a-radio :style="radioStyle" :value="3"> Option C </a-radio>
            <a-radio :style="radioStyle" :value="4">
              More...
              <a-input v-if="value === 4" :style="{ width: 100, marginLeft: 10 }" />
            </a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          label="小程序名称"
          :labelCol="{ lg: { span: 7 }, sm: { span: 7 } }"
          :wrapperCol="{ lg: { span: 10 }, sm: { span: 17 } }"
        >
          <a-input></a-input>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
export default {
  name: 'ModifyCon',
  components: {},
  data() {
    return {
      value: '',
      form: {}
    }
  },
  computed: {},
  watch: {},
  methods: {
    handleSubmitA() {},
    handleSubmitB() {},
    onChange() {}
  },
  created() {},
  mounted() {}
}
</script>
<style scoped></style>
