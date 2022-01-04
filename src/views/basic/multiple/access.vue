<!--
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-11-20 17:03:47
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-21 16:38:34
-->
<!--  -->
<template>
  <div>
    <a-card :bordered="false">
      <div class="list-title">配置信息</div>
      <a-form-model class="sq-form" :model="form" :rules="rules" layout="vertical" :wrapper-col="{ span: 12 }">
        <a-form-model-item prop="miniAppType" label="渠道">
          <a-radio-group v-model="form.miniAppType" :options="[{ label: '微信小程序', value: 0 }]" :disabled="formDis">
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item prop="miniAppName">
          <span slot="label">
            <span style="margin-right: 8px">小程序名称</span>
            <a-tooltip>
              <template slot="title">最多支持十个汉字</template>
              <a-icon type="question-circle" />
            </a-tooltip>
          </span>
          <a-input v-model="form.miniAppName" :maxLength="10" placeholder="请输入" :disabled="formDis" />
        </a-form-model-item>
        <a-form-model-item prop="miniAppId">
          <span slot="label">
            <span style="margin-right: 8px">小程序AppID</span>
            <a-tooltip>
              <template slot="title">应用以WX开头</template>
              <a-icon type="question-circle" />
            </a-tooltip>
          </span>
          <a-input v-model="form.miniAppId" placeholder="请输入" :disabled="formDis" />
        </a-form-model-item>
        <a-form-model-item prop="thirdPartyAppid">
          <span slot="label">
            <span style="margin-right: 8px">微信第三方平台AppID</span>
            <a-tooltip>
              <template slot="title">微信第三方平台AppID</template>
              <a-icon type="question-circle" />
            </a-tooltip>
          </span>
          <a-input v-model="form.thirdPartyAppid" placeholder="请输入" :disabled="formDis" />
        </a-form-model-item>
      </a-form-model>
    </a-card>
    <a-card :bordered="false">
      <div class="list-title">支付设置</div>
      <a-form-model class="sq-form" :model="payForm" :rules="payRules" layout="vertical" :wrapper-col="{ span: 12 }">
        <a-form-model-item prop="mchId">
          <span slot="label">
            <span style="margin-right: 8px">商户号</span>
            <a-tooltip>
              <template slot="title">不填写则无法使用微信支付</template>
              <a-icon type="question-circle" />
            </a-tooltip>
          </span>
          <a-input v-model="payForm.mchId" placeholder="请输入" :disabled="payFormDis" />
        </a-form-model-item>
        <a-form-model-item prop="miniAppSecret">
          <span slot="label">
            <span style="margin-right: 8px">小程序AppSectret</span>
            <a-tooltip>
              <template slot="title">请输入对应小程序的秘钥</template>
              <a-icon type="question-circle" />
            </a-tooltip>
          </span>
          <a-input v-model="payForm.miniAppSecret" placeholder="请输入" :disabled="payFormDis" />
        </a-form-model-item>
      </a-form-model>
    </a-card>
    <div class="bot-area">
      <a-button class="sp-btn" @click="doCancel">取消</a-button>
      <a-button
        type="primary"
        style="margin: 0 24px 0 16px"
        class="sp-btn"
        @click="doConfirm"
        v-if="pageStatus != 'see'"
      >
        确定
      </a-button>
      <a-button type="primary" style="margin: 0 24px 0 16px" class="sp-btn" @click="doEdit" v-if="pageStatus == 'see'">
        编辑
      </a-button>
    </div>
  </div>
</template>

<script>
import { plusMini, editMini } from '@/api/multiple/mini'
import storage from 'store'
export default {
  name: 'Access',
  components: {},
  data() {
    return {
      accessData: {},
      accessStatus: 0,
      // new：新增 edit:编辑 see:查看
      pageStatus: 'new',
      form: {
        miniAppType: 0,
        miniAppName: '',
        miniAppId: '',
        thirdPartyAppid: ''
      },
      rules: {
        miniAppType: [
          {
            required: true,
            message: '必填',
            trigger: 'blur'
          }
        ],
        miniAppName: [
          {
            required: true,
            message: '必填',
            trigger: 'blur'
          }
        ],
        miniAppId: [
          {
            required: true,
            message: '必填',
            trigger: 'blur'
          }
        ],
        thirdPartyAppid: [
          {
            required: true,
            message: '必填',
            trigger: 'blur'
          }
        ]
      },
      payForm: {
        mchId: '',
        miniAppSecret: ''
      },
      payRules: {
        miniAppSecret: [{ required: true, message: '此为必填项' }]
      }
    }
  },
  computed: {
    formDis() {
      // 审核通过不可修改
      if (this.accessStatus === 2) {
        return true
      } else {
        return false
      }
    },
    payFormDis() {
      if (this.pageStatus === 'see') {
        return true
      } else {
        return false
      }
    }
  },
  watch: {},
  methods: {
    doEdit() {
      this.pageStatus = 'edit'
    },
    doCancel() {
      this.$router.push({ path: '/basic/multiple' })
    },
    doConfirm() {
      if (this.pageStatus === 'new') {
        plusMini(this.form).then((res) => {
          if (res) {
            this.$message.success('已保存')
            this.$router.push({ path: '/basic/multiple' })
          }
        })
      } else {
        console.log(this.form)
        console.log(Object.assign({}, this.form, this.payForm))
        editMini(this.accessData.id, Object.assign({}, this.form, this.payForm)).then((res) => {
          if (res) {
            this.$message.success('已保存')
            this.$router.push({ path: '/basic/multiple' })
          }
        })
      }
    }
  },
  created() {},
  mounted() {
    const accessData = storage.get('accessData')
    const pageStatus = storage.get('pageStatus')
    if (pageStatus) {
      this.pageStatus = pageStatus
    }

    if (accessData) {
      this.pageStatus = 'edit'
      this.accessData = accessData
      this.accessStatus = accessData.status
      this.form = {
        miniAppType: accessData.miniAppType,
        miniAppName: accessData.miniAppName,
        miniAppId: accessData.miniAppId,
        thirdPartyAppid: accessData.thirdPartyAppid
      }
      this.payForm = {
        mchId: accessData.mchId,
        miniAppSecret: accessData.miniAppSecret
      }
    }
  },
  destroyed() {
    storage.set('accessData', '')
    storage.set('pageStatus', '')
  }
}
</script>
<style scoped></style>
