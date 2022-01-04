<!--
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-12-28 15:58:13
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-31 11:49:27
-->
<!--  -->
<template>
  <div class="wrapper">
    <div class="edit-title">底部导航</div>
    <a-collapse v-model="activeKey" :bordered="false" expandIconPosition="right">
      <a-collapse-panel key="1">
        <div slot="header" class="panel-header">通用配置</div>
        <a-form-model :model="form" :rules="rules" layout="vertical" :wrapper-col="{ span: 24 }">
          <a-form-model-item label="导航栏背景色">
            <div class="my-item-inline">
              <CoffeeColorPicker :pickColor.sync="form.bgColor" style="width: 60%" />
              <span class="tip-text" style="display: inline-block; width: 40%; padding-left: 16px">建议：#FFFFFF</span>
            </div>
          </a-form-model-item>
          <a-form-model-item label="默认文字颜色">
            <div class="my-item-inline">
              <CoffeeColorPicker :pickColor.sync="form.unselectedTextColor" style="width: 60%" />
              <span class="tip-text" style="display: inline-block; width: 40%; padding-left: 16px">建议：#FFFFFF</span>
            </div>
          </a-form-model-item>
          <a-form-model-item label="选中文字颜色">
            <div class="my-item-inline">
              <CoffeeColorPicker :pickColor.sync="form.selectedTextColor" style="width: 60%" />
              <span class="tip-text" style="display: inline-block; width: 40%; padding-left: 16px">建议：#FFFFFF</span>
            </div>
          </a-form-model-item>
        </a-form-model>
      </a-collapse-panel>
      <a-collapse-panel key="2">
        <div slot="header" class="panel-header">{{ form.indexData.title }}</div>
        <a-form-model :model="form" :rules="rules" layout="vertical" :wrapper-col="{ span: 24 }">
          <a-form-model-item label="状态">
            <a-switch checked-children="开" un-checked-children="关" v-model="form.indexData.status" default-checked />
          </a-form-model-item>
          <a-form-model-item label="排序">
            <a-input-number v-model="form.sort" :min="1" :max="10" @change="changeSort" />
          </a-form-model-item>
          <a-form-model-item label="标题">
            <a-input
              placeholder="请输入标题"
              v-model="form.indexData.title"
              :addon-after="form.indexData.title.length + '/5'"
              :maxLength="5"
            />
          </a-form-model-item>
          <a-form-model-item label="默认图标样式">
            <UploadImg :key="123123" v-model="form.indexData.defaultImg" />
            <div class="tip-text">建议尺寸60x60，png格式</div>
          </a-form-model-item>
          <a-form-model-item label="选中图标样式">
            <a-radio-group style="display: flex" v-model="form.indexData.imgStyle">
              <a-radio class="radio-text" :value="1" style="width: 50%">
                <div class="radio-text">标题+图标</div>
                <UploadImg v-model="form.indexData.aImg" />
                <div class="tip-text">建议尺寸60x60，png格式</div>
              </a-radio>
              <a-radio class="radio-text" :value="2" style="width: 50%">
                <div>标题+图标</div>
                <UploadImg v-model="form.indexData.bImg" />
                <div class="tip-text">建议尺寸80x80，png格式</div>
              </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-form-model>
      </a-collapse-panel>
      <a-collapse-panel key="3">
        <div slot="header" class="panel-header">{{ form.purData.title }}</div>
        <a-form-model :model="form" :rules="rules" layout="vertical" :wrapper-col="{ span: 24 }">
          <a-form-model-item label="状态">
            <a-switch checked-children="开" un-checked-children="关" v-model="form.purData.status" default-checked />
          </a-form-model-item>
          <a-form-model-item label="排序">
            <a-input-number v-model="form.sort" :min="1" :max="10" @change="changeSort" />
          </a-form-model-item>
          <a-form-model-item label="标题">
            <a-input
              placeholder="请输入标题"
              v-model="form.purData.title"
              :addon-after="form.purData.title.length + '/5'"
              :maxLength="5"
            />
          </a-form-model-item>
          <a-form-model-item label="默认图标样式">
            <UploadImg v-model="form.purData.defaultImg" />
            <div class="tip-text">建议尺寸60x60，png格式</div>
          </a-form-model-item>
          <a-form-model-item label="选中图标样式">
            <a-radio-group style="display: flex" v-model="form.purData.imgStyle">
              <a-radio class="radio-text" :value="1" style="width: 50%">
                <div class="radio-text">标题+图标</div>
                <UploadImg v-model="form.purData.aImg" />
                <div class="tip-text">建议尺寸60x60，png格式</div>
              </a-radio>
              <a-radio class="radio-text" :value="2" style="width: 50%">
                <div>标题+图标</div>
                <UploadImg v-model="form.purData.bImg" />
                <div class="tip-text">建议尺寸80x80，png格式</div>
              </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-form-model>
      </a-collapse-panel>
      <a-collapse-panel key="4">
        <div slot="header" class="panel-header">{{ form.disData.title }}</div>
        <a-form-model :model="form" :rules="rules" layout="vertical" :wrapper-col="{ span: 24 }">
          <a-form-model-item label="状态">
            <a-switch checked-children="开" un-checked-children="关" v-model="form.disData.status" default-checked />
          </a-form-model-item>
          <a-form-model-item label="排序">
            <a-input-number v-model="form.sort" :min="1" :max="10" @change="changeSort" />
          </a-form-model-item>
          <a-form-model-item label="标题">
            <a-input
              placeholder="请输入标题"
              v-model="form.disData.title"
              :addon-after="form.disData.title.length + '/5'"
              :maxLength="5"
            />
          </a-form-model-item>
          <a-form-model-item label="默认图标样式">
            <UploadImg v-model="form.disData.defaultImg" />
            <div class="tip-text">建议尺寸60x60，png格式</div>
          </a-form-model-item>
          <a-form-model-item label="选中图标样式">
            <a-radio-group style="display: flex" v-model="form.purData.imgStyle">
              <a-radio class="radio-text" :value="1" style="width: 50%">
                <div class="radio-text">标题+图标</div>
                <UploadImg v-model="form.disData.aImg" />
                <div class="tip-text">建议尺寸60x60，png格式</div>
              </a-radio>
              <a-radio class="radio-text" :value="2" style="width: 50%">
                <div>标题+图标</div>
                <UploadImg v-model="form.disData.bImg" />
                <div class="tip-text">建议尺寸80x80，png格式</div>
              </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-form-model>
      </a-collapse-panel>
      <a-collapse-panel key="5">
        <div slot="header" class="panel-header">{{ form.selfData.title }}</div>
        <a-form-model :model="form" :rules="rules" layout="vertical" :wrapper-col="{ span: 24 }">
          <a-form-model-item label="状态">
            <a-switch checked-children="开" un-checked-children="关" v-model="form.selfData.status" default-checked />
          </a-form-model-item>
          <a-form-model-item label="排序">
            <a-input-number v-model="form.sort" :min="1" :max="10" @change="changeSort" />
          </a-form-model-item>
          <a-form-model-item label="标题">
            <a-input
              placeholder="请输入标题"
              v-model="form.selfData.title"
              :addon-after="form.selfData.title.length + '/5'"
              :maxLength="5"
            />
          </a-form-model-item>
          <a-form-model-item label="默认图标样式">
            <UploadImg v-model="form.selfData.defaultImg" />
            <div class="tip-text">建议尺寸60x60，png格式</div>
          </a-form-model-item>
          <a-form-model-item label="选中图标样式">
            <a-radio-group style="display: flex" v-model="form.purData.imgStyle">
              <a-radio class="radio-text" :value="1" style="width: 50%">
                <div class="radio-text">标题+图标</div>
                <UploadImg v-model="form.selfData.aImg" />
                <div class="tip-text">建议尺寸60x60，png格式</div>
              </a-radio>
              <a-radio class="radio-text" :value="2" style="width: 50%">
                <div>标题+图标</div>
                <UploadImg v-model="form.selfData.bImg" />
                <div class="tip-text">建议尺寸80x80，png格式</div>
              </a-radio>
            </a-radio-group>
          </a-form-model-item>
        </a-form-model>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
import CoffeeColorPicker from '@/components/CoffeeColorPicker'
import UploadImg from '@/components/upload/UploadImg'
import cloneDeep from 'lodash.clonedeep'
import { EventBus } from '@/utils/eventBus'
export default {
  name: 'EditBottom',
  components: { CoffeeColorPicker, UploadImg },
  data() {
    return {
      activeKey: ['1'],
      text: '123213132',
      form: {
        // bgColor: '#ffffff',
        // unselectedTextColor: '#333333',
        // selectedTextColor: '#0057F0',
        // indexData: {
        //   title: '首页图标',
        //   status: true,
        //   sort: 0,
        //   defaultImg: '',
        //   imgStyle: '',
        //   aImg: '',
        //   bImg: ''
        // },
        // purData: {
        //   title: '目的地图标',
        //   status: false,
        //   sort: 1,
        //   defaultImg: '',
        //   imgStyle: '',
        //   aImg: '',
        //   bImg: ''
        // },
        // disData: {
        //   title: '发现图标',
        //   status: false,
        //   sort: 2,
        //   defaultImg: '',
        //   imgStyle: '',
        //   aImg: '',
        //   bImg: ''
        // },
        // myData: {
        //   title: '我的图标',
        //   status: false,
        //   sort: 3,
        //   defaultImg: '',
        //   imgStyle: '',
        //   aImg: '',
        //   bImg: ''
        // },
        // selfData: {
        //   title: '自定义图标',
        //   status: false,
        //   sort: 4,
        //   defaultImg: '',
        //   imgStyle: '',
        //   aImg: '',
        //   bImg: ''
        // }
      },
      rules: {}
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
    changeSort() {},
    updateActiveItemAttr() {
      //   console.log('发送事件')
      EventBus.$emit('changeAttr', this.form)
    }
  },
  created() {
    this.form = cloneDeep(this.$attrs)
  },
  mounted() {
    console.log(this)
  }
}
</script>
<style scoped>
.radio-text {
  font-size: 12px;
  line-height: 30px;
  color: #000;
}
</style>
