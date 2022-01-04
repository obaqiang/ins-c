<!--
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-11-25 10:39:56
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-21 17:02:45
-->
<template>
  <!-- hidden PageHeaderWrapper title demo -->
  <div>
    <a-card :bordered="false">
      <div class="list-title">配置信息</div>
      <a-form-model
        ref="ruleForm"
        :model="form"
        layout="vertical"
        :rules="rules"
        :wrapper-col="{ span: 12 }"
        class="sq-form"
      >
        <a-form-model-item label="编号" prop="openShowId" v-if="form.platformId">
          <a-input disabled v-model="form.openShowId"></a-input>
        </a-form-model-item>
        <a-form-model-item label="第三方平台名称" prop="openName">
          <a-input v-model="form.openName" placeholder="请输入第三方平台名称" />
        </a-form-model-item>
        <a-form-model-item label="APPID" prop="appId">
          <a-input v-model="form.appId" placeholder="请输入appId" />
        </a-form-model-item>
        <a-form-model-item label="AppSecret" prop="appSecret">
          <a-input v-model="form.appSecret" placeholder="请输入AppSecret" />
        </a-form-model-item>
        <a-form-model-item label="消息验证令牌" prop="openToken">
          <a-input v-model="form.openToken" placeholder="请输入消息验证令牌" />
        </a-form-model-item>
        <a-form-model-item label="消息秘钥" prop="openKey">
          <a-input v-model="form.openKey" placeholder="请输入消息秘钥" />
        </a-form-model-item>
        <a-form-model-item label="授权回调URL" prop="authReceiveUrl">
          <a-input v-model="form.authReceiveUrl" placeholder="请输入授权回调URL" />
        </a-form-model-item>
        <a-form-model-item label="服务器域名" prop="serverDomain">
          <a-input v-model="form.serverDomain" placeholder="请输入服务器域名" />
        </a-form-model-item>
        <a-form-model-item label="socket域名" prop="socketDomain">
          <a-input v-model="form.socketDomain" placeholder="请输入socket域名" />
        </a-form-model-item>
      </a-form-model>
    </a-card>
    <div class="bot-area">
      <a-button class="sp-btn">返回</a-button>
      <a-button type="primary" style="margin: 0 24px 0 16px" class="sp-btn" @click="doConfirm">{{
        listData ? '确定' : '添加'
      }}</a-button>
    </div>
  </div>
</template>

<script>
import { editPlatFormList, plusPlatFormList } from '@/api/third/plat'
import storage from 'store'
import cloneDeep from 'lodash.clonedeep'
const dftForm = {
  openShowId: '',
  appId: '',
  appSecret: '',
  authReceiveUrl: '',
  openKey: '',
  openName: '',
  openToken: '',
  serverDomain: '',
  socketDomain: '',
  webviewDomain: ''
}
export default {
  name: 'Plus',
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: Object.assign({}, dftForm),
      rules: {
        appId: [{ required: true, message: '不能为空', trigger: 'blur' }],
        appSecret: [{ required: true, message: '不能为空', trigger: 'blur' }],
        authReceiveUrl: [{ required: true, message: '不能为空', trigger: 'blur' }],
        openKey: [{ required: true, message: '不能为空', trigger: 'blur' }],
        openName: [{ required: true, message: '不能为空', trigger: 'blur' }],
        openToken: [{ required: true, message: '不能为空', trigger: 'blur' }],
        serverDomain: [{ required: true, message: '不能为空', trigger: 'blur' }],
        socketDomain: [{ required: true, message: '不能为空', trigger: 'blur' }],
        webviewDomain: [{ required: true, message: '不能为空', trigger: 'blur' }]
      },
      listData: null
    }
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
    },
    doConfirm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.form.platformId) {
            editPlatFormList({
              platformId: this.form.platformId,
              wxOpenPlatformInfoDTO: this.form
            }).then((res) => {
              this.$message.success('保存成功')
              this.$router.push({ path: '/basic/third' })
            })
          } else {
            plusPlatFormList(this.form).then((res) => {
              this.$message.success('新增成功')
              this.$router.push({ path: '/basic/third' })
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  mounted() {
    const thirdListData = storage.get('thirdListData')
    if (thirdListData) {
      // this.form = Object.assign({}, dftForm, this.thirdListData)
      this.form = cloneDeep(thirdListData)
    }
  },
  beforeDestroy() {
    storage.set('thirdListData', '')
  }
}
</script>
<style scoped lang="less"></style>
