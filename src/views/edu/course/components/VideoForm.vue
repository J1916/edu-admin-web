<template>
  <!-- 添加和修改课时表单 -->
  <el-dialog :visible.sync="dialogVisible" title="添加课时">
    <el-form :model="video" label-width="120px">
      <el-form-item label="课时标题">
        <el-input v-model="video.title" />
      </el-form-item>
      <el-form-item label="课时排序">
        <el-input-number v-model="video.sort" :min="0" controls-position="right" />
      </el-form-item>
      <el-form-item label="是否免费">
        <el-radio-group v-model="video.free">
          <el-radio :label="true">免费</el-radio>
          <el-radio :label="false">默认</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="上传视频">
        <!-- 上传视频 TODO -->
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
import video from "@/api/edu/video";
export default {
  // 父组件向子组件传值
  props: {
    courseId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      dialogVisible: false,
      //课时对象
      video: {
        title: "",
        sort: 0,
        free: false,
        chapterId: "",
        videoSourceId: ""
      }
    };
  },
  methods: {
    open(chapterId, videoId) {
      this.dialogVisible = true; //打开弹窗
      this.video.chapterId = chapterId;
      //如果父组件有传递videoId，那么就是更新课时操作，需要做数据回显
      if (videoId) {
        video.getVideoInfoById(videoId).then(res => {
          this.video = res.data;
        });
      }
    },
    close() {
      this.dialogVisible = false; //关闭弹窗
      this.resetForm(); //清空表单
    },
    saveOrUpdate() {
      //新增课时
      if (!this.video.chapterId) {
        this.save();
      } else {
        //更新课时
        this.update();
      }
    },
    save() {
      video.saveVideoInfo(this.video).then(res => {
        this.$message.success("保存课时成功");
      });
    },
    update() {
      video.updateVideoInfoById(this.video).then(res => {
        this.$message.success("更新课时成功");
      });
    },
    //重置表单
    resetForm() {
      this.video.title = "";
      this.video.sort = 0;
      this.video.chapterId = "";
      this.video.free = false;
      this.video.videoSourceId = "";
    }
  }
};
</script>