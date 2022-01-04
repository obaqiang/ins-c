<!--
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-11-20 11:13:43
 * @LastEditors: panwenda
 * @LastEditTime: 2021-12-29 11:51:59
-->
<template>
  <div class="">
    <a-card :bordered="false">
      <a-form layout="vertical">
        <a-row :gutter="[16, 0]">
          <a-col :span="6">
            <a-form-item label="广告名称">
              <a-input v-model="queryParam.name" placeholder="请输入广告名称" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="6">
            <a-form-item label="广告类型">
              <a-select v-model="queryParam.type" placeholder="请选择广告类型" allowClear>
                <a-select-option v-for="(item, index) in advertiseTypeList" :key="index" :value="item.value">{{ item.label }}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <div class="btn-right">
              <a-button type="primary" ghost @click="onClickResetBtn">重置</a-button>
              <a-button type="primary" @click="onClickSearchBtn">查询</a-button>
            </div>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
    <div class="btn-area">
      <a-button class="btn" type="primary" @click="onClickEditBtn(0)">新增</a-button>
    </div>
    <a-card :bordered="false">
      <s-table ref="table" size="default" rowKey="id" :columns="columns" :data="loadData" :pagination="pagination">
        <!-- 类型 -->
        <div slot="advertiseType" slot-scope="text, record">{{ record.type | filterAdvertiseType }}</div>

        <!-- 有效时间 -->
        <div slot="effectiveTime" slot-scope="text, record">
          {{ record.startTime | filterDate }} 至 {{ record.startTime | filterDate }}
        </div>

        <!-- 应用渠道 -->
        <div slot="applicationChannels" slot-scope="text, record">{{ record.appInfos | filterAppInfo }}</div>

        <!-- 操作 -->
        <div slot="operation" slot-scope="text, record" class="oppo">
          <a-button class="w-red" type="link" @click="onClickDeleteBtn(record.id)"> 删除 </a-button>
          <a-button type="link" @click="onClickEditBtn(record.id)"> 编辑 </a-button>
        </div>
      </s-table>
    </a-card>
  </div>
</template>

<script>
import {
  getAdvertiseList,
  deleteAdvertise
} from '@/api/setting/advertise.js'
import { STable } from '@/components'

const ADVERTISE_TYPE_LIST = [
  { label: '弹窗广告', value: 0 },
  { label: '轮播广告', value: 1 }
]

export default {
  name: 'Advertise',
  components: {
    STable
  },
  filters: {
    // 日期显示过滤
    filterDate (val) {
      return val.slice(0, 10)
    },

    // 广告类型过滤
    filterAdvertiseType (val) {
      const type = ADVERTISE_TYPE_LIST.find(v => v.value === val)
      return type ? type.label : ''
    },

    // 应用渠道显示过滤
    filterAppInfo (val) {
      const list = val.map(v => {
        return v.appName
      })
      return list.join('、') || '-'
    }
  },
  data() {
    return {
      queryParam: {
        name: undefined,
        type: undefined,
        pageNum: 1,
        pageSize: 10
      },
      advertiseTypeList: ADVERTISE_TYPE_LIST, // 广告类型列表
      pagination: {
        showQuickJumper: true,
        showTotal: (total, range) => {
          return `第 ${range[0]}-${range[1]} 条/总共 ${total} 条`
        }
      },
      loadData: parameter => {
        this.queryParam.pageNum = parameter.pageNum
        return getAdvertiseList(this.queryParam).then(res => {
          return res.body
        })
      },
      columns: [
        { title: '编号', dataIndex: 'code' },
        { title: '名称', dataIndex: 'name' },
        { title: '类型', scopedSlots: { customRender: 'advertiseType' } },
        { title: '有效时间', scopedSlots: { customRender: 'effectiveTime' } },
        { title: '应用渠道', scopedSlots: { customRender: 'applicationChannels' } },
        { title: '创建时间', dataIndex: 'createTime' },
        { title: '操作', scopedSlots: { customRender: 'operation' } }
      ],
      isInitialized: false // 初始化参数，避免第一次进入 STable 初始化刷新与 activated 生命周期触发刷新逻辑重复
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  activated () {
    if (this.isInitialized) {
      this.$refs.table.refresh()
    } else {
      this.isInitialized = true
    }
  },
  methods: {
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
     * 点击编辑按钮
     * @param {Number} id - 数据 id
     */
    onClickEditBtn (id) {
      this.$router.push({
        path: '/setting/edit-advertise'
      })
    },

    /**
     * 点击删除按钮
     * @param {Number} id - 数据 id
     */
    onClickDeleteBtn (id) {
      const _this = this
      this.$confirm({
        content: '确定删除此广告？',
        okText: '确定',
        cancelText: '取消',
        onOk () {
          deleteAdvertise(id).then(() => {
            _this.$message.success({ content: '删除成功' })
            _this.$refs.table.refresh()
          }).catch(err => {
            console.log(err)
          })
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
</style>
