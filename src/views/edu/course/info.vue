<template>
  <div class="app-container">
    <!-- 课程信息表单 -->
<el-form label-width="120px">

  <el-form-item label="课程标题">
    <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写"/>
  </el-form-item>

  <!-- 所属分类：级联下拉列表 -->
<el-form-item label="课程类别">
  <!-- 一级分类 -->
  <el-select
    v-model="courseInfo.subjectParentId"
    placeholder="请选择" 
    @change="subjectLevelOneChanged" >
    <el-option
      v-for="subject in subjectNestedList"
      :key="subject.id"
      :label="subject.title"
      :value="subject.id"/>
  </el-select>
</el-form-item>
<!-- 二级分类 -->
<el-select v-model="courseInfo.subjectId" placeholder="请选择">
  <el-option
    v-for="subject in subSubjectList"
    :key="subject.id"
    :label="subject.title"
    :value="subject.id"/>
</el-select>

  <!-- 课程讲师 -->
<el-form-item label="课程讲师">
  <el-select
    v-model="courseInfo.teacherId"
    placeholder="请选择">
    <el-option
      v-for="teacher in teacherList"
      :key="teacher.id"
      :label="teacher.name"
      :value="teacher.id"/>
  </el-select>
</el-form-item>

  <el-form-item label="总课时">
    <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数"/>
  </el-form-item>

  <!-- 课程简介 TODO -->
<!--Tinymce中的图片上传功能直接存储的是图片的base64编码，因此无需图片服务器 -->
<el-form-item label="课程简介">
    <tinymce :height="300" v-model="courseInfo.description"/>
</el-form-item>

  <!-- 课程封面 TODO -->
<el-form-item label="课程封面">
  <el-upload
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
    :action="BASE_API+'/admin/oss/file/upload?host=cover'"
    class="avatar-uploader">
    <img :src="courseInfo.cover">
  </el-upload>
</el-form-item>

  <el-form-item label="课程价格">
    <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元"/> 元
  </el-form-item>
</el-form>
  </div>
</template>
<script>
import course from "@/api/edu/course";
import subject from "@/api/edu/subject";
import teacher from "@/api/edu/teacher";
import Tinymce from "@/components/Tinymce";

const defaultForm = {
  title: "",
  subjectId: "",
  subjectParentId: "",
  teacherId: "",
  lessonNum: 0,
  description: "",
  cover: "",
  price: 0,
  cover: process.env.OSS_PATH + "/cover/default.gif"
};
export default {
  components: { Tinymce }, //引用Tinymce可视化编辑器组件
  data() {
    return {
      action: 0,
      courseInfo: defaultForm,
      saveBtnDisabled: false, //禁用保存按钮
      subjectNestedList: [], //一级分类列表
      subSubjectList: [], //二级分类列表
      teacherList: [], // 讲师列表
      BASE_API: process.env.BASE_API // 接口API地址
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      //从路由中获取传递过来的id
      if (this.$route.param && this.$route.param.id) {
        const id = this.$route.param.id;
        //根据id查询课程
        this.getCourseInfoById(id);
      } else {
        this.courseInfo = { ...defaultForm }; //深拷贝
        // 初始化分类列表
        this.initSubjectList();
      }

      // 获取讲师列表
      this.initTeacherList();
    },
    next() {
      this.saveBtnDisabled = true;

      //新增
      if (!this.courseInfo.id) {
        this.save();
      } else {
        //更新
        this.update();
      }

      this.$router.push({ path: "/edu/course/chapter/1" }); //设置路由跳转到其他页面
    },
    save(courseInfo) {
      course
        .saveCourseInfo(this.courseInfo)
        .then(res => {
          this.$message({
            type: "success",
            message: "保存成功"
          });
          return res; // 将响应结果传递给then
        })
        .then(res => {
          this.$router.push({
            path: "/edu/course/chapter/" + res.data
          });
        });
    },
    update() {
      this.$router.push({ path: "/edu/course/chapter/1" });
    },
    initSubjectList() {
      //初始化分类列表
      subject.getNestedTreeList().then(res => {
        this.subjectNestedList = res.data;
      });
    },
    subjectLevelOneChanged(val) {
      console.log(val);

      for (let i = 0; i < this.subjectNestedList.length; i++) {
        if (this.subjectNestedList[i].id === val) {
          this.subSubjectList = this.subjectNestedList[i].children;
          this.courseInfo.subjectId = "";
        }
      }
    },
    //获取教师列表
    initTeacherList() {
      teacher.getList().then(res => {
        this.teacherList = res.data;
      });
    },
    //图片上传成功后回调该方法
    handleAvatarSuccess(res, file) {
      console.log(res); // 上传响应
      console.log(URL.createObjectURL(file.raw)); // base64编码
      this.courseInfo.cover = res.data.url;
    },

    //图片上传前调用
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //根据id查询课程
    getCourseInfoById(id) {
      //获取数据回显
      course.getCourseInfoById(id).then(res => {
        this.courseInfo = res.data;

      // 初始化分类列表
        subject.getNestedTreeList().then(res => {
          this.subjectNestedList = res.data;
          // 填充二级菜单：遍历一级菜单列表，
          for (let i = 0; i < this.subjectNestedList.length; i++) {
            // 找到和courseInfo.subjectParentId一致的父类别记录
            if (
              this.subjectNestedList[i].id === this.courseInfo.subjectParentId
            ) {
              // 拿到当前类别下的子类别列表，将子类别列表填入二级下拉菜单列表
              this.subSubjectList = this.subjectNestedList[i].children;
            }
          }
        });
      });
    }
  }
};
</script> 
<style scoped>
.tinymce-container {
  position: relative;
  line-height: normal;
}
</style>