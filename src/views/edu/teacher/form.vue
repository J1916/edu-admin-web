<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="讲师名称">
        <el-input v-model="teacher.name"/>
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input-number v-model="teacher.sort" controls-position="right" :min="0"/>
      </el-form-item>
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" clearable placeholder="请选择">
          <!--
            数据类型一定要和取出的json中的一致，否则没法回填
            因此，这里value使用动态绑定的值，保证其数据类型是number
          -->
          <el-option :value="1" label="高级讲师"/>
          <el-option :value="2" label="首席讲师"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"/>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro" :rows="10" type="textarea"/>
      </el-form-item>
      <!-- 讲师头像 -->
      <el-form-item label="讲师头像">

          <!-- 头衔缩略图 -->
          <pan-thumb :image="teacher.avatar"/>
          <!-- 文件上传按钮 -->
          <el-button type="primary" icon="el-icon-upload" @click="imagecropperShow=true">更换头像
          </el-button>

          <!--
      v-show：是否显示上传组件
      :key：类似于id，如果一个页面多个图片上传控件，可以做区分
      :url：后台上传的url地址
      @close：关闭上传组件
      @crop-upload-success：上传成功后的回调 -->
          <image-cropper
                        v-show="imagecropperShow"
                        :width="300"
                        :height="300"
                        :key="imagecropperKey"
                        :url="BASE_API+'/admin/oss/file/upload'"
                        field="file"
                        @close="close"
                        @crop-upload-success="cropSuccess"/>

      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="saveOrUpdate">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import teacher from "@/api/edu/teacher";
import ImageCropper from '@/components/ImageCropper'
import PanThumb from '@/components/PanThumb'

const defaultForm = {
  name: '',
  sort: 0,
  level: '',
  career: '',
  intro: '',
  avatar: process.env.OSS_PATH+'/avatar/default.jpg'
}

export default {
  data() {
    return {
      teacher: defaultForm,
      saveBtnDisabled: false, // 保存按钮是否禁用,
      BASE_API: process.env.BASE_API,//接口api地址
      imagecropperShow: false,//是否显示图片上传组件
      imagecropperKey:0 //上传组件id

    };
  },
  //实用两个图片上传组件
  components: {
    ImageCropper , PanThumb 
  },
  created() {
    console.log('created')
    this.init();
  },
  watch: {
    //在watch监听器中监听路由的变化
    $route(to, from) {
      console.log("watch $route");
      this.init();
    }
  },
  methods: {
    saveOrUpdate() {
      this.saveBtnDisabled = true;

      //如果对象有id，那么就是说明是信息回显更新
      if (!this.teacher.id) this.addTeacher();
      else this.updateTeacherById();
    },
    addTeacher() {
      teacher
        .addTeacher(this.teacher)
        .then(res => {
          return this.$message({
            message: "保存成功",
            type: "success"
          });
        })
        .then(res => {
          this.$router.push({ path: "/edu/teacher" }); //保存成功后跳转路由
        });
    },
    updateTeacherById() {
  
      teacher
        .updateTeacher(this.teacher)
        .then(res => {
          return this.$message({
            message: "更新成功",
            type: "success"
          });
        })
        .then(res => {
          this.$router.push({ path: "/edu/teacher" }); //保存成功后跳转路由
        });
    },
    getTeacherById(id) {
      //根据id查询记录
      teacher.getTeacherById(id).then(res => {
        this.teacher = res.data;
      });
    },
    init() {
      if (this.$route.params && this.$route.params.id) {
        const id = this.$route.params.id;
        this.getTeacherById(id); 
      } else {
        // 使用对象拓展运算符，拷贝对象，而不是引用，
        // 否则新增一条记录后，defaultForm就变成了之前新增的teacher的值
        this.teacher = { ...defaultForm };
      }
    },
    //图片上传成功后的回调的函数
    cropSuccess(data){
        console.log(data);
       
       //图片上传成功后关闭上传组件
        this.imagecropperShow= false;

        this.teacher.avatar = data.url; //上传成功后返回图片url

          // 上传失败后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.imagecropperKey = this.imagecropperKey + 1
    },
    //关闭上传组件
    close(){
      this.imagecropperShow= false;
      // 上传失败后，重新打开上传组件时初始化组件，否则显示上一次的上传结果
      this.imagecropperKey = this.imagecropperKey + 1
    }
  }
};
</script>