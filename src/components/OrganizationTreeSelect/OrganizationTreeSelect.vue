<!--
 * @Description: 组织架构树选择组件
 * @Author: panwenda
 * @Date: 2021-12-25 11:46:32
 * @LastEditors: panwenda
 * @LastEditTime: 2021-12-28 15:29:15
-->

<template>
  <tree-select
    v-model="selectedValue"
    :disabled="disabled"
    :placeholder="placeholder"
    labelInValue
    tree-data-simple-mode
    :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
    :tree-data="treeData"
    :tree-checkable="multiple"
    treeNodeFilterProp="title"
    treeCheckStrictly
    allow-clear
    :load-data="onLoadData"
  />
</template>

<script>
import { TreeSelect } from 'ant-design-vue'
import {
  getDepartmentList,
  getUserList
} from '@/api/setting/community.js'
export default {
  name: 'PeopleTreeSelect',
  components: {
    TreeSelect
  },
  computed: {
    selectedValue: {
      get: function () {
        if (this.multiple) {
          return this.multipleData
        } else {
          return (this.singleData && this.singleData.value) ? this.singleData : undefined
        }
      },

      set: function (newValue) {
        if (!this.multiple && newValue === undefined) {
          newValue = {}
        }
        this.$emit('changeSelected', newValue)
      }
    }
  },
  props: {
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    },

    // 选择类型（department-部门、user-人员）
    type: {
      default: 'user',
      validator: value => {
        return ['department', 'user'].indexOf(value) !== -1
      }
    },

    // 单选默认选中值
    singleData: {
      type: Object,
      default: () => {}
    },

    // 多选默认选中值
    multipleData: {
      type: Array,
      default: () => []
    },

    // 禁用选择列表
    disabledList: {
      type: Array,
      default: () => []
    },

    // 是否支持多选
    multiple: {
      type: Boolean,
      default: true
    },

    // 选择框默认文字
    placeholder: {
      type: String,
      default: '请选择'
    }
  },
  data () {
    return {
      treeData: [],
      initDepartmentId: 1,
      departmentList: []
    }
  },
  watch: {
    disabledList () {
      // 过滤禁用选择
      this._filterDisabledSelect()
    },
  },
  created () {
    // 获取部门列表
    this._getDepartmentList()
  },
  methods: {
    /**
     * 异步加载数据
     */
    onLoadData (treeNode) {
      const { id } = treeNode.dataRef
      const list = this.departmentList.filter(v => v.parentId === id)
      if (this.type === 'department' || list.length) {
        // 显示子级部门
        return new Promise(resolve => {
          this.treeData = this.treeData.concat(list.map(v => {
            let item = {
              id: v.id,
              pId: id,
              value: v.id,
              title: v.name,
              disabled: this.disabledList.findIndex(item => item.value === v.id) >= 0,
              selectable: false,
              checkable: false
            }

            if (this.type === 'department') {
              const extra = {
                isLeaf: this.departmentList.filter(item => item.parentId === v.id).length === 0,
                selectable: true,
                checkable: true
              }

              item = Object.assign(item, extra)
            }

            return item
          }))
          resolve()
        })
      } else {
        // 显示子级人员
        return getUserList(id).then(res => {
          this.treeData = this.treeData.concat(res.body.map(v => {
            return {
              pId: id,
              value: v.userid,
              title: v.name,
              disabled: this.disabledList.findIndex(item => item.value === v.userid) >= 0,
              isLeaf: true
            }
          }))
        })
      }
    },

    /**
     * 获取部门列表
     */
    _getDepartmentList () {
      getDepartmentList(this.initDepartmentId).then(res => {
        this.departmentList = res.body
        this.treeData = res.body.filter(v => v.id === this.initDepartmentId).map(v => {
          let item = {
            id: v.id,
            pId: 0,
            value: v.id,
            title: v.name,
            disabled: this.disabledList.findIndex(item => item.value === v.id) >= 0,
            selectable: false,
            checkable: false
          }

          if (this.type === 'department') {
            const extra = {
              isLeaf: this.departmentList.filter(item => item.parentId === v.id).length === 0,
              selectable: true,
              checkable: true
            }

            item = Object.assign(item, extra)
          }

          return item
        })
      })
    },

    /**
     * 过滤禁用选择
     */
    _filterDisabledSelect () {
      this.treeData.forEach(item => {
        const disabledIndex = this.disabledList.findIndex(v => v.value === item.value)
        if (disabledIndex >= 0) {
          item.disabled = true
        } else if (item.disabled) {
          item.disabled = false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
