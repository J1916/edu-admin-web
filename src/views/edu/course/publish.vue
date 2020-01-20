<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="active" finish-status="success" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="发布课程"/>
    </el-steps>

    <div style="text-align:center">
      <el-button @click="previous">返回修改</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="publish">发布课程</el-button>
    </div>
  </div>
</template>

<script>
 export default {
     data(){
         return {
             active:2 ,
             saveBtnDisabled:false //禁用按钮
         }
     },
     created() {},
      methods: {
          //返回修改
        previous(){
            console.log('上一步');
            this.$router.push({path:'/edu/course/chapter/1'}); //设置路由跳转到其他页面
        },
        //发布课程
         publish(){
              console.log('发布课程');
                // this.$router.push({path:'/edu/course/list'}); //设置路由跳转到其他页面
                this.active =3
         }
     }
 }
</script>