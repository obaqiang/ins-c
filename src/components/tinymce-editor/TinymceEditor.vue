<template>
  <Editor v-model="editorContent" :init="initConfig"></Editor>
</template>

<script>
import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/silver/theme'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/icons/default/icons'

import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/code'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/image'
import 'tinymce/plugins/media'
import 'tinymce/plugins/paste'
export default {
  name: 'TinEditor',
  components: {
    Editor
  },
  computed: {
    editorContent: {
      get() {
        return this.content
      },
      set(val) {
        this.$emit('update:content', val)
      }
    }
  },
  props: {
    content: {
      type: String,
      default: ''
    },
    height: {
      type: String,
      default: '400px'
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // editorContent: this.content,
      initConfig: {
        language_url: '/tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/tinymce/skins/ui/oxide',
        height: this.height,
        // 插件配置
        plugins: 'preview wordcount code table lists image media paste',
        // 扩展插件配置
        external_plugins: {
          // powerpaste: '/tinymce/plugins/powerpaste/plugin.min.js',
          formatpainter: '/tinymce/plugins/formatpainter/plugin.min.js'
        },
        // 工具栏显示
        toolbar:
          'preview | undo redo | formatselect | fontselect fontsizeselect bold italic forecolor backcolor formatpainter | alignleft aligncenter alignright alignjustify | outdent indent | code | table bullist numlist | image media',
        // 工具栏显示模式，超出换行显示
        toolbar_mode: 'wrap',
        // 过滤从 Microsoft Word 粘贴的内容，prompt - 在尝试粘贴 HTML 内容后提示用户在清理和合并选项之间进行选择
        powerpaste_word_import: 'propmt',
        // 字体配置
        font_formats:
          '微软雅黑=微软雅黑;宋体=宋体;黑体=黑体;仿宋=仿宋;楷体=楷体;隶书=隶书;幼圆=幼圆;Andale Mono=andale mono,times;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;Comic Sans MS=comic sans ms,sans-serif;Courier New=courier new,courier;Georgia=georgia,palatino;Helvetica=helvetica;Impact=impact,chicago;Symbol=symbol;Tahoma=tahoma,arial,helvetica,sans-serif;Terminal=terminal,monaco;Times New Roman=times new roman,times;Trebuchet MS=trebuchet ms,geneva;Verdana=verdana,geneva;Webdings=webdings;Wingdings=wingdings',
        setup: (editor) => {
          // 设置只读
          this.readonly && editor.setMode('readonly')
        },
        // 粘贴图像，实现拖入上传图片
        paste_data_images: true,
        // 图片上传
        images_upload_handler: (blobInfo, success, failure) => {
          // 以下为文件上传接口，可根据实际业务自行配置
          // let formData = new FormData()
          // formData.set('upload_file', blobInfo.blob())
          // request({
          //   url: '/office/file/upload',
          //   method: 'post',
          //   data: formData
          // }).then(res => {
          //   success(`${res.msgObj[0].fileUrl}${res.msgObj[0].fileId}`)
          // }).catch(() => {
          //   this.$Message.error('上传失败')
          // })
        },
        // 指定文件上传类型
        file_picker_types: 'media',
        // 文件上传
        file_picker_callback: (callback, value, meta) => {
          // 以下为文件上传接口，可根据实际业务自行配置
          // if (meta.filetype === 'media') {
          //   let input = document.createElement('input')
          //   input.setAttribute('type', 'file')
          //   input.setAttribute('accept', '.mp3, .mp4')
          //   input.click()
          //   let _this = this
          //   input.onchange = function () {
          //     let file = this.files[0]
          //     let formData = new FormData()
          //     formData.append('file', file)
          //     request({
          //       url: '/office/file/upload',
          //       method: 'post',
          //       data: formData
          //     }).then(res => {
          //       callback(`${res.msgObj[0].fileUrl}${res.msgObj[0].fileId}`)
          //     }).catch(() => {
          //       _this.$Message.error('上传失败')
          //     })
          //   }
          // }
        },
        // 去掉底部 tinymce 水印
        branding: false
      }
    }
  },

  watch: {
    // editorContent(newValue) {
    //   this.$emit('update:content', newValue)
    // }
  },
  mounted() {
    tinymce.init({})
  },
  methods: {}
}
</script>

<style scoped>
.editor {
}
</style>
