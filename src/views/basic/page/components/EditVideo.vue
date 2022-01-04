<!--
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-12-30 14:57:18
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-30 15:20:14
-->
<!--  -->
<template>
  <div>
    <div class="edit-title">视频</div>
    <a-form-model>
      <a-form-model-item label="添加视频">
        <UploadImg v-model="form.videoUrl" />
        <div class="tip-text">建议宽度750，大小不超过10M</div>
      </a-form-model-item>
      <a-form-model-item label="视频封面">
        <UploadImg v-model="form.videoCover" />
        <div class="tip-text">建议宽度750，与视频同高</div>
      </a-form-model-item>
      <a-form-model-item label="悬浮图层">
        <UploadImg v-model="form.videoCoverLayer" />
        <div class="tip-text">覆盖于视频上层，建议格式png图片</div>
      </a-form-model-item>
      <a-form-model-item label="自动播放">
        <a-switch v-model="form.autoPlay" checked-children="开" un-checked-children="关" default-checked />
      </a-form-model-item>
      <a-form-model-item label="静音播放">
        <a-switch v-model="form.mutePlay" checked-children="开" un-checked-children="关" default-checked />
      </a-form-model-item>
      <a-form-model-item label="视频进度条">
        <a-switch v-model="form.progressBar" checked-children="开" un-checked-children="关" default-checked />
      </a-form-model-item>
      <a-form-model-item label="循环播放">
        <a-switch v-model="form.loopPlay" checked-children="开" un-checked-children="关" default-checked />
      </a-form-model-item>
      <a-form-model-item label="视频高度">
        <Distance :distance.sync="form.videoHeight" />
      </a-form-model-item>
      <a-form-model-item label="圆角大小">
        <Distance :distance.sync="form.radius" />
      </a-form-model-item>
      <a-form-model-item label="左右间距">
        <Distance :distance.sync="form.padding" />
      </a-form-model-item>
      <a-form-model-item label="组件距离">
        <Distance :distance.sync="form.distance" />
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import UploadImg from '@/components/upload/UploadImg'
import Distance from './Distance.vue'
export default {
  name: 'EditVideo',
  components: { UploadImg, Distance },
  data() {
    return {
      form: {
        videoUrl: '',
        videoCover: '',
        videoCoverLayer: '',
        autoPlay: '',
        mutePlay: '',
        progressBar: '',
        loopPlay: '',
        videoHeight: '',
        radius: '',
        padding: '',
        distance: ''
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
