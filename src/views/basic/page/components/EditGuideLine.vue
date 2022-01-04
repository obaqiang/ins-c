<!--
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-12-24 10:57:02
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-25 11:26:13
-->
<!--  -->
<template>
  <div class="wrapper">
    <div class="edit-title">辅助线</div>
    <a-form-model class="my-form" :model="form" :rules="rules" layout="vertical" :wrapper-col="{ span: 24 }">
      <a-form-model-item label="样式选择">
        <a-radio-group v-model="form.editLineStyle" @change="updateActiveItemAttr">
          <a-radio :value="1">虚线</a-radio>
          <a-radio :value="2">实线</a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="线条颜色">
        <CoffeeColorPicker :pickColor.sync="form.editColor" />
      </a-form-model-item>
      <a-form-model-item label="模块高度">
        <Distance :distance.sync="form.editHeight" />
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import CoffeeColorPicker from '@/components/CoffeeColorPicker'
import { EventBus } from '@/utils/eventBus'
import Distance from './Distance'
export default {
  props: {
    lineStyle: {
      type: Number,
      default: 1
    },
    color: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 0
    }
  },
  name: 'EditGuideLine',
  components: {
    CoffeeColorPicker,
    Distance
  },
  data() {
    return {
      form: {
        editLineStyle: 1,
        editColor: '',
        editHeight: 0
      },
      rules: {}
    }
  },
  computed: {},
  watch: {
    lineStyle: {
      handler(val) {
        this.form.editStyle = +val
      },
      immediate: true
    },
    color: {
      handler(val) {
        this.form.editColor = val
      },
      immediate: true
    },
    height: {
      handler(val) {
        this.form.editHeight = val
      },
      immediate: true
    },
    'form.editColor': {
      handler(val) {
        this.updateActiveItemAttr()
      }
    },
    'form.editHeight': {
      handler(val) {
        this.updateActiveItemAttr()
      }
    }
  },
  methods: {
    onChange() {},
    updateActiveItemAttr() {
      console.log('发送事件')
      EventBus.$emit('changeAttr', {
        lineStyle: this.form.editLineStyle,
        color: this.form.editColor,
        height: this.form.editHeight
      })
    }
  },
  created() {},
  mounted() {}
}
</script>
<style scoped>
@import url('./comp.less');

</style>
