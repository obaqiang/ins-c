<!--
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-12-30 13:44:47
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-31 16:03:36
-->
<!--  -->
<template>
  <div>
    <div class="edit-title">行程</div>
    <a-form-model class="my-form">
      <a-form-model-item label="标题名称">
        <a-input v-model="form.title"></a-input>
      </a-form-model-item>
      <a-form-model-item label="标题颜色">
        <CoffeeColorPicker :pickColor.sync="form.titleColor" />
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import CoffeeColorPicker from '@/components/CoffeeColorPicker'
import cloneDeep from 'lodash.clonedeep'
import { EventBus } from '@/utils/eventBus'
export default {
  name: 'EditTour',
  components: { CoffeeColorPicker },
  data() {
    return {
      form: {
        // title: '',
        // titleColor: ''
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
<style scoped></style>
