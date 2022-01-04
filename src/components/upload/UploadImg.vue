<!--
 * @Descripttion: 
 * @Author: shenqiang
 * @Date: 2021-12-22 11:17:07
 * @LastEditors: shenqiang
 * @LastEditTime: 2021-12-31 17:29:48
-->
<template>
  <a-upload
    name="avatar"
    list-type="picture-card"
    class="avatar-uploader"
    :show-upload-list="false"
    :action="uploadUrl"
    :headers="headers"
    :before-upload="beforeUpload"
    @change="handleChange"
  >
    <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
    <div v-else>
      <a-icon :type="loading ? 'loading' : 'plus'" />
      <div class="ant-upload-text">Upload</div>
    </div>
  </a-upload>
</template>
<script>
import { apiTagList } from '@/api/api-tag-list.js'
function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
export default {
  props: {
    imgUrl: {
      type: String,
      default: ''
    }
    // uwidth: {
    //   type: Number,
    //   default: 228
    // },
    // uheight: {
    //   type: Number,
    //   default: 128
    // }
  },
  computed: {
    imageUrl: {
      get() {
        return this.imgUrl
      },
      set(val) {
        return this.$emit('update:imgUrl', val)
      }
    }
  },
  data() {
    return {
      uploadUrl: `${process.env.VUE_APP_API_BASE_URL}${apiTagList.commonTag}/file/upload`, // 文件上传地址
      headers: {
        Authorization: localStorage.getItem('Authorization')
      },
      loading: false
      // imageUrl: ''
    }
  },
  name: 'UploadImg',
  methods: {
    handleChange(info) {
      console.log('上传图片接口回调', info)

      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (imageUrl) => {
          this.imageUrl = imageUrl
          this.loading = false
        })
      }
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isJpgOrPng) {
        this.$message.error('You can only upload JPG file!')
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('Image must smaller than 2MB!')
      }
      return isJpgOrPng && isLt2M
    }
  }
}
</script>
<style>
.avatar-uploader > .ant-upload {
  /* width: 104px;
  height: 104px;
  overflow: hidden; */
}
.avatar-uploader img {
  width: 100%;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
