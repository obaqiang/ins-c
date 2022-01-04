<!--
 * @Description: 文件上传组件
 * @Author: panwenda
 * @Date: 2021-12-30 16:10:07
 * @LastEditors: panwenda
 * @LastEditTime: 2021-12-31 14:22:53
-->

<template>
  <div class="uploader">
    <a-upload
      :action="uploadUrl"
      :list-type="listType"
      :accept="accept"
      :multiple="multiple"
      :file-list="fileList"
      :showUploadList="showUploadList"
      :headers="headers"
      :disabled="uploading"
      :before-upload="beforeUpload"
      @change="onChangeFile"
    >
      <!-- 类型为 text、picture 时的上传按钮 -->
      <a-button v-if="(listType === 'text' || listType === 'picture') && fileList.length < limit" :disabled="uploading"><a-icon :type="uploading ? 'loading' : 'upload'" />上传</a-button>

      <!-- 类型为 picture-card 时的上传按钮 -->
      <div v-if="listType === 'picture-card' && fileList.length < limit">
        <a-icon :type="uploading ? 'loading' : 'plus'" />
        <div class="ant-upload-text">
          上传
        </div>
      </div>
    </a-upload>

    <div v-if="tip" class="upload-tip">{{ tip }}</div>
  </div>
</template>

<script>
import { apiTagList } from '@/api/api-tag-list.js'
export default {
  name: 'Uploader',
  components: {},
  computed: {},
  props: {
    // 上传列表展示类型
    listType: {
      type: String,
      default: 'text'
    },

    // 是否支持多选文件
    multiple: {
      type: Boolean,
      default: false
    },

    // 上传数量限制
    limit: {
      type: Number,
      default: 1
    },

    // 文件大小限制，单位 M
    size: {
      type: Number,
      default: 2
    },

    // 文件类型限制
    accept: {
      type: String,
      default: '.jpeg,.jpg,.png'
    },

    // 是否显示上传列表
    showUploadList: {
      type: Boolean,
      default: true
    },

    // 初始显示文件列表 array<{uid, status, name, url}>
    initList: {
      type: Array,
      default: () => []
    },

    // 提示
    tip: {
      type: String,
      default: ''
    }
  },
  watch: {
    initList (val) {
      this.fileList = [...val]
    }
  },
  data () {
    return {
      uploadUrl: `${process.env.VUE_APP_API_BASE_URL}${apiTagList.commonTag}/file/upload`, // 文件上传地址
      headers: {
        Authorization: localStorage.getItem('Authorization')
      }, // 文件上传 headers 信息
      fileList: [], // 文件列表
      uploading: false, // 文件上传状态
      fileErrName: [], // 上传出错的文件
      limitFlag: false // 超出上传数量的标志
    }
  },
  methods: {
    /**
     * 文件上传之前的钩子
     * @param {Object} file - 上传的文件
     */
    beforeUpload (file) {
      const isLt = file.size / 1024 / 1024 < this.size
      if (!isLt) {
        this.$message.error(`文件大小不能超过 ${this.size}M，已过滤超过限制的文件 ${file.name}`)
      }
      return isLt
    },

    /**
     * 监听文件改变
     */
    onChangeFile (e) {
      let fileList = []
      let finished = true

      // 状态判断，避免过滤文件大小时不符合大小限制的文件也出现在列表中
      if (e.file.status) {
        this.uploading = true

        // 数量限制
        if (e.fileList.length > this.limit) {
          this.limitFlag = true
        }

        // 从 uploading 状态开始，就必须存在 fileList 数据才会在上传列表显示文件
        fileList = e.fileList.slice(-this.limit).map(v => {
          if (v.response && v.response.body) {
            v.url = v.response.body[0].fileUrl
          }

          // 存在 uploading 状态的文件，说明上传队列未处理完成
          v.status === 'uploading' && (finished = false)
          return v
        })

        // 过滤上传失败的文件
        switch (e.file.status) {
          case 'error':
            this.fileErrName.push(e.file.name)
            fileList = fileList.filter(v => v.status !== 'error')
            break

          case 'done':
            if (e.file.response.code !== '0000') {
              this.fileErrName.push(e.file.name)
              fileList = fileList.filter(v => v.status === 'done' && v.file.response.code === '0000')
            }
            break

          default:
            break
        }

        this.fileList = [...fileList]

        if (finished) {
          this.uploading = false

          // 超出数量限制错误提示
          this.limitFlag && this.$message.error(`最多可上传 ${this.limit} 个文件，超出的文件已停止上传`)
          this.limitFlag = false

          // 上传错误提示
          if (this.fileErrName.length) {
            const message = `${this.fileErrName.join('、')} 文件上传失败`
            this.$message.error(message)
            this.fileErrName = []
          }

          // 上传队列全部处理完成时向父级 emit
          this.$emit('change', fileList.map(v => {
            return {
              url: v.url,
              name: v.name
            }
          }))
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .uploader {
    .upload-tip {
      font-size: 12px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.25);
      line-height: 20px;
    }
  }
</style>
