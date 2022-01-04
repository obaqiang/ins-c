<!--
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-12-21 14:44:40
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-21 16:58:15
-->
<!--  -->
<template>
  <div class="">
    <a-card :bordered="false">
      <div style="width: 60%; margin: auto">
        <a-steps :current="current">
          <a-step title="扫码授权" />
          <a-step title="支付设置" />
          <a-step title="提交发布" />
        </a-steps>
      </div>
      <div class="barcode-area" v-if="current == 0">
        <a-button type="link" style="margin-top: 52px">刷新</a-button>
        <div id="qrcode" style="margin: 24px auto; width: 150px"></div>
        <p>请扫描二维码</p>
      </div>
      <div class="pay-set-area" v-if="current == 1"></div>
      <div class="success-area" v-if="current == 2">
        <a-result
          status="success"
          title="已上传代码并提交审核"
          sub-title="提交微信审核（最长14个工作日），审核通过后自动发布版本"
        >
          <template #extra>
            <a-button key="console" type="primary"> 预览 </a-button>
            <a-button key="buy"> 返回 </a-button>
          </template>
        </a-result>
      </div>
    </a-card>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
// import { getAccessToken } from '@/api/multiple/mini'
export default {
  name: 'DoAuth',
  components: {},
  data() {
    return {
      current: 2,
      linkUrl: '123123'
    }
  },
  computed: {},
  watch: {},
  methods: {
    qrCode() {
      this.$nextTick(function () {
        // let linkUrl = localStorage.getItem('linkUrl')
        const linkUrl = 213123
        this.linkUrl = '123123123132'
        document.getElementById('qrcode').innerHTML = ''
        return new QRCode('qrcode', {
          width: 150,
          height: 150,
          text: linkUrl,
          colorDark: '#333333',
          colorLight: '#ffffff'
        })
      })
    },

  },
  created() {},
  mounted() {
    this.qrCode()
  }
}
</script>
<style scoped>
.barcode-area {
  text-align: center;
}
</style>
