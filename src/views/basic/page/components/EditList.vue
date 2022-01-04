<!--
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-12-29 15:48:39
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-30 14:32:55
-->
<!--  -->
<template>
  <div>
    <div class="edit-title">{{ form.title }}</div>
    <a-form-model class="my-form" :model="form" layout="vertical" :wrapper-col="{ span: 24 }">
      <a-form-model-item label="样式选择">
        <a-radio-group v-model="form.editStyle" @change="updateActiveItemAttr">
          <div class="radio-list">
            <div v-for="item in radios" :key="item.id" class="bl-area">
              <div class="bl-in">
                <img src="../images/king-icon.png" alt="" />
              </div>
              <div class="radio-area">
                <a-radio :value="item.id">{{ item.text }}</a-radio>
              </div>
            </div>
          </div>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="组件位置">
        <a-radio-group v-model="form.pos">
          <a-radio :value="1">随机位置</a-radio>
          <a-radio :value="2">固定位置</a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="背景颜色">
        <CoffeeColorPicker :pickColor.sync="form.bgColor" />
        <!-- <Distance :distance.sync="form.editHeight" /> -->
      </a-form-model-item>
      <a-form-model-item label="标题样式">
        <a-radio-group v-model="form.titleStyle">
          <a-radio :value="1">文字</a-radio>
          <a-radio :value="2">图片</a-radio>
        </a-radio-group>
      </a-form-model-item>
      <a-form-model-item label="图片">
        <UploadImg v-model="form.img" />
        <div class="tip-text">每个图片大小不超过2M</div>
      </a-form-model-item>
      <a-form-model-item label="标题颜色">
        <CoffeeColorPicker :pickColor.sync="form.titleColor" />
      </a-form-model-item>
      <a-form-model-item label="组件距离">
        <Distance :distance.sync="form.distance" />
      </a-form-model-item>
      <a-form-model-item label="选择推荐产品">
        <a-radio-group>
          <a-radio :value="1">按销售排序</a-radio>
          <a-radio :value="2">按新品排序</a-radio>
          <a-radio :value="3">自定义排序</a-radio>
        </a-radio-group>
        <div class="plus-area">
          <a-button class="plus-icon" type="link">添加</a-button>
          <div class="plus-list">
            <span class="plus-text">就克里斯多夫接口里fsfjlksdjflkjsfdjklfdsjkl fdsljk了课件可见</span>
            <coffee-icon type="icon-shanchu"></coffee-icon>
          </div>
        </div>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { EventBus } from '@/utils/eventBus'
import CoffeeColorPicker from '@/components/CoffeeColorPicker'
import Distance from './Distance'
import UploadImg from '@/components/upload/UploadImg.vue'
export default {
  name: 'EditList',
  components: {
    CoffeeColorPicker,
    Distance,
    UploadImg
  },
  data() {
    return {
      form: {
        title: '',
        bgColor: ''
      },
      radios: [
        { id: 1, text: '选项1' },
        { id: 2, text: '选项2' },
        { id: 3, text: '选项3' }
      ]
    }
  },
  computed: {},
  watch: {},
  methods: {
    updateActiveItemAttr() {
      console.log('发送事件')
      EventBus.$emit('changeAttr', {})
    }
  },
  created() {
    this.form.title = this.$attrs.title
  },
  mounted() {}
}
</script>
<style scoped>
.bl-area {
  width: 168px;
  height: 177px;
  background: #ffffff;
  border-radius: 6px;
  border: 1px solid #f1f2f5;
}
.radio-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
}
.bl-in {
  height: 140px;
  border-bottom: 1px solid #f1f2f5;
}
.radio-area {
  padding: 5px 10px;
}
.plus-area {
  width: 341px;
  margin: 20px auto;
  border: 1px solid #d9d9d9;
  padding: 38px 20px 20px 20px;
  position: relative;
}
.plus-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.plus-text {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.65);
  width: 280px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.plus-icon {
  position: absolute;
  right: 0px;
  top: 0px;
}
</style>
