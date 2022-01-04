<!--
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-12-25 10:41:22
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-29 15:45:17
-->
<!--  -->
<template>
  <div class="height-area">
    <a-slider style="width: 80%" v-model="editHeight" :min="0" :max="100" />
    <a-input-number
      style="width: 20%; margin-left: 10px"
      v-model="editHeight"
      :min="0"
      :max="100"
      placeholder="0-100"
    />
    <!-- <div style="width: 15%; text-align: center">距离</div> -->
  </div>
</template>

<script>
export default {
  props: {
    distance: {
      type: Number,
      default: 0
    }
  },
  name: 'Distance',
  components: {},
  data() {
    return {
      // editHeight: ''
    }
  },
  computed: {
    editHeight: {
      get() {
        return this.distance
      },
      set(val) {
        this.$emit('update:distance', val)
      }
    }
  },
  watch: {},
  methods: {},
  created() {},
  mounted() {}
}
</script>
<style scoped>
.height-area {
  display: flex;
  align-items: center;
}
</style>
