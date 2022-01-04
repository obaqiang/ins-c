<!--
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-11-20 13:50:59
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-24 16:10:24
-->
<!--  -->
<template>
  <div>
    <!-- <div class="test-area">
      <div class="test-area-in">
        fsdfdsfds
      </div>
    </div> -->
    <!-- <div style="position:fixed;top:60px;z-index:1001;">123123321 </div> -->
    <div class="btn-area" style="padding-top: 0">
      <a-button type="primary" @click="doPlus">新增</a-button>
      <!-- <a-button type="primary" class="w-red-bg">删除</a-button> -->
    </div>

    <!-- <coffee-icon type="icon-dizhi" style="font-size: 30px; color: red"></coffee-icon> -->
    <a-card :bordered="false">
      <s-table
        ref="table"
        size="default"
        rowKey="id"
        :columns="[
          {
            title: '编号',
            dataIndex: 'openShowId'
          },
          {
            title: '第三方平台名称',
            dataIndex: 'openName'
          },
          {
            title: 'APPID',
            dataIndex: 'appId'
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
        <template slot="operation" slot-scope="text, record">
          <div class="oppo">
            <a-popconfirm title="确定删除此平台?" ok-text="是" cancel-text="否" @confirm="confirmDelete(record.id)">
              <a-button type="link"> 删除 </a-button>
            </a-popconfirm>
            <a-button type="link" @click="editPlat(record)"> 编辑 </a-button>
            <a-button type="link" @click="doUpgrade(record)"> 升级 </a-button>
            <!-- <a-popconfirm
              title="Are you sure delete this task213123123213123飞个梵蒂冈梵蒂冈?"
              ok-text="Yes"
              cancel-text="No"
              @confirm="confirm"
              @cancel="cancel"
            >
              <a-button type="link" class="w-red"> 删除 </a-button>
            </a-popconfirm> -->
          </div>
        </template>
      </s-table>
    </a-card>

    <!-- <a-cascader
      :options="provinces"
      :load-data="loadData1"
      placeholder="Please select"
      change-on-select
      @change="onChange"
    />

    <a-tabs default-active-key="1" type="card">
      <a-tab-pane key="1" tab="Tab 1"> Content of Tab Pane 1 </a-tab-pane>
      <a-tab-pane key="2" tab="Tab 2" force-render> Content of Tab Pane 2 </a-tab-pane>
      <a-tab-pane key="3" tab="Tab 3"> Content of Tab Pane 3 </a-tab-pane>
    </a-tabs> -->
  </div>
</template>

<script>
import { STable } from '@/components'
import { getPlatFormList, deletePlatFormList, upgradeThird } from '@/api/third/plat.js'
import storage from 'store'
export default {
  name: 'Third',
  components: { STable },
  data() {
    return {
      provinces: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          isLeaf: false,
          type: 'province'
        },
        {
          value: 'zhejiang1',
          label: 'Zhejiang1',
          isLeaf: false,
          type: 'province'
        }
      ],
      cities: [
        {
          value: '123',
          label: '123',
          isLeaf: false,
          type: 'city'
        }
      ],
      options: [
        {
          value: 'zhejiang',
          label: 'Zhejiang',
          isLeaf: false
        },
        {
          value: 'jiangsu',
          label: 'Jiangsu',
          isLeaf: false
        }
      ],
      queryParam: {
        pageNum: 1,
        pageSize: 10
        // current: 1
      },

      current: 1,
      columns: [
        {
          title: '编号',
          dataIndex: 'no'
        },
        {
          title: '第三方平台名称',
          dataIndex: 'name'
        },
        {
          title: 'APPID',
          dataIndex: 'appId'
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      loadData: () => {
        return getPlatFormList(this.queryParam).then((res) => {
          return res.body
        })
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    doUpgrade(e) {
      upgradeThird(e.appId).then((res) => {
        if (res) {
          this.$message.success('已升级最新版本')
        }
      })
    },
    confirmDelete(e) {
      deletePlatFormList(e).then(() => {
        this.$message.success('删除成功')
      })
    },
    editPlat(e) {
      storage.set('thirdListData', e)
      this.$router.push({
        path: '/basic/third/plus'
      })
    },
    onChange(value) {
      console.log(value)
    },
    loadData1(selectedOptions) {
      console.log('selectedOptions的值：', selectedOptions)
      const targetOption = selectedOptions[selectedOptions.length - 1]
      const type = targetOption.type
      console.log(targetOption)
      targetOption.loading = true

      setTimeout(() => {
        targetOption.loading = false
        const rule = {
          province: () => {
            targetOption.children = [
              {
                value: '123',
                label: '123',
                isLeaf: false,
                type: 'city'
              }
            ]
          },
          city: () => {
            targetOption.children = [
              {
                value: '222',
                label: '2222',
                isLeaf: true
              }
            ]
          }
        }
        rule[type] && rule[type]()

        this.provinces = [...this.provinces]
      }, 1000)
    },

    confirm() {},
    cancel() {},
    doPlus() {
      this.$router.push({ path: '/basic/third/plus' })
    }
  },
  created() {},
  mounted() {}
}
</script>
<style scoped lang="less">
/* .ant-layout {
  min-width: 700px !important;
  overflow-x: scroll !important;
} */
.test-area {
  // background: red;
  border: 1px solid green;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  height: 60px;
  .test-area-in {
    position: absolute;
    width: 100%;
    height: 60px;
    top: 0;
    left: 0;
    background: red;
  }
}
</style>
