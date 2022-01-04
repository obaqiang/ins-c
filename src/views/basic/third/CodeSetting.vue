<!--
 * @Descripttion: 
 * @Author: zhaodi
 * @Date: 2021-11-23 20:25:11
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-11-24 17:05:33
-->
<!-- COMPONENTNAME -->
<template>
  <div>
    <a-card
      style="width:100%"
      :tab-list="tabListNoTitle"
      :active-tab-key="tabKey"
      @tabChange="key => onTabChange(key, 'tabKey')"
    >
      <div v-if="tabKey === 'userCode'">
        <a-table
          :pagination="pagination"
          :columns="userCodeColumns"
          :data-source="userCodeList"
          @change="tablePaginationChange"
     
        >
          <template v-slot:action>
            <a-button type="link" @click="handleEdit(record)">编码设置</a-button>
            <a-button type="link">查看</a-button>
          </template>
        </a-table>
      </div>
      <div v-else-if="tabKey === 'merchantCode'">
        客户编码内容
        <a-input-group compact>
          <a-input style=" width: 100px; text-align: center;border-right: 0" placeholder="最小值" />
          <a-input
            style=" width: 30px; border-left: 0; pointer-events: none; backgroundColor: #fff"
            placeholder="~"
            disabled
          />
          <a-input style="width: 100px; text-align: center; border-left: 0" placeholder="最大值" />
        </a-input-group>
      </div>
      <div v-else-if="tabKey === 'departmentCode'">
        部门编码内容
      </div>
    </a-card>
  </div>
</template>

<script>
const userCodeList = []
for (let i = 1; i < 100; i++) {
  userCodeList.push({
    key: i,
    baseinfo: `基本信息 ${i}`,
    code: `编码 ${i}`,
    department: `部门 ${i}`,
    state: '状态',
    name: `Edrward ${i}`,
    age: 32,
    address: `London Park no. ${i}`
  })
}

export default {
  name: 'COMPONENTNAME2',
  props: {},
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        showLessItems: true,
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        showTotal: (total, range) => {
          this.pagination.total = total
          return `第 ${range[0]}-${range[1]} 条/总共 ${total} 条`
        }
      },
      tabListNoTitle: [
        {
          key: 'userCode',
          tab: '用户编码对应'
        },
        {
          key: 'merchantCode',
          tab: '客商编码对应'
        },
        {
          key: 'departmentCode',
          tab: '部门编码对应'
        }
      ],
      tabKey: 'userCode',
      userCodeColumns: [
        { title: '用户名', dataIndex: 'name', key: '5', width: 150 },
        { title: '基本信息', dataIndex: 'baseinfo', key: '6', width: 150 },
        { title: '财务编码', dataIndex: 'code', key: '7', width: 150 },
        { title: '部门', dataIndex: 'department', key: '8', width: 150 },
        { title: '状态', dataIndex: 'state', key: '9', width: 150 },
        {
          title: '创建人 / 创建时间',
          dataIndex: 'address',
          width: 150,
          key: '19'
        },
        { title: '最后修改人', dataIndex: 'address', key: '29', width: 150 },
        // { title: '状态', dataIndex: 'address', key: '39' },
        {
          title: '操作',
          key: 'operation',
          fixed: 'right',
          width: 200,
          scopedSlots: { customRender: 'action' }
        }
      ],
      userCodeList,
      mdl: null
    }
  },
  computed: {},
  watch: {},
  methods: {
    onTabChange(key, type) {
      console.log(key, type)
      this[type] = key
    },
    tablePaginationChange(pagination) {
      console.log(pagination)
      this.pagination.current = pagination.current
      this.pagination.pageSize = pagination.pageSize
      this.currentPage = pagination.current
      this.pageSize = pagination.pageSize
    },
    handleEdit(record) {
      this.visible = true
      this.mdl = { ...record }
    }
  },
  created() {},
  mounted() {}
}
</script>
<style scoped lang="less">
.c {
  background-color: #fff;
}
</style>
