<template lang="html">
  <div class="editor">
    <div ref="toolbar" class="toolbar">
    </div>
    <div ref="editor" class="text">
    </div>
  </div>
</template>

<script>
import { getToken } from '@/utils/token';
  import E from 'wangeditor'
  export default {
    name: 'WangEditor',
    data () {
      return {
        editor: null,
        info_: null
      }
    },
    model: {
      prop: 'value',
      event: 'change'
    },
    props: {
      value: {
        type: String,
        default: ''
      },
      url: {
        type: String,
        default: ''
      },
      isClear: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      isClear (val) {
        // 触发清除文本域内容
        if (val) {
          this.editor.txt.clear()
          this.info_ = null
        }
      },
    //   value: {
    //     // 使用 v-model 时，设置初始值
    //     handler (val) {
    //       setTimeout(() => {
    //         this.editor.txt.html(val)
    //       }, 100);
    //     },
    //     immediate: false
    //   }
    },
    mounted () {
      this.seteditor()
      this.editor.txt.html(this.value)
    },
    methods: {
      seteditor () {
        const _self = this
        this.editor = new E(this.$refs.toolbar, this.$refs.editor)
        this.editor.customConfig.uploadImgShowBase64 = false // base 64 存储图片
        this.editor.customConfig.uploadImgServer = "/portal/v1/file/uploadFileDistri"// 配置服务器端地址
        // this.editor.customConfig.uploadImgHeaders = {}// 自定义 header
         this.editor.customConfig.uploadImgHeaders = {
       'Accept': '*/*',
       'Authorization':'Bearer ' + getToken()  //头部token
     }
        this.editor.customConfig.uploadFileName = 'file' // 后端接受上传文件的参数名
        this.editor.customConfig.uploadImgMaxSize = 10 * 1024 * 1024 // 将图片大小限制为 2M
        this.editor.customConfig.uploadImgmaxlength = 1 // 限制一次最多上传 3 张图片
        this.editor.customConfig.uploadImgTimeout = 5 * 60 * 1000 // 设置超时时间
        this.editor.customConfig.customAlert = function (info) {
          // info 是需要提示的内容
          //   _self.$message({
          //     message: "操作失败, ",
          //     type: "error"
          //   })
        }
        // 配置菜单
        this.editor.customConfig.menus = [
          'head', // 标题
          'bold', // 粗体
          'fontSize', // 字号
          'fontName', // 字体
          'italic', // 斜体
          'underline', // 下划线
          'strikeThrough', // 删除线
          'foreColor', // 文字颜色
          'backColor', // 背景颜色
          'link', // 插入链接
          'list', // 列表
          'justify', // 对齐方式
          'quote', // 引用
          'emoticon', // 表情
          'image', // 插入图片
          // 'table', // 表格
          // 'video', // 插入视频getAttribute
          //   'code', // 插入代码
          //   'undo', // 撤销
          //   'redo' // 重复
        ]
        this.editor.customConfig.uploadImgHooks = {
          before: function (xhr, editor, files) {
            // let dic = new FormData();
            // dic.append('file', files[0]);
            // xhr.send(dic);
            // debugger
            // 图片上传之前触发
            // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
            // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
            // return {
            //     prevent: true,
            //     msg: '放弃上传'
            // }
          },
          fail: (xhr, editor, result) => {

            // 插入图片失败回调
            console.log('上传失败')
          },
          success: (xhr, editor, result) => {
            // 图片上传成功回调
            this.$message({
              message: "上传成功",
              type: "success"
            })
          },
          timeout: (xhr, editor) => {
            // 网络超时的回调
          },
          error: (xhr, editor) => {
            // 图片上传错误的回调
          },
          customInsert: (insertImg, result, editor) => {
             console.log(result)
             let content = result.body.body
            // 图片上传成功，插入图片的回调
            insertImg(`http://10.0.14.134/${content.dataGroup}/${content.dataRemoteName}`)
          }
        }
        this.editor.customConfig.onchange = (html) => {
          this.info_ = html // 绑定当前逐渐地值
          this.$emit('change', this.info_) // 将内容同步到父组件中
        }
        // 创建富文本编辑器
        this.editor.create()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .editor {
    min-width: 480px;
    margin: 0 auto;
    text-align: left;
  }
   .toolbar {
    border: 1px solid #ccc;
    margin-top: 20px;
  }
   .text {
    border: 1px solid #ccc;
    border-top: 0;
    height: 300px;
	width: 100%;
    overflow: auto;
  }
   .w-e-text {
    // overflow: auto;
  }
</style>
