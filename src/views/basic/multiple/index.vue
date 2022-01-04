<!--
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-11-20 17:03:47
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-27 10:22:07
-->
<!--  -->
<template>
  <div>
    <div class="btn-area" style="padding-top: 0">
      <a-button type="primary" @click="plusMini">接入</a-button>
    </div>
    <a-card :bordered="false">
      <s-table
        ref="table"
        size="default"
        rowKey="id"
        :columns="[
          {
            title: '小程序编号',
            dataIndex: 'miniShowId'
          },
          {
            title: '小程序名称',
            dataIndex: 'miniAppName',
            scopedSlots: { customRender: 'miniAppName' }
          },
          {
            title: '类型',
            dataIndex: 'miniAppType',
            scopedSlots: { customRender: 'miniAppType' }
          },
          {
            title: '状态',
            dataIndex: 'status',
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '操作',
            key: 'action',
            scopedSlots: { customRender: 'operation' }
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
        <template slot="miniAppName" slot-scope="text">
          <a-button type="link" @click="doSee">{{ text }}</a-button>
        </template>
        <template slot="miniAppType" slot-scope="text">{{ text | showType }}</template>
        <template slot="status" slot-scope="text">{{ text | showStatus }}</template>
        <template slot="operation" slot-scope="text, record">
          <div class="oppo">
            <a-popconfirm
              v-if="record.status == 5"
              title="停用后小程序将在列表中删除且无法再进行管理是否继续？"
              ok-text="确定"
              cancel-text="取消"
              @confirm="confirmPause(record.id)"
            >
              <a-button type="link">停用</a-button>
            </a-popconfirm>

            <a-button type="link" @click="doEdit(record)"> 编辑 </a-button>
            <a-button type="link" @click="doAuth(record)">授权</a-button>
            <a-button type="link" @click="doUpgrade(record)">升级</a-button>
            <a-button type="link" @click="showHis(record)">历史版本</a-button>
            <!-- <a-button type="link" class="w-red"> 删除 </a-button> -->
          </div>
        </template>
      </s-table>
    </a-card>
    <TemModal
      :propVisible.sync="temModal"
      :thirdPartyAppid="curTemId"
      :curAppId="curAppId"
      @upgradeSuccess="upgradeSuccess"
    />
    <HisModal :propVisible.sync="hisModal" :curAppId="curAppId" />
    <!-- <HisModal :propVisible.sync="hisModal" :key="curHisId" :thirdPartyAppid="curHisId" :curAppId="curAppId" /> -->
  </div>
</template>

<script>
import { STable } from '@/components'
// import { multipleTableData } from '@/api/test'
import { getList, pauseMini, authApp } from '@/api/multiple/mini'
import storage from 'store'
import HisModal from './hisModal.vue'
import TemModal from './temModal.vue'
export default {
  name: 'Multiple',
  components: {
    STable,
    HisModal,
    TemModal
  },
  data() {
    return {
      curAppId: '',
      curHisId: '',
      curTemId: '',
      hisModal: false,
      temModal: false,
      queryParam: {},
      loadData: () => {
        return getList(this.queryParam).then((res) => {
          return res.body
        })
      }
    }
  },
  filters: {
    showType(val) {
      const rule = {
        0: () => {
          return '微信小程序'
        }
      }
      return rule[val] && rule[val]()
    },
    showStatus(val) {
      const rule = {
        0: () => {
          return '待授权'
        },
        1: () => {
          return '授权中'
        },
        2: () => {
          return '已授权'
        },
        3: () => {
          return '审核中'
        },
        4: () => {
          return '审核失败'
        },
        5: () => {
          return '已发布'
        }
      }
      return rule[val] && rule[val]()
    }
  },
  computed: {},
  watch: {},
  methods: {
    /**
     * @description: 小程序升级成功之后的回调
     * @params {*}
     * @return {*}
     */
    upgradeSuccess() {
      this.$refs.table.refresh()
    },
    /**
     * @description: 升级
     * @params {*}
     * @return {*}
     */
    doUpgrade(e) {
      console.log(e)
      this.temModal = true
      this.curTemId = e.thirdPartyAppid
      this.curAppId = e.miniAppId
    },
    /**
     * @description: 查看历史版本
     * @params {*}
     * @return {*}
     */
    showHis(e) {
      this.hisModal = true
      this.curAppId = e.miniAppId
      this.curHisId = e.id
    },
    /**
     * @description: 授权
     * @params {*}
     * @return {*}
     */
    doAuth(e) {
      // this.$router.push({ path: '/basic/multiple/doAuth' })
      authApp(e.thirdPartyAppid).then((res) => {
        // window.location.href = res.body
      })
    },
    /**
     * @description: 去查看
     * @params {*}
     * @return {*}
     */
    doSee(e) {
      storage.set('pageStatus', 'see')
      this.$router.push({ path: '/basic/multiple/access' })
    },
    /**
     * @description:编辑
     * @params {*}
     * @return {*}
     */
    doEdit(e) {
      storage.set('accessData', e)
      this.$router.push({ path: '/basic/multiple/access' })
    },
    /**
     * @description:接入
     * @params {*}
     * @return {*}
     */
    plusMini() {
      this.$router.push({ path: '/basic/multiple/access' })
    },
    /**
     * @description: 停用
     * @params {*}
     * @return {*}
     */
    confirmPause(e) {
      pauseMini(e).then(() => {
        this.$message.success('已停用并删除')
        this.$refs.table.refresh()
      })
    },
    confirm() {}
  },
  created() {},
  mounted() {}
}
</script>
<style scoped></style>
