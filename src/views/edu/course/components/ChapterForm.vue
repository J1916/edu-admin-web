<!-- 章节表表单子组件 -->
<template>
  <!-- 添加和修改章节表单 -->
  <el-dialog :visible.sync="dialogVisible" title="添加章节">
    <el-form :model="chapter" label-width="120px">
      <el-form-item label="章节标题">
        <el-input v-model="chapter.title" />
      </el-form-item>
      <el-form-item label="章节排序">
        <el-input-number v-model="chapter.sort" :min="0" controls-position="right" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
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
      chapter: {
        title: "",
        sort: 0,
        courseId: ""
      }
    };
  },
  created() {},
  methods: {
    open(chapterId) {
      this.dialogVisible = true; //打开弹窗
      //如果有chapterId章节id那么就说明父组件进行更新章节操作
      //数据回显
      if (chapterId) {
        chapter.getChapterById(chapterId).then(res => {
          this.chapter = res.data;
        });
      }
    },

    close() {
      this.dialogVisible = false; //关闭弹窗
      this.resetForm(); // 重置表单
    },
    saveOrUpdate() {
      //新增章节
      if (!this.chapter.courseId) {
        this.save();
      }
      //更新章节
      else {
        this.update();
      }
    },
    save() {
      console.log(this.chapter);
      this.chapter.courseId = this.courseId;
      chapter.saveChapter(this.chapter).then(res => {
        this.$message.success("新增章节成功");
        this.close(); // 关闭组件
        this.$emit("onSaveSuccess"); // 调用父组件监听函数
      });
    },
    update() {
      chapter.updateChapterById(this.chapter).then(res => {
        this.$message.success("更新章节成功");
        this.close(); // 关闭组件
        this.$emit("onSaveSuccess"); // 调用父组件监听函数
      });
    },
    //重置表单
    resetForm() {
      this.chapter.title = "";
      this.chapter.sort = 0;
    }
  }
};
</script>