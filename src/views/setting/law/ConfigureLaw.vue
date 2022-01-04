<!--
 * @Description: 配置法律文案
 * @Author: panwenda
 * @Date: 2021-11-29 11:17:46
 * @LastEditors: panwenda
 * @LastEditTime: 2021-12-31 14:44:28
-->
<template>
  <div class="configure-law">
    <a-card :body-style="{ padding: '24px 32px' }" :bordered="false">
      <a-form class="form" @submit="handleSubmit" :form="form" layout="vertical">
        <a-form-item label="文案类型">
          <a-input v-model="lawType" disabled />
        </a-form-item>

        <a-form-item label="描述">
          <a-input
            v-decorator="['description']"
            name="description"
            placeholder="请输入描述"
            :maxLength="50"
            :addon-after="`${form.getFieldValue('description') ? form.getFieldValue('description').length : 0}/50`"
            style="max-width: 1016px;"
            allowClear
          />
        </a-form-item>

        <a-form-item label="内容上传">
          <uploader
            v-decorator="[
              'fileDetailUrl',
              { getValueFromEvent: normFileFieldValue, rules: [{ required: true, message: '请上传文件' }] }
            ]"
            :initList="fileList"
            accept=".pdf"
            tip="文件格式为：PDF格式，大小不超过 2M"
          ></uploader>
        </a-form-item>

        <a-form-item label="应用渠道">
          <a-checkbox-group
            v-decorator="[
              'appInfos',
              { rules: [{ required: true, message: '请选择应用渠道' }] }
            ]"
            name="appInfos"
            :options="miniProgramList" />
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
import store from '@/store'
import { mapState } from 'vuex'
import { getMiniProgramList } from '@/api/common'
import { updateLawConfig } from '@/api/setting/law'
import Uploader from '@/components/Uploader/Uploader'

const LAW_TYPE_LIST = [
  { label: '用户协议', value: 1 },
  { label: '隐私政策', value: 2 },
  { label: '企业资质', value: 3 }
]

export default {
  name: 'ConfigureLaw',
  components: {
    Uploader
  },
  computed: {
    ...mapState('law', ['lawConfigureInfo'])
  },
  props: {},
  data () {
    return {
      form: this.$form.createForm(this),
      lawType: '', // 文案类型
      miniProgramList: [], // 小程序列表
      fileList: [], // 文件列表
    }
  },
  watch: {},
  beforeRouteEnter (to, from, next) {
    // 查看时若无数据则返回
    if (Object.keys(store.state.law.lawConfigureInfo).length === 0) {
      next({ path: '/setting/law' })
    }
    next()
  },
  created () {
    // 获取小程序列表
    getMiniProgramList(12).then(res => {
      this.miniProgramList = res.body.map(v => {
        const option = {
          label: v.miniAppName,
          value: v.miniAppId
        }
        return {
          label: v.miniAppName,
          value: JSON.stringify(option)
        }
      })
    })
  },
  activated () {
    // 设置文案类型
    const info = LAW_TYPE_LIST.find(v => v.value === this.lawConfigureInfo.code)
    this.lawType = info ? info.label : ''

    // 设置描述、上传文件、应用渠道
    const appInfos = this.lawConfigureInfo.appInfos.map(v => {
      const option = {
        label: v.appName,
        value: v.appId
      }
      return {
        label: v.appName,
        value: JSON.stringify(option)
      }
    })

    if (this.lawConfigureInfo.fileDetailUrl) {
      this.fileList = [{
        uid: '1',
        name: this.lawConfigureInfo.fileDetailUrl,
        status: 'done',
        url: this.lawConfigureInfo.fileDetailUrl
      }]
    } else {
      this.fileList = []
    }

    this.form.setFieldsValue({
      description: this.lawConfigureInfo.description,
      fileDetailUrl: this.lawConfigureInfo.fileDetailUrl,
      appInfos: appInfos
    })
  },
  methods: {
    /**
     * 文件上传表单字段处理，会触发表单校验
     */
    normFileFieldValue (fileList) {
      return fileList.length ? fileList[0].url : ''
    },

    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        console.log(values)
        if (!err) {
          const appInfos = values.appInfos.map(v => {
            const appInfo = JSON.parse(v)
            return {
              appId: appInfo.label,
              appName: appInfo.value
            }
          })
          updateLawConfig(this.lawConfigureInfo.id, {
            id: this.lawConfigureInfo.id,
            description: values.description,
            fileDetailUrl: values.fileDetailUrl,
            appInfos
          }).then(res => {
            console.log(res)
            this.$message.success({ content: '保存成功' })
            this.form.resetFields()
            this.lawType = ''
            this.fileList = []
            this.$router.replace({
              path: '/setting/law'
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .configure-law {
    .form {
      .ant-input, .ant-input-affix-wrapper, .ant-input-group-wrapper {
        max-width: 566px;
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
