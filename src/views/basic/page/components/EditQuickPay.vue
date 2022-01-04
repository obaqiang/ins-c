<!--
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-12-25 11:05:15
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-31 16:04:49
-->
<!--  -->
<template>
  <div>
    <div class="edit-title">快捷支付</div>
    <div>
      <a-form-model class="my-form">
        <a-form-model-item label="样式选择">
          <a-radio-group v-model="form.editStyle" @change="updateActiveItemAttr">
            <a-radio :value="1">圆角卡片</a-radio>
            <a-radio :value="2">直角卡片</a-radio>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="文字颜色">
          <CoffeeColorPicker :pickColor.sync="form.textColor" />
        </a-form-model-item>
        <a-form-model-item label="组件距离">
          <Distance :distance.sync="form.distance" />
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import Distance from './Distance'
import CoffeeColorPicker from '@/components/CoffeeColorPicker'
import { EventBus } from '@/utils/eventBus'
import cloneDeep from 'lodash.clonedeep'
export default {
  name: 'EditQuickPay',
  components: { Distance, CoffeeColorPicker },
  data() {
    return {
      form: {
        // editStyle: 1,
        // textColor: '#333333',
        // distance: 0
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
    }
  },
  created() {
    this.form = cloneDeep(this.$attrs)
  },
  mounted() {}
}
</script>
<style scoped>
@import url('./comp.less');
</style>
