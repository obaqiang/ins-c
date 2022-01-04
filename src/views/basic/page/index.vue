<!--
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-11-20 13:49:04
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-22 16:42:12
-->
<!--  -->
<template>
  <div class="">
    <div class="btn-area" style="padding-top: 0">
      <a-button type="primary" @click="doPlus" icon="plus">新增</a-button>
    </div>
    <a-card :bordered="false">
      <div class="title">模板</div>
      <div class="list-area">
        <div class="tem-bl">
          <div class="tem-title">默认模板</div>
          <div class="tem-date">2021-12-12 12:23:23</div>
          <div class="tem-pre"></div>
          <div class="tem-bot">
            <a-button type="link" @click="doApply">应用</a-button>
            <a-button type="link" @click="doEdit">编辑</a-button>
            <a-popconfirm title="确定删除此模板?" ok-text="确定" cancel-text="取消" @confirm="confirm" @cancel="cancel">
              <a-button type="link" class="w-red"> 删除 </a-button>
            </a-popconfirm>
          </div>
          <a-popover>
            <template slot="content">
              <p class="c-title">应用范围:</p>
              <p class="c-content">123123123132</p>
            </template>
            <div class="tem-use">使用中</div>
          </a-popover>
        </div>
        <a-modal class="sq-modal" title="新增模板" :visible="plusVis" @ok="plusOk" @cancel="plusCancel">
          <a-form-model :model="plusForm" layout="horizontal" :wrapper-col="{ span: 18 }" :label-col="{ span: 6 }">
            <a-form-model-item label="模板名称">
              <a-input placeholder="请输入"></a-input>
            </a-form-model-item>
            <a-form-model-item label="关联应用">
              <a-select v-model="plusForm.region" placeholder="请选择">
                <a-select-option value="shanghai"> Zone one </a-select-option>
                <a-select-option value="beijing"> Zone two </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-form-model>
        </a-modal>
        <a-modal class="sq-modal" title="选择应用" :visible="choVis" @ok="choOk" @cancel="choCancel">
          <a-radio-group v-model="curApp" @change="changeApp">
            <a-radio :value="1"> A </a-radio>
            <a-radio :value="2"> B </a-radio>
            <a-radio :value="3"> C </a-radio>
            <a-radio :value="4"> D </a-radio>
          </a-radio-group>
        </a-modal>
      </div>
    </a-card>
  </div>
</template>

<script>
export default {
  name: 'Page',
  components: {},
  data() {
    return {
      plusVis: false,
      choVis: false,
      plusForm: {
        region: undefined
      },
      curApp: ''
    }
  },
  computed: {},
  watch: {},
  methods: {
    changeApp() {},
    doPlus() {
      this.plusVis = true
    },
    confirm() {},
    cancel() {},
    plusOk() {
      this.plusVis = false
    },
    plusCancel() {
      this.plusVis = false
    },
    choOk() {},
    choCancel() {},
    doApply() {
      this.choVis = true
    },
    doEdit() {
      this.$router.push({
        path: '/basic/page/editComp'
      })
    }
  },
  created() {},
  mounted() {}
}
</script>
<style scoped>
.list-area {
  margin-top: 16px;
}
.title {
  font-size: 20px;
  color: #000;
  font-weight: 500;
}

.tem-bl {
  border: 1px solid #ebebeb;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  width: 230px;
  height: 267px;
  /* padding: 15px 16px; */
  align-items: center;
  justify-content: center;
  position: relative;
}
.tem-bl:hover {
  border-color: #3d7eff;
}
.tem-use {
  position: absolute;
  top: 0;
  right: 0;
  width: 52px;
  height: 20px;
  background-color: #f7b500;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 10px;
  border-radius: 0 0 0 4px;
}
/* .tem-bl::after {
  content: '使用中';
  position: absolute;
  top: 0;
  right: 0;
  width: 52px;
  height: 20px;
  background-color: #f7b500;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  font-size: 10px;
  border-radius: 0 0 0 4px;
} */
.tem-title {
  color: #000;
  font-size: 16px;
  width: 198px;
  position: relative;
  padding-left: 10px;
}
.tem-title::before {
  content: '';
  background-color: #0057f0;
  position: absolute;
  left: 0;
  top: 10px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
.tem-date {
  color: rgba(0, 0, 0, 0.45);
  font-size: 12px;
  line-height: 32px;
  width: 198px;
}
.tem-pre {
  width: 198px;
  height: 150px;
  background: #f5f5f5;
}
.tem-bot {
  width: 198px;
  display: flex;
  justify-content: flex-end;
  /* background-color: red; */
}
.tem-bot button {
  padding: 6px;
}
.c-title {
  font-size: 12px;
  color: #000;
  font-weight: 500;
}
.c-content {
  color: rgba(0, 0, 0, 0.45);
  font-size: 12px;
}
</style>
