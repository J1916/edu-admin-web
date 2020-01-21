<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="active" finish-status="success" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息"/>
      <el-step title="创建课程大纲"/>
      <el-step title="发布课程"/>
    </el-steps>

    <div style="text-align:center">
      <el-button @click="previous">上一步</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
    </div>
    <!-- 章节列表 -->
<ChapterList :course-id="courseId" />
  </div>
</template>
<script>
import chapter from "@/api/edu/chapter";
// 引入组件
import ChapterList from '@/views/edu/course/components/ChapterList'

export default {
    components: {ChapterList}, //注册组件
    data() {
        return{
         active:1,
         saveBtnDisabled:false,
         courseId: '' // 所属课程 
        }
    },
    created() {
        this.init();
    },
    methods: {
        //上一步
        previous(){
            console.log('上一步');
            this.$router.push({path:'/edu/course/info/'+this.courseId}); //设置路由跳转到其他页面
        },
        //下一步
        next(){
            console.log('下一步');
            this.$router.push({path:'/edu/course/publish/'+this.courseId}); //设置路由跳转到其他页面
        },
        init(){
            //判断路由有没有携带参数id
            if (this.$route.params && this.$route.params.id){
                //从路由中获取参数id
                this.courseId = this.$route.params.id;
            }
        }
    }
}

</script>