<!--
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-11-15 18:50:21
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-22 16:15:30
-->
<template>
  <a-config-provider :locale="locale">
    <div id="app" style="padding-top: 108px">
      <router-view />
    </div>
  </a-config-provider>
</template>

<script>
import { domTitle, setDocumentTitle } from '@/utils/domUtil'
import { i18nRender } from '@/locales'

export default {
  data() {
    return {}
  },
  computed: {
    locale() {
      // 只是为了切换语言时，更新标题
      const { title } = this.$route.meta
      title && setDocumentTitle(`${i18nRender(title)} - ${domTitle}`)
      return this.$i18n.getLocaleMessage(this.$store.getters.lang).antLocale
    }
  }
}
</script>
<style lang="less">
// .pangu-container{
//   padding-top: 88px;
// }
// 底部操作样式
.bot-area {
  width: 100%;
  height: 64px;
  background: #ffffff;
  box-shadow: 0px -3px 6px 0px rgba(0, 0, 0, 0.06);
  position: fixed;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
// 底部操作按钮的样式
.sp-btn {
  width: 120px;
  height: 36px !important;
}
// 删除按钮相关的颜色
.w-red:hover {
  color: var(--cwrong) !important;
}

.w-red-bg {
  border: none !important;
  &:hover {
    background: var(--cwrong) !important;
  }
}

// 搜索部分的右侧按钮区域
.btn-right {
  padding-top: 29px;
  button {
    margin-right: 8px;
  }
}

.query-area {
  .ant-form-item {
    padding-bottom: 0px !important;
    margin-bottom: 14px !important;
  }
}

// 那个list信息的竖线
.list-title {
  padding-left: 8px;
  font-size: 14px;
  font-weight: 500;
  position: relative;
  height: 40px;
  display: flex;
  align-items: center;
  line-height: 14px;
}
.list-title::before {
  content: '';
  position: absolute;
  left: 0;
  width: 2px;
  height: 14px;
  background: #0057f0;
}

// 表单样式统一调整
.sq-form {
  margin-top: 15px !important;
  label {
    font-size: 12px !important;
  }
  .ant-form-item {
    padding-bottom: 4px !important;
  }
}

.sq-modal {
  .ant-modal-header {
    // border-bottom: none !important;
  }
  .ant-modal-footer {
    border-top: none !important;
  }
}
</style>
