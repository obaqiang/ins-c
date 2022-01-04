<!--
 * @Descripttion: 法律文案
 * @Author: shenqiang
 * @Date: 2021-11-20 11:21:23
 * @LastEditors: panwenda
 * @LastEditTime: 2021-12-30 13:48:27
-->
<template>
  <div class="">
    <a-card :bordered="false">
      <s-table ref="table" size="default" rowKey="id" :columns="columns" :data="loadData" :pagination="pagination">
        <!-- 序号 -->
        <div slot="number" slot-scope="text, record, index">{{ (queryParam.pageNum - 1) * queryParam.pageSize + index + 1 | filterNumber }}</div>

        <!-- 文案类型 -->
        <div slot="type" slot-scope="text, record">{{ record.code | filterType }}</div>

        <!-- 操作 -->
        <div slot="operation" slot-scope="text, record" class="oppo">
          <a-button type="link" @click="onClickConfigureBtn(record)"> 配置 </a-button>
          <a-button type="link"> 日志 </a-button>
        </div>
      </s-table>
    </a-card>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { STable } from '@/components'
import { getLawList } from '@/api/setting/law'

const LAW_TYPE_LIST = [
  { label: '用户协议', value: 1 },
  { label: '隐私政策', value: 2 },
  { label: '企业资质', value: 3 }
]

export default {
  name: 'Law',
  components: {
    STable
  },
  filters: {
    // 文案类型过滤
    filterType (val) {
      const type = LAW_TYPE_LIST.find(v => v.value === val)
      return type ? type.label : ''
    },

    // 序号过滤
    filterNumber (val) {
      const length = String(val).length
      if (length < 3) {
        for (let i = 0; i < 3 - length; i++) {
          val = '0' + val
        }
      }
      return val
    }
  },
  data() {
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
        return getLawList(this.queryParam).then((res) => {
          return res.body
        })
      },
      columns: [
        { title: '序号', scopedSlots: { customRender: 'number' } },
        { title: '文案类型', scopedSlots: { customRender: 'type' } },
        { title: '描述', dataIndex: 'description' },
        { title: '操作人', dataIndex: 'creator' },
        { title: '更新时间', dataIndex: 'updateTime' },
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
    ...mapMutations('law', ['SET_LAW_CONFIGURE_INFO']),

    /**
     * 点击配置按钮
     * @param {Object} info - 法律文案信息
     */
    onClickConfigureBtn(info) {
      this.SET_LAW_CONFIGURE_INFO(info)
      this.$router.push({
        path: '/setting/configure-law'
      })
    }
  }
}
</script>
<style scoped lang="less"></style>
