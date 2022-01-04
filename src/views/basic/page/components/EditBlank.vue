<!--
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-12-25 11:33:24
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-25 11:56:55
-->
<!--  -->
<template>
  <div class="wrapper">
    <div class="edit-title">辅助空白</div>
    <a-form-model class="my-form" :model="form" :rules="rules" layout="vertical" :wrapper-col="{ span: 24 }">
      <a-form-model-item label="空白颜色">
        <CoffeeColorPicker :pickColor.sync="form.editColor" />
      </a-form-model-item>
      <a-form-model-item label="空白高度">
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
    color: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 0
    }
  },
  name: 'EditBlank',
  components: {
    CoffeeColorPicker,
    Distance
  },
  data() {
    return {
      form: {
        editColor: '',
        editHeight: 0
      },
      rules: {}
    }
  },
  computed: {},
  watch: {
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
<style scoped></style>
