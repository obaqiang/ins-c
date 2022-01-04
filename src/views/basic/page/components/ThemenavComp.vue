<!--
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-12-30 15:30:42
 * @LastEditors: shenqiang
 * @LastEditTime: 2022-01-04 13:41:02
-->
<!--  -->
<template>
  <div class="wrapper" :style="{ marginTop: form.distance + 'px' }">
    <swiper :options="swiperOption" style="position: relative; left: -3px">
      <swiper-slide v-for="item in form.dragArr" :key="item.id">
        <div class="a-bl">
          <img :src="item.imgUrl" class="icon-a" />
          <div class="text-a">
            <span :style="{ color: item.color }">{{ item.title }}</span>
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
  name: 'ThemenavComp',
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
.a-bl {
  display: flex;
  width: 93px;
  /* height: 110px; */
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.icon-a {
  width: 65px;
  height: 65px;
  margin-top: 10px;
}

.text-a {
  font-size: 13px;
  line-height: 30px;
  color: #333333;
}
</style>
