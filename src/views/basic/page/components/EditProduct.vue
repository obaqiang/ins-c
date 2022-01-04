<!--
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-12-29 11:07:51
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-31 15:44:12
-->
<!--  -->
<template>
  <div class="">
    <div class="edit-title">产品模块</div>
    <div>
      <a-form-model class="my-form">
        <a-form-model-item label="样式选择">
          <a-radio-group v-model="form.editStyle" @change="updateActiveItemAttr">
            <a-radio :value="1">瀑布流加载</a-radio>
            <a-radio :value="2">翻页加载</a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="标题颜色">
          <CoffeeColorPicker :pickColor.sync="form.titleColor" />
        </a-form-model-item>
        <a-form-model-item label="背景颜色">
          <CoffeeColorPicker :pickColor.sync="form.bgColor" />
          <!-- <Distance :distance.sync="form.editHeight" /> -->
        </a-form-model-item>
        <a-form-model-item label="组件距离">
          <Distance :distance.sync="form.distance" />
        </a-form-model-item>
        <div class="warning-area">
          <a-alert message="不填写则不显示标题" banner />
        </div>
      </a-form-model>

      <draggable
        v-model="form.dragArr"
        chosen-class="chosen"
        force-fallback="true"
        group="people"
        animation="1000"
        @start="onStart"
        @end="onEnd"
      >
        <transition-group>
          <div class="drag-area" v-for="item in form.dragArr" :key="item.id">
            <a-form-model class="drag-form">
              <a-form-model-item label="分类标题" style="position: relative">
                <a-tooltip placement="right" title="长按拖动选项" class="tip-area">
                  <img style="width: 10px; height: 13px" src="../images/drag-icon.png" alt="" />
                </a-tooltip>
                <a-input v-model="item.title"></a-input>
                <a-icon class="minus-icon" type="minus-circle" @click="minusDrag(item.id)" />
              </a-form-model-item>
              <a-form-model-item label="排列方式">
                <a-radio-group name="radioGroup" v-model="item.listStyle">
                  <div class="radio-s">
                    <a-radio :value="1"> 最新上架 </a-radio>
                  </div>
                  <div class="radio-s">
                    <a-radio :value="2"> 热度排序 </a-radio>
                  </div>
                  <div class="radio-s">
                    <a-radio :value="3"> 智能排序 </a-radio>
                  </div>
                  <div class="radio-s">
                    <a-radio :value="4"> 自定义添加 <a-button type="link">去配置</a-button> </a-radio>
                  </div>
                </a-radio-group>
              </a-form-model-item>
            </a-form-model>
          </div>
        </transition-group>
      </draggable>
      <div class="plus-area">
        <a-button icon="plus" @click="plusDrag" type="primary">新增</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import { EventBus } from '@/utils/eventBus'
import Distance from './Distance'
import CoffeeColorPicker from '@/components/CoffeeColorPicker'
import draggable from 'vuedraggable'
import { getUniqueId } from '@/utils/util.js'
import cloneDeep from 'lodash.clonedeep'
export default {
  name: 'EditProduct',
  components: { Distance, CoffeeColorPicker, draggable },
  data() {
    return {
      drag: false,
      form: {
        // editStyle: 1,
        // titleColor: '#333333',
        // bgColor: '#ffffff',
        // distance: 0,
        // dragArr: [{ id: 1, title: '', listStyle: 1, tags: [] }]
      }
    }
  },
  computed: {},
  watch: {
    form: {
      handler(val) {
        this.updateActiveItemAttr()
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    updateActiveItemAttr() {
      //   console.log('发送事件')
      EventBus.$emit('changeAttr', this.form)
    },
    onStart() {
      this.drag = true
    },
    onEnd() {
      this.drag = false
    },
    plusDrag() {
      const id = getUniqueId(1)
      console.log(id)
      this.form.dragArr.push({ id: id, title: '', listStyle: 1, tags: [] })
    },
    minusDrag(id) {
      // console.log(id)
      const index = this.form.dragArr.findIndex((item) => item.id === id)
      this.form.dragArr.splice(index, 1)
    }
  },
  created() {
    this.form = cloneDeep(this.$attrs)
  },
  mounted() {}
}
</script>
<style scoped lang="less">
.my-form {
  .ant-form-item {
    margin-bottom: 0;
  }
}

.plus-area {
  padding: 14px 24px;
}
.drag-area {
  display: flex;
  padding: 0px 24px;
  position: relative;
}
.tip-area {
  position: absolute;
  top: 2px;
  left: -20px;
}
.minus-icon {
  position: absolute;
  right: -25px;
  top: 2px;
  font-size: 15px;
  color: #999;
}
.warning-area {
  margin-top: 15px;
  padding: 15px 0px;
  border-top: 1px dashed #d9d9d9;
}
.radio-s {
  display: inline-block;
  padding: 5px 0;
}
</style>
