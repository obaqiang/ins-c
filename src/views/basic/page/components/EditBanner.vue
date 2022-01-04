<!--
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-12-29 10:48:54
 * @LastEditors: shenqiang
 * @LastEditTime: 2022-01-04 15:08:59
-->
<!--  -->
<template>
  <div>
    <div class="edit-title">图片轮播</div>
    <div>
      <a-form-model class="my-form">
        <a-form-model-item label="样式选择">
          <a-radio-group name="radioGroup" :default-value="1" v-model="form.editStyle">
            <div v-for="item in radios" :key="item.val" class="img-area">
              <div class="img-in">
                <img class="banner-img" src="../images/king-icon.png" alt="" />
                <div class="tip-text" style="margin-top: 10px">{{ item.tip }}</div>
              </div>
              <a-radio :value="item.val" style="margin: 5px 10px"> {{ item.text }} </a-radio>
            </div>
          </a-radio-group>
        </a-form-model-item>
        <a-form-model-item label="背景颜色">
          <CoffeeColorPicker :pickColor.sync="form.bgColor" />
        </a-form-model-item>
        <a-form-model-item label="组件距离">
          <Distance :distance.sync="form.distance" />
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import CoffeeColorPicker from '@/components/CoffeeColorPicker'
import Distance from './Distance.vue'
import { EventBus } from '@/utils/eventBus'
export default {
  name: 'EditBanner',
  components: {
    CoffeeColorPicker,
    Distance
  },
  data() {
    return {
      radios: [
        { val: 1, text: '选项1', tip: '建议尺寸 710x180' },
        { val: 2, text: '选项2', tip: '建议尺寸 750x360' },
        { val: 3, text: '选项3', tip: '建议尺寸 690x240' }
      ],
      form: {
        editStyle: 2,
        bgColor: '',
        distance: 0
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
      EventBus.$emit('changeAttr', this.form)
    }
  },
  created() {},
  mounted() {}
}
</script>
<style scoped>
.img-area {
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  border: 1px solid #f1f2f5;
  width: 100%;
  height: 185px;
}
.img-in {
  padding: 16px 16px 6px 16px;
  border-bottom: 1px solid #f1f2f5;
}
.banner-img {
  width: 320px;
  height: 100px;
}
</style>
