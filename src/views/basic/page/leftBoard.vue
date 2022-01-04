<!--
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-12-29 10:28:49
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-29 10:37:25
-->
<!--  -->
<template>
  <div>
    <div class="comp-title">{{ title }}</div>
    <draggable
      class="comp-list"
      v-model="list"
      :group="{ name: 'form', pull: 'clone', put: false }"
      :sort="false"
      :clone="cloneComponentInfo"
      filter=".no-move"
      @end="onComponentDragEnd"
    >
      <!-- 注意这里的no-move用来判断元素是否能拖动，通过判断draggable依据 -->
      <div
        v-for="(item, idx) in list"
        :class="item.config.draggable ? 'list-cell' : 'list-cell no-move'"
        :key="idx"
        @click="onClickAddFormItem(item)"
      >
        <coffee-icon :type="item.config.tagIcon" style="font-size: 15px" />
        <span class="icon-text">{{ item.config.label }}</span>
        <!-- <div class="cell-title"><a-icon :type="itm.config.tagIcon" />{{ itm.config.label }}</div> -->
      </div>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  name: 'LeftBoard',
  components: {
      draggable
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {
    onClickAddFormItem(e) {
      this.$emit('onClickAddFormItem', e)
    },
    cloneComponentInfo(e) {
      this.$emit('cloneComponentInfo', e)
    },
    onComponentDragEnd(e) {
      this.$emit('onComponentDragEnd', e)
    }
  },
  created() {},
  mounted() {}
}
</script>
<style scoped></style>
