<!--
 * @Description: 查看社群
 * @Author: panwenda
 * @Date: 2021-12-28 18:53:49
 * @LastEditors: panwenda
 * @LastEditTime: 2021-12-30 16:55:47
-->

<template>
  <div class="view-community">
    <a-spin :spinning="isLoading">
      <a-card :bordered="false">
        <div class="row">
          <div class="label">编号：</div>
          <div class="value">{{ groupViewInfo.code }}</div>
        </div>
        <div class="row">
          <div class="label">群名称：</div>
          <div class="value">{{ groupViewInfo.name }}</div>
        </div>
        <div class="row">
          <div class="label">群主：</div>
          <div class="value">{{ groupViewInfo.ownerName }}</div>
        </div>
        <div class="row">
          <div class="label">群人数：</div>
          <div class="value">{{ groupViewInfo.currentMember }}/{{ groupViewInfo.totalMember }}</div>
        </div>
        <div class="row">
          <div class="label">群成员：</div>
          <div class="value">{{ memberStr }}</div>
        </div>
        <div class="row">
          <div class="label">简介：</div>
          <div class="value">{{ groupViewInfo.introduction }}</div>
        </div>
      </a-card>
    </a-spin>
  </div>
</template>

<script>
import store from '@/store'
import { mapState } from 'vuex'
import {
  getGroupMember
} from '@/api/setting/community.js'
export default {
  name: 'ViewCommunity',
  components: {},
  computed: {
    ...mapState('community', ['groupViewInfo'])
  },
  props: {},
  data () {
    return {
      isLoading: false, // 是否正在加载
      memberStr: '' // 群成员
    }
  },
  watch: {},
  beforeRouteEnter (to, from, next) {
    // 查看时若无数据则返回
    if (Object.keys(store.state.community.groupViewInfo).length === 0) {
      next({ path: '/setting/community' })
    }
    next()
  },
  activated () {
    this.memberStr = ''
    this.isLoading = true
    // 设置群成员列表
    getGroupMember(this.groupViewInfo.chatId).then(res => {
      this.memberStr = res.body.filter(v => v.userid !== this.groupViewInfo.ownerAccount).map(v => { return v.name }).join('、')
    }).finally(() => {
      this.isLoading = false
    })
  },
  methods: {}
}
</script>

<style lang="less" scoped>
  .view-community {
    position: relative;

    .row {
      display: flex;
      align-items: flex-start;
      margin-bottom: 12px;
      font-size: 12px;
      font-weight: 400;
      line-height: 20px;

      &:last-child {
        margin-bottom: 0;
      }

      .label {
        color: rgba(0, 0, 0, 0.45);
      }

      .value {
        flex: 1;
        color: rgba(0, 0, 0, 0.85);
      }
    }
  }
</style>
