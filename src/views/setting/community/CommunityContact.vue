<!--
 * @Description: 设置进群联系人
 * @Author: panwenda
 * @Date: 2021-12-28 15:56:17
 * @LastEditors: panwenda
 * @LastEditTime: 2021-12-31 14:46:30
-->

<template>
  <div class="community-contact">
    <a-card :bordered="false">
      <s-table ref="table" size="default" rowKey="id" :columns="columns" :data="loadData" :pagination="pagination">
        <!-- 类型 -->
        <div slot="appType" slot-scope="text, record">{{ record.appType | filterAppType }}</div>

        <!-- 操作 -->
        <div slot="operation" slot-scope="text, record" class="oppo">
          <a-button class="w-red" type="link" @click="onClickEditBtn(record)"> 编辑 </a-button>
          <a-button type="link" @click="onClickViewBtn(record)"> 查看 </a-button>
        </div>
      </s-table>
    </a-card>

    <!-- 查看联系人二维码弹窗 -->
    <a-modal v-model="showQrcodeModal" title="查看联系人二维码" :footer="null" @cancel="onClickQrcodeModalCancel">
      <div class="view-container">
        <div class="contact-name">{{ contactView.contactName }}</div>
        <img class="contact-qrcode" :src="contactView.contactQrCode" alt="">
      </div>
    </a-modal>

    <!-- 编辑联系人弹窗 -->
    <a-modal v-model="showContactEditModal" :confirmLoading="contactEditLoading" title="编辑进群联系人" @ok="onClickContactEditConfirm" @cancel="onClickContactEditCancel">
      <a-form layout="horizontal" :form="contactEditForm" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
        <a-form-model-item label="联系人名称">
          <a-input
            v-decorator="[
              'contactName',
              { rules: [{ required: true, message: '请输入联系人名称' }] }
            ]"
            placeholder="请输入联系人名称" />
        </a-form-model-item>
        <a-form-model-item label="联系人二维码">
          <uploader
            v-decorator="[
              'contactQrCode',
              { getValueFromEvent: normFileFieldValue, rules: [{ required: true, message: '请上传联系人二维码' }] }
            ]"
            :initList="fileList"
            list-type="picture-card"
          ></uploader>
        </a-form-model-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import {
  getGroupContactList,
  editContactInfo
} from '@/api/setting/community.js'
import { STable } from '@/components'
import Uploader from '@/components/Uploader/Uploader'

const APP_TYPE_LIST = [
  { label: '微信小程序', value: 0 }
]

export default {
  name: 'CommunityContact',
  components: {
    STable,
    Uploader
  },
  filters: {
    // 小程序类型过滤
    filterAppType (val) {
      const type = APP_TYPE_LIST.find(v => v.value === val)
      return type ? type.label : ''
    }
  },
  computed: {},
  props: {},
  data () {
    return {
      queryParam: {
        pageNum: 1,
        pageSize: 10
      },
      pagination: {
        showQuickJumper: true,
        showTotal: (total, range) => {
          return `第 ${range[0]}-${range[1]} 条/总共 ${total} 条`
        }
      },
      loadData: parameter => {
        this.queryParam.pageNum = parameter.pageNum
        return getGroupContactList(this.queryParam).then(res => {
          return res.body
        })
      },
      columns: [
        { title: '小程序编号', dataIndex: 'code' },
        { title: '小程序名称', dataIndex: 'appName' },
        { title: '类型', scopedSlots: { customRender: 'appType' } },
        { title: '联系人修改时间', dataIndex: 'updateTime' },
        { title: '进群联系人', dataIndex: 'contactName' },
        { title: '操作', scopedSlots: { customRender: 'operation' } }
      ],
      isInitialized: false, // 初始化参数，避免第一次进入 STable 初始化刷新与 activated 生命周期触发刷新逻辑重复
      showQrcodeModal: false, // 是否显示查看联系人二维码弹窗
      contactView: {
        contactQrCode: '',
        contactName: ''
      }, // 查看的数据
      currentEditInfo: {}, // 当前编辑的信息
      contactEditForm: this.$form.createForm(this),
      showContactEditModal: false, // 是否显示编辑联系人信息弹窗
      contactEditLoading: false, // 编辑信息保存状态
      fileList: [] // 文件列表
    }
  },
  watch: {},
  activated () {
    if (this.isInitialized) {
      this.$refs.table.refresh()
    } else {
      this.isInitialized = true
    }
  },
  methods: {
    /**
     * 点击编辑按钮
     * @param {Object} info - 当前编辑的信息
     */
    onClickEditBtn (info) {
      this.currentEditInfo = info

      if (info.contactQrCode) {
        this.fileList = [{
          uid: '1',
          name: info.contactQrCode,
          status: 'done',
          url: info.contactQrCode
        }]
      }

      this.showContactEditModal = true

      // 初始化编辑表单数据
      this.$nextTick(() => {
        this.contactEditForm.setFieldsValue({
          contactQrCode: info.contactQrCode,
          contactName: info.contactName
        })
      })
    },

    /**
     * 点击查看按钮
     * @param {Object} info - 当前查看的信息
     */
    onClickViewBtn (info) {
      this.contactView = {
        contactQrCode: info.contactQrCode,
        contactName: info.contactName
      }
      this.showQrcodeModal = true
    },

    /**
     * 点击查看联系人二维码弹窗关闭按钮
     */
    onClickQrcodeModalCancel () {
      this.contactView = {
        contactQrCode: '',
        contactName: ''
      }
    },

    /**
     * 文件上传表单字段处理，会触发表单校验
     */
    normFileFieldValue (fileList) {
      return fileList.length ? fileList[0].url : ''
    },

    /**
     * 点击编辑联系人弹窗确认按钮
     */
    onClickContactEditConfirm () {
      this.contactEditForm.validateFields((err, values) => {
        console.log(values)
        if (!err) {
          editContactInfo(this.currentEditInfo.id, {
            id: this.currentEditInfo.id,
            contactQrCode: values.contactQrCode,
            contactName: values.contactName
          }).then(() => {
            this.$message.success({ content: '保存成功' })
            this.onClickContactEditCancel()
            this.showContactEditModal = false
            this.$refs.table.refresh()
          })
        }
      })
    },

    /**
     * 点击编辑联系人弹窗取消按钮
     */
    onClickContactEditCancel () {
      this.contactEditForm.resetFields()
      this.currentEditInfo = {}
      this.contactEditLoading = false
      this.fileList = []
    }
  }
}
</script>

<style lang="less" scoped>
  .view-container {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 12px 0 34px;

    .contact-name {
      height: 22px;
      line-height: 22px;
      color: black;
      font-size: 14px;
      font-weight: bold;
    }

    .contact-qrcode {
      width: 120px;
      height: 120px;
      margin-top: 16px;
    }
  }
</style>
