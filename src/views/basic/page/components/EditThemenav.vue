<!--
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-12-29 19:11:07
 * @LastEditors: shenqiang
 * @LastEditTime: 2022-01-04 10:55:40
-->
<!--  -->
<template>
  <div>
    <div class="edit-title">{{ form.title }}</div>
    <a-form-model class="my-form">
      <a-form-model-item label="样式选择">
        <a-radio-group v-model="form.editStyle">
          <a-radio :value="4">四列</a-radio>
          <a-radio :value="5">五列</a-radio>
          <a-radio :value="6">六列</a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="背景颜色">
        <CoffeeColorPicker :pickColor.sync="form.bgColor" />
      </a-form-model-item>
      <a-form-model-item label="标题颜色">
        <CoffeeColorPicker :pickColor.sync="form.titleColor" />
      </a-form-model-item>
      <a-form-model-item label="组件距离">
        <Distance :distance.sync="form.distance" />
      </a-form-model-item>
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
          <div class="bl-area">
            <a-tooltip placement="right" title="长按拖动选项" class="tip-area">
              <img style="width: 10px; height: 13px" src="../images/drag-icon.png" alt="" />
            </a-tooltip>
            <a-icon class="minus-icon" type="minus-circle" @click="minusDrag(item.id)" />
            <div class="bl-left">
              <UploadImg :imgUrl.sync="item.imgUrl" />
              <div class="tip-text">建议尺寸110x110</div>
            </div>
            <div class="bl-right">
              <a-form-model :model="item" :labelCol="{ span: 5 }" :wrapperCol="{ span: 19 }">
                <a-form-model-item label="标题">
                  <a-input
                    placeholder="请输入标题"
                    v-model="item.title"
                    :addon-after="item.title.length + '/5'"
                    :maxLength="5"
                  />
                </a-form-model-item>
                <a-form-model-item label="跳转">
                  <a-select v-model="item.jumpType">
                    <a-select-option :value="1">产品分类</a-select-option>
                    <a-select-option :value="2">指定链接</a-select-option>
                    <a-select-option :value="3">其他小程序</a-select-option>
                  </a-select>
                  <template v-if="item.jumpType == 1">
                    <a-button type="link">配置</a-button>
                    <a-tag v-for="(tag, i) in item.productTags" :key="i"></a-tag>
                  </template>
                  <template v-if="item.jumpType == 2">
                    <a-input placeholder="请输入链接地址" v-model="item.url"></a-input>
                  </template>
                  <template v-if="item.jumpType == 3">
                    <a-input placeholder="请输入目标小程序APPID" v-model="item.appId"></a-input>
                    <a-input placeholder="请输入目标小程序path" v-model="item.appPath"></a-input>
                  </template>
                </a-form-model-item>
                <!-- <a-form-model-item label="">
                  <a-input placeholder="请输入标题" />
                </a-form-model-item> -->
              </a-form-model>
            </div>
          </div>
        </div>
      </transition-group>
    </draggable>
    <div class="plus-area">
      <a-button icon="plus" type="primary" @click="plusDrag">新增</a-button>
    </div>
  </div>
</template>

<script>
import CoffeeColorPicker from '@/components/CoffeeColorPicker'
import Distance from './Distance.vue'
import draggable from 'vuedraggable'
import UploadImg from '@/components/upload/UploadImg'
import { getUniqueId } from '@/utils/util.js'
import cloneDeep from 'lodash.clonedeep'
import { EventBus } from '@/utils/eventBus'
export default {
  name: 'EditThemenav',
  components: { CoffeeColorPicker, Distance, draggable, UploadImg },
  data() {
    return {
      drag: false,
      form: {}
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
    plusDrag() {
      this.form.dragArr.push({
        id: getUniqueId(),
        title: '',
        jumpType: 1,
        productTags: [],
        url: '',
        appId: '',
        appPath: ''
      })
    },
    minusDrag(id) {
      const index = this.form.dragArr.findIndex((item) => item.id === id)
      this.form.dragArr.splice(index, 1)
    },
    onStart() {
      this.drag = true
    },
    onEnd() {
      this.drag = false
    }
  },
  created() {
    this.form = cloneDeep(this.$attrs)
  },
  mounted() {}
}
</script>
<style scoped>
.drag-area {
  display: flex;
  padding: 0px 24px;
  position: relative;
}
.bl-area {
  display: flex;
  width: 93%;
  margin: auto;
  position: relative;
}
.bl-right {
  padding-left: 10px;
}
.tip-area {
  position: absolute;
  left: -20px;
  top: 40px;
}
.minus-icon {
  position: absolute;
  right: -20px;
  top: 42px;
  font-size: 15px;
  color: #999;
}
.plus-area {
  padding: 14px 24px;
}
</style>
