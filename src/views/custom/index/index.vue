<!--
 * @Description: 自定义配置
 * @Author: panwenda
 * @Date: 2021-11-29 14:09:07
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-17 15:48:29
-->

<template>
  <div class="home">
    <!--------------------------- 组件面板 --------------------------->
    <div class="components-board">
      <a-tabs :tabBarGutter="0">
        <a-tab-pane v-for="(item, index) in leftComponents" :key="index" :tab="item.title">
          <draggable
            class="components-list"
            v-model="item.list"
            :group="{ name: 'form', pull:'clone', put: false }"
            :sort="false"
            :clone="cloneComponentInfo"
            @end="onComponentDragEnd"
          >
            <div class="list-cell" v-for="(itm, idx) in item.list" :key="idx" @click="onClickAddFormItem(itm)">
              <div class="cell-title"><a-icon :type="itm.config.tagIcon" />{{ itm.config.label }}</div>
            </div>
          </draggable>
        </a-tab-pane>
      </a-tabs>
    </div>

    <!--------------------------- 显示面板 --------------------------->
    <div class="app-panel">
      <div class="app-container" :style="{ backgroundColor: basicConfig.background }">
        <draggable
          class="app-board"
          v-model="formItems"
          group="form"
          ghostClass="drag-ghost"
          :animation="300"
        >
          <div :class="['component-item', item.id === activeItem.id ? 'component-active-item' : '']" v-for="item in formItems" :key="item.id" @click="activeItem = item">
            <render :componentInfo="item"/>
          </div>
        </draggable>
      </div>
    </div>

    <!--------------------------- 属性面板 --------------------------->
    <div class="property-panel">
      <div class="property-panel-title">通用配置</div>
      <div class="property-form">
        <a-form layout="horizontal" :labelCol="{ span: 7 }" :wrapperCol="{ span: 14, offset: 1 }">
          <a-form-item label="背景颜色">
            <colorPicker class="color-picker" v-model="basicConfig.background" />
          </a-form-item>
        </a-form>
      </div>

      <template v-if="Object.keys(activeItem).length">
        <div class="property-panel-title">组件配置</div>
        <div class="property-form">
          <a-form layout="horizontal" :labelCol="{ span: 7 }" :wrapperCol="{ span: 14, offset: 1 }">
            <a-form-item v-if="activeItem.attr.hasOwnProperty('verticalPadding')" label="组件距离">
              <slider v-model="activeItem.attr.verticalPadding" :min="0" :max="50" />
            </a-form-item>

            <a-form-item v-if="activeItem.attr.hasOwnProperty('text')" label="标题">
              <a-input v-model="activeItem.attr.text" />
            </a-form-item>

            <a-form-item v-if="activeItem.attr.hasOwnProperty('background')" label="背景颜色">
              <colorPicker class="color-picker" v-model="activeItem.attr.background" />
            </a-form-item>

            <a-form-item v-if="activeItem.attr.hasOwnProperty('fontColor')" label="字体颜色">
              <colorPicker class="color-picker" v-model="activeItem.attr.fontColor" />
            </a-form-item>
          </a-form>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { Slider } from 'ant-design-vue'
import draggable from 'vuedraggable'
import render from '../libs/render'
import { deepCopy } from '../libs/util'
import {
  homeComponents,
  mineComponents
} from '../libs/config'
export default {
  name: 'Home',
  components: {
    draggable,
    render,
    Slider
  },
  data () {
    return {
      leftComponents: [
        { title: '主页', list: homeComponents },
        { title: '个人中心', list: mineComponents }
      ], // 组件列表
      basicConfig: {
        background: '#fff'
      }, // 基础配置信息
      dragCloneData: {}, // 组件拖拽时克隆的数据
      activeItem: {}, // 当前编辑表单项
      formItems: []
    }
  },
  methods: {
    /**
     * @description      - 拖拽新增组件时的克隆回调
     * @param {Object} e - 新增的克隆的数据
     */
    cloneComponentInfo (e) {
      const componentInfo = deepCopy(e)
      // 设置表单项的标识
      componentInfo.id = this._getMaxNumber(this.formItems, 'id') + 1

      this.dragCloneData = componentInfo

      return componentInfo
    },

    /**
     * @description      - 监听组件面板组件拖拽行为结束
     * @param {Object} e - 拖拽行为数据
     */
    onComponentDragEnd (e) {
      if (e.from !== e.to) {
        this.activeItem = this.dragCloneData
      }
    },

    /**
     * @description         - 点击新增组件
     * @param {Object} item - 新增的数据
     */
    onClickAddFormItem (item) {
      const componentInfo = deepCopy(item)
      // 设置表单项的标识
      componentInfo.id = this._getMaxNumber(this.formItems, 'id') + 1

      this.activeItem = componentInfo

      this.formItems.push(componentInfo)

      // 更新滚动条位置
      this.$nextTick(() => {
        const distance = document.querySelector('.component-active-item').offsetTop - document.querySelector('.app-container').scrollTop
        this._updateQuestionnaireBoardScroll(distance)
      })
    },

    /**
     * @description                  - 获取最大值
     * @param {Array} list           - 数据源
     * @param {String|undefined} key - 需要获取最大值的字段
     */
    _getMaxNumber (list, key) {
      const filterList = key ? list.map(v => v[key]) : list
      return filterList.reduce((previous, current) => {
        return previous > current ? previous : current
      }, 0)
    },

    /**
     * @description             - 更新表单面板滚动条位置
     * @param {Number} distance - 滚动距离
     */
    _updateQuestionnaireBoardScroll (distance) {
      if (distance) {
        const duration = 300
        const startTime = Date.now()
        const initScrollTop = document.querySelector('.app-container').scrollTop
        requestAnimationFrame(function step () {
          const p = Math.min(1, (Date.now() - startTime) / duration)
          document.querySelector('.app-container').scrollTop = (initScrollTop + distance * p)
          p < 1 && requestAnimationFrame(step)
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .home {
    background-color: red;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .components-board {
      width: 250px;
      height: calc(100vh - 200px);
      background: white;

      .components-list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-flow: row wrap;
        padding: 0 20px;

        .list-cell {
          width: 102px;
          height: 35px;
          padding: 0 10px;
          margin-bottom: 6px;
          box-sizing: border-box;
          line-height: 35px;
          background: rgba(24, 144, 255, 0.05);
          cursor: move;

          .cell-title {
            font-size: 12px;
            color: #909399;

            i {
              margin-right: 5px;
            }
          }
        }
      }
    }

    .app-panel {
      width: 375px;
      height: 667px;
      padding: 35px 10px;
      box-sizing: border-box;
      background: url(../images/mobile_phone_bg.png) no-repeat;
      background-size: 375px 667px;

      .app-container {
        height: 607px;
        border-radius: 20px;
        padding: 10px;
        box-sizing: border-box;
        overflow: auto;
        &:hover {
          &::-webkit-scrollbar-thumb {
              background: rgba(144,147,153,.3);
          }
        }

        &::-webkit-scrollbar {
            width: 6px;
            position: absolute;
            top: 0;
            right: 0;
            z-index: 1000;
        }

        &::-webkit-scrollbar-thumb {
            background: transparent;
            border-radius: 20px;
        }

        .app-board {
          min-height: 100%;

          .drag-ghost {
            background: rgba(24, 144, 255, 0.05);
          }

          .drag-ghost.list-cell {
            height: 35px;
            padding: 0 10px;
            box-sizing: border-box;
            line-height: 35px;

            .cell-title {
              font-size: 12px;
              color: #909399;

              i {
                margin-right: 5px;
              }
            }
          }

          .component-item {
            position: relative;
            border-radius: 4px;
            cursor: move;
          }

          .component-active-item {
            // background: rgba(24, 144, 255, 0.15);
            border: 1px dashed rgba(24, 144, 255, 0.5);
          }
        }
      }
    }

    .property-panel {
      width: 300px;
      height: calc(100vh - 200px);
      background: white;

      .property-panel-title {
        height: 45px;
        line-height: 45px;
        text-align: center;
        font-size: 14px;
        border-bottom: 1px solid #e8e8e8;
      }

      .property-form {
        padding: 0 20px;

        .color-picker {
          position: relative;
          top: 4px;
          border: 1px solid #adadad;
        }
      }
    }
  }
</style>
