<!--
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-12-25 11:05:15
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-31 11:19:46
-->
<!--  -->
<template>
  <div>
    <div class="edit-title">快捷支付</div>
    <div>
      <a-form-model class="my-form">
        <a-form-model-item label="组件距离">
          <Distance :distance.sync="form.editHeight" />
        </a-form-model-item>
        <a-form-model-item label="文本内容">
          <TinymceEditor :content.sync="form.content" :readonly="false" />
        </a-form-model-item>
      </a-form-model>
    </div>
  </div>
</template>

<script>
import Distance from './Distance'
import TinymceEditor from '@/components/tinymce-editor/TinymceEditor.vue'
import { EventBus } from '@/utils/eventBus'
export default {
  props: {
    height: {
      type: Number,
      default: 0
    }
  },
  name: 'EditRich',
  components: { Distance, TinymceEditor },
  data() {
    return {
      form: {
        editHeight: 0,
        content: ''
      }
    }
  },
  computed: {},
  watch: {
    height: {
      handler(val) {
        this.form.editHeight = val
      },
      immediate: true
    },
    'form.editHeight': {
      handler(val) {
        this.updateActiveItemAttr()
      }
    }
  },
  methods: {
    updateActiveItemAttr() {
      //   console.log('发送事件')
      EventBus.$emit('changeAttr', this.form)
    }
  },
  created() {},
  mounted() {}
}
</script>
<style scoped>
@import url('./comp.less');
</style>
