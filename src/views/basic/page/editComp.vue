<!--
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-11-20 13:49:04
 * @LastEditors: shenqiang
 * @LastEditTime: 2022-01-04 16:29:36
-->
<!--  -->
<template>
  <div class="container">
    <div class="home">
      <!--------------------------- 组件面板 --------------------------->
      <div class="components-board">
        <div class="app-name-area">同程率多多</div>
        <div class="components-board-in">
          <div class="ver-tab">
            <div
              :class="curTab == index ? 'ver-bl-on ver-bl' : 'ver-bl'"
              v-for="(item, index) in leftComponents"
              :key="index"
              @click="changeTab(index)"
            >
              <coffee-icon :type="item.icon" style="font-size: 20px"></coffee-icon>
              <span class="ver-text">{{ item.title }}</span>
            </div>
          </div>

          <div class="comp-list-area">
            <template v-if="leftComponents[curTab].title != '页面配置'">
              <left-board
                key="aBoard"
                :title="leftComponents[curTab].title"
                :list="leftComponents[curTab].list"
                @onClickAddFormItem="onClickAddFormItem"
                @cloneComponentInfo="cloneComponentInfo"
                @onComponentDragEnd="onComponentDragEnd"
              ></left-board>
            </template>
            <template v-if="leftComponents[curTab].title == '页面配置'">
              <div v-for="(item, index) in leftComponents[curTab].types" :key="index">
                <left-board
                  :title="item.title"
                  :list="item.list"
                  @onClickAddFormItem="onClickAddFormItem"
                  @cloneComponentInfo="cloneComponentInfo"
                  @onComponentDragEnd="onComponentDragEnd"
                ></left-board>
              </div>
            </template>

            <!-- <div>
              <div class="comp-title">{{ leftComponents[curTab].title }}</div>
              <draggable
                class="comp-list"
                v-model="leftComponents[curTab].list"
                :group="{ name: 'form', pull: 'clone', put: false }"
                :sort="false"
                :clone="cloneComponentInfo"
                filter=".no-move"
                @end="onComponentDragEnd"
              >
                <div
                  v-for="(item, idx) in leftComponents[curTab].list"
                  :class="item.config.draggable ? 'list-cell' : 'list-cell no-move'"
                  :key="idx"
                  @click="onClickAddFormItem(item)"
                >
                  <coffee-icon :type="item.config.tagIcon" style="font-size: 15px" />
                  <span class="icon-text">{{ item.config.label }}</span>
                </div>
              </draggable>
            </div> -->
          </div>
        </div>
      </div>

      <!--------------------------- 显示面板 --------------------------->
      <div class="app-panel">
        <div class="weixin-default-area">
          <img src="./images/weixin-bg2.png" class="weixin-bg-2" alt="" />
          <!-- <img src="./images/weixin-bg1.png" class="weixin-bg-1" alt="" /> -->
        </div>
        <div class="app-panel-tag-area">
          <div
            :class="curPage == item.pageVal ? 'panel-tag panel-tag-on' : 'panel-tag'"
            v-for="item in pageList"
            :key="item.pageVal"
            @click="changePage(item.pageVal)"
          >
            {{ item.label }}
          </div>
        </div>
        <div class="app-container" :style="{ backgroundColor: basicConfig.background }">
          <draggable class="app-board" v-model="formItems" group="form" ghostClass="drag-ghost" :animation="300">
            <div
              :class="['component-item', item.id === activeItem.id ? 'component-active-item' : '']"
              v-for="item in formItems"
              :key="item.id"
              @click="activeItem = item"
            >
              <!-- 增加一层判断，只有draggable为ture才可以渲染 -->
              <template>
                <render :componentInfo="item" />
                <div v-if="item.id === activeItem.id" class="delete-tag" @click="deleteItem(item.id)">删除</div>
              </template>
            </div>
          </draggable>
        </div>
      </div>

      <!--------------------------- 属性面板 --------------------------->
      <div class="property-panel">
        <template v-if="activeItem.config">
          <renderEdit :componentInfo.sync="activeItem" />
        </template>

        <!-- <div class="property-panel-title">通用配置</div>
        <div class="property-form">
          <a-form layout="horizontal" :labelCol="{ span: 7 }" :wrapperCol="{ span: 14, offset: 1 }">
            <a-form-item label="背景颜色">
              <colorPicker class="color-picker" v-model="basicConfig.background" />
            </a-form-item>
          </a-form>
        </div> -->

        <!-- <template v-if="Object.keys(activeItem).length">
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
        </template> -->
      </div>
    </div>
    <div class="bot-area">
      <a-button style="margin-right: 12px">保存模板</a-button>
      <a-button style="margin-right: 26px" type="primary">应用</a-button>
    </div>
  </div>
</template>

<script>
import { Slider } from 'ant-design-vue'
import draggable from 'vuedraggable'
import render from './libs/render'
import renderEdit from './libs/renderEdit'
import { deepCopy } from './libs/util'
// import { homeComponents, mineComponents } from './libs/config'
import { globalComps } from './libs/global'
import { botComps } from './libs/bottom'
// import { basicComps } from './libs/basic'
import { aComps } from './libs/a'
import { bComps } from './libs/b'
import { cComps } from './libs/c'
// import { mineComps } from './libs/mine'
import Vue from 'vue'
import GlobalPlugin from './libs/plugins'
import { EventBus } from '@/utils/eventBus'
import cloneDeep from 'lodash.clonedeep'
import LeftBoard from './leftBoard.vue'
Vue.use(GlobalPlugin)

export default {
  name: 'EditComp',
  components: {
    draggable,
    render,
    renderEdit,
    Slider,
    LeftBoard
  },
  watch: {
    activeItem: {
      handler(val) {},
      immediate: true,
      deep: true
    }
  },
  data() {
    return {
      appData: {
        // 首页数据
        indexData: {
          bgColor: '',
          comps: []
        },
        // 目的地数据
        desData: {
          bgColor: '',
          comps: []
        },
        // 发现数据
        disData: {
          bgColor: '',
          comps: []
        }
      },
      curPage: 1,
      pageList: [
        {
          pageVal: 1,
          label: '首页'
        },
        {
          pageVal: 2,
          label: '目的地'
        },
        {
          pageVal: 3,
          label: '发现'
        }
      ],
      leftComponents: [
        { title: '全局风格', list: globalComps, icon: 'icon-fengge' },
        { title: '底部导航', list: botComps, icon: 'icon-dibudaohang' },
        {
          title: '页面配置',
          types: [
            { title: '功能组件', list: aComps },
            { title: '运营组件', list: bComps },
            { title: '基础组件', list: cComps }
          ],
          // list: basicComps,
          icon: 'icon-shezhi'
        }
        // { title: '主页', list: homeComponents, icon: 'icon-fengge' },
        // { title: '个人中心', list: mineComponents, icon: 'icon-fengge' }
      ], // 组件列表
      basicConfig: {
        background: '#fff'
      }, // 基础配置信息
      dragCloneData: {}, // 组件拖拽时克隆的数据
      activeItem: {}, // 当前编辑表单项
      formItems: [],
      curTab: 0
    }
  },
  methods: {
    /**
     * @description: 切换页面  首页目的地我的等等
     * @params {*}
     * @return {*}
     */
    changePage(e) {
      this.curPage = e
    },
    /**
     * @description: 切换tab
     * @params {*}
     * @return {*}
     */
    changeTab(e) {
      // console.log(e)
      this.curTab = e
    },
    /**
     * @description: 判断显示首页、目的地、和发现的逻辑
     * @params {*}
     * @return {*}
     */
    doShowCurPage() {
      const rule = {
        0: () => {
          this.formItems = cloneDeep(this.appData.indexData.comps)
        },
        1: () => {
          this.formItems = cloneDeep(this.appData.desData.comps)
        },
        2: () => {
          this.formItems = cloneDeep(this.appData.disData.comps)
        }
      }
      rule[this.curPage] && rule[this.curPage]()
    },
    /**
     * @description      - 拖拽新增组件时的克隆回调
     * @param {Object} e - 新增的克隆的数据
     */
    cloneComponentInfo(e) {
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
    onComponentDragEnd(e) {
      if (e.from !== e.to) {
        this.activeItem = this.dragCloneData
      }
    },

    /**
     * @description         - 点击新增组件
     * @param {Object} item - 新增的数据
     */
    onClickAddFormItem(item) {
      // // 根据当前的curPage显示对应的页面,获取每个页面的基础组件
      // this.doShowCurPage()

      const componentInfo = deepCopy(item)
      // 设置表单项的标识
      componentInfo.id = this._getMaxNumber(this.formItems, 'id') + 1

      this.activeItem = componentInfo

      this.formItems.push(componentInfo)

      // 更新滚动条位置
      this.$nextTick(() => {
        const distance =
          document.querySelector('.component-active-item').offsetTop -
          document.querySelector('.app-container').scrollTop
        this._updateQuestionnaireBoardScroll(distance)
      })
    },

    /**
     * @description: 从看板删除某个组件
     * @params {*}
     * @return {*}
     */
    deleteItem(id) {
      this.formItems = this.formItems.filter((item) => item.id !== id)
    },
    /**
     * @description                  - 获取最大值
     * @param {Array} list           - 数据源
     * @param {String|undefined} key - 需要获取最大值的字段
     */
    _getMaxNumber(list, key) {
      const filterList = key ? list.map((v) => v[key]) : list
      return filterList.reduce((previous, current) => {
        return previous > current ? previous : current
      }, 0)
    },

    /**
     * @description             - 更新表单面板滚动条位置
     * @param {Number} distance - 滚动距离
     */
    _updateQuestionnaireBoardScroll(distance) {
      if (distance) {
        const duration = 300
        const startTime = Date.now()
        const initScrollTop = document.querySelector('.app-container').scrollTop
        requestAnimationFrame(function step() {
          const p = Math.min(1, (Date.now() - startTime) / duration)
          document.querySelector('.app-container').scrollTop = initScrollTop + distance * p
          p < 1 && requestAnimationFrame(step)
        })
      }
    },

    /**
     * @description: 更新当前的attr属性值
     * @params {*}
     * @return {*}
     */
    updateActiveItemAttr(attr) {
      this.activeItem.attr = attr
      console.log('目标', this.formItems)
    }
  },
  mounted() {
    EventBus.$on('changeAttr', (val) => {
      this.updateActiveItemAttr(val)
    })
  }
}
</script>
<style scoped lang="less">
@import url('./ver-tab.css');
@import url('./comp-list.css');
/* 特殊定位 */
.container {
  position: relative;
  top: -15px;
  left: -15px;
  width: calc(100% + 40px);
  height: 100vh;
  // background-color: red;
}
.home {
  // background-color: red;
  // padding: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  .components-board {
    // width: 312px;
    height: 100vh;
    background: white;
    display: flex;
    flex-direction: column;
  }
  .components-board-in {
    display: flex;
  }
  .app-name-area {
    // width: 384px;
    height: 42px;
    background: rgba(0, 87, 240, 0.04);
    // opacity: 0.04;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: 500;
  }
  .app-panel-tag-area {
    position: absolute;
    left: -116px;
    top: 20px;
  }
  .panel-tag {
    width: 100px;
    height: 32px;
    background: #ffffff;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 6px;
    font-size: 12px;
    color: #000;
  }
  .panel-tag-on {
    background-color: var(--mc1);
    font-size: 12px;
    color: #ffffff;
  }
  .app-panel {
    position: relative;
    margin-top: 35px;
    width: 375px;
    height: 667px;
    padding: 35px 10px;
    box-sizing: border-box;
    background: url(./images/mobile_phone_bg.png) no-repeat;
    background-size: 375px 667px;
    .weixin-bg-1 {
      width: 100%;
    }
    .weixin-bg-2 {
      width: 100%;
    }
    .delete-tag {
      position: absolute;
      right: 0;
      bottom: 0;
      z-index: 2;
      width: 50px;
      text-align: center;
      // height: 50px;
      // border: 1px solid #0057f0;
      cursor: pointer;
      background: rgba(0, 87, 240, 0.1);
      color: #0057f0;
    }
    .app-container {
      height: 607px;
      border-radius: 20px;
      padding: 10px;
      box-sizing: border-box;
      overflow-x: hidden;
      &:hover {
        &::-webkit-scrollbar-thumb {
          background: rgba(144, 147, 153, 0.3);
        }
      }

      &::-webkit-scrollbar {
        width: 0px;
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
    width: 400px;
    height: 100vh;
    background: white;
    overflow-y: scroll;

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
