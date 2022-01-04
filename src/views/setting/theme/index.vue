<!--
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-11-20 11:15:48
 * @LastEditors: panwenda
 * @LastEditTime: 2021-12-29 18:00:04
-->
<template>
  <div class="">
    <a-card :bordered="false">
      <a-form layout="vertical">
        <a-row :gutter="[16, 0]">
          <a-col :span="6">
            <a-form-item label="专题名称">
              <a-input v-model="queryParam.subjectName" placeholder="请输入专题名称" />
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
      <a-button class="btn" type="primary" @click="onClickEditBtn(0)">新增</a-button>
    </div>
    <a-card :bordered="false">
      <s-table ref="table" size="default" rowKey="id" :columns="columns" :data="loadData" :pagination="pagination">
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
  getThemeList,
  deleteTheme
} from '@/api/setting/theme.js'
import { STable } from '@/components'
export default {
  name: 'Theme',
  components: {
    STable
  },
  filters: {
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
        subjectName: undefined,
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
        return getThemeList(this.queryParam).then(res => {
          return res.body
        })
      },
      columns: [
        { title: '编号', dataIndex: 'code' },
        { title: '名称', dataIndex: 'subjectName' },
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
        path: '/setting/edit-theme'
      })
    },

    /**
     * 点击删除按钮
     * @param {Number} id - 数据 id
     */
    onClickDeleteBtn (id) {
      const _this = this
      this.$confirm({
        content: '确定删除此专题？',
        okText: '确定',
        cancelText: '取消',
        onOk () {
          deleteTheme(id).then(() => {
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
