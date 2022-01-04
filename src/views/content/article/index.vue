<!--
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-11-23 13:56:57
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-22 16:01:21
-->
<!--  -->
<template>
  <div class="">
    <a-card :bordered="false">
      <a-form layout="vertical" class="query-area">
        <a-row :gutter="[16, 0]">
          <a-col :span="6">
            <a-form-item label="文章名称">
              <a-input v-model="queryParam.title" placeholder="" />
            </a-form-item>
          </a-col>

          <a-col :span="6">
            <div class="btn-right">
              <a-button @click="doQuery(0)">重置</a-button>
              <a-button type="primary" @click="doQuery(1)">查询</a-button>
            </div>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
    <div class="btn-area">
      <a-button type="primary" icon="plus" @click="doPlus" v-per:rccaAdd>新增</a-button>
      <!-- <a-dropdown>
        <a-menu slot="overlay">
          <a-menu-item> 发多少</a-menu-item>
        </a-menu>
        <a-button>
          更多
          <a-icon type="caret-down"></a-icon>
        </a-button>
      </a-dropdown> -->
    </div>
    <a-card :bordered="false">
      <s-table
        ref="table"
        size="default"
        rowKey="code"
        :columns="[
          {
            title: '编号',
            dataIndex: 'code'
          },
          {
            title: '名称',
            dataIndex: 'title'
          },
          {
            title: '包含产品',
            dataIndex: 'productCount'
          },
          {
            title: '应用渠道',
            dataIndex: 'appIds'
          },
          {
            title: '状态',
            dataIndex: 'status',
            scopedSlots: {
              customRender: 'status'
            }
          },
          {
            title: '创建时间',
            dataIndex: 'createTime'
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
        <template slot="status" slot-scope="text">
          {{ text | showStatus }}
        </template>
        <template slot="operation">
          <div class="oppo">
            <a-popconfirm title="确定删除此文章?" ok-text="确定" cancel-text="取消" @confirm="confirm" @cancel="cancel">
              <a-button type="link" class="w-red"> 删除 </a-button>
            </a-popconfirm>
            <a-button type="link" @click="doEdit"> 编辑 </a-button>
          </div>
        </template>
      </s-table>
    </a-card>
  </div>
</template>

<script>
// import { getArticleTable } from '@/api/test'
import { STable } from '@/components'
import { getArticleList } from '@/api/content/article'
export default {
  name: 'Article',
  components: { STable },
  data() {
    return {
      queryParam: {
        companyId: '',
        pageNum: 1,
        pageSize: 10,
        title: ''
      },
      loadData: () => {
        return getArticleList(this.queryParam).then((res) => {
          return res.body
        })
      }
    }
  },
  filters: {
    showStatus(val) {
      const rule = ['下线', '上线', '草稿']
      return rule[val]
    }
  },
  computed: {},
  watch: {},
  methods: {
    doEdit() {
      console.log(123123)
      this.$router.push({ name: 'plusArticle' })
    },
    doPlus() {
      this.$router.push({ name: 'plusArticle' })
    },
    doQuery(e) {
      const rule = {
        0: () => {
          // 重置
          this.queryParam.title = ''
        },
        1: () => {
          // 搜索
        }
      }
      rule[e] && rule[e]()
      this.$refs.table.refresh(e)
    },
    confirm() {},
    cancel() {}
  },
  created() {},
  mounted() {
    getArticleList().then((res) => {
      console.log(333333333, res)
    })
  }
}
</script>
<style scoped lang="less"></style>
