<!--  -->
<template>
  <div class="area-b">
    <div class="b-bl">
      <img src="../images/king-icon-b.png" class="icon-b" />
      <div class="text-b">周边游</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KingCompB',
  components: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {},
  created() {},
  mounted() {}
}
</script>
<style scoped>
.area-b {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
}

.icon-b {
  width: 35px;
  height: 35px;
}

.b-bl {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.text-b {
  color: #333333;
  font-size: 11px;
  font-weight: 400;
}
</style>
