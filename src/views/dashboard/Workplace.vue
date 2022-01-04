<template>
  <div class="main-container">
    <!-- <MultiTab /> -->
  </div>
</template>

<script>
// import MultiTab from '@/components/MultiTab'
import { timeFix } from '@/utils/util'
import { mapState } from 'vuex'
import { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import { Radar } from '@/components'

// import { getRoleList, getServiceList } from '@/api/manage'

const DataSet = require('@antv/data-set')

export default {
  name: 'Workplace',
  components: {
    PageHeaderWrapper,
    Radar
    // MultiTab
  },
  data() {
    return {
      timeFix: timeFix(),
      avatar: '',
      user: {},

      projects: [],
      loading: true,
      radarLoading: true,
      activities: [],
      teams: [],

      // data
      axis1Opts: {
        dataKey: 'item',
        line: null,
        tickLine: null,
        grid: {
          lineStyle: {
            lineDash: null
          },
          hideFirstLine: false
        }
      },
      axis2Opts: {
        dataKey: 'score',
        line: null,
        tickLine: null,
        grid: {
          type: 'polygon',
          lineStyle: {
            lineDash: null
          }
        }
      },
      scale: [
        {
          dataKey: 'score',
          min: 0,
          max: 80
        }
      ],
      axisData: [
        { item: '引用', a: 70, b: 30, c: 40 },
        { item: '口碑', a: 60, b: 70, c: 40 },
        { item: '产量', a: 50, b: 60, c: 40 },
        { item: '贡献', a: 40, b: 50, c: 40 },
        { item: '热度', a: 60, b: 70, c: 40 },
        { item: '引用', a: 70, b: 50, c: 40 }
      ],
      radarData: []
    }
  },
  computed: {
    ...mapState({
      nickname: (state) => state.user.nickname,
      welcome: (state) => state.user.welcome
    }),
    currentUser() {
      return {
        name: 'Serati Ma',
        avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png'
      }
    },
    userInfo() {
      return this.$store.getters.userInfo
    }
  },
  created() {
    this.user = this.userInfo
    this.avatar = this.userInfo.avatar

    // getRoleList().then((res) => {
    //   // console.log('workplace -> call getRoleList()', res)
    // })

    // getServiceList().then((res) => {
    //   // console.log('workplace -> call getServiceList()', res)
    // })
  },
  mounted() {
    // this.getProjects()
    // this.getActivity()
    // this.getTeams()
    // this.initRadar()
  },
  methods: {
    getProjects() {
      this.$http.get('/list/search/projects').then((res) => {
        this.projects = res.result && res.result.data
        this.loading = false
      })
    },
    getActivity() {
      this.$http.get('/workplace/activity').then((res) => {
        this.activities = res.result
      })
    },
    getTeams() {
      this.$http.get('/workplace/teams').then((res) => {
        this.teams = res.result
      })
    },
    initRadar() {
      this.radarLoading = true

      this.$http.get('/workplace/radar').then((res) => {
        const dv = new DataSet.View().source(res.result)
        dv.transform({
          type: 'fold',
          fields: ['个人', '团队', '部门'],
          key: 'user',
          value: 'score'
        })

        this.radarData = dv.rows
        this.radarLoading = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
.main-container {
  // width: 100vw;
  // height: 100vh;
  background: red;
}
</style>
