<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="信息描述">
        <el-tag type="info">excel模版说明</el-tag>
        <el-tag>
          <i class="el-icon-download"/>
          <a :href="OSS_PATH + '/excel/课程分类列表模板.xls'">点击下载模版</a>
        </el-tag>

      </el-form-item>

      <el-form-item label="选择Excel">
        <el-upload
          ref="upload"
          :auto-upload="false"
          :on-success="fileUploadSuccess"
          :on-error="fileUploadError"
          :disabled="importBtnDisabled"
          :limit="1"
          :action="BASE_API+'/admin/edu/subject/import'"
          name="file"
          accept="application/vnd.ms-excel">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button
            :loading="loading"
            style="margin-left: 10px;"
            size="small"
            type="success"
            @click="submitUpload">{{ fileUploadBtnText }}</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
     data(){
         return {
            fileUploadBtnText:'上传',
            loading: false, //关闭加载动画
            importBtnDisabled: false, //禁用按钮,
            BASE_API: process.env.BASE_API, //接口api地址
            OSS_PATH: process.env.OSS_PATH //阿里云oss接口地址
         }
        
    },
    methods:{
        submitUpload(){
            if( this.$refs.upload == null)
            return;
            this.fileUploadBtnText='正在上传'
            this.loading=true //上传时加载动画
            this.importBtnDisabled=true //上传时禁用上传按钮
            this.$refs.upload.submit(); //上传文件
        },
        //文件上传成功的回调方法
        fileUploadSuccess(res){
            if(res.success){
                 this.fileUploadBtnText='导入成功',
                 this.loading=false //关闭加载动画
                 this.importBtnDisabled=false //启用上传按钮
                 this.$message({
                    type: 'success',
                    message: res.message
                })
            }
            else{
                 this.fileUploadBtnText='导入失败',
                 this.loading=false //关闭加载动画
                 const messages = res.data;
                 let msgString ='<ul>'
                 messages.forEach(msg =>{
                     msgString+=`<li>${msg}</li>`
                 })
                 msgString+='</ul>';

                  this.$alert(msgString, res.message, {
                   dangerouslyUseHTMLString: true // 渲染返回值中的html
                 })
            }

        },
        //文件上传失败的回调
        fileUploadError(res){
            if(!res.success){
                 this.fileUploadBtnText='导入失败',
                 this.loading=false //关闭加载动画
                //  this.importBtnDisabled=false //启用上传按钮
                 this.$message({
                    type: 'error',
                    message: res.message
                })
            }

        }
    }
}
</script>
