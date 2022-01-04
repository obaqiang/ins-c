<!--
 * @Description: 产品选择组件
 * @Author: panwenda
 * @Date: 2021-12-23 17:24:39
 * @LastEditors: panwenda
 * @LastEditTime: 2021-12-24 19:29:03
-->

<template>
  <div class="product-select">
    <!-- 选择按钮 -->
    <div>
      <span @click="showModel = true">
        <slot><a-button type="primary" ghost>请选择</a-button></slot>
      </span>
    </div>

    <!-- 已选列表 -->
    <div class="selected-list">
      <div class="selected-item" v-for="(item, index) in selectedList" :key="index">
        <div class="selected-text">{{ item.name }}</div>
        <coffee-icon type="icon-guanbi" :style="{ fontSize: '10px', color: '#999999', cursor: 'pointer' }" @click="onClickDeleteBtn(index)"></coffee-icon>
      </div>
    </div>

    <!-- 选择产品弹窗 -->
    <a-modal class="product-select-modal" v-model="showModel" title="选择产品" :width="870" :dialogStyle="{ top: '50px' }" :bodyStyle="{ paddingBottom: '13px' }" @ok="onClickConfirm" @cancel="onClickCancel">
      <!-- 筛选表单 -->
      <a-form layout="horizontal">
        <a-row :gutter="[16, 0]">
          <a-col :span="10">
            <a-form-item
              label="线路编号"
              :labelCol="{ span: 5 }"
              :wrapperCol="{ span: 19 }"
            >
              <a-input v-model="queryParam.code" placeholder="请输入线路编号" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="10">
            <a-form-item
              label="线路名称"
              :labelCol="{ span: 5 }"
              :wrapperCol="{ span: 19 }"
            >
              <a-input v-model="queryParam.name" placeholder="请输入线路编号" allowClear />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-button type="primary" @click="onClickSearchBtn">查询</a-button>
          </a-col>
        </a-row>
      </a-form>

      <!-- 数据表格 -->
      <s-table
        ref="table"
        size="default"
        rowKey="id"
        :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange, type: selectType }"
        :columns="columns"
        :data="loadData"
        :pagination="pagination"
      ></s-table>
    </a-modal>
  </div>
</template>

<script>
import { STable } from '@/components'
export default {
  name: 'ProductSelect',
  components: {
    STable
  },
  computed: {},
  props: {
    // 选择类型：单选 radio、多选 checkbox
    selectType: {
      type: String,
      default: 'checkbox'
    },

    // 已选择的数据列表
    selectedList: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      showModel: false, // 是否显示产品弹窗
      queryParam: {
        code: undefined,
        name: undefined,
        pageNum: 1,
        pageSize: 10
      }, // 列表请求参数
      tempSelectedList: [], // 备份的已选数据
      selectedRowKeys: [], // 选中项的 key 数组
      selectedRows: [], // 选中项二维数组，每项为当前页选中的数据组
      pagination: {
        showQuickJumper: true,
        showTotal: (total, range) => {
          return `第 ${range[0]}-${range[1]} 条/总共 ${total} 条`
        }
      },
      loadData: parameter => {
        this.queryParam.pageNum = parameter.pageNum
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve()
          }, 300)
        }).then(() => {
          const list = []
          for (let i = (parameter.pageNum - 1) * parameter.pageSize; i < parameter.pageNum * parameter.pageSize; i++) {
            list.push({
              id: i,
              code: `${i + 1}-GG20211021001`,
              name: `${i + 1}杭州市西湖区古荡湾杭州市西湖区古荡湾`,
              day: '2天',
              price: '￥200'
            })
          }

          // 回显数据处理
          if (this.selectType === 'checkbox') {
            // 多选处理
            const selectedRows = []
            list.forEach((item, index) => {
              const selectedIndex = this.tempSelectedList.findIndex(v => v.id === item.id)
              if (selectedIndex >= 0) {
                // 设置选中数据索引，将选中数据按分页放入选中项二维数组
                this.selectedRowKeys.push((parameter.pageNum - 1) * parameter.pageSize + index)
                selectedRows.push(item)

                // 在备份的已选数据中删除，避免最后确认选择时合并数据发生重复
                this.tempSelectedList.splice(selectedIndex, 1)
              }
            })
            this.selectedRows[parameter.pageNum - 1] = selectedRows
          } else {
            // 单选处理
            if (this.tempSelectedList[0]) {
              const selectedIndex = list.findIndex(v => v.id === this.tempSelectedList[0].id)
              if (selectedIndex >= 0) {
                // 设置选中数据索引
                this.selectedRowKeys = [(parameter.pageNum - 1) * parameter.pageSize + selectedIndex]
              }
            }
          }

          return {
            list,
            pageNum: parameter.pageNum,
            pageSize: 10,
            total: 100,
            totalPage: 10
          }
        })
      },
      columns: [
        { title: '线路编号', dataIndex: 'code' },
        { title: '线路名称', dataIndex: 'name' },
        { title: '行程天数', dataIndex: 'day' },
        { title: '价格', dataIndex: 'price', align: 'right' }
      ]
    }
  },
  watch: {
    showModel (val) {
      if (val) {
        // 再次打开时刷新
        this.$refs.table && this.onClickSearchBtn()

        // 单选模式下判断回显数据格式
        if (this.selectType === 'radio' && this.selectedList.length > 1) {
          if (process.env.NODE_ENV === 'development') {
            this.$message.warning({ content: '单选模式下，selectedList 应该为数据长度小于等于 1 的数组' })
          }
          return
        }

        this.tempSelectedList = [...this.selectedList]
      }
    }
  },
  methods: {
    /**
     * 点击删除选中数据按钮
     * @param {Number} index - 选中数据的索引
     */
    onClickDeleteBtn (index) {
      this.selectedList.splice(index, 1)
      this.$emit('selectConfirm', this.selectedList)
    },

    /**
     * 监听表格选中项发生变化
     * @param {Array} selectedRowKeys - 选中项的 key 数组
     * @param {Array} selectedRows    - 选中项数组
     */
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys

      if (this.selectType === 'checkbox') {
        this.selectedRows[this.queryParam.pageNum - 1] = selectedRows
      } else {
        this.tempSelectedList = selectedRows
      }
    },

    /**
     * 点击查询按钮
     */
    onClickSearchBtn () {
      this.$refs.table.refresh(true)
    },

    /**
     * 点击确认按钮
     */
    onClickConfirm () {
      let confimList = []
      if (this.selectType === 'checkbox') {
        confimList = this.tempSelectedList.concat(this.selectedRows.flat())
      } else {
        confimList = [...this.tempSelectedList]
      }

      if (confimList.length <= 20) {
        this.$emit('selectConfirm', confimList)
        this.onClickCancel()
        this.showModel = false
      } else {
        this.$message.warning({ content: `当前已选 ${confimList.length} 条数据，最多可选择 20 条数据` })
      }
    },

    /**
     * 点击取消按钮
     */
    onClickCancel () {
      this.queryParam = {
        name: undefined,
        type: undefined,
        pageNum: 1,
        pageSize: 10
      }

      this.selectedRowKeys = []
      this.selectedRows = []
      this.tempSelectedList = []
    }
  }
}
</script>

<style lang="less" scoped>
  .selected-list {
    display: flex;
    align-items: center;
    flex-flow: row wrap;

    .selected-item {
      display: flex;
      align-items: center;
      height: 24px;
      padding: 0 8px;
      margin-right: 8px;
      margin-top: 8px;
      color: rgba(0, 0, 0, 0.65);
      font-size: 12px;
      font-weight: 400;
      border-radius: 2px;
      background: rgba(0, 0, 0, 0.04);

      &:last-child {
        margin-right: 0;
      }

      .selected-text {
        max-width: 120px;
        margin-right: 8px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }

  .product-select-modal {
    /deep/ .ant-form-item {
      margin-bottom: 16px;

      .ant-form-item-label {
        line-height: 32px;
      }
      
      .ant-form-item-control {
        line-height: 32px;
      }
    }

    /deep/ .ant-modal-footer {
      border-top: none;
    }
  }
</style>
