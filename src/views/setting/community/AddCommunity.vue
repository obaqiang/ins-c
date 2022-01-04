<!--
 * @Description: 编辑社群
 * @Author: panwenda
 * @Date: 2021-11-29 11:01:09
 * @LastEditors: panwenda
 * @LastEditTime: 2021-12-29 15:18:14
-->
<template>
  <div class="add-community">
    <a-card :bordered="false">
      <a-form class="form" @submit="handleSubmit" :form="form" layout="vertical">
        <a-form-item label="群名称">
          <a-input
            v-decorator="['name', { rules: [{ required: true, message: '请输入群名称' }] }]"
            name="name"
            placeholder="请输入群名称"
            :maxLength="10"
            :addon-after="`${form.getFieldValue('name') ? form.getFieldValue('name').length : 0}/10`"
            allowClear />
        </a-form-item>

        <a-form-item label="群主">
          <organization-tree-select
            v-decorator="['groupOwner', { rules: [{ required: true, message: '请选择群主' }] }]"
            name="groupOwner"
            placeholder="请选择群主"
            :singleData="groupOwner"
            :multiple="false"
            :disabledList="userList"
            @changeSelected="onChangeGroupOwner"
          ></organization-tree-select>
        </a-form-item>

        <a-form-item label="群成员">
          <organization-tree-select
            v-decorator="['userList', { rules: [{ required: true, message: '请选择群成员' }] }]"
            name="userList"
            placeholder="请选择群成员"
            :multipleData="userList"
            :disabledList="groupOwner.value ? [groupOwner] : []"
            @changeSelected="onChangeUserList"
          ></organization-tree-select>
        </a-form-item>
        
        <a-form-item label="简介">
          <a-input
            v-decorator="['introduction']"
            name="introduction"
            placeholder="请输入备注"
            :maxLength="50"
            :addon-after="`${form.getFieldValue('introduction') ? form.getFieldValue('introduction').length : 0}/50`"
            style="max-width: 1016px;"
            allowClear
          />
        </a-form-item>

        <a-form-item style="margin-bottom: 0; padding-bottom: 0;">
          <a-button class="form-btn" type="primary" htmlType="submit" style="margin-right: 8px">保存</a-button>
          <a-button class="form-btn" type="plain" @click="onClickCancelBtn">取消</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import {
  addGroup
} from '@/api/setting/community.js'
import OrganizationTreeSelect from '@/components/OrganizationTreeSelect/OrganizationTreeSelect'
export default {
  name: 'AddCommunity',
  components: {
    OrganizationTreeSelect
  },
  data() {
    return {
      form: this.$form.createForm(this),
      userList: [], // 群成员列表
      groupOwner: {} // 群主
    }
  },
  methods: {
    /**
     * 监听选择改变群主
     * @param {Array} data - 选择的数据
     */
    onChangeGroupOwner (data) {
      this.groupOwner = data

      const groupOwner = data
      this.form.setFieldsValue({
        groupOwner: data.value ? data : undefined
      })

      groupOwner === undefined && this.form.validateFields(['groupOwner'])
    },

    /**
     * 监听选择改变群成员
     * @param {Array} data - 选择的数据列表
     */
    onChangeUserList (data) {
      this.userList = data

      this.form.setFieldsValue({
        userList: data.length ? data : undefined
      })

      data.length === 0 && this.form.validateFields(['userList'])
    },

    /**
     * 点击保存按钮
     */
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          addGroup({
            name: values.name,
            ownerAccount: values.groupOwner.value,
            ownerName: values.groupOwner.label,
            introduction: values.introduction,
            userList: [values.groupOwner.value].concat(values.userList.map(v => { return v.value }))
          }).then(res => {
            this.$message.success({ content: '新增成功' })
            this.form.resetFields()
            this.groupOwner = {}
            this.userList = []
            this.$router.replace({
              path: '/setting/community'
            })
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },

    /**
     * 点击取消按钮
     */
    onClickCancelBtn () {
      this.$router.replace({
        path: '/setting/community'
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .add-community {
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
