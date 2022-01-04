<!--
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-12-30 15:30:42
 * @LastEditors: shenqiang
 * @LastEditTime: 2022-01-04 14:45:11
-->
<!--  -->
<template>
  <div class="wrapper" :style="{ marginTop: form.distance + 'px' }">
    <swiper :options="swiperOption" style="position: relative; left: -3px">
      <swiper-slide v-for="(item, index) in form.dragArr" :key="item.id">
        <div class="b-area">
          <div class="b-bl">
            <img :src="item.imgUrl" class="icon-b" />
            <div class="text-b">
              <span :style="{ color: item.color }">{{ item.title }}</span>
            </div>
          </div>
          <div class="b-bl" v-if="form.dragArr[index + form.editStyle]">
            <img :src="form.dragArr[index + form.editStyle].imgUrl" class="icon-b" />
            <div class="text-b">
              <span :style="{ color: form.dragArr[index + form.editStyle].color }">{{
                form.dragArr[index + form.editStyle].title
              }}</span>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import cloneDeep from 'lodash.clonedeep'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
export default {
  name: 'ClassnavComp',
  components: { Swiper, SwiperSlide },
  data() {
    return {
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 0,
        loop: false,
        speed: 600
      }
      // form: {}
    }
  },
  computed: {
    form() {
      return cloneDeep(this.$attrs)
    }
  },
  watch: {},
  methods: {},
  created() {
    // this.$nextTick(() => {
    //   this.form = cloneDeep(this.$attrs)
    //   this.swiperOption = {
    //     slidesPerView: 4,
    //     spaceBetween: 0,
    //     loop: false,
    //     speed: 600
    //   }
    // })
  },
  mounted() {}
}
</script>
<style scoped>
.wrapper{
  padding-bottom: 10px;
}
.b-area {
  display: flex;
  flex-direction: column;
}
.b-bl {
  display: flex;
  width: 93px;
  /* height: 110px; */
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.icon-b {
  width: 35px;
  height: 35px;
  margin-top: 10px;
}

.text-b {
  font-size: 11px;
  line-height: 20px;
  color: #333333;
}
</style>
