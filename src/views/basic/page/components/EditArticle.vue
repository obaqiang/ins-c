<!--
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-12-30 14:37:02
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-30 14:47:17
-->
<!--  -->
<template>
  <div>
    <div class="edit-title">文章攻略</div>
    <a-form-model>
      <a-form-model-item label="标题名称">
        <a-input v-model="form.title"></a-input>
      </a-form-model-item>
      <a-form-model-item label="标题颜色">
        <CoffeeColorPicker :pickColor.sync="form.titileColor" />
      </a-form-model-item>
      <a-form-model-item label="组件距离">
        <Distance :distance.sync="form.distance" />
      </a-form-model-item>
      <a-form-model-item label="文章排序">
        <a-radio-group v-model="form.sortType">
          <a-radio :value="1">按浏览量</a-radio>
          <a-radio :value="2">按新发布顺序</a-radio>
        </a-radio-group>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
export default {
  name: 'EditArticle',
  components: {},
  data() {
    return {
      form: {
        title: '',
        titleColor: '',
        distance: '',
        sortType: 1
      }
    }
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {}
}
</script>
<style scoped></style>
