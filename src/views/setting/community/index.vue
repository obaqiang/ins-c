<!--
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-11-20 11:18:39
 * @LastEditors: panwenda
 * @LastEditTime: 2021-12-29 11:43:11
-->
<template>
  <div class="">
    <a-card :bordered="false">
      <a-form layout="vertical">
        <a-row :gutter="[16, 0]">
          <a-col :span="6">
            <a-form-item label="群名称">
              <a-input v-model="queryParam.name" placeholder="请输入群名称" />
            </a-form-item>
          </a-col>
          <a-col :span="18">
            <div class="btn-right">
              <a-button type="primary" ghost @click="onClickResetBtn">重置</a-button>
              <a-button type="primary" @click="onClickSearchBtn">查询</a-button>
            </div>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
    <div class="btn-area">
      <a-button class="btn" type="primary" @click="onClickAddBtn">新增</a-button>
      <a-button class="btn" type="primary" ghost @click="onClickConfigureBtn">企业微信配置</a-button>
      <a-button class="btn" type="primary" ghost @click="onClickGroupContactBtn">设置进群联系人</a-button>
    </div>
    <a-card :bordered="false">
      <s-table ref="table" size="default" rowKey="id" :columns="columns" :data="loadData" :pagination="pagination">
        <!-- 人数 -->
        <div slot="member" slot-scope="text, record">{{ record.currentMember }}/{{ record.totalMember }}</div>

        <!-- 操作 -->
        <div slot="operation" slot-scope="text, record" class="oppo">
          <a-button class="w-red" type="link" @click="onClickDeleteBtn(record.id)"> 删除 </a-button>
          <a-button type="link" @click="onClickViewBtn(record)"> 查看 </a-button>
        </div>
      </s-table>
    </a-card>

    <!-- 企业微信配置弹窗 -->
    <a-modal v-model="showConfigureModal" :confirmLoading="configureLoading" title="企业微信配置" @ok="onClickConfigureConfirm" @cancel="onClickConfigureCancel">
      <a-form-model ref="configureForm" layout="horizontal" :model="configureForm" :rules="configureFormRules" :labelCol="{ span: 6 }" :wrapperCol="{ span: 18 }">
        <a-form-model-item label="企业微信corpid" prop="corpId">
          <a-input v-model="configureForm.corpId" placeholder="请输入企业微信corpid" />
        </a-form-model-item>
        <a-form-model-item label="企业微信secret" prop="secret">
          <a-input v-model="configureForm.secret" placeholder="企业微信secret" />
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import {
  getGroupList,
  deleteGroup,
  getWechatConfig,
  updateWechatConfig
} from '@/api/setting/community.js'
import { STable } from '@/components'
export default {
  name: 'Community',
  components: {
    STable
  },
  data () {
    return {
      queryParam: {
        name: undefined,
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
        return getGroupList(this.queryParam).then(res => {
          return res.body
        })
      },
      columns: [
        { title: '编号', dataIndex: 'code' },
        { title: '群名称', dataIndex: 'name' },
        { title: '群主', dataIndex: 'ownerName' },
        { title: '人数', scopedSlots: { customRender: 'member' } },
        { title: '创建时间', dataIndex: 'createTime' },
        { title: '操作', scopedSlots: { customRender: 'operation' } }
      ],
      isInitialized: false, // 初始化参数，避免第一次进入 STable 初始化刷新与 activated 生命周期触发刷新逻辑重复
      showConfigureModal: false, // 是否显示企业微信配置弹窗
      configureForm: {
        id: '',
        corpId: '',
        secret: ''
      }, // 企业微信配置表单数据
      configureLoading: false, // 企业微信配置弹窗确定按钮 loading
      configureFormRules: {
        corpId: [{ required: true, message: '请输入企业微信corpid', trigger: 'change' }],
        secret: [{ required: true, message: '请输入企业微信secret', trigger: 'change' }]
      } // 企业微信配置表单校验规则
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  activated () {
    if (this.isInitialized) {
      this.$refs.table.refresh()
    } else {
      this.isInitialized = true
    }
  },
  methods: {
    ...mapMutations('community', ['SET_GROUP_VIEW_INFO']),

    /**
     * 点击重置按钮
     */
    onClickResetBtn () {
      this.queryParam = {
        name: undefined,
        type: undefined,
        pageNum: 1,
        pageSize: 10
      }

      this.onClickSearchBtn()
    },

    /**
     * 点击查询按钮
     */
    onClickSearchBtn () {
      this.$refs.table.refresh(true)
    },

    /**
     * 点击新增按钮
     */
    onClickAddBtn () {
      getWechatConfig().then(res => {
        if (res.body.corpId && res.body.secret) {
          this.$router.push({
            path: '/setting/add-community'
          })
        } else {
          this.$message.warning({ content: '请进行企业微信配置' })
        }
      })
    },

    /**
     * 点击企业微信配置按钮
     */
    onClickConfigureBtn () {
      getWechatConfig().then(res => {
        if (res.body.corpId && res.body.secret) {
          this.configureForm = {
            id: res.body.id,
            corpId: res.body.corpId,
            secret: res.body.secret
          }
        }
      }).finally(() => {
        this.showConfigureModal = true
      })
    },

    /**
     * 点击设置进群联系人按钮
     */
    onClickGroupContactBtn () {
      this.$router.push({
        path: '/setting/community-contact'
      })
    },

    /**
     * 点击删除按钮
     * @param {Number} id - 数据 id
     */
    onClickDeleteBtn (id) {
      const _this = this
      this.$confirm({
        content: '确定删除此群？',
        okText: '确定',
        cancelText: '取消',
        onOk () {
          deleteGroup(id).then(() => {
            _this.$message.success({ content: '删除成功' })
            _this.$refs.table.refresh()
          }).catch(err => {
            console.log(err)
          })
        }
      })
    },

    /**
     * 点击查看按钮
     * @param {Object} info - 当前查看的群信息
     */
    onClickViewBtn (info) {
      this.SET_GROUP_VIEW_INFO(info)
      this.$router.push({
        path: '/setting/view-community'
      })
    },

    /**
     * 点击企业微信配置弹窗确认按钮
     */
    onClickConfigureConfirm () {
      this.$refs.configureForm.validate(valid => {
        if (valid) {
          this.configureLoading = true
          updateWechatConfig(this.configureForm).then(res => {
            this.$message.success({ content: '配置成功' })
            this.showConfigureModal = false
            this.onClickConfigureCancel()
          }).catch(err => {
            console.log(err)
          }).finally(() => {
            this.configureLoading = false
          })
        }
      })
    },

    /**
     * 点击取消按钮
     */
    onClickConfigureCancel () {
      this.$refs.configureForm.clearValidate()

      this.configureForm = {
        id: '',
        corpId: '',
        secret: ''
      }
    }
  }
}
</script>
<style scoped lang="less">
</style>
