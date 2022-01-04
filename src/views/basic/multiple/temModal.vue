<!--
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-12-21 11:58:02
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-27 10:17:23
-->
<!--  -->
<template>
  <a-modal
    title="选择模板"
    :visible.sync="editVisible"
    :confirm-loading="confirmLoading"
    width="80%"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <s-table
      v-if="loadData"
      ref="table"
      size="default"
      rowKey="id"
      :rowSelection="{ onChange: onSelectChange, type: 'radio' }"
      :columns="[
        {
          title: '',
          dataIndex: 'radio',
          slots: { title: 'radioTitle' },
          scopedSlots: {
            customRender: 'radio'
          }
        },
        {
          title: '模板id',
          dataIndex: 'templateId'
        },
        {
          title: '版本号',
          dataIndex: 'tempVersion'
        },
        {
          title: '版本描述',
          dataIndex: 'tempDesc'
        }
      ]"
      :data="loadData"
      :pagination="{
        showQuickJumper: true,
        showTotal: (total, range) => {
          return `第 ${range[0]}-${range[1]} 条/总共 ${total} 条`
        }
      }"
    >
      <!-- <template slot="radioTitle">
        <a-radio></a-radio>
      </template>
      <template slot="radio">
        <a-radio></a-radio>
      </template> -->
    </s-table>

    <template slot="footer">
      <a-button key="back" @click="handleCancel"> 取消 </a-button>

      <a-popconfirm title="确定切换到此版本？" ok-text="确定" cancel-text="取消" @confirm="handleOk">
        <a-button key="submit" type="primary"> 应用 </a-button>
      </a-popconfirm>
    </template>
  </a-modal>
</template>

<script>
import { STable } from '@/components'
import { getTem, updateTemp } from '@/api/multiple/mini'
export default {
  props: {
    propVisible: {
      type: Boolean,
      default: false
    },
    thirdPartyAppid: {
      type: String,
      default: ''
    },
    curAppId: {
      type: String,
      default: ''
    }
  },
  name: 'TemModal',
  components: {
    STable
  },
  data() {
    return {
      confirmLoading: false,
      loadData: null,
      curRadio: 0,
      tableData: []
    }
  },
  computed: {
    editVisible: {
      get: function () {
        return this.propVisible
      },
      set: function (val) {
        return this.$emit('update:propVisible', val)
      }
    }
  },
  watch: {},
  methods: {
    onSelectChange(e) {
      console.log(e)
      this.curRadio = e[0]
    },
    handleOk(e) {
      const templateId = this.tableData.find((item) => item.id === this.curRadio).templateId
      updateTemp({
        miniAppId: this.curAppId,
        templateId: templateId
      }).then((res) => {
        if (res) {
          this.$message.success('升级成功')
          this.$emit('upgradeSuccess')
          this.editVisible = false
        }
      })
    },
    handleCancel() {
      this.editVisible = false
    }
  },
  created() {},
  mounted() {
    this.loadData = () => {
      return getTem({
        thirdPartyAppId: this.thirdPartyAppid,
        pageSize: 10,
        pageNum: 1
      }).then((res) => {
        this.tableData = res.body.list
        console.log(this.tableData)
        return res.body
      })
    }
  }
}
</script>
<style scoped></style>
