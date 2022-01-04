<!--
 * @Description: 编辑专题
 * @Author: panwenda
 * @Date: 2021-11-27 10:39:08
 * @LastEditors: panwenda
 * @LastEditTime: 2021-12-31 14:44:40
-->
<template>
  <div class="edit-theme">
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
      <a-form class="form" @submit="handleSubmit" :form="form" layout="vertical">
        <a-form-item label="专题名称">
          <a-input
            v-decorator="['subjectName', { rules: [{ required: true, message: '请输入专题名称' }] }]"
            name="subjectName"
            placeholder="请输入专题名称"
            :maxLength="8"
            :addon-after="`${form.getFieldValue('subjectName') ? form.getFieldValue('subjectName').length : 0}/8`"
            allowClear />
        </a-form-item>

        <a-form-item label="排序">
          <a-input-number
            v-decorator="['sort']"
            name="sort"
            :min="1"
            style="width: 100%;"
            placeholder="请输入排序" />
        </a-form-item>

        <a-form-item label="专题图片">
          <uploader
            v-decorator="[
              'imageUrl',
              { getValueFromEvent: normFileFieldValue, rules: [{ required: true, message: '请上传文件' }] }
            ]"
            :initList="fileList"
            :limit="3"
            listType="picture-card"
            tip="建议尺寸：样式二 750*400、样式三 600*800，每个图片大小不超过 5M，支持 bmp、gif、jpeg、jpg、png 格式文件"
          ></uploader>
        </a-form-item>

        <a-form-item label="选择产品">
          <product-select
            type="primary"
            v-decorator="['relationIds', { rules: [{ required: true, message: '请选择产品' }] }]"
            name="relationIds"
            :selectedList="selectedProductList"
            @selectConfirm="onSelectProduct"
          ></product-select>
        </a-form-item>

        <a-form-item label="备注">
          <a-input
            v-decorator="['remark']"
            name="remark"
            placeholder="请输入备注"
            :maxLength="50"
            :addon-after="`${form.getFieldValue('remark') ? form.getFieldValue('remark').length : 0}/50`"
            style="max-width: 1016px;"
            allowClear
          />
        </a-form-item>

        <a-form-item style="margin-bottom: 0; padding-bottom: 0;">
          <a-button class="form-btn" type="primary" htmlType="submit" style="margin-right: 8px">保存</a-button>
          <a-button class="form-btn" type="plain">取消</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import ProductSelect from '@/components/ProductSelect/ProductSelect'
import Uploader from '@/components/Uploader/Uploader'

export default {
  name: 'EditTheme',
  components: {
    ProductSelect,
    Uploader
  },
  computed: {},
  props: {},
  data () {
    return {
      form: this.$form.createForm(this),
      selectedProductList: [],
      fileList: []
    }
  },
  watch: {},
  methods: {
    /**
     * 文件上传表单字段处理，会触发表单校验
     */
    normFileFieldValue (fileList) {
      return fileList.length ? fileList[0].url : ''
    },

    /**
     * 监听选择产品
     * @param {Array} data - 选择的产品列表
     */
    onSelectProduct (data) {
      this.selectedProductList = data
      const relationIds = data.length ? data.map(v => { return v.id }) : undefined
      this.form.setFieldsValue({
        relationIds
      })

      relationIds === undefined && this.form.validateFields(['relationIds'])
    },

    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        console.log(values)
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .edit-theme {
    .form {
      .ant-input-affix-wrapper, .ant-input-group-wrapper {
        max-width: 566px;
      }

      .ant-input-number {
        max-width: 140px;
      }

      .ant-form-item {
        margin-bottom: 14px;
      }

      .form-btn {
        width: 88px;
      }
    }
  }
</style>
