<!--
 * @Description: 新增/编辑广告
 * @Author: panwenda
 * @Date: 2021-11-26 15:29:52
 * @LastEditors: panwenda
 * @LastEditTime: 2021-12-24 20:01:54
-->

<template>
  <div class="edit-advertise">
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
      <a-form class="form" @submit="handleSubmit" :form="form" layout="vertical">
        <a-form-item label="广告名称">
          <a-input
            v-decorator="['name', { rules: [{ required: true, message: '请输入广告名称' }] }]"
            name="name"
            placeholder="请输入广告名称"
            :maxLength="15"
            :addon-after="`${form.getFieldValue('name') ? form.getFieldValue('name').length : 0}/15`"
            allowClear />
        </a-form-item>

        <a-form-item label="广告类型">
          <a-select
            v-decorator="['type', { rules: [{ required: true, message: '请选择广告类型' }] }]"
            name="type"
            placeholder="请选择广告类型"
            allowClear
          >
            <a-select-option :value="0">弹窗广告</a-select-option>
            <a-select-option :value="1">轮播广告</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item v-if="form.getFieldValue('type') === 0" label="弹出频次">
          <a-radio-group
            v-decorator="['frequency', { rules: [{ required: true, message: '请选择弹出频次' }] }]"
            name="弹出频次"
          >
            <a-radio :value="1">每天弹出一次</a-radio>
            <a-radio :value="0">每次进入弹出</a-radio>
          </a-radio-group>
        </a-form-item>

        <a-form-item label="排序">
          <a-input-number
            v-decorator="['sort']"
            name="sort"
            :min="1"
            style="width: 100%;"
            placeholder="请输入排序" />
        </a-form-item>

        <a-form-item label="有效时间">
          <a-range-picker
            name="effectiveTime"
            style="width: 100%"
            valueFormat="YYYY-MM-DD"
            v-decorator="['effectiveTime', { rules: [{ required: true, message: '请选择有效时间' }] }]"
            allowClear
          >
            <a-icon slot="suffixIcon" type="calendar" :style="{ color: '#999999' }" />
          </a-range-picker>
        </a-form-item>

        <a-form-item label="广告图片">
          <a-upload
            list-type="picture-card"
            :show-upload-list="false"
            v-decorator="[
              'imageUrl',
              { rules: [{ required: true, message: '请上传图片' }] }
            ]"
          >
            <img v-if="form.getFieldValue('imageUrl')" :src="form.getFieldValue('imageUrl')" alt="" />
            <div v-else>
              <a-icon type="plus" />
              <div class="ant-upload-text">
                上传图片
              </div>
            </div>
          </a-upload>
          <div class="upload-tip">建议尺寸：弹窗广告 600*800、轮播广告 710*160，每个图片大小不超过 5M，支持 bmp、gif、jpeg、jpg、png 格式文件</div>
        </a-form-item>

        <a-form-item label="跳转">
          <a-select
            v-decorator="['jumpType', { rules: [{ required: true, message: '请选择跳转' }] }]"
            name="jumpType"
            placeholder="请选择跳转"
            allowClear
            @change="onChangeJumpType"
          >
            <a-select-option :value="0">指定链接</a-select-option>
            <a-select-option :value="1">其他小程序</a-select-option>
            <a-select-option :value="2">指定产品</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item v-if="form.getFieldValue('jumpType') === 0" label="链接地址">
          <a-input
            v-decorator="['jumpUrl', { rules: [{ required: true, message: '请输入链接地址' }] }]"
            name="jumpUrl"
            placeholder="请输入链接地址"
            allowClear />
        </a-form-item>

        <template v-if="form.getFieldValue('jumpType') === 1">
          <a-form-item label="小程序APPID">
            <a-input
              v-decorator="['jumpAppId', { rules: [{ required: true, message: '请输入目标小程序APPID' }] }]"
              name="jumpAppId"
              placeholder="请输入目标小程序APPID"
              allowClear />
          </a-form-item>

          <a-form-item label="小程序路径">
            <a-input
              v-decorator="['jumpAppPath', { rules: [{ required: true, message: '请输入目标小程序路径' }] }]"
              name="jumpAppPath"
              placeholder="请输入目标小程序路径"
              allowClear />
          </a-form-item>
        </template>

        <a-form-item v-if="form.getFieldValue('jumpType') === 2" label="产品">
          <product-select
            type="primary"
            v-decorator="['jumpProductId', { rules: [{ required: true, message: '请选择产品' }] }]"
            name="jumpProductId"
            :selectedList="selectedProductList"
            selectType="radio"
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
          <a-button class="form-btn" type="primary" htmlType="submit" style="margin-right: 8px">确定</a-button>
          <a-button class="form-btn" type="plain">取消</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import ProductSelect from '@/components/ProductSelect/ProductSelect'
import { addAdvertise } from '@/api/setting/advertise.js'
export default {
  name: 'EditAdvertise',
  components: {
    ProductSelect
  },
  computed: {},
  props: {},
  data () {
    return {
      form: this.$form.createForm(this),
      selectedProductList: []
    }
  },
  watch: {},
  methods: {
    /**
     * 监听改变跳转选择
     */
    onChangeJumpType (e) {
      if (e !== 2) {
        this.selectedProductList = []
      }
    },

    /**
     * 监听选择产品
     * @param {Array} data - 选择的产品列表
     */
    onSelectProduct (data) {
      this.selectedProductList = data
      const jumpProductId = data[0] ? data[0].id : undefined
      this.form.setFieldsValue({
        jumpProductId
      })

      jumpProductId === undefined && this.form.validateFields(['jumpProductId'])
    },

    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        console.log(values)
        if (!err) {
          const params = {
            startTime: values.effectiveTime[0],
            endTime: values.effectiveTime[1],
            ...values
          }
          addAdvertise(params).then(res => {
            console.log(res)
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .edit-advertise {
    .form {
     .ant-input-affix-wrapper, .ant-input-group-wrapper, .ant-select {
        max-width: 566px;
      }

      .ant-calendar-picker {
        max-width: 280px;
      }

      .ant-input-number {
        max-width: 140px;
      }

      .ant-form-item {
        margin-bottom: 14px;
      }

      .upload-tip {
        font-size: 12px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.25);
        line-height: 20px;
      }

      .form-btn {
        width: 88px;
      }
    }
  }
</style>
