<!--
 * @Description: 分类导航组件
 * @Author: panwenda
 * @Date: 2021-11-12 11:32:52
 * @LastEditors: panwenda
 * @LastEditTime: 2021-11-29 14:31:52
-->

<template>
  <div class="classified-navigation" :style="{ background: background, padding: `${verticalPadding}px 0` }">
    <div class="classified-cell" v-for="(item, index) in list" :key="index">
      <div class="classified-block"></div>
      <div class="classified-title">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClassifiedNavigation',
  components: {},
  computed: {},
  props: {
    background: {
      type: String,
      default: 'transparent'
    },

    verticalPadding: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      list: [
        { title: '自由行' },
        { title: '境内游' },
        { title: '酒景玩乐' },
        { title: '全球购' },
        { title: '跟团游' },
        { title: '亲子游' },
        { title: '酒店' },
        { title: '火车票' }
      ]
    }
  },
  watch: {},
  methods: {}
}
</script>

<style lang="less" scoped>
  .classified-navigation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-flow: row wrap;

    .classified-cell {
      display: flex;
      align-items: center;
      flex-direction: column;
      width: 25%;
      text-align: center;

      .classified-block {
        width: 40px;
        height: 40px;
        background: #adadad;
      }

      .classified-title {
        margin-top: 5px;
        margin-bottom: 10px;
        font-size: 12px;
      }
    }
  }
</style>
